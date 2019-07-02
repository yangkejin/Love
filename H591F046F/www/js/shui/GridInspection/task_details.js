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
		tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|DIV)$/
	}
});

var upDownRefresh = new UpDownRefresh("one");
upDownRefresh.iscroll = myScroll;
upDownRefresh.wrapper = document.getElementById("wrapper");
upDownRefresh.addHeaderRefreshing(function() {
	loadData(ID);
});
var ID = "";
var segSelectIndex;
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	ID = self.ID;
	segSelectIndex = self.segSelectIndex;
	upDownRefresh.headerBeginRefreshing();
});


var app = new Vue({
	el: '#scroller_ul',
	data: {
		WorkFlowTaskList: [],
		GDTaskDetail: {},
		DisposalDetail: {},
		Photoes: []
	},
	methods: {
		getProcessImg: function(item) {
			if (item.TaskName == "创建任务") {
				return "../../../img/On-site_monitoring/shui/process_one.png"
			} else if (item.TaskName == "现场处置") {
				return "../../../img/On-site_monitoring/shui/process_two.png"
			} else if (item.TaskName == "反馈办结") {
				return "../../../img/On-site_monitoring/shui/process_three.png"
			}
		},
		isShow: function(index) {
			if (index == this.WorkFlowTaskList.length - 1) {
				return {
					"display": "none"
				};
			} else {
				return {
					"display": "block"
				};
			}
		},
		isShowCheckItem: function(CheckItem) {
			if (CheckItem.length == 0) {
				return {
					"display": "none"
				};
			} else {
				return {
					"display": "block"
				};
			}
		},
		getPhotoes: function(PhotoesStr) {
			var str = "" + PhotoesStr;
			console.log(str);
			var arr = str.split(',');

			//app.Photoes = arr;
		}

	}
});

var compare = function(x, y) {
	var xInt = Number(x.Rank);
	var yInt = Number(y.Rank);

	if (xInt < yInt) {
		return -1;
	} else if (xInt > yInt) {
		return 1;
	} else {
		return 0;
	}
}

function loadData(ID) {
	var datas = new Datas();
	datas.GetTaskStepInfoes(ID, function(data) {
		if (data) {
			var arr = data.ExtensionData.WorkFlowTaskList;
			arr.sort(compare);
			app.WorkFlowTaskList = arr;
		} else {
			app.WorkFlowTaskList = [];
		}

		Vue.nextTick(function() {
			setTimeout(function() {
				myScroll.refresh();
			}, 0);
		})
	});

	datas.GetGDTaskDetail(ID, function(data) {
		if (data) {
			app.GDTaskDetail = data.ExtensionData;
		} else {
			app.GDTaskDetail = {};
		}

		Vue.nextTick(function() {
			setTimeout(function() {
				myScroll.refresh();
				upDownRefresh.headerEndRefreshing();
			}, 0);
		})
	});
	
	var OnSite_disposal = document.getElementById("OnSite_disposal");
	
	if (segSelectIndex == 2 || segSelectIndex == 3) {
		datas.GetDisposalDetail(ID, function(NewData) {
			console.log(JSON.stringify(NewData));
			if (NewData) {
				var Photoes = NewData.ExtensionData.Photoes;
				if (Photoes != undefined && Photoes.length > 0) {
					NewData.ExtensionData.Photoes = Photoes.split(",");
				}
				var Vedioes = NewData.ExtensionData.Vedioes;
				if (Vedioes != undefined && Vedioes.length > 0) {
					NewData.ExtensionData.Vedioes = Vedioes.split(",");
				}
				app.DisposalDetail = NewData.ExtensionData;
			} else {
				app.DisposalDetail = {};
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
					upDownRefresh.headerEndRefreshing();
				}, 0);
			})
		});
	}else {
		OnSite_disposal.style.display = "none";
	}

	// 
	// 	datas.GetTaskLogs(JobId, function(data) {
	// 		if(data) {
	// 			app.ExtensionData = data.ExtensionData;
	// 		}else {
	// 			app.ExtensionData = [];
	// 		}
	// 		Vue.nextTick(function() {
	// 			setTimeout(function() {
	// 				myScroll.refresh();
	// 				upDownRefresh.headerEndRefreshing();
	// 			}, 0);
	// 		})
	// 	});
}
