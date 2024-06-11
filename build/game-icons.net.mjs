import * as fs from "fs";
import * as path from "path";
import svgson from "svgson";
import svgtofont from "svgtofont";
import { cleanDirectory, download, unzipDirectory } from "./util.mjs";

export async function gameiconsHandler(fontDir) {
  cleanDirectory(fontDir);
  console.log("Generating game-icons.net font.");
  const relaseURL = `https://game-icons.net/archives/svg/zip/000000/transparent/game-icons.net.svg.zip`;
  console.log("Downloading newest release...");
  const zipFileName = await download(relaseURL, fontDir);
  console.log("Downloaded. Unzipping...");
  await unzipDirectory(zipFileName);
  console.log("Unzipped");
  const svgDir = path.resolve(fontDir, "svg");
  cleanDirectory(svgDir);
  const icons = fs.globSync(path.resolve(fontDir, "icons/**/*.svg"));
  process.stdout.write("\nTransparentizing icons: ");
  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];
    const filename = path.basename(icon);
    const newpath = path.resolve(svgDir, filename);
    const svg = svgson.parseSync(fs.readFileSync(icon));
    svg.children = svg.children.reduce((acc, child) => {
      if (process.stdout?.cursorTo) {
        process.stdout.cursorTo(25);
        process.stdout.clearLine(1);
        process.stdout.write(`Processing icon #${i} of ${icons.length}, ${filename}`);
      }
      const entries = Object.entries(child.attributes);
      if (entries.length === 1 && entries[0][0] === "d" && entries[0][1] === "M0 0h512v512H0z") return acc;
      child.attributes.fill = "#000";
      acc.push(child);
      return acc;
    }, []);
    fs.writeFileSync(newpath, svgson.stringify(svg));
  }
  if (process.stdout?.cursorTo) {
    process.stdout.cursorTo(25);
    process.stdout.clearLine(1);
    process.stdout.write("Done!\nGenerating font & styles... \n");
  }
  const fontName = "game-icons.net";
  await svgtofont({
    src: svgDir, // svg path
    dist: "fonts", // output path
    fontName, // font name
    css: true, // Create CSS files.
    emptyDist: false,
    classNamePrefix: "ginf",
  });
  const fontsCSSPath = path.resolve("fonts", `${fontName}.css`);
  const stylesCSSPath = path.resolve("styles", `${fontName}.css`);
  const cssLines = fs
    .readFileSync(fontsCSSPath, { encoding: "utf-8" })
    .replaceAll(new RegExp(`(url\\(['"])(${fontName})`, "g"), `$1../fonts/$2`)
    .replace(`format('truetype'),`, `format('truetype');`)
    .split("\n");
  cssLines.splice(2,2);
  cssLines.splice(5,1);
  cssLines[2] = `  src:` + cssLines[2].slice(1);
  fs.writeFileSync(stylesCSSPath, cssLines.join("\n"));
  fs.rmSync(fontsCSSPath);
  fs.rmSync(path.resolve("fonts", "game-icons.net.svg"))
  fs.rmSync(path.resolve("fonts", "game-icons.net.symbol.svg"))
  fs.cpSync(path.resolve(fontDir, "icons/license.txt"), path.resolve("licenses", "LICENSE.game-icons.net.txt"));
  fs.rmSync(fontDir, { recursive: true });
  return `styles/${fontName}.css`;
}
