document.getElementById("back_v").addEventListener("tap", function() {
	mui.plusReady(function() { 
		mui.fire(plus.webview.getWebviewById("daqi_index"), 'back');
	})
});
