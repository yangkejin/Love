document.getElementById("back_v").addEventListener("tap", function() {
	mui.back();
});

document.getElementById("task_reception").addEventListener("tap", function() {
	mui.openWindow({
		url: 'task_details.html',
		id: 'task_details',
		waiting: {
			title: '正在跳转...',
		}
	});
});

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
		acceptTask:function(item, index) {
			AcceptTask(item.JobId);
		}
	}
});

function AcceptTask(JobId) {
	mui.plusReady(function() {
		plus.nativeUI.showWaiting("正在接收任务...", {
			back: 'none'
		});
		var datas = new OSM_shui_Datas();
		datas.AcceptTask(JobId, function(data) {
			plus.nativeUI.closeWaiting();
			var obj = JSON.parse(data);
			if(obj.Success) {
				plus.nativeUI.toast("接受任务成功");
				
				mui.openWindow({
				url: 'task_details.html',
				id: 'task_details',
				extras: {
					JobId: JobId
				},
				waiting: {
					title: '正在跳转...',
				}
			});
			}else {
				plus.nativeUI.toast(obj.Message);
			}
		});
	});
}

function loadData() {
	var datas = new OSM_shui_Datas();
	datas.GetWaitingTaskList(function(data,e) {
	    if(Object.prototype.toString.call(data) == "[object Array]") {
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
