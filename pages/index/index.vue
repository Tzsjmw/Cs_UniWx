<template>
	<view class="content">
		<image class="logo" src="/static/guide1.png"></image>
		<!-- 		<view class="text-area">
			<button class="title" @click="btnclick">订阅消息</button>
		</view> -->
		<view class="text-area">
			<button class="title" @click="btnSubscription">发送订阅消息</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { parseTime } from "../../utils/ruoyi";

	const show = ref(true)
	const showModal = ref(false);

	function close() {
		show.value = false
	}


	function acc() {
		uni.showModal({
			title: '通知权限',
			content: '请授权通知管理，用于给您及时传达消息',
			success: function(res) {
				if (res.confirm) {
					console.log('点击了确认')
					btnclick()
				} else {
					console.log('点击了取消')
				}
			}
		})
	}


	function btnclick() {
		if (wx.requestSubscribeMessage) {
			wx.requestSubscribeMessage({
				tmplIds: ['订阅消息模板id'],
				success(res) {
					if (res['订阅消息模板id'] == 'accept') {
						console.log('用户订阅成功');
						// btnSubscription()
					} else if (res['订阅消息模板id'] == 'reject') {
						console.log('用户拒绝订阅');
					}
				},
				fail(err) {
					console.error('订阅请求失败:', err);
				}
			});
		} else {
			console.error('此平台不支持订阅');
		}
	}

	async function btnSubscription() {
		let code = null;
		let accessToken = null;
		let openid = null;
		let time = parseTime(new Date())

		try {
			code = await getLoginCode();
			if (code) {
				openid = await requestOpenID(code);
				console.log('User OpenID:', openid);
			}
			accessToken = await requestAccessToken();
			console.log('Access Token:', accessToken);
		} catch (error) {
			console.error('errorerror', error);
		}
		uni.request({
			url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' +
				accessToken,
			method: 'POST',
			data: {
				touser: openid,
				template_id: '订阅消息模板id',
				page: "pages/index/index",
				data: {
					thing1: {
						value: '天津粮油微信小程序订阅通知'
					},
					thing2: {
						value: '该服务是天津粮油的通知，请务必订阅'
					},
					name3: {
						value: '港迪一号'
					},
					date4: {
						value: time
					},
					thing5: {
						value: '港迪'
					}
				}
			},
			success: (res) => {
				console.log("发送成功", res);
			}
		})
	}

	const getLoginCode = () => {
		return new Promise((resolve, reject) => {
			wx.login({
				success: (res) => {
					if (res.code) {
						resolve(res.code);
					} else {
						reject('Failed to obtain login code');
					}
				},
				fail: (err) => {
					reject(err);
				},
			});
		});
	};

	const requestOpenID = (code) => {
		return new Promise((resolve, reject) => {
			wx.request({
				url: 'https://api.weixin.qq.com/sns/jscode2session',
				data: {
					appid: '微信小程序APPID',
					secret: '小程序密钥',
					js_code: code,
					grant_type: 'authorization_code',
				},
				success: (res) => {
					console.log('resres', res);
					if (res.data.openid) {
						resolve(res.data.openid);
					} else {
						reject('Failed to obtain user OpenID');
					}
				},
				fail: (err) => {
					reject(err);
				},
			});
		});
	};

	const requestAccessToken = () => {
		return new Promise((resolve, reject) => {
			wx.request({
				url: 'https://api.weixin.qq.com/cgi-bin/token',
				data: {
					appid: '微信小程序APPID',
					secret: '小程序密钥',
					grant_type: 'client_credential',
				},
				success: (res) => {
					if (res.data.access_token) {
						resolve(res.data.access_token);
					} else {
						reject('Failed to obtain Access Token');
					}
				},
				fail: (err) => {
					reject(err);
				},
			});
		});
	};


	acc()
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 600rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>