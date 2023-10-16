<template>
	<view class="content">
		<view class="text-area">
			<button class="title" @click="btnclick">读取微信文件</button>
		</view>
		<view class="text-area">
			<button class="title" @click="btnimg">读取照片</button>
		</view>
		<view class="text-area">
			<button class="title" @click="btnmv">读取视频</button>
		</view>
		<view class="text-area">
			<button class="title" @click="btnimgmv">读取照片/视频</button>
		</view>


	</view>
</template>

<script setup>
	import { ref } from 'vue';

	const src = ref(ref)
	const fileInput = ref(null);

	// 读取微信文件
	function btnclick() {
		wx.chooseMessageFile({
			type: 'file',
			success: function(res) {
				if (res.tempFiles.length > 0) {
					const filePath = res.tempFiles[0].path;

					wx.getFileSystemManager().readFile({
						filePath: filePath,
						encoding: 'utf8',
						success: function(data) {
							console.log('文件内容:', data.data);
						},
						fail: function(error) {
							console.error('读取文件失败:', error);
						},
					});
				}
			},
			fail: function(error) {
				console.error('选择文件失败:', error);
			},
		});
	}



	// 读取图片文件
	function btnimg() {
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function(res) {
				src.value = res.tempFilePath;
				console.log('图片路径', src.value);
			}
		});

	}

	// 读取视频文件
	function btnmv() {
		uni.chooseVideo({
			sourceType: ['camera', 'album'],
			success: function(res) {
				src.value = res.tempFilePath;
				console.log('视频路径', src.value);
			}
		});
	}

	// 读取视频/图片文件
	function btnimgmv() {
		uni.chooseVideo({
			sourceType: ['camera', 'album'],
			success: function(res) {
				src.value = res.tempFilePath;
				console.log('视频/照片路径', src.value);
			}
		});
	}
</script>

<style>
	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		margin-top: 30rpx;
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>