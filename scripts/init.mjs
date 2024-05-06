import { MODULE_ID } from "./constants.mjs";
const MODULE = () => game.modules.get(MODULE_ID);
const MHL = () => game.modules.get("pf2e-macro-helper-library").api;

Hooks.once("init", () => {
  const { MHLSettingsManager } = MHL().classes.MHLSettingsManager;
  const mod = MODULE();
  mod.settingsManager = new MHLSettingsManager(MODULE_ID);
});
Hooks.once("i18nInit", () => {});
Hooks.once("setup", () => {});
Hooks.once("ready", () => {});
