var type = "AQI";
var area = "shunyi";
var areaindex = 0;
var map;
var markers = [];
var polygons = [];
var infoWindow;
var districtExplorer;
var _this = this;
var refreshImg = document.getElementById("refreshImg");
var menu;

function addAmapJs() {
	var url = 'http://webapi.amap.com/maps?v=1.4.6&key=89944af2410a8429cf8a96bb6112621b&callback=init';
	var jsapi = document.createElement('script');
	jsapi.charset = 'utf-8';
	jsapi.src = url;
	jsapi.id = "amap_js";
	document.head.appendChild(jsapi);
}

function addAmapJsUI() {
	var url = 'http://webapi.amap.com/ui/1.0/main.js?v=1.0.11';
	var jsapi = document.createElement('script');
	jsapi.charset = 'utf-8';
	jsapi.src = url;
	jsapi.id = "amap_jsUI";
	document.head.appendChild(jsapi);
}

function removeAmapJs() {
	var jsapi = document.getElementById('amap_js');
	if(jsapi) {
		document.head.removeChild(jsapi);
	}

}

function refreshData(area) {
	refreshImg.style.webkitAnimationPlayState = "running";
	var data = new Datas();
	data.GetGridAndStationPollutant_Area(area, function(DBData) {
		if(DBData) {
			addMarker(DBData.Data);
		}
	}, function(NewData) {
		if(NewData) {
			addMarker(NewData.Data);
		}
		refreshImg.style.webkitAnimationPlayState = "paused";
	})
}

function addMarker(arr) {
	try {
		map.remove(markers);
		infoWindow.close();

	} catch(e) {

	}
	infoWindow = new AMap.InfoWindow({
		offset: new AMap.Pixel(5, -30)
	});

	function markerClick(e) {
		infoWindow.setContent(e.target.content);
		infoWindow.open(map, e.target.getPosition());
	}

	//try {
	var aqiTool = new AQITool();
	for(var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		if(i == 0) {
			document.getElementById("mapTimePoint").innerText = DateTool.dateFormat(dic.TimePoint, "MM月dd日 hh:mm 更新");
		}
		if(dic.lon.length == 0) {
			return;
		}

		var color;
		var textColor;
		var contentValue; 

		if(type == "AQI") {
			contentValue = dic.AQI;
			color = aqiTool.getObtain(aqiTool.InComeType.AQI, dic.AQI, aqiTool.ObtainType.Color);
			textColor = aqiTool.getObtain(aqiTool.InComeType.AQI, dic.AQI, aqiTool.ObtainType.TextColor);
		} else {
			var level;

			if(type == "PM2_5") {
				contentValue = dic.PM2_5;
				level = dic.PM2_5_Level;

			} else if(type == "PM10") {
				contentValue = dic.PM10;
				level = dic.PM10_Level;

			} else if(type == "NO2") {
				contentValue = dic.NO2;
				level = dic.NO2_Level;

			} else if(type == "SO2") {
				contentValue = dic.SO2;
				level = dic.SO2_Level;

			} else if(type == "O3") {
				contentValue = dic.O3;
				level = dic.O3_Level;

			} else if(type == "CO") {
				contentValue = dic.CO;
				level = dic.CO_Level;

			}
			color = aqiTool.getObtain(aqiTool.InComeType.Level, level - 1, aqiTool.ObtainType.Color);
			textColor = aqiTool.getObtain(aqiTool.InComeType.Level, level - 1, aqiTool.ObtainType.TextColor);

		}
		var bgColor = 'style="background-color:' + color + ';color:' + textColor + ';"';

		var divClass;
		if(dic.StationType == 1) {
			divClass = "StationType_1";
		} else if(dic.StationType == 5) {
			divClass = "StationType_5";
		}

		var content = '<div id="marker"' + bgColor + 'class = ' + divClass + '>' + contentValue + '</div>';

		var marker = new AMap.Marker({
			position: [dic.lon, dic.lat],
			map: map,
			content: content
		});

		var aqiColorStye = 'style="background-color:' + aqiTool.getObtain(aqiTool.InComeType.AQI, dic.AQI, aqiTool.ObtainType.Color) + ';"';
		var aqiQuality = aqiTool.getObtain(aqiTool.InComeType.AQI, dic.AQI, aqiTool.ObtainType.Quality);
		var infoContent = '<div id="info">' +
			'<div id="StationName">' + dic.StationName + '</div>' +
			'<div id="line" style="height: 1px;background-color: black;margin-bottom: 5px;margin-top: 5px;">' +
			'</div>' +
			'<div id="aqiContent">' +
			'<div id="aqi" ' + aqiColorStye + '>' +
			'<span>AQI<sub>' + dic.AQI + '</sub></span>' +
			'</div>' +
			'<div id="aqiRight">' +
			'<span>质量等级：' + aqiQuality + '</span>' +
			'</div>' +
			'</div>' +
			'<div id="list">' +
			'<ul>' +
			'<li>' +
			'<ul class="row row1">' +
			'<li>PM<sub>2.5</sub>：' + dic.PM2_5 + '</li>' +
			'<li>PM<sub>10</sub>：' + dic.PM10 + '</li>' +
			'</ul>' +
			'</li>' +
			'<li>' +
			'<ul class="row row2">' +
			'<li>NO<sub>2</sub>：' + dic.NO2 + '</li>' +
			'<li>SO<sub>2</sub>：' + dic.SO2 + '</li>' +
			'</ul>' +
			'</li>' +
			'<li>' +
			'<ul class="row row3">' +
			'<li>O<sub>3</sub>：' + dic.O3 + '</li>' +
			'<li>CO：' + dic.CO + '</li>' +
			'</ul>' +
			'</li>' +
			'</ul>' +
			'</div>' +
			'</div>'
		marker.content = infoContent;
		marker.on('click', markerClick);
		//marker.emit('click', {target: marker});

		markers.push(marker);
	}
	//	} catch(e) {
	//		console.log(e);
	//	}
}



 
window.init = function() { 
	//addAmapJsUI();

	map = new AMap.Map("mapContainer", { 
		zoom: 10, //级别
		center: [116.690259, 40.16854] //中心点坐标 
	});

	map.setFitView();
	map.on('click', function(e) {
		if(infoWindow) {
			infoWindow.close();
		}
	});

	mui.plusReady(function() {
		var oldtype = plus.storage.getItem("type");

		if(oldtype) {
			type = oldtype;
		}
				
		$("ul.pollute li").removeClass('active');
		$("ul.pollute li[type='" + type + "']").addClass("active");

		refreshData(area);
		//addPolygons(area);
	});

	$("ul.pollute li").click(function() {
		$("ul.pollute li").removeClass('active');
		$(this).addClass("active");
		type = $(this).attr("type");
		mui.plusReady(function() {
			plus.storage.setItem("type", type);
		});
		refreshData(area);
	});

}
