module.exports = {
  presets: ["next/babel"],
  plugins: [
    ["styled-components", { ssr: true }],
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ],
};
