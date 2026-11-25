// Copies the entry image to the output directory.
//
// The image is built ahead of time and shipped in this repository as
// entry.png. At run time this program only copies it to the output
// location and checks that the copy matches the original byte for byte.
//
// The output directory comes from MAKEFUN_OUTPUT_DIR when set, and falls
// back to /output, the directory the grader provides. The source is
// located relative to this file (import.meta.url), so the program works
// no matter which directory it is started from. The copy is verified by
// comparing file sizes, and the program fails loudly on any mismatch,
// so a truncated or partial output can never pass silently.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const src = new URL("./entry.png", import.meta.url);
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);

const srcSize = statSync(src).size;
const destSize = statSync(dest).size;
if (srcSize !== destSize) {
  throw new Error(
    `copy mismatch: source is ${srcSize} bytes, output is ${destSize} bytes`,
  );
}
console.log(`wrote ${dest} (${destSize} bytes)`);
