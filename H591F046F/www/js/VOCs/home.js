function addAmapJs() {
	var url =
		'http://webapi.amap.com/maps?v=1.4.14&key=89944af2410a8429cf8a96bb6112621b&callback=init&plugin=AMap.DistrictSearch';
	var jsapi = document.createElement('script');
	jsapi.charset = 'utf-8';
	jsapi.src = url;
	jsapi.id = "amap_js";
	document.head.appendChild(jsapi);
}

mui.ready(function() {
	addAmapJs();
})

var map;
var allPolygons = [];

function strokeMicroPolygon(data) {
	if (allPolygons)
		map.remove(allPolygons);

	var features = data.features;
	if (features) {
		var layer = new AMap.LabelsLayer({
			rejectMapMask: true,
			zIndex: 100,
		});

		for (var i = 0; i < features.length; i++) {
			var points = [];
			var coordinates = features[i].geometry.rings[0];
			var TownName = features[i].attributes.QH_NAME;
			
			// var fillColor;
			// if(TownName == "天镇"){
			// 	fillColor = "red";
			// }else {
			// 	fillColor = "white";
			// }
			var polygon = new AMap.Polygon({
				map: map,
				zIndex: 99,
				strokeWeight: 0.8,
				path: coordinates,
				fillOpacity: 0.6,
				fillColor: "white", //填充色
				strokeColor: 'blue'
			});
			
			var cp = polygon.getBounds().getCenter();
			allPolygons.push(polygon);

			var labelsMarker = new AMap.LabelMarker({
				position: cp,
				text: {
					content: TownName
				}
			});
			layer.add(labelsMarker);
		}
		map.add(layer);
		map.setFitView(allPolygons); //视口自适应
		if (map.getZoom() < 10) {
			map.setZoom(10);
		}
	}
}

function loadData() {
	var datas = new Datas();
	datas.GetAllEnterpriseNewFirstDatas(function(DBData) {
		if(DBData) {
			addMarker(DBData.datas);
		}else {
			addMarker([]);
		}
	}, function(NewData) {
		if(NewData) {
			addMarker(NewData.datas);
		}else {
			addMarker([]);
		}
	});
}


var app = new Vue({
	el: '#info_window',
	data: {
		dic: {}
	},
	methods: {
		getTimePoint:function(time) {
			return DateTool.JSONDateStrToDateFormat(time,"yyyy-MM-dd");
		}
	}
});

function loadMarkerDetail(enterpriseID) {
	console.log(enterpriseID);
	var datas = new Datas();
	datas.GetEnterpriseYearById(enterpriseID,function(DBData) {
		if(DBData) {
			app.dic = DBData.datas;
		}else {
			app.dic = {};
		}
	}, function(NewData) {
		if(NewData) {
			app.dic = NewData.datas;
		}else {
			app.dic = {};
		}
	})
}

var info_window = document.getElementById("info_window");
var markers = [];
function addMarker(arr) {
	try {
		info_window.style.display = "none";
		map.remove(markers);
	} catch(e) {

	}
	
	function markerClick(e) {
		loadMarkerDetail(e.target.content);
		info_window.style.display = "block";
	}

	for (var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		var content = '<div id="marker">' +
			'<img src="../../img/VOCs/mapIconBlue.png" style="display: block;width: 33px;height: 32px;"/>' +
			'<label style="position: absolute; display: block; white-space: nowrap; cursor: inherit; background: rgb(255, 255, 255); border: 1px solid rgb(153, 153, 153); padding: 1px; font: 12px/18px arial, sans-serif; color: black; text-align: center; height: 18px; top: 30px; margin-left: -20px; max-width: none;">' +
			dic.EnterpriseName+
			'</label>' +
			'</div>';
		var marker = new AMap.Marker({
			position: [dic.Longitude, dic.Latitude],
			map: map,
			extData: {
				id: 100
			},
			content: content
		});
		marker.content = dic.EnterpriseID;
		marker.on('click', markerClick);
		markers.push(marker);
	}
}

window.init = function() {
	map = new AMap.Map("mapContainer", {
		center: [116.654561, 40.130347], //中心点坐标 
	});

	strokeMicroPolygon(json);

	var info_window_close = document.getElementById("info_window_close");

	info_window_close.addEventListener("tap", function() {
		info_window.style.display = "none";
	});

	loadData();
}
