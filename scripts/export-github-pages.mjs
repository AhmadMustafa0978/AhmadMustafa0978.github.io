import { cp, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");
const outputDir = resolve(root, "docs");
const workerUrl = pathToFileURL(resolve(root, "dist/server/index.js"));

await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });
await writeFile(resolve(outputDir, ".nojekyll"), "");

const { default: worker } = await import(`${workerUrl.href}?static=${Date.now()}`);
const response = await worker.fetch(
  new Request("https://ahmadmustafa0978.github.io/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static export failed: ${response.status}`);

const html = (await response.text()).replaceAll(
  "https://luton-lubricants-syria.sites.app",
  "https://ahmadmustafa0978.github.io",
);

await writeFile(resolve(outputDir, "index.html"), html, "utf8");
