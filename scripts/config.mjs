export const MODULE_ID = `additional-icon-fonts`;
export const FONTS = [
  {
    name: "materialdesign",
    file: `modules/${MODULE_ID}/styles/materialdesignicons.min.css`,
    prefixes: ["mdi-"],
    schema: {
      domain: {
        required: true,
        value: "mdi",
        default: "mdi",
      },
      rotate: {
        choices: ["rotate-45", "rotate-90", "rotate-135", "rotate-180", "rotate-225", "rotate-270", "rotate-315"],
        precludes: "flip",
      },
      flip: {
        choices: ["flip-h", "flip-v"],
        precludes: "rotate",
      },
      spin: {
        value: "spin",
      },
    },
  },
  {
    name: "boxicons",
    file: `modules/${MODULE_ID}/styles/boxicons.min.css`,
    prefixes: ["bx-", "bxs-", "bxl-"],
    schema: {
      domain: {
        required: true,
        value: "bx",
        default: "bx",
      },
      fw: {
        prefixes: ["bx-"],
        pattern: "fw",
      },
      size: {
        prefixes: ["bx-"],
        choices: ["xs", "sm", "md", "lg"],
      },
      flip: {
        prefixes: ["bx-"],
        prefixes: ["bx-"],
        precludes: "rotate",
        choices: ["flip-horizontal", "flip-vertical"],
      },
      rotate: {
        prefixes: ["bx-"],
        precludes: "flip",
        choices: ["rotate-90", "rotate-180", "rotate-270"],
      },
      border: {
        prefixes: ["bx-"],
        choices: ["border", "border-circle"],
      },
      animation: {
        prefixes: ["bx-"],
        choices: ["spin", "tada", "flashing", "burst", "fade-left", "fade-right", "fade-up", "fade-down"],
      },
      hover: {
        prefixes: ["bx-"],
        choices: ["spin", "tada", "flashing", "burst", "fade-left", "fade-right", "fade-up", "fade-down"],
      },
    },
  },
  {
    name: "jamicons",
    file: `modules/${MODULE_ID}/styles/jamicons.css`,
    prefixes: ["jam-"],
  },
  {
    name: "game-icons.net",
    file: `modules/${MODULE_ID}/styles/game-icons.net.css`,
    prefixes: ["ginf-"],
  },
];
