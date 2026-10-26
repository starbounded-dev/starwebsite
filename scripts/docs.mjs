import { existsSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localPython = path.join(
  root,
  ".venv-docs",
  process.platform === "win32" ? "Scripts/python.exe" : "bin/python",
);
const python =
  process.env.MKDOCS_PYTHON ||
  (existsSync(localPython)
    ? localPython
    : process.platform === "win32"
      ? "python"
      : "python3");
const serve = process.argv[2] === "serve";
const args = [
  "-m",
  "mkdocs",
  serve ? "serve" : "build",
  "--config-file",
  path.join(root, "documentation/mkdocs.yml"),
];
if (!serve) {
  args.push("--strict", "--site-dir", path.join(root, "public/docs"));
}
const result = spawnSync(python, args, { cwd: root, stdio: "inherit" });
if (result.error) {
  console.error(`Could not run MkDocs with ${python}: ${result.error.message}`);
  console.error("Follow documentation/README.md to install the docs dependencies.");
}
process.exit(result.status ?? 1);
