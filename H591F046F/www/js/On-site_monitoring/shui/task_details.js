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
	loadData(JobId);
});
var JobId = "";

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	JobId = self.JobId;
	upDownRefresh.headerBeginRefreshing();
});


var app = new Vue({
	el: '#scroller_ul',
	data: {
		WorkFlowTaskList: [],
		TaskDetail: {},
		CheckItem: [],
		ExtensionData: []
	},
	methods: {
		getProcessImg:function(item) {
			if(item.TaskStepName == "任务下发") {
				return "../../../img/On-site_monitoring/shui/process_one.png"
			}else if(item.TaskStepName == "采样记录") {
				return "../../../img/On-site_monitoring/shui/process_two.png"
			}else if(item.TaskStepName == "交接样品") {
				return "../../../img/On-site_monitoring/shui/process_three.png"
			}
		},
		isShow:function(index) {
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
		isShowCheckItem:function(CheckItem) {
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
		checkItemClick:function(item, index) {
			console.log(index);
			if (item.RuleItemTag == "SVApp_SampleRecord") { //地表水采样记录表
				mui.openWindow({
					url: 'sampling_record_table.html',
					id: 'sampling_record_table',
					extras: {
						JobId: item.JobId
					},
					waiting: {
						title: '正在跳转...',
					}
				});
			} else if (item.RuleItemTag == "SVApp_SampleWitnessedRecord") { //地表水现场监测记录表
				mui.openWindow({
					url: 'on-site_monitoring_record_table.html',
					id: 'on-site_monitoring_record_table',
					extras: {
						JobId: item.JobId
					},
					waiting: {
						title: '正在跳转...',
					}
				});
			} else if (item.RuleItemTag == "SVApp_SampleHandOver") { //水质样品交接记录表

				mui.openWindow({
					url: 'hand_over_sample_table.html',
					id: 'hand_over_sample_table',
					extras: {
						JobId: item.JobId
					},
					waiting: {
						title: '正在跳转...',
					}
				});
			}
		},
		submitSamplingPoint:function(CheckItem) {
			plus.nativeUI.showWaiting("正在提交...", {
				back: 'none'
			});
			if (CheckItem.length == 2) {
				var datas = new OSM_shui_Datas();
				datas.SubmitSampleRecord(this.TaskDetail.JobId, function(data) {
					plus.nativeUI.closeWaiting();
					if (data.Success) {
						plus.nativeUI.toast("上传成功");
					} else {
						plus.nativeUI.toast(data.Message);
					}
				});
			} else {
				var datas = new OSM_shui_Datas();
				datas.SubmitReceiveRecord(this.TaskDetail.JobId, function(data) {
					plus.nativeUI.closeWaiting();
					if (data.Success) {
						plus.nativeUI.toast("上传成功");
					} else {
						plus.nativeUI.toast(data.Message);
					}
				});
			}

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

function loadData(JobId) {
	var datas = new OSM_shui_Datas();
	datas.GetTaskStepInfo(JobId, function(data) {
		if(data) {
			var arr = data.ExtensionData.WorkFlowTaskList;
			arr.sort(compare);
			app.WorkFlowTaskList = arr;
		}else {
			app.WorkFlowTaskList = [];
		}
		
		Vue.nextTick(function() {
			setTimeout(function() {
				myScroll.refresh();
			}, 0);
		})
	});

	datas.GetTaskDetail(JobId, function(data) {
		if(data) {
			app.TaskDetail = data.ExtensionData.TaskDetail;
			app.CheckItem = data.ExtensionData.CheckItem;
		}else {
			app.TaskDetail = {};
			app.CheckItem = [];
		}
		
		Vue.nextTick(function() {
			setTimeout(function() {
				myScroll.refresh();
			}, 0);
		})
	});

	datas.GetTaskLogs(JobId, function(data) {
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
