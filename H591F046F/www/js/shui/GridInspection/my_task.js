var segSelectIndex;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	segSelectIndex = self.segSelectIndex;
	var seg = new Segmentation();
	seg.content = document.getElementById("page");
	seg.liDatas = ["事件提醒", "待处置", "待反馈", "已办结"];
	seg.selectBgColor = "#63baf0";
	seg.unselectBgColor = "rgba(0,0,0,0)";
	seg.selectTextColor = "white";
	seg.unselectTextColor = "black";
	seg.borderColor = "#63baf0";
	seg.defaultSelectIndex = segSelectIndex;
	seg.show();
	seg.CallBack = (function(index, text, value) {
		console.log(index + " " + text + " " + value);
		segSelectIndex = index;
		upDownRefresh.headerBeginRefreshing();

	});
	upDownRefresh.headerBeginRefreshing();

})
document.getElementById("scroller_ul").style.minHeight = ($("#wrapper").height() + 1) + "px";

var myScroll = new IScroll('#wrapper', {
	scrollbars: true,
	mouseWheel: true,
	interactiveScrollbars: true,
	shrinkScrollbars: 'scale',
	fadeScrollbars: true,
	probeType: 2,
});

var app = new Vue({
	el: '#scroller_ul',
	data: {
		EventList: [],
		PendingDisposaList: [],
		RemainToBeDoneList: [],
		ComplatedList: []
	},
	methods: {
		seeDetails: function(ID) {
			mui.openWindow({
				url: 'task_details.html',
				id: 'task_details',
				extras: {
					ID: ID,
					segSelectIndex: segSelectIndex
				},
				waiting: {
					title: '正在跳转...',
				}
			});
		},
		startDisposal: function(ID) {
			mui.openWindow({
				url: 'start_disposal.html',
				id: 'start_disposal',
				extras: {
					ID: ID
				},
				waiting: {
					title: '正在跳转...',
				}
			});
		},
		startConclude: function(ID) {
			mui.openWindow({
				url: 'start_conclude.html',
				id: 'start_conclude',
				extras: {
					ID: ID
				},
				waiting: {
					title: '正在跳转...',
				}
			});
		},
	}
});

var Event_li = document.getElementById("Event_li");
var PendingDisposa_li = document.getElementById("PendingDisposa_li");

function hiddenOrShowLi() {
	app.EventList = [];
	app.PendingDisposaList = [];
	app.RemainToBeDoneList = [];
	app.ComplatedList = [];
}

var upDownRefresh = new UpDownRefresh("one");
upDownRefresh.iscroll = myScroll;
upDownRefresh.wrapper = document.getElementById("wrapper");
upDownRefresh.addHeaderRefreshing(function() {
	getData();
});

function getData() {
	var datas = new Datas();
	if (segSelectIndex == 0) {
		datas.GetEventList(function(NewData) {
			hiddenOrShowLi();
			if (NewData) {
				app.EventList = NewData.ExtensionData
			}
			refreShEnd();

		});
	} else if (segSelectIndex == 1) {

		datas.GetPendingDisposaList(function(NewData) {
			hiddenOrShowLi();
			if (NewData) {
				app.PendingDisposaList = NewData.ExtensionData
			}
			refreShEnd();

		});
	} else if (segSelectIndex == 2) {

		datas.GetRemainToBeDoneList(function(NewData) {
			hiddenOrShowLi();
			if (NewData) {
				app.RemainToBeDoneList = NewData.ExtensionData
			}
			refreShEnd();

		});
	} else if (segSelectIndex == 3) {
		datas.GetComplatedList(function(NewData) {
			hiddenOrShowLi();
			if (NewData) {
				app.ComplatedList = NewData.ExtensionData
			}
			refreShEnd();
		});
	}
}

function refreShEnd() {
	Vue.nextTick(function() {
		setTimeout(function() {
			myScroll.refresh();
			upDownRefresh.headerEndRefreshing();
		}, 0);
	})
}
