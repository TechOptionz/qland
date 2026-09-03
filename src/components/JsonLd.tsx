/**
 * Emits one schema.org graph as a `<script type="application/ld+json">`.
 *
 * The `<` escape is the standard guard against a string in the data closing the
 * script element early. Rendered on the server, so the JSON is in the HTML that
 * crawlers and answer engines fetch — no JavaScript required to see it.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
