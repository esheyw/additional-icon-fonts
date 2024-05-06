import * as fs from 'fs'
import * as path from 'path';
import svgtofont from 'svgtofont';
import { download, unzipDirectory, cleanDirectory } from './util.mjs';

export async function jamIconsHandler(fontDir) {
  cleanDirectory(fontDir);
  console.log('Generating Jam Icons Font.');
  const lastVersion = `3.1.0`;
  const relaseURL = `https://github.com/michaelampr/jam/archive/refs/tags/${lastVersion}.zip`;
  console.log('Downloading last known release...');
  const zipFileName = await download(relaseURL, fontDir);
  console.log('Downloaded. Unzipping...');
  await unzipDirectory(zipFileName);
  console.log('Unzipped');
  const fontName = 'jamicons';
  await svgtofont({
    src: path.resolve(fontDir, `jam-${lastVersion}/icons`), // svg path
    dist: 'fonts', // output path
    fontName, // font name
    css: true, // Create CSS files.
    emptyDist: false,
    classNamePrefix: 'jam',
  });
  const fontsCSSPath = path.resolve('fonts', `${fontName}.css`);
  const stylesCSSPath = path.resolve('styles', `${fontName}.css`);
  const cssContent = fs.readFileSync(fontsCSSPath, {encoding:'utf-8'}).replaceAll(new RegExp(`(url\\(['"])(${fontName})`, 'g'),`$1../fonts/$2`);
  fs.writeFileSync(stylesCSSPath, cssContent)
  fs.rmSync(fontsCSSPath);
  fs.cpSync(path.resolve(fontDir, `jam-${lastVersion}`, 'LICENSE'), path.resolve('licenses', 'LICENSE.jamicons.txt'))
  fs.rmSync(fontDir, { recursive: true });
  return `${fontName}.css`;
}
