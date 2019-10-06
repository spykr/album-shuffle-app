const path = require("path");

module.exports = {
  target: "serverless",
  webpack(config, options) {
    config.resolve.alias["@"] = path.resolve(__dirname, "./src");
    return config;
  },
};
