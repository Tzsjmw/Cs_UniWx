<template>
	<view class="content">
		<view class="userinfo-avatar" @click="bindViewTap">
			<image :src="userAvatar" />
		</view>
		<text>{{ userNickName }}</text>
		<view>
			手机版本:{{phoneVersion}}
		</view>
		<!-- 		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="login-but">获取手机号</button>
		<view>
			手机号:{{phonenumber}}
		</view> -->


	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	const userAvatar = ref(null);
	const userNickName = ref(null);
	const phoneVersion = ref(null)
	const phonenumber = ref(null)

	function bindViewTap() {
		uni.navigateTo({
			url: '/pages/home/log'
		});
	}

	onMounted(() => {
		uni.getUserInfo({
			success: (res) => {
				userAvatar.value = res.userInfo.avatarUrl;
				userNickName.value = res.userInfo.nickName;
			},
			fail: (err) => {
				console.error('Failed to get user information', err);
			},
		});

		getPhoneVersion()
	});



	function getPhoneVersion() {
		uni.getSystemInfo({
			success: (res) => {
				phoneVersion.value = res.system;
				console.log('Phone Version:', phoneVersion.value);
			},
			fail: (error) => {
				console.error('Failed to get phone version:', error);
			},
		});
	}

	function getUserProfile() {
		let that = null
		uni.getUserProfile({
			desc: "用于完善用户信息",
			success: (res1) => {
				that = res1.userInfo;
				console.log(res1)
				uni.showToast({
					icon: "none",
					title: '获取成功'
				})
			},
			fail: (err) => {
				console.log(err)
				uni.showToast({
					icon: "none",
					title: '用户拒绝获取'
				})
			}
		})
	}

	function getPhoneNumber(e) {
		console.log(e.detail)
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.userinfo-avatar {
		overflow: hidden;
		width: 128rpx;
		height: 128rpx;
		margin: 20rpx;
		border-radius: 50%;
	}
</style>