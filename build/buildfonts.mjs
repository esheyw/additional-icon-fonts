import * as fs from 'fs';
import * as path from 'path';
import { cleanDirectory } from './util.mjs';
import { gameiconsHandler } from './game-icons.net.mjs';
import { jamIconsHandler } from './jamicons.mjs';
import { boxiconsHandler } from './boxicons.mjs';
import { mdiHandler } from './mdi.mjs';
const fonts = [
  {
    id: 'game-icons.net',
    handler: gameiconsHandler,
  },
  {
    id: 'jamicons',
    handler: jamIconsHandler,
  },
  {
    id: 'boxicons',
    handler: boxiconsHandler,
  },
  {
    id: 'materialdesign',
    handler: mdiHandler
  }
];
cleanDirectory(['styles','fonts']);
const styles = [];
for (const font of fonts) {
  const fontDir = path.resolve('.', font.id);  
  styles.push(await font.handler(fontDir));
}
if (process.stdout?.cursorTo) process.stdout.write('Tidying unnessary artefacts...');
const toDelete = fs.globSync('fonts/*.{styl,scss,less}');
console.log(toDelete);
for (const file of toDelete) {
  fs.rmSync(file);
}
if (process.stdout?.cursorTo) process.stdout.write(' Done!\n');
// console.log('Updating manifest...');
// const manifest = JSON.parse(fs.readFileSync('module.json', 'utf-8'));
// manifest.styles = styles;
// fs.writeFileSync('module.json', JSON.stringify(manifest, null, 2));
// console.log('Updated.');
