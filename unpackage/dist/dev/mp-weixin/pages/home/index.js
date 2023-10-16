"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userAvatar = common_vendor.ref(null);
    const userNickName = common_vendor.ref(null);
    const phoneVersion = common_vendor.ref(null);
    common_vendor.ref(null);
    function bindViewTap() {
      common_vendor.index.navigateTo({
        url: "/pages/home/log"
      });
    }
    common_vendor.onMounted(() => {
      common_vendor.index.getUserInfo({
        success: (res) => {
          userAvatar.value = res.userInfo.avatarUrl;
          userNickName.value = res.userInfo.nickName;
        },
        fail: (err) => {
          console.error("Failed to get user information", err);
        }
      });
      getPhoneVersion();
    });
    function getPhoneVersion() {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          phoneVersion.value = res.system;
          console.log("Phone Version:", phoneVersion.value);
        },
        fail: (error) => {
          console.error("Failed to get phone version:", error);
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: userAvatar.value,
        b: common_vendor.o(bindViewTap),
        c: common_vendor.t(userNickName.value),
        d: common_vendor.t(phoneVersion.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/代码文件/Cs_UniWx/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
