const path = require("path");

module.exports = {
  target: "serverless",
  webpack(config, { dev }) {
    config.resolve.alias["@"] = path.resolve(__dirname, "./src");
    if (dev) {
      config.module.rules.push({
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        enforce: "pre",
        options: {
          emitWarning: true,
        },
      });
      config.module.rules.push({
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "stylelint-custom-processor-loader",
        options: {
          emitWarning: true,
        },
      });
    }
    return config;
  },
};
