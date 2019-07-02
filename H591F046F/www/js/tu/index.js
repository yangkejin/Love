mui.ready(function() {

	var myScroll;
	var map_content = document.getElementById("map_content");
	var list_content = document.getElementById("list_content");
	var number = document.getElementsByClassName("number")[0];
	var STATIONTYPE = "国控点";
	var checkedValues = ["国控点", "市控点", "详查点"];

	document.getElementById("map_right_menu").addEventListener("tap", function() {
		map_content.style.display = "none";
		list_content.style.display = "block";
		initIscroll();
		getListDatas(STATIONTYPE);
	});

	function getListDatas(stationType) {
		var data = new tu_Datas();
		data.GetStationList(function(DBData) {
			if(DBData) {
				app.list = filterListData(stationType, DBData);
			} else {
				app.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
				}, 0);
			})
		}, function(NewData) {
			if(NewData) {
				app.list = filterListData(stationType, NewData);
			} else {
				app.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
				}, 0);
			})
		});
	}

	function filterListData(stationType, arr) {
		var newDatas = new Array();
		for(var i = 0; i < arr.length; i++) {
			var dic = arr[i];
			if(stationType == dic.STATIONTYPE) {
				newDatas.push(dic);
			}
		}
		number.innerHTML = stationType + "数量：" + newDatas.length;
		return newDatas;
	}

	document.getElementById("list_right_menu").addEventListener("tap", function() {
		map_content.style.display = "block";
		list_content.style.display = "none";

	});

	document.getElementById("station_btn").addEventListener("click", function() {
		var menu = new upDropDownMenu();
		menu.btn = document.getElementById('station_btn');
		menu.btn_text = document.getElementById('station_name');
		menu.liDatas = ["国控点", "市控点", "详查点"];
		menu.liValues = ["国控点", "市控点", "详查点"];
		menu.show(menu.Direction.auto, function(index, html, value) {
			STATIONTYPE = value;
			getListDatas(STATIONTYPE);
		});
	});

	function initIscroll() {
		document.getElementById("scroller_ul").style.minHeight = ($("#wrapper").height() + 1) + "px";
		if(!myScroll) {
			myScroll = new IScroll('#wrapper', {
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
		}
	}

	var app = new Vue({
		el: "#scroller_ul",
		data: {
			list: []
		},
		methods: {
			itemClick: function(item) {
				mui.openWindow({
					url: 'point_info.html',
					id: 'point_info',
					extras: { //extras里面的就是参数了
						item: item
					},
					waiting: {
						title: '正在跳转...',
					}
				});
			}
		}
	});

	var map;
	var districtExplorer;
	var polygons = [];
	var markers = [];
	var infoWindow;

	function addAmapJs() {
		var url = 'http://webapi.amap.com/maps?v=1.4.6&key=89944af2410a8429cf8a96bb6112621b&callback=init';
		var jsapi = document.createElement('script');
		jsapi.charset = 'utf-8';
		jsapi.src = url;
		jsapi.id = "amap_js";
		document.head.appendChild(jsapi);
	}
	
	function addPolygon(c, ishunyi) {
	AMapUI.loadUI(['geo/DistrictExplorer'], function(DistrictExplorer) {
		//清除已有的绘制内容
		if(districtExplorer) {
			districtExplorer.clearFeaturePolygons();
		}
		initPage(DistrictExplorer, c, ishunyi);
	});
}

function initPage(DistrictExplorer, adcode, isShunyi) {
	//创建一个实例
	districtExplorer = new DistrictExplorer({
		eventSupport: true,
		map: map //关联的地图实例
	});

	districtExplorer.loadMultiAreaNodes(adcode, function(error, areaNodes) {
		if(error) {
			console.error(error);
			return;
		}
		//设置定位节点，支持鼠标位置识别
		//注意节点的顺序，前面的高优先级
		districtExplorer.setAreaNodesForLocating(areaNodes);

		for(var i = 0, len = areaNodes.length; i < len; i++) {
			renderAreaNode(districtExplorer, areaNodes[i], isShunyi);
		}

	});
}

function renderAreaNode(districtExplorer, areaNode, isShunyi) {
	//绘制子级区划
	districtExplorer.renderSubFeatures(areaNode, function(feature, i) {
		var dic = {
			cursor: 'default',
			bubble: true,
			strokeColor: null, //线颜色
			strokeOpacity: null, //线透明度
			strokeWeight: null, //线宽
			fillColor: "#3366cc", //填充色
			fillOpacity: 0.35, //填充透明度
		};
		if(isShunyi) {
			if(feature.properties.name == "顺义区") {
				return dic;
			}
		} else {
			return dic;
		}
	});
	//更新地图视野以适合区划面
	map.setFitView(districtExplorer.getAllFeaturePolygons());
}

	window.init = function() {

		var input_content = document.getElementsByClassName("input_content")[0];
		mui('.input_content').on('change', 'input', function() {
			var count = input_content.querySelectorAll('input[type="checkbox"]:checked').length;
			var checkboxArray = [].slice.call(input_content.querySelectorAll('input[type="checkbox"]'));
			checkedValues = new Array();
			checkboxArray.forEach(function(box) {
				if(box.checked) {
					checkedValues.push(box.getAttribute("name"));
				}
			});
			getMapDatas();
		});

		function getMapDatas() {
			var data = new tu_Datas();
			var listNewData;
			var listDBData;
			var StatusNewData;
			var StatusDBData;
			data.GetStationList(function(DBData) {
				if(DBData) {
					listDBData = DBData;
				} else {
					listDBData = [];
				}
				isAddMarker(listDBData, StatusDBData);
			}, function(NewData) {
				if(NewData) {
					listNewData = NewData;
				} else {
					listNewData = [];
				}
				isAddMarker(listNewData, StatusNewData);
			});

			data.GetStationStatus(function(DBData) {
				if(DBData) {
					StatusDBData = DBData;
				} else {
					StatusDBData = [];
				}
				isAddMarker(listDBData, StatusDBData);
			}, function(NewData) {
				if(NewData) {
					StatusNewData = NewData;
				} else {
					StatusNewData = [];
				}
				isAddMarker(listNewData, StatusNewData);
			});
		}

		function isAddMarker(listData, statusData) {
			if(listData && statusData) {
				addMarker(filterMapData(listData), statusData);
			} else {
				//addMarker([], []);
			}
		}

		function filterMapData(arr) {
			var newDatas = new Array();
			for(var j = 0; j < checkedValues.length; j++) {
				var checkedValue = checkedValues[j];
				console.log("checkedValue:" + checkedValue);
				for(var i = 0; i < arr.length; i++) {
					var dic = arr[i];
					if(checkedValue == dic.STATIONTYPE) {
						newDatas.push(dic);
					}
				}
			}
			return newDatas;
		}

		map = new AMap.Map("mapContainer", {
			zoom: 10, //级别
			center: [116.690259, 40.16854] //中心点坐标
		});

		//覆盖默认的dom结构
		AMapUI.defineTpl("ui/overlay/SimpleInfoWindow/tpl/container.html", [], function() {
			return document.getElementById('my-infowin-tpl').innerHTML;
		});

		map.setFitView();
		addPolygon([110000], true);

		function addMarker(arr, Status) {

			AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {

				try {
					map.remove(markers);
					infoWindow.close();

				} catch(e) {

				}

				for(var i = 0; i < arr.length; i++) {
					var dic = arr[i];

					if(dic.LONGITUDE.length == 0) {
						return;
					}

					map.on('click', function(e) {
						if(infoWindow) {
							infoWindow.close();
						}
					});

					//#609ff7   #f85e61    #fec348
					var POLLUTANTSTATE; //根据POLLUTANTSTATE，0超标，1已上报，2无数据  如果超标，还会有ExceedItems 表示超标项

					for(var j = 0; j < Status.length; j++) {
						var Statu = Status[j];
						if(Statu.STATIONCODE = dic.STATIONCODE) {
							POLLUTANTSTATE = Statu.POLLUTANTSTATE;
						}
					}
					if(!POLLUTANTSTATE) {
						return;
					}
					var imgName;
					var color;
					if(POLLUTANTSTATE == 0) { //超标
						imgName = "map-water-5.png"
						color = "#f92954";

					} else if(POLLUTANTSTATE == 1) { //已上报
						imgName = "map-water-1.png"
						color = "#609ff7";

					} else if(POLLUTANTSTATE == 2) { //无数据
						imgName = "map-water-3.png"
						color = "#f4df31";
					}

					var content = '<div id="marker" style="background: url(../../img/tu/' + imgName + ');color:' + color + ';">' + dic.STATIONTYPE.substring(0, 1) + '</div>';

					var marker = new AMap.Marker({
						position: [dic.LONGITUDE, dic.LATITUDE],
						map: map,
						content: content
					});

					var infoContent =
						'<ul id="info_list" >' +
						'<li>点位编号：<span>' + dic.STATIONCODE + '</span></li>' +
						'<li>点位类别：<span>' + dic.STATIONTYPE + '</span></li>' +
						'<li>地理位置：<span>' + dic.ADDRESS + '</span></li>' +
						'<li>经度：<span>' + dic.LONGITUDE + '</span>；纬度：<span>' + dic.LATITUDE + '</li>' +
						//					'<li>监测单位：<span>' + "顺义区环境监测站" + '</span></li>' +
						'<li>创建时间：<span>' + dic.CREATETIME + '</span></li>' +
						'<li>监测项目：<span>' + dic.ITEMNAME + '</span></li>' +
						//					'<li>监测结果：<span>' + "合格点位" + '</span></li>' +
						'<li><button id="point_info" name="' + i + '" type="button" class="mui-btn mui-btn-primary" style="width:100%;margin-top: 10px;">点位详情</button></li>' +

						'</ul>'

					infoWindow = new SimpleInfoWindow({
						infoBody: infoContent,
						//基点指向marker的头部位置
						offset: new AMap.Pixel(5, -30)
					});

					infoWindow.get$InfoBody().on('click', '#point_info', function(event) {
						//阻止冒泡
						//event.stopPropagation();
						//alert(arr[this.getAttribute("name")]);
						mui.openWindow({
							url: 'point_info.html',
							id: 'point_info',
							extras: { //extras里面的就是参数了
								item: arr[this.getAttribute("name")]
							},
							waiting: {
								title: '正在跳转...',
							}
						});
					});

					//					marker.content = infoContent;

					marker.on('click', markerClick);

					function markerClick(e) {
						//infoWindow.setContent(e.target.content);
						infoWindow.open(map, e.target.getPosition());
					}
					markers.push(marker);
				}
			});
		}
		getMapDatas();

	}
	addAmapJs();
})