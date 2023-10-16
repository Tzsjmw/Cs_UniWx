"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_ruoyi = require("../../utils/ruoyi.js");
const _sfc_main = {
  __name: "log",
  setup(__props) {
    const logs = common_vendor.ref([]);
    function loadLogs() {
      const storedLogs = common_vendor.index.getStorageSync("logs") || [];
      logs.value = storedLogs.map((log) => {
        return {
          date: utils_ruoyi.parseTime(new Date(log), "{y}-{m}-{d} {h}:{i}:{s}"),
          timeStamp: log
        };
      });
    }
    function delrecord() {
      common_vendor.index.removeStorageSync("logs");
      logs.value = [];
    }
    loadLogs();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(logs.value, (log, index, i0) => {
          return {
            a: common_vendor.t(index),
            b: common_vendor.t(log.date),
            c: index
          };
        }),
        b: common_vendor.o(delrecord)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/代码文件/Cs_UniWx/pages/home/log.vue"]]);
wx.createPage(MiniProgramPage);
