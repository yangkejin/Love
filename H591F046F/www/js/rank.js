mui.ready(function() {
	var menuValue;
	var ReportTimeType;
	var header_title = document.getElementById("header_title");
	var titlte_AQI = document.getElementById("titlte_AQI");
	var btn_text = document.getElementById('btn_text');
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		ReportTimeType = self.ReportTimeType;
		var ReportTimeTypeValue;
		if(ReportTimeType == "3") {
			ReportTimeTypeValue = "AQI";
			menuValue = "AQI";
		} else {
			ReportTimeTypeValue = "综合指数";
			menuValue = "ComplexIndex";
		}

		if(ReportTimeType == "3") {
			header_title.innerText = "实时排名";
		} else if(ReportTimeType == "6") {
			header_title.innerText = "月排名";
		}
		if(ReportTimeType == "7") {
			header_title.innerText = "季度排名";
		}

		titlte_AQI.innerHTML = ReportTimeTypeValue;
		btn_text.innerHTML = ReportTimeTypeValue;
		upDownRefresh.headerBeginRefreshing();
	});

	document.getElementById("btn").addEventListener("click", function() {
		var menu = new upDropDownMenu();
		menu.btn = document.getElementById('btn');
		menu.btn_text = document.getElementById('btn_text');
		if(ReportTimeType == "3") {
			menu.liDatas = ["AQI", "SO<sub>2</sub>", "NO<sub>2</sub>", "CO", "O<sub>3</sub>", "PM<sub>2.5</sub>", "PM<sub>10</sub>"];
			menu.liValues = ["AQI", "SO2", "NO2", "CO", "O3", "PM2_5", "PM10"];
		} else {
			menu.liDatas = ["综合指数", "SO<sub>2</sub>", "NO<sub>2</sub>", "CO", "O<sub>3</sub>", "PM<sub>2.5</sub>", "PM<sub>10</sub>"];
			menu.liValues = ["ComplexIndex", "SO2", "NO2", "CO", "O3", "PM2_5", "PM10"];
		}

		menu.show(menu.Direction.top, function(index, html, value) {
			titlte_AQI.innerHTML = html;
			menuValue = value;
			upDownRefresh.headerBeginRefreshing();
		});
	});

	document.getElementById("back_v").addEventListener("click", function() {
		mui.back();
	});
	var descending = false;
	document.getElementById("rank_btn").addEventListener("click", function() {
		if(descending) {
			descending = false;
			var img = document.getElementById("rank_btn_img");
			img.src = "img/ascending.png";
		} else {
			descending = true;
			var img = document.getElementById("rank_btn_img");
			img.src = "img/descending.png";
		}
		upDownRefresh.headerBeginRefreshing();
	});

	document.getElementById("scroller_ul").style.minHeight = ($("#wrapper").height() + 1) + "px";

	var aqiTool = new AQITool();

	var app = new Vue({
		el: "#scroller_ul",
		data: {
			list: []
		},
		methods: {
			getPrimaryPollutantName: function(index) {
				if(this.list[index].hasOwnProperty('PrimaryPollutant')) {
					return PollutantFormat.getPollutantFormat(this.list[index].PrimaryPollutant);
				}
			},
			AQIStyleBGColor: function(index) {
				var Value_Level = this.list[index].Value_Level;
				if(Value_Level == "一") {
					level = 6;
				} else {
					var level = Value_Level - 1;
					if(level < 0) {
						level = 6;
					}
				}

				var color = aqiTool.getObtain(aqiTool.InComeType.Level, level, aqiTool.ObtainType.Color);
				return {
					"background-color": color,
				};
			}
		}
	});

	var myScroll = new IScroll('#wrapper', {
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: true,
		probeType: 2,
	});

	var compare = function(x, y) {
		var xInt = Number(x.Rank);
		var yInt = Number(y.Rank);
		if(descending) {
			if(xInt > yInt) {
				return -1;
			} else if(xInt < yInt) {
				return 1;
			} else {
				return 0;
			}
		} else {
			if(xInt < yInt) {
				return -1;
			} else if(xInt > yInt) {
				return 1;
			} else {
				return 0;
			}
		}
	}
	var time = document.getElementById("time");

	var upDownRefresh = new UpDownRefresh("one");
	upDownRefresh.iscroll = myScroll;
	upDownRefresh.wrapper = document.getElementById("wrapper");
	upDownRefresh.addHeaderRefreshing(function() {
		var datas = new Datas();
		datas.GetGridStationAQI(ReportTimeType, menuValue, function(DBData) {
			if(DBData) {
				var arr = DBData.Data;
				arr.sort(compare);
				app.list = arr;
				Vue.nextTick(function() {
					setTimeout(function() {
						myScroll.refresh();
					}, 0);
				})
			} else {
				app.list = [];
				Vue.nextTick(function() {
					setTimeout(function() {
						myScroll.refresh();
					}, 0);
				})
			}
		}, function(NewData) {
			if(NewData) {
				var arr = NewData.Data;
				arr.sort(compare);
				app.list = arr;
				Vue.nextTick(function() {
					setTimeout(function() {
						myScroll.refresh();
						upDownRefresh.headerEndRefreshing();
					}, 0);
				})
			} else {
				app.list = [];
				Vue.nextTick(function() {
					setTimeout(function() {
						myScroll.refresh();
						upDownRefresh.headerEndRefreshing();
					}, 0);
				})
			}
			if(ReportTimeType == 6) {
				var date = new Date();
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m -= 1;
				if(m == 0) {
					y -= 1;
					m = 12;
				}
				time.innerText = y + "-" + m + " 更新";
			} else {
				time.innerText = new Date(new Date().getTime() - 1 * 60 * 60 * 1000).Format("MM-dd hh时更新");
			}
		});

	});

})