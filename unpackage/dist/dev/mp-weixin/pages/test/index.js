"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const src = common_vendor.ref(common_vendor.ref);
    common_vendor.ref(null);
    function btnclick() {
      common_vendor.wx$1.chooseMessageFile({
        type: "file",
        success: function(res) {
          if (res.tempFiles.length > 0) {
            const filePath = res.tempFiles[0].path;
            common_vendor.wx$1.getFileSystemManager().readFile({
              filePath,
              encoding: "utf8",
              success: function(data) {
                console.log("文件内容:", data.data);
              },
              fail: function(error) {
                console.error("读取文件失败:", error);
              }
            });
          }
        },
        fail: function(error) {
          console.error("选择文件失败:", error);
        }
      });
    }
    function btnimg() {
      common_vendor.index.chooseImage({
        count: 9,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"],
        //从相册选择
        success: function(res) {
          src.value = res.tempFilePath;
          console.log("图片路径", src.value);
        }
      });
    }
    function btnmv() {
      common_vendor.index.chooseVideo({
        sourceType: ["camera", "album"],
        success: function(res) {
          src.value = res.tempFilePath;
          console.log("视频路径", src.value);
        }
      });
    }
    function btnimgmv() {
      common_vendor.index.chooseVideo({
        sourceType: ["camera", "album"],
        success: function(res) {
          src.value = res.tempFilePath;
          console.log("视频/照片路径", src.value);
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(btnclick),
        b: common_vendor.o(btnimg),
        c: common_vendor.o(btnmv),
        d: common_vendor.o(btnimgmv)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/代码文件/Cs_UniWx/pages/test/index.vue"]]);
wx.createPage(MiniProgramPage);
