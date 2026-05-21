const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("sql");
config.resolver.assetExts.push("wasm");

const signalrBrowserBundle = path.resolve(
  __dirname,
  "node_modules/@microsoft/signalr/dist/browser/signalr.js",
);
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === "web" && moduleName === "@microsoft/signalr") {
    return { type: "sourceFile", filePath: signalrBrowserBundle };
  }
  return originalResolveRequest
    ? originalResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
