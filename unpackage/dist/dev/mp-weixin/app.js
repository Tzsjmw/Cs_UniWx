"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/test/index.js";
  "./pages/home/index.js";
  "./pages/home/log.js";
  "./pages/map/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    const logs = common_vendor.wx$1.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    common_vendor.wx$1.setStorageSync("logs", logs);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/代码文件/Cs_UniWx/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
