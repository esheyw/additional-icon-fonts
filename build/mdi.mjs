import * as fs from 'fs';
import * as path from 'path';

export function mdiHandler(fontDir) {
  console.log('Shifting Material Design Icons from node_modules to module distribution folders.');
  const cssFileName = `materialdesignicons.min.css`;
  const mapFileName = `${cssFileName}.map`;
  const nodeRoot = `node_modules/@mdi/font`;
  const existingCSSPath = path.resolve(nodeRoot, 'css/', cssFileName);
  const targetCSSPath = path.resolve('styles', cssFileName);
  fs.cpSync(existingCSSPath, targetCSSPath)
  // const cssContents = fs.readFileSync(existingCSSPath, { encoding: 'utf-8' }).replaceAll(`../fonts`, `styles`);
  // fs.writeFileSync(targetCSSPath, cssContents);
  fs.cpSync(path.resolve(nodeRoot, 'css', mapFileName), path.resolve('styles', mapFileName));
  const fontFiles = fs.readdirSync(path.resolve(nodeRoot, 'fonts'));
  for (const fontFile of fontFiles) {
    fs.cpSync(path.resolve(nodeRoot, 'fonts', fontFile), path.resolve('fonts', fontFile));
  }
  fs.cpSync(path.resolve(nodeRoot, 'LICENSE'), path.resolve('licenses', 'LICENSE.materialdesignicons.txt'));
  console.log('Done.');
  return `styles/${cssFileName}`;
}
