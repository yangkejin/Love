document.getElementById("scroller_ul").style.minHeight = ($("#wrapper").height() + 1) + "px";
var myScroll = new IScroll('#wrapper', {
	tap: true,
	scrollbars: true,
	mouseWheel: true,
	interactiveScrollbars: true,
	shrinkScrollbars: 'scale',
	fadeScrollbars: true,
	probeType: 2,
	preventDefaultException: {
		tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
	}
});

var app = new Vue({
	el: '#scroller_ul',
	data: {
		ExtensionData: []
	},
	methods: {
		receiveOrHandover:function(item, index) {
			ReceiveOrHandover(item);
		},
		modifyBtnValue:function(item) {
			if (item.IsReceived == "0") {
				return "接收";
			}else {
				return "交接样品";
			}
		}
	}
});

function ReceiveOrHandover(item) {
	mui.plusReady(function() {
		if (item.IsReceived == "0") {
			plus.nativeUI.showWaiting("正在接收任务...", {
				back: 'none'
			});
			var datas = new OSM_shui_Datas();
			datas.ReceiveSample(item.JobId, function(data) {
				plus.nativeUI.closeWaiting();
				if (data.Success) {
					plus.nativeUI.toast("接受任务成功");
					mui.openWindow({
						url: 'task_details.html',
						id: 'task_details',
						extras: {
							JobId: item.JobId
						},
						waiting: {
							title: '正在跳转...',
						}
					});
				} else {
					plus.nativeUI.toast(data.Message);
				}
				loadData();
			});
		} else {
			mui.openWindow({
				url: 'task_details.html',
				id: 'task_details',
				extras: {
					JobId: item.JobId
				},
				waiting: {
					title: '正在跳转...',
				}
			});
		}

	});
}

function loadData() {
	var datas = new OSM_shui_Datas();
	datas.GetReceiveTaskList(function(data) {
		if(data) {
			app.ExtensionData = data.ExtensionData;
		}else {
			app.ExtensionData = [];
		}
		Vue.nextTick(function() {
			setTimeout(function() {
				myScroll.refresh();
				upDownRefresh.headerEndRefreshing();
			}, 0);
		})
	});
}

var upDownRefresh = new UpDownRefresh("one");
upDownRefresh.iscroll = myScroll;
upDownRefresh.wrapper = document.getElementById("wrapper");
upDownRefresh.addHeaderRefreshing(function() {
	loadData();
});

upDownRefresh.headerBeginRefreshing();
