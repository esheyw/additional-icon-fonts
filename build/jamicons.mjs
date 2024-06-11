import * as fs from "fs";
import * as path from "path";
import svgtofont from "svgtofont";
import { download, unzipDirectory, cleanDirectory } from "./util.mjs";

export async function jamIconsHandler(fontDir) {
  cleanDirectory(fontDir);
  console.log("Generating Jam Icons Font.");
  const lastVersion = `3.1.0`;
  const relaseURL = `https://github.com/michaelampr/jam/archive/refs/tags/${lastVersion}.zip`;
  console.log("Downloading last known release...");
  const zipFileName = await download(relaseURL, fontDir);
  console.log("Downloaded. Unzipping...");
  await unzipDirectory(zipFileName);
  console.log("Unzipped");
  const fontName = "jamicons";
  await svgtofont({
    src: path.resolve(fontDir, `jam-${lastVersion}/icons`), // svg path
    dist: "fonts", // output path
    fontName, // font name
    css: true, // Create CSS files.
    emptyDist: false,
    classNamePrefix: "jam",
  });
  const fontsCSSPath = path.resolve("fonts", `${fontName}.css`);
  const stylesCSSPath = path.resolve("styles", `${fontName}.css`);
  const cssLines = fs
    .readFileSync(fontsCSSPath, { encoding: "utf-8" })
    .replaceAll(new RegExp(`(url\\(['"])(${fontName})`, "g"), `$1../fonts/$2`)
    .replace(`format('truetype'),`, `format('truetype');`)
    .split("\n");
  cssLines.splice(2, 2);
  cssLines.splice(5, 1);
  cssLines[2] = `  src:` + cssLines[2].slice(1);
  fs.writeFileSync(stylesCSSPath, cssLines.join("\n"));
  fs.rmSync(fontsCSSPath);
  fs.rmSync(path.resolve("fonts", "jamicons.svg"));
  fs.rmSync(path.resolve("fonts", "jamicons.symbol.svg"));
  fs.cpSync(path.resolve(fontDir, `jam-${lastVersion}`, "LICENSE"), path.resolve("licenses", "LICENSE.jamicons.txt"));
  fs.rmSync(fontDir, { recursive: true });
  return `styles/${fontName}.css`;
}
