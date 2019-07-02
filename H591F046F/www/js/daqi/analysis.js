//mui.ready(function() {
var wrapperHeight = $("#wrapper").height();
document.getElementById("scroller_ul").style.minHeight = ($("#wrapper").height() + 1) + "px";

var nullData = document.getElementById("nullData");
nullData.style.position = "relative";
nullData.style.top = (wrapperHeight / 2 - 60) + "px";

var ReportTimeType = 4;
var startTime_btn_text = document.getElementById("startTime_btn_text");
var endTime_btn_text = document.getElementById("endTime_btn_text");
changeStartEndTime();
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

document.getElementById("one_btn").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = this;
	menu.btn_text = document.getElementById('one_btn_text');
	menu.liDatas = ["日报", "周报", "月报", "空气质量日报"];
	menu.liValues = ["4", "5", "6", "12"];

	menu.show(menu.Direction.bottom, function(index, html, value) {
		ReportTimeType = value;
		changeStartEndTime();
		upDownRefresh.headerBeginRefreshing();
	});
});

function getMonthWeek(a, b, c) {
	var date = new Date(a, parseInt(b) - 1, c),
		w = date.getDay(),
		d = date.getDate();
	return Math.ceil((d + 6 - w) / 7);
};

function changeStartEndTime() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	if (ReportTimeType == "4" || ReportTimeType == "7") {
		startTime_btn_text.innerText = y + "/" + m + "/" + 1;
		endTime_btn_text.innerText = y + "/" + m + "/" + d;
	} else if (ReportTimeType == "5") {
		startTime_btn_text.innerText = y + "/" + m + "-" + 1;
		endTime_btn_text.innerText = y + "/" + m + "-" + getMonthWeek(y, m, d);
	} else if (ReportTimeType == "6") {
		startTime_btn_text.innerText = y + "/" + 1;
		endTime_btn_text.innerText = y + "/" + m;
	}
}

function getMaxWeek() {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return getMonthWeek(y, m, d);
}

document.getElementById("startTime_btn").addEventListener("click", function() {
	var date = new Date();
	var _self = this;
	var beginY = date.getFullYear() - 3;
	var endY = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var type;
	if (ReportTimeType == "4" || ReportTimeType == "12") {
		type = "date";
	} else if (ReportTimeType == "5") {
		type = "week";
	} else if (ReportTimeType == "6") {
		type = "month";
	}
	console.log(_self.innerText);
	var optionsJson = {
		"value": _self.innerText,
		"type": type,
		"beginYear": beginY,
		"beginMonth": m,
		"beginDay": 1,
		"beginWeek": 1,
		"endYear": endY,
		"endMonth": m,
		"endDay": d,
		"endWeek": getMaxWeek()
	};
	_self.picker = new mui.DtPicker(optionsJson);
	_self.picker.show(function(rs) {
		document.getElementById("startTime_btn_text").innerText = rs.value;
		_self.picker.dispose();
		_self.picker = null;
		upDownRefresh.headerBeginRefreshing();
	});
});

document.getElementById("endTime_btn").addEventListener("click", function() {
	var date = new Date();
	var _self = this;
	var beginY = date.getFullYear() - 3;
	var endY = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var type;
	if (ReportTimeType == "4" || ReportTimeType == "12") {
		type = "date";
	} else if (ReportTimeType == "5") {
		type = "week";
	} else if (ReportTimeType == "6") {
		type = "month";
	}
	console.log(_self.innerText);
	var optionsJson = {
		"value": _self.innerText,
		"type": type,
		"beginYear": beginY,
		"beginMonth": m,
		"beginDay": 1,
		"beginWeek": 1,
		"endYear": endY,
		"endMonth": m,
		"endDay": d,
		"endWeek": getMaxWeek()
	};
	_self.picker = new mui.DtPicker(optionsJson);
	_self.picker.show(function(rs) {
		document.getElementById("endTime_btn_text").innerText = rs.value;
		_self.picker.dispose();
		_self.picker = null;
		upDownRefresh.headerBeginRefreshing();
	});
});

var app = new Vue({
	el: "#scroller_ul",
	data: {
		list: []
	},
	methods: {
		Preview: function(event) {
			mui.openWindow({
				url: 'PDF.html',
				id: 'PDF',
				extras: {
					ID: event
				},
				waiting: {
					title: '正在跳转...',
				}
			});
		}
	}
});

function nullDataIsNone(list) {
	if (list.length > 0) {
		console.log("list");
		document.getElementById("nullData").style.display = "none";
	} else {
		document.getElementById("nullData").style.display = "block";
	}
}

var upDownRefresh = new UpDownRefresh("one");
upDownRefresh.iscroll = myScroll;
upDownRefresh.wrapper = document.getElementById("wrapper");
upDownRefresh.addHeaderRefreshing(function() {
	var datas = new Datas();
	datas.GetAnalyiseReportList("1d60bda6-6943-4c09-b37a-19005883411c", ReportTimeType, startTime_btn_text.innerText,
		endTime_btn_text.innerText,
		function(DBData) {
			if (DBData) {
				app.list = DBData.Data;
			} else {
				app.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
				}, 0);
			})
			nullDataIsNone(app.list);
		},
		function(NewData) {
			if (NewData) {
				app.list = NewData.Data;
			} else {
				app.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
					upDownRefresh.headerEndRefreshing();
				}, 0);
			})
			nullDataIsNone(app.list);
		})
});
upDownRefresh.headerBeginRefreshing();
//})
