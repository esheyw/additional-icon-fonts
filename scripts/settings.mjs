import { MODULE_ID } from "./config.mjs";
export const SETTINGS = {
  materialdesign: {
    type: Boolean,
    default: true,
    config: true,
    name: "AdditionalIconFonts.Setting.Materialdesign.Name",
    hint: "AdditionalIconFonts.Setting.Materialdesign.HintBasic",
    scope: "world",
    requiresReload: true,
  },
  boxicons: {
    type: Boolean,
    default: false,
    config: true,
    name: "AdditionalIconFonts.Setting.Boxicons.Name",
    hint: "AdditionalIconFonts.Setting.Boxicons.HintBasic",
    scope: "world",
    requiresReload: true,
  },
  jamicons: {
    type: Boolean,
    default: false,
    config: true,
    name: "AdditionalIconFonts.Setting.Jamicons.Name",
    hint: "AdditionalIconFonts.Setting.Jamicons.HintBasic",
    scope: "world",
    requiresReload: true,
  },
  "game-icons.net": {
    type: Boolean,
    default: false,
    config: true,
    name: "AdditionalIconFonts.Setting.GameIconsnet.Name",
    hint: "AdditionalIconFonts.Setting.GameIconsnet.HintBasic",
    scope: "world",
    requiresReload: true,
  },
};
export function registerSettings() {
  for (const [key, data] of Object.entries(SETTINGS)) {
    game.settings.register(MODULE_ID, key, data);
  }
}
