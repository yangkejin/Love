var first = null;
mui.back = function() {
	var btnArray = ['否', '是'];
	mui.confirm('确定要退出？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			plus.runtime.quit();
		}
	})
	//首次按键，提示‘再按一次退出应用’
	//	if(!first) {
	//		first = new Date().getTime();
	//		mui.toast('再按一次退出应用');
	//		
	//		setTimeout(function() {
	//			first = null;
	//		}, 1000);
	//	} else {
	//		if(new Date().getTime() - first < 1000) {
	//			plus.runtime.quit();
	//		}
	//	}
};