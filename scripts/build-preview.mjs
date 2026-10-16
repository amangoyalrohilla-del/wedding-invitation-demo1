/**
 * Builds a static, single-file preview of the invitation (same React components as the
 * Next.js app) into preview/dist. Used for quick sharing; the real site is `next build`.
 *   node scripts/build-preview.mjs [--doc]   (--doc wraps it in a full HTML document)
 */
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "preview", "dist");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const js = await build({
  entryPoints: [join(root, "preview", "entry.tsx")],
  bundle: true,
  minify: true,
  write: false,
  format: "iife",
  target: ["es2020", "safari15"],
  jsx: "automatic",
  logLevel: "warning",
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.NEXT_PUBLIC_ASSET_BASE": '"."',
    "process.env.NEXT_PUBLIC_STATIC_PREVIEW": '"1"',
  },
});

let css = readFileSync(join(root, "src", "app", "globals.css"), "utf8");
css = css.replace(/url\("\/fonts\/([^"]+)"\)/g, (_, f) => {
  const b64 = readFileSync(join(root, "public", "fonts", f)).toString("base64");
  return `url("data:font/woff;base64,${b64}")`;
});
const cssMin = (await build({ stdin: { contents: css, loader: "css" }, minify: true, write: false })).outputFiles[0].text;

const head = `<title>Rajveer &amp; Meera · Royal Wedding</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="A royal Rajasthani wedding invitation — Rajveer &amp; Meera, Jaipur, 25 December 2026.">
<style>${cssMin}</style>`;
const body = `<div id="root"></div>
<script>${js.outputFiles[0].text.replace(/<\/script/gi, "<\\/script")}</script>`;

const doc = process.argv.includes("--doc");
const html = doc
  ? `<!doctype html><html lang="hi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${head}</head><body>${body}</body></html>`
  : `${head}\n${body}\n`;
writeFileSync(join(out, "index.html"), html);
cpSync(join(root, "public", "assets"), join(out, "assets"), { recursive: true });
console.log(`preview → ${join(out, "index.html")} (${(html.length / 1024).toFixed(0)} KB)`);
