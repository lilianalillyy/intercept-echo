const encore = require("@symfony/webpack-encore");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config()

encore
  .configureRuntimeEnvironment(
    ["dev", "development"].includes(process.env.NODE_ENV) ? "dev" : "production"
  )
  .setOutputPath(path.join(__dirname, "src", "static", "build"))
  .setPublicPath("/_static/build")
  .setManifestKeyPrefix("/_static/build")
  .disableSingleRuntimeChunk()
  .addEntry("poc", path.join(__dirname, "poc", "index.tsx"))
  .enablePostCssLoader()
  .enableSassLoader()
  .enableReactPreset()
  .enableSourceMaps()
  .addAliases({
    "@": path.resolve(__dirname, "client-v13"),
  })
  .enableBabelTypeScriptPreset();

module.exports = encore.getWebpackConfig();