<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 展示本地存储能力
			const logs = wx.getStorageSync('logs') || []
			logs.unshift(Date.now())
			wx.setStorageSync('logs', logs)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>