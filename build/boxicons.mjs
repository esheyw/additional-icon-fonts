import * as fs from 'fs';
import * as path from 'path';

export function boxiconsHandler(fontDir) {
  console.log('Shifting boxicons from node_modules to module distribution folders.');
  const cssFileName = `boxicons.min.css`;
  const nodeRoot = `node_modules/boxicons`;
  const existingCSSPath = path.resolve(nodeRoot, 'css/', cssFileName);
  const targetCSSPath = path.resolve('styles', cssFileName);
  fs.cpSync(existingCSSPath, targetCSSPath)
  const fontFiles = fs.readdirSync(path.resolve(nodeRoot, 'fonts'));
  for (const fontFile of fontFiles) {
    fs.cpSync(path.resolve(nodeRoot, 'fonts', fontFile), path.resolve('fonts', fontFile));
  }
  fs.cpSync(path.resolve(nodeRoot, 'LICENSE'), path.resolve('licenses', 'LICENSE.boxicons.txt'));
  console.log('Done.');
  return `styles/${cssFileName}`;
}
