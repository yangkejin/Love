
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

var district = null;
var polygons = [];

function addPolygon_v2(name) {
	//加载行政区划插件
	if (!district) {
		//实例化DistrictSearch
		var opts = {
			subdistrict: 0, //获取边界不需要返回下级行政区
			extensions: 'all', //返回行政区边界坐标组等具体信息
			level: 'district' //查询行政级别为 市
		};
		district = new AMap.DistrictSearch(opts);
	}

	//行政区查询
	district.setLevel('district');
	district.search(name, function(status, result) {
		map.remove(polygons) //清除上次结果
		polygons = [];
		var bounds = result.districtList[0].boundaries;
		if (bounds) {
			for (var i = 0, l = bounds.length; i < l; i++) {
				//生成行政区划polygon
				var polygon = new AMap.Polygon({
					path: bounds[i],
					strokeColor: "rgb(255,255,255)", //线颜色
					strokeOpacity: 0.35, //线透明度
					strokeWeight: 5, //线宽
					fillColor: "rgb(0,0,0)", //填充色
					fillOpacity: 0.35, //填充透明度
				});
				polygons.push(polygon);
			}
		}
		map.add(polygons)
		map.setFitView(polygons); //视口自适应
	});
}
