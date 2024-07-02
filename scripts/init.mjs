import { FONTS, MODULE_ID } from "./config.mjs";
import { SETTINGS, registerSettings } from "./settings.mjs";
export const MHL = () => game.modules.get("macro-helper-library")?.api;

Hooks.once("i18nInit", () => {
  const mhl = MHL();
  if (mhl) {
    for (const setting in SETTINGS) {
      SETTINGS[setting].hint = true; // use the enrichable hint
    }
    new mhl.util.MHLSettingsManager(MODULE_ID, { settings: SETTINGS });
  } else {
    registerSettings();
  }
});

Hooks.once("setup", () => {
  for (const font of FONTS) {
    processFont(font.name);
  }
});

function setting(key) {
  const mhl = MHL();
  if (mhl) {
    return mhl.util.MHLSettingsManager.managers.get(MODULE_ID).get(key);
  } else {
    return game.settings.get(MODULE_ID, key);
  }
}

export function processFont(fontName) {
  const enabled = setting(fontName);
  const mhl = MHL();
  if (enabled) {
    const font = FONTS.find((f) => f.name === fontName);
    const link = document.createElement("link");
    link.dataset.fontName = fontName;
    link.rel = "stylesheet";
    link.type = "text/css";
    if (mhl) {
      link.onload = function () {
        CONFIG.MHL.iconFonts.push(font);
      };
    }
    link.href = font.file;
    document.head.appendChild(link);
  } else {
    const link = document.head.querySelector(`[data-font-name="${fontName}"]`);
    if (link) link.remove();
    if (mhl) {
      const iconFontEntry = CONFIG.MHL.iconFonts.find((f) => f.name === fontName);
      if (iconFontEntry) CONFIG.MHL.iconFonts.findSplice((e) => e === iconFontEntry);
    }
  }
}
