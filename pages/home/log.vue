<template>
	<view class="content">
		<view v-for="(log, index) in logs" :key="index">
			<text>{{index}}: {{ log.date }}</text>
		</view>
		<button @click="delrecord" type="warn">删除本地记录</button>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { parseTime } from '../../utils/ruoyi';

	const logs = ref([]);

	function loadLogs() {
		const storedLogs = uni.getStorageSync('logs') || [];
		logs.value = storedLogs.map(log => {
			return {
				date: parseTime(new Date(log), '{y}-{m}-{d} {h}:{i}:{s}'),
				timeStamp: log,
			};
		});
	}

	function delrecord() {
		uni.removeStorageSync('logs');
		logs.value = [];
	}

	loadLogs();
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>