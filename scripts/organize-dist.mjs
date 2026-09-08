import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, "../out");
const srcTargetDir = path.join(outDir, "src");

if (!fs.existsSync(outDir)) {
  console.error(`Error: Build output directory "${outDir}" does not exist.`);
  process.exit(1);
}

// Ensure out/src exists
if (!fs.existsSync(srcTargetDir)) {
  fs.mkdirSync(srcTargetDir, { recursive: true });
}

// Files/directories that should stay at the root level of out/
const keepAtRoot = new Set(["index.html", ".htaccess", "src"]);

const entries = fs.readdirSync(outDir);

let movedCount = 0;
for (const entry of entries) {
  if (keepAtRoot.has(entry)) {
    continue;
  }

  const srcPath = path.join(outDir, entry);
  const destPath = path.join(srcTargetDir, entry);

  // Move file or folder into out/src/
  fs.renameSync(srcPath, destPath);
  movedCount++;
}

console.log(
  `[organize-dist] Successfully moved ${movedCount} item(s) into out/src/. index.html remains at the root level.`
);
