document.getElementById("back_v").addEventListener("tap", function() {
	mui.plusReady(function() { 
		mui.fire(plus.webview.getWebviewById("VOCs_index"), 'back');
	})
});
