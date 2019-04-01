const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const alias = {
  components: resolveApp("src/components"),
  utils: resolveApp("src/utils"),
  stores: resolveApp("src/stores"),
  public: resolveApp("public")
};

module.exports = {
  alias: alias,
  appSrc: resolveApp("src"),
  appNodeModules: resolveApp("node_modules"),
  appDist: resolveApp("dist")
};
