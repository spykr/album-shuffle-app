const path = require("path");

module.exports = {
  target: "serverless",
  webpack: (config) => {
    if (!process.env.BUNDLE_AWS_SDK) {
      config.externals = config.externals || [];
      config.externals.push({ "aws-sdk": "aws-sdk" });
    } else {
      console.warn("Bundling aws-sdk. Only doing this in development mode");
    }

    config.resolve.alias["@"] = path.resolve(__dirname, "./src");
    return config;
  },
  env: {
    SMTP_PASS: process.env.SMTP_PASS,
  },
};
