const path = require("path");

const buildEslintCommand = (filenames) =>
  `npx eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

const buildTypeCheckCommand = () => "tsc --noEmit -p tsconfig.json";

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "npx prettier --write",
    buildEslintCommand,
    buildTypeCheckCommand,
  ],
};
