var NetWorkTool = (function() {

	return {
		isNetWork: function(isToast, CallBackIs) {
			if(isToast == undefined) {
				isToast = false;
			}
			mui.plusReady(function() {
				var CurrentType = plus.networkinfo.getCurrentType();
				if(CurrentType == plus.networkinfo.CONNECTION_NONE) {
					if(isToast) {
						plus.nativeUI.toast("没有网络连接!");
					}
					if(CallBackIs) {
						CallBackIs(false);
					}
				} else {
					if(CallBackIs) {
						CallBackIs(true);
					}
				}
			})
		},
		netChange: function(isToast, CallBackIs) {
			if(isToast == undefined) {
				isToast = false;
			}
			mui.plusReady(function() {
				document.addEventListener("netchange", onNetChange, false);

				function onNetChange() {
					var CurrentType = plus.networkinfo.getCurrentType();
					if(CurrentType == plus.networkinfo.CONNECTION_NONE) {
						if(isToast) {
							plus.nativeUI.toast("网络连接断开!");
						}
						if(CallBackIs) {
							CallBackIs(false);
						}
					} else {
						if(isToast) {
							plus.nativeUI.toast("网络重新连接!");
						}
						if(CallBackIs) {
							CallBackIs(true);
						}
					}
				}
			});
		}
	}
})()