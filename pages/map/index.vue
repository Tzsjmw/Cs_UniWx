<template>
	<view class="content">
		<view class="acc">
			根据选择的导航，显示目前经纬度，并且调用导航
			<button type="primary" @click="navigateToDestination">导航到目的地</button>
			<view class="result">
				<p>目的地经度: {{ destinationLongitude }}</p>
				<p>目的地纬度: {{ destinationLatitude }}</p>
			</view>
		</view>

		<view>
			以下三个是固定经纬度直接导航
			<button type="primary" @click="nav(32.088169, 118.74247, '南京南站')" class="acc">导航到南京南站</button>
			<button type="default" @click="nav(39.9658, 119.592224, '秦皇岛')" class="acc">导航到秦皇岛</button>
			<button type="warn" @click="nav(25.69547, 100.1655, '大理古城')" class="acc">导航到大理古城</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from "vue";

	const name = ref("目的地");
	const destinationLatitude = ref(null);
	const destinationLongitude = ref(null);

	function nav(latitude, longitude, destination) {
		uni.openLocation({
			latitude,
			longitude,
			name: destination, // Use the provided destination name
			scale: 15,
			address: destination,
			success: function(res) {
				uni.showToast({
					title: '打开地图成功',
					icon: 'success'
				});
			},
			fail: function(error) {
				uni.showToast({
					title: '打开地图失败',
					icon: 'none'
				});
			},
		});
	}

	function navigateToDestination() {
		uni.chooseLocation({
			success: function(res) {
				destinationLatitude.value = res.latitude;
				destinationLongitude.value = res.longitude;

				uni.openLocation({
					latitude: res.latitude,
					longitude: res.longitude,
					name: res.name,
					scale: 15,
					address: res.address,
					success: function() {
						uni.showToast({
							title: '打开地图成功',
							icon: 'success'
						});
					},
					fail: function() {
						uni.showToast({
							title: '打开地图失败',
							icon: 'none'
						});
					},
				});
			},
			fail: function() {
				uni.showToast({
					title: '选择位置失败',
					icon: 'none'
				});
			},
		});
	}
</script>

<style>
	.acc {
		margin-bottom: 20px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>