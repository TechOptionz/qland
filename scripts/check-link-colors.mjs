/**
 * Dev-only check: every link that sets a base text colour must actually receive
 * it, with readable contrast against its own background.
 *
 * Colours are normalised through a canvas so Tailwind's oklab/color-mix output
 * is compared in sRGB, and `hover:`/`focus:` variants are ignored — only the
 * resting state is measured.
 *
 * Run with a server up:  BASE=http://localhost:3001 node scripts/check-link-colors.mjs
 */
import fs from "node:fs";
import puppeteer from "puppeteer-core";

const BASE = process.env.BASE ?? "http://localhost:3000";

/** Set CHROME_PATH to override. */
const CHROME =
  process.env.CHROME_PATH ??
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find((p) => fs.existsSync(p));

if (!CHROME) {
  console.error("No Chrome/Edge found. Set CHROME_PATH to the browser binary.");
  process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
let failures = 0;

for (const path of [
  "/",
  "/our-difference",
  "/house-and-land",
  "/buyers-agency",
  "/property-management",
  "/property-sales",
  "/about",
  "/reviews",
  "/contact",
  "/privacy-policy",
  "/boutique-chevron-island",
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + path, { waitUntil: "networkidle0" });

  const rows = await page.evaluate(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1;
    const ctx = cv.getContext("2d", { willReadFrequently: true });

    /** Any CSS colour -> [r,g,b,a] in sRGB, via the canvas parser. */
    const toRgba = (css) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#000";
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return [r, g, b, a / 255];
    };

    const over = (fg, bg) => fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3]));

    const lum = (rgb) => {
      const [r, g, b] = rgb.map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const contrast = (a, b) => {
      const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (l1 + 0.05) / (l2 + 0.05);
    };

    /** Composite every ancestor background down to an opaque colour. */
    const bgOf = (el) => {
      const stack = [];
      for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
        const c = toRgba(getComputedStyle(n).backgroundColor);
        if (c[3] > 0) stack.push(c);
        if (c[3] === 1) break;
      }
      let out = [255, 255, 255];
      for (const c of stack.reverse()) out = over(c, out);
      return out;
    };

    // Only links whose *resting* class list sets a text colour.
    const baseColourClass = (cls) =>
      cls
        .split(/\s+/)
        .filter((c) => /^text-(ink|cream|amber)/.test(c))
        .join(" ");

    return [...document.querySelectorAll("a")]
      .map((a) => ({ a, cls: baseColourClass(a.getAttribute("class") || "") }))
      .filter(({ cls }) => cls.length > 0)
      .map(({ a, cls }) => {
        const fg = toRgba(getComputedStyle(a).color);
        const bg = bgOf(a);
        return {
          text: (a.textContent || "").trim().slice(0, 30) || "(icon)",
          cls,
          fg: `rgb(${fg.slice(0, 3).map(Math.round).join(",")})`,
          ratio: +contrast(over(fg, bg), bg).toFixed(2),
        };
      });
  });

  console.log(`\n=== ${path} ===`);
  for (const r of rows) {
    const ok = r.ratio >= 4.5;
    if (!ok) failures++;
    console.log(
      `${ok ? "ok  " : "FAIL"} ${String(r.ratio).padStart(6)}:1  ${r.fg.padEnd(18)} ${r.cls.padEnd(26)} "${r.text}"`,
    );
  }
  console.log(`${rows.length} coloured links, ${rows.filter((r) => r.ratio < 4.5).length} below 4.5:1`);
  await page.close();
}

await browser.close();
console.log(`\n${failures === 0 ? "PASS" : `${failures} FAILING`}`);
process.exit(failures === 0 ? 0 : 1);
