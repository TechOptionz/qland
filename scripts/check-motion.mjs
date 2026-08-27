/**
 * Dev-only check for the scroll-reveal layer.
 *
 * The failure mode that matters is content that animates *out* and never comes
 * back: `.reveal` ships hidden in the HTML, so any element the observer misses
 * is invisible to the reader forever. This walks both pages top to bottom and
 * asserts nothing is left behind — plus the reduced-motion and no-JS escape
 * hatches, which are the two ways the observer never runs at all.
 *
 * Run with a server up:  BASE=http://localhost:3000 node scripts/check-motion.mjs
 */
import fs from "node:fs";
import puppeteer from "puppeteer-core";

const BASE = process.env.BASE ?? "http://localhost:3000";
const PATHS = ["/", "/boutique-chevron-island"];

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

const fail = (message) => {
  console.log(`  FAIL ${message}`);
  failures++;
};

for (const path of PATHS) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + path, { waitUntil: "networkidle0" });

  const total = await page.$$eval(".reveal", (els) => els.length);
  const revealedAtTop = await page.$$eval(
    ".reveal",
    (els) => els.filter((e) => e.classList.contains("is-visible")).length,
  );
  const padTop = await page.$eval("header", (h) => getComputedStyle(h).paddingTop);

  // Walk down in viewport-sized steps, the way a reader would.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 1200));
  });

  const stuck = await page.$$eval(".reveal, .stagger-item", (els) =>
    els
      .filter((e) => getComputedStyle(e).opacity !== "1")
      .map((e) => `${e.tagName.toLowerCase()}.${e.className.split(" ").slice(0, 3).join(".")}`),
  );
  const padScrolled = await page.$eval("header", (h) => getComputedStyle(h).paddingTop);

  console.log(`\n${path}  (${await page.title()})`);
  console.log(`  ${total} reveals, ${revealedAtTop} visible before scrolling`);
  console.log(`  header padding ${padTop} -> ${padScrolled}`);

  if (stuck.length) fail(`still hidden after scrolling: ${stuck.join(", ")}`);
  if (total > 0 && revealedAtTop === total) fail("nothing was deferred — reveals are inert");
  if (padTop === padScrolled) fail("header did not condense on scroll");
  if (!failures) console.log("  ok");

  await page.close();
}

console.log("");

// Reduced motion: everything visible immediately, no scrolling required.
const reduced = await browser.newPage();
await reduced.setViewport({ width: 1440, height: 900 });
await reduced.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await reduced.goto(BASE + PATHS[0], { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 400));
const reducedHidden = await reduced.$$eval(
  ".reveal",
  (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length,
);
console.log(`prefers-reduced-motion: ${reducedHidden} hidden`);
if (reducedHidden) fail("reduced-motion readers see hidden content");

// No JS: the <noscript> override in layout.tsx has to carry the page.
const nojs = await browser.newPage();
await nojs.setJavaScriptEnabled(false);
await nojs.setViewport({ width: 1440, height: 900 });
await nojs.goto(BASE + PATHS[0], { waitUntil: "networkidle0" });
const nojsHidden = await nojs.$$eval(
  ".reveal",
  (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length,
);
console.log(`no-JS: ${nojsHidden} hidden`);
if (nojsHidden) fail("page is blank without JavaScript");

await browser.close();
console.log(failures ? `\n${failures} failure(s)` : "\nAll motion checks passed.");
process.exit(failures ? 1 : 0);
