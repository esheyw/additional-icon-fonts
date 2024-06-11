import { FONTS, MODULE_ID } from "./config.mjs";
import { SETTINGS, registerSettings } from "./settings.mjs";

Hooks.once("i18nInit", () => {
  const mhl = game.modules.get("macro-helper-library")?.api;
  if (mhl) {
    for (const setting in SETTINGS) {
      SETTINGS[setting].hint = null; // use the enrichable hint
    }
    new mhl.util.MHLSettingsManager(MODULE_ID, { settings: SETTINGS });
  } else {
    registerSettings();
  }
});

Hooks.once("setup", () => {
  const mhl = game.modules.get("macro-helper-library")?.api;
  for (const font of FONTS) {
    const enabled = setting(font.name);
    if (!enabled) continue;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    if (mhl) {
      link.onload = function () {
        CONFIG.MHL.iconFonts.push(font);
      };
    }
    link.href = font.file;
    document.head.appendChild(link);
  }
});

function setting(key) {
  const mhl = game.modules.get("macro-helper-library")?.api;
  if (mhl) {
    return mhl.util.MHLSettingsManager.managers.get(MODULE_ID).get(key);
  } else {
    return game.settings.get(MODULE_ID, key);
  }
}
