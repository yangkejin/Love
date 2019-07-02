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
		samplingRecord:function(item, index) {
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
	}
});

function loadData() {
	var datas = new OSM_shui_Datas();
	datas.GetSampleTaskList(function(data) {
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