import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as stream from 'stream';
import AdmZip from 'adm-zip';
export function unzipDirectory(inputFilePath, outputDirectory = null) {
  const zip = new AdmZip(inputFilePath);
  outputDirectory ??= path.dirname(inputFilePath);
  try {
    zip.extractAllTo(outputDirectory, true);
  } catch (error) {
    console.log(error);
    return null;
  }
  console.log(`Extracted to "${outputDirectory}" successfully`);
  return outputDirectory;
}
export function validateURL(url) {
  let validURL;
  try {
    validURL = new URL(url);
  } catch (error) {
    console.error(error);
    return null;
  }
  return validURL;
}
export async function download(url, targetPrefix = '.', { includePath = false } = {}) {
  let response;
  const validURL = validateURL(url);
  if (validURL === null) return null;
  const targetDir = path.resolve(targetPrefix, includePath ? '.' + path.dirname(validURL.pathname) : '');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
  const targetPath = path.resolve(targetDir, path.basename(validURL.pathname));
  if (fs.existsSync(targetPath)) {
    console.error(`Target file ${targetPath} already exists, skipping.`);
    return targetPath;
  }
  try {
    response = await fetch(validURL.href);
  } catch (error) {
    console.error(error);
    return null;
  }
  const body = stream.Readable.fromWeb(response.body);

  const writeStream = fs.createWriteStream(targetPath);
  await stream.promises.finished(body.pipe(writeStream));
  return targetPath;
}

export function cleanDirectory(dirs) {
  if (!Array.isArray(dirs)) dirs = [dirs];
  dirs = dirs.filter(e => !!e).map(e => String(e));
  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      const filesToClean = fs.readdirSync(dir).map(f => path.resolve(dir, f));
      for (const file of filesToClean) {
        fs.rmSync(file, { recursive: true });
      }
    } else {
      fs.mkdirSync(dir);
    }
  }
}
