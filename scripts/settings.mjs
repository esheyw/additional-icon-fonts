import { MODULE_ID } from "./config.mjs";
import { processFont } from "./init.mjs";
export const SETTINGS = {
  materialdesign: {
    type: Boolean,
    default: true,
    config: true,
    name: "AdditionalIconFonts.Setting.Materialdesign.Name",
    hint: "AdditionalIconFonts.Setting.Materialdesign.HintBasic",
    scope: "world",
    onChange: () => processFont("materialdesign")
  },
  boxicons: {
    type: Boolean,
    default: false,
    config: true,
    name: "AdditionalIconFonts.Setting.Boxicons.Name",
    hint: "AdditionalIconFonts.Setting.Boxicons.HintBasic",
    scope: "world",
    onChange: () => processFont("boxicons")
  },
  jamicons: {
    type: Boolean,
    default: false,
    config: true,
    name: "AdditionalIconFonts.Setting.Jamicons.Name",
    hint: "AdditionalIconFonts.Setting.Jamicons.HintBasic",
    scope: "world",
    onChange: () => processFont("jamicons")
  },
  "game-icons.net": {
    type: Boolean,
    default: false,
    config: true,
    name: "AdditionalIconFonts.Setting.GameIconsnet.Name",
    hint: "AdditionalIconFonts.Setting.GameIconsnet.HintBasic",
    scope: "world",
    onChange: () => processFont("game-icons.net")
  },
};
export function registerSettings() {
  for (const [key, data] of Object.entries(SETTINGS)) {
    game.settings.register(MODULE_ID, key, data);
  }
}
