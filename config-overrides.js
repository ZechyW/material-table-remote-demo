/**
 * Workaround for https://github.com/facebook/create-react-app/issues/10154
 */

const fs = require("fs");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (webpackConfig) => {
  webpackConfig.plugins = webpackConfig.plugins.filter(
    (plugin) => !(plugin.options && "eslintPath" in plugin.options)
  );

  webpackConfig.plugins.unshift(
    new ESLintPlugin({
      // Plugin options
      extensions: ["js", "mjs", "jsx", "ts", "tsx"],
      formatter: require.resolve("react-dev-utils/eslintFormatter"),
      eslintPath: require.resolve("eslint"),
      context: "./src",
      cache: true,

      // Setting threads to false boost compiling speed back to previous levels
      threads: false,

      // ESLint class options
      cwd: fs.realpathSync(process.cwd()),
      resolvePluginsRelativeTo: __dirname,
      baseConfig: {
        extends: [require.resolve("eslint-config-react-app/base")],
        rules: {
          "react/react-in-jsx-scope": "error",
        },
      },
    })
  );

  return webpackConfig;
};
