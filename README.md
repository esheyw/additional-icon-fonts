# Additional Icon Fonts

The successor module to [game-icons.net font](https://github.com/esheyw/game-icons-net-font). Now with 400% more fonts!

## Fonts

This module provides several FontAwesome-like icon fonts for use with FoundryVTT.

### game-icons.net

[Homepage/list of icons](https://game-icons.net/)  
Prefix: `ginf-`  
Usage: icon class only:

```html
<i class="ginf-abstract-001"></i>
```

No extra classes required or provided.

### Material Design icons by Pictogrammers

[Homepage](https://pictogrammers.com/)  
[List of icons](https://pictogrammers.com/library/mdi/)  
Prefix: `mdi-`  
Usage: domain class + icon class + optional modifiers:

```html
// basic
<i class="mdi mdi-cable-data"></i>
// flipped
<i class="mdi mdi-cable-data mdi-flip-h"></i>
```

[Further Documentation](https://pictogrammers.com/docs/library/mdi/getting-started/webfont/#basic-example), including flip, rotate, and spin options.

### Jam Icons

[Homepage/list of icons](https://jam-icons.com/)  
Prefix: `jam-`  
Usage: icon class only

```html
// basic
<i class="jam-"></i>
```

### boxicons

[Homepage/list of icons](https://boxicons.com/)  
Prefixes: `bx-` (regular), `bxs-` (solid), `bxl-` (light)  
Useage: domain class + icon class + optional modifiers:

```html
// basic, solid
<i class="bx bxs-like"></i>
// flipped, large, spinning
<i class="bx bx-flip-horizontal bx-like bx-lg"></i>
```

[Further Documentation](https://boxicons.com/usage#styling) including flip, rotate, fixed-with, size, and animation options.

## SVGs

I have chosen *not* to ship with the raw SVG files for any of these icon sets, they are all freely available for download from links found in this readme if you need them.

## Known Issues

Right now the module is an almost 30mb download, and a large part of that is potentially redundant font files. Unfortunately I'm relying on the output of the `svgtofont` NPM package, and don't have enough real-world CSS knowledge to know what I can safely remove. If anyone would like to educate me on the subject, I would welcome that, else it'll be a research topic for when I have some free time eventually.

## Licences

The module code that generates the fonts for game-icons and jam and organizes things is by me, released under the [MIT License](https://opensource.org/licenses/MIT), found in the code as `LICENSE`  

The licenses provided with each icon set can be found in the `licences/` folder with only the file names altered.

- game-icons.net icons are released under the [CC-BY-3.0 License](http://creativecommons.org/licenses/by/3.0/) as noted on their [homepage](https://game-icons.net/)
- Jam Icons are released under the [MIT License](https://opensource.org/licenses/MIT) as found [here](https://github.com/michaelampr/jam/blob/master/LICENSE)
- Material Design icons are covered by the [Pictogrammers Free License](https://pictogrammers.com/docs/general/license/), which boils down to [Apache 2.0]((https://www.apache.org/licenses/LICENSE-2.0)) for the font files and the [MIT License](https://opensource.org/licenses/MIT) for the css file.
- boxicons are released under the [MIT License](https://opensource.org/licenses/MIT) as found [https://boxicons.com/usage#license](https://boxicons.com/usage#license)
