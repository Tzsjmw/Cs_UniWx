"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("目的地");
    const destinationLatitude = common_vendor.ref(null);
    const destinationLongitude = common_vendor.ref(null);
    function nav(latitude, longitude, destination) {
      common_vendor.index.openLocation({
        latitude,
        longitude,
        name: destination,
        // Use the provided destination name
        scale: 15,
        address: destination,
        success: function(res) {
          common_vendor.index.showToast({
            title: "打开地图成功",
            icon: "success"
          });
        },
        fail: function(error) {
          common_vendor.index.showToast({
            title: "打开地图失败",
            icon: "none"
          });
        }
      });
    }
    function navigateToDestination() {
      common_vendor.index.chooseLocation({
        success: function(res) {
          destinationLatitude.value = res.latitude;
          destinationLongitude.value = res.longitude;
          common_vendor.index.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            name: res.name,
            scale: 15,
            address: res.address,
            success: function() {
              common_vendor.index.showToast({
                title: "打开地图成功",
                icon: "success"
              });
            },
            fail: function() {
              common_vendor.index.showToast({
                title: "打开地图失败",
                icon: "none"
              });
            }
          });
        },
        fail: function() {
          common_vendor.index.showToast({
            title: "选择位置失败",
            icon: "none"
          });
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateToDestination),
        b: common_vendor.t(destinationLongitude.value),
        c: common_vendor.t(destinationLatitude.value),
        d: common_vendor.o(($event) => nav(32.088169, 118.74247, "南京南站")),
        e: common_vendor.o(($event) => nav(39.9658, 119.592224, "秦皇岛")),
        f: common_vendor.o(($event) => nav(25.69547, 100.1655, "大理古城"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/代码文件/Cs_UniWx/pages/map/index.vue"]]);
wx.createPage(MiniProgramPage);
