const { override, addWebpackAlias, addBabelPlugins } = require("customize-cra");

module.exports = override(
  ...addBabelPlugins(
    "react-hot-loader/babel",
    "babel-plugin-styled-components",
    "@babel/plugin-proposal-optional-chaining",
  ),
  addWebpackAlias({
    "react-dom": "@hot-loader/react-dom",
  }),
);
