 mui.ready(function() {

 	var nullData = document.getElementById("nullData");
 	nullData.style.position = "absolute";
 	nullData.style.top = ($(".slide-box").height() / 2) + "px";
 	nullData.style.left = ($(".slide-box").width() / 2 - 40) + "px";

 	var aqiTool = new AQITool();
 	var data = new Datas();

 	/********空气质量指数********/

 	var section1 = new Vue({ 
 		el: '.section1',
 		data: {
 			CityLiveData: {}
 		},
 		methods: {
 			ConventionalPrimaryPollutantBGClor: function(type) {
 				var color;
 				var textColor;
 				var level;
 				if(type == 'PM2.5') {
 					level = this.CityLiveData.PM2_5_Level
 				} else if(type == 'PM10') {
 					level = this.CityLiveData.PM10_Level

 				} else if(type == 'O3') {
 					level = this.CityLiveData.O3_Level

 				} else if(type == 'SO2') {
 					level = this.CityLiveData.SO2_Level

 				} else if(type == 'NO2') {
 					level = this.CityLiveData.NO2_Level

 				} else if(type == 'CO') {
 					level = this.CityLiveData.CO_Level

 				}
 				color = aqiTool.getObtain(aqiTool.InComeType.Level, level - 1, aqiTool.ObtainType.Color);
 				textColor = aqiTool.getObtain(aqiTool.InComeType.Level, level - 1, aqiTool.ObtainType.TextColor);

 				return {
 					"background-color": color,
 					"color": textColor
 				};
 			}
 		},
 		computed: {
 			PrimaryPollutant: function() {
 				if(this.CityLiveData.hasOwnProperty('PrimaryPollutant')) {

 					return "首要污染物：" + PollutantFormat.getPollutantFormat(this.CityLiveData.PrimaryPollutant);
 				}
 			},
 			Time: function() {
 				if(this.CityLiveData.hasOwnProperty('TimePoint')) {
 					return DateTool.dateFormat(this.CityLiveData.TimePoint, "MM月dd日 hh:mm 更新");
 				}
 			},
 			Quality: function() {
 				if(this.CityLiveData.hasOwnProperty('AQI')) {
 					return aqiTool.getObtain(aqiTool.InComeType.AQI, this.CityLiveData.AQI, aqiTool.ObtainType.Quality);
 				}
 			},
 			AQIStyleBGColor: function() {
 				if(this.CityLiveData.hasOwnProperty('AQI')) {
 					var color = aqiTool.getObtain(aqiTool.InComeType.AQI, this.CityLiveData.AQI, aqiTool.ObtainType.Color);
 					var textColor = aqiTool.getObtain(aqiTool.InComeType.AQI, this.CityLiveData.AQI, aqiTool.ObtainType.TextColor);

 					return {
 						"background-color": color,
 						"color": textColor
 					};
 				}
 			},
 			AQIStyleColor: function() {
 				if(this.CityLiveData.hasOwnProperty('AQI')) {
 					var color = aqiTool.getObtain(aqiTool.InComeType.AQI, this.CityLiveData.AQI, aqiTool.ObtainType.Color);

 					return {
 						"color": color
 					};
 				}
 			}

 		}
 	});

 	section1.CityLiveData = {
 		"StationId": "1d60bda6-6943-4c09-b37a-19005883411c",
 		"TimePoint": "—",
 		"PM2_5": "一",
 		"PM2_5_Level": 0,
 		"O3_8h": null,
 		"O3_8h_Level": 0,
 		"CO": "一",
 		"CO_Level": 0,
 		"NO2": "一",
 		"NO2_Level": 0,
 		"PM10": "一",
 		"PM10_Level": 0,
 		"SO2": "一",
 		"SO2_Level": 0,
 		"O3": "一",
 		"O3_Level": 0,
 		"PrimaryPollutant": "一",
 		"AQI": "一",
 		"AQI_Level": 0,
 		"Quantity": "一"
 	};

 	function getSection1Data() {
 		data.GetCityPollutant(function(DBData) {
 			if(DBData) {
 				section1.CityLiveData = DBData.Data[0];
 			}
 		}, function(NewData) {
 			if(NewData) {
 				section1.CityLiveData = NewData.Data[0];
 			}
 		});
 	}

 	getSection1Data();

 	/********未来7天空气质量预报********/

 	var section3 = new Vue({
 		el: '.section3',
 		data: {
 			ForCast: []
 		},
 		methods: {
 			getPrimaryPollutantName: function(index) {
 				if(this.ForCast[index].hasOwnProperty('PrimaryPollutant')) {
 					return "首要污染物：" + PollutantFormat.getPollutantFormat(this.ForCast[index].PrimaryPollutant);
 				}
 			},
 			getTimePoint: function(index) {
 				if(this.ForCast[index].hasOwnProperty('TimePoint')) {
 					return DateTool.dateFormat(this.ForCast[index].TimePoint, "MM月dd日");
 				}
 			},
 			getQualityImage: function(index) {
 				var Level = aqiTool.getAQILevel(this.ForCast[index].AQI);

 				var imgName;
 				if(Level == 6) {
 					imgName = "p_0";
 				} else {
 					var index = Level + 1;
 					imgName = "p_" + index;
 				}

 				return {
 					"background-image": "url(../../img/daqi/" + imgName + "@3x.png)",
 					"background-size": "60px 60px"
 				}
 			},
 			getNumber: function() {
 				return this.ForCast.length;
 			}
 		}
 	});

 	function nullDataIsNone(list) {
 		if(list.length > 0) {
 			console.log("list");
 			document.getElementById("nullData").style.display = "none";
 		} else {
 			document.getElementById("nullData").style.display = "block";
 		}
 	}

 	function getSection3Data() {

 		data.GetForCast(function(DBData) {
 			if(DBData) {
 				section3.ForCast = DBData.Data;
 			}else {
 				section3.ForCast = [];
 			}
 			nullDataIsNone(section3.ForCast);
 		}, function(NewData) {
 			if(NewData) {
 				section3.ForCast = NewData.Data;
 			}else {
 				section3.ForCast = [];
 			}
 			 nullDataIsNone(section3.ForCast);
 		});
 	}
 	getSection3Data();
 })