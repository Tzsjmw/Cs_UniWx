"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_ruoyi = require("../../utils/ruoyi.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref(true);
    common_vendor.ref(false);
    function acc() {
      common_vendor.index.showModal({
        title: "通知权限",
        content: "请授权通知管理，用于给您及时传达消息",
        success: function(res) {
          if (res.confirm) {
            console.log("点击了确认");
            btnclick();
          } else {
            console.log("点击了取消");
          }
        }
      });
    }
    function btnclick() {
      if (common_vendor.wx$1.requestSubscribeMessage) {
        common_vendor.wx$1.requestSubscribeMessage({
          tmplIds: ["订阅消息模板id"],
          success(res) {
            if (res["订阅消息模板id"] == "accept") {
              console.log("用户订阅成功");
            } else if (res["订阅消息模板id"] == "reject") {
              console.log("用户拒绝订阅");
            }
          },
          fail(err) {
            console.error("订阅请求失败:", err);
          }
        });
      } else {
        console.error("此平台不支持订阅");
      }
    }
    async function btnSubscription() {
      let code = null;
      let accessToken = null;
      let openid = null;
      let time = utils_ruoyi.parseTime(/* @__PURE__ */ new Date());
      try {
        code = await getLoginCode();
        if (code) {
          openid = await requestOpenID(code);
          console.log("User OpenID:", openid);
        }
        accessToken = await requestAccessToken();
        console.log("Access Token:", accessToken);
      } catch (error) {
        console.error("errorerror", error);
      }
      common_vendor.index.request({
        url: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=" + accessToken,
        method: "POST",
        data: {
          touser: openid,
          template_id: "订阅消息模板id",
          page: "pages/index/index",
          data: {
            thing1: {
              value: "天津粮油微信小程序订阅通知"
            },
            thing2: {
              value: "该服务是天津粮油的通知，请务必订阅"
            },
            name3: {
              value: "港迪一号"
            },
            date4: {
              value: time
            },
            thing5: {
              value: "港迪"
            }
          }
        },
        success: (res) => {
          console.log("发送成功", res);
        }
      });
    }
    const getLoginCode = () => {
      return new Promise((resolve, reject) => {
        common_vendor.wx$1.login({
          success: (res) => {
            if (res.code) {
              resolve(res.code);
            } else {
              reject("Failed to obtain login code");
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    };
    const requestOpenID = (code) => {
      return new Promise((resolve, reject) => {
        common_vendor.wx$1.request({
          url: "https://api.weixin.qq.com/sns/jscode2session",
          data: {
            appid: "微信小程序APPID",
            secret: "小程序密钥",
            js_code: code,
            grant_type: "authorization_code"
          },
          success: (res) => {
            console.log("resres", res);
            if (res.data.openid) {
              resolve(res.data.openid);
            } else {
              reject("Failed to obtain user OpenID");
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    };
    const requestAccessToken = () => {
      return new Promise((resolve, reject) => {
        common_vendor.wx$1.request({
          url: "https://api.weixin.qq.com/cgi-bin/token",
          data: {
            appid: "微信小程序APPID",
            secret: "小程序密钥",
            grant_type: "client_credential"
          },
          success: (res) => {
            if (res.data.access_token) {
              resolve(res.data.access_token);
            } else {
              reject("Failed to obtain Access Token");
            }
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    };
    acc();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(btnSubscription)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/代码文件/Cs_UniWx/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
