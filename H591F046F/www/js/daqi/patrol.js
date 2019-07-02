var table = document.getElementById("table");
var clientRect = document.getElementById("table_content").getBoundingClientRect();
var bodyHeight = document.body.offsetHeight ? document.body.offsetHeight : document.documentElement.clientHeight;
table.style.height = bodyHeight - clientRect.top - clientRect.height - 187 +"px";

var report = document.getElementById("report");
var inquire = document.getElementById("inquire");

var seg = new Segmentation();
seg.content = document.getElementById("page");
seg.selectBgColor = "#2a68cd";
seg.borderColor = "#2a68cd";
seg.selectTextColor = "White";
seg.unselectTextColor = "#2a68cd";
seg.padding = "4px 20px 4px 20px";
seg.id = "seg_ul";
seg.liDatas = ["填报", "查询"];
seg.liValues = ["0", "1"];
seg.show();
seg.CallBack = (function(index, text, value) {
	console.log(index + " " + text + " " + value);
	if (index == 0) {
		report.style.display = "block";
		inquire.style.display = "none";
	} else {
		report.style.display = "none";
		inquire.style.display = "block";
		loadData();
	}
});

var source_type_input = document.getElementById('report_source_type_input');
document.getElementById("report_source_type").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = document.getElementById('report_source_type');
	menu.arrowHeight = 0;
	menu.liDatas = ["道路扬尘", "地铁站", "地下停车场", "堆场", "锅炉", "加油站", "居民生活油烟", "垃圾楼", "楼宇商场与写字楼", "土壤扬尘源（裸地）", "汽车4S站",
		"商业餐饮", "施工扬尘", "移动污染源", "重点工业企业", "其它"
	];
	menu.liValues = ["AQI", "SO2", "NO2", "CO", "O3", "PM2_5", "PM10"];
	menu.show(menu.Direction.auto, function(index, html, value) {
		source_type_input.value = html;
	});
});

var report_territoriality_btnt_input = document.getElementById('report_territoriality_btnt_input');
document.getElementById("report_territoriality_btn").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = document.getElementById('report_territoriality_btn');
	menu.arrowHeight = 0;
	menu.liDatas = territorials;
	menu.liValues = ["AQI", "SO2", "NO2", "CO", "O3", "PM2_5", "PM10"];
	menu.show(menu.Direction.auto, function(index, html, value) {
		report_territoriality_btnt_input.value = html;
	});
});

document.getElementById("add_photo").addEventListener("tap", function() {
	mui.plusReady(function() {
		showActionSheet();
	});
});

var imgSrcs = new Array();
var add_photo = document.getElementById("add_photo");

var addPhoto = new Vue({
	el: '.photo_content',
	data: {
		imgSrcs: []
	},
	methods: {
		setImg: function(index) {
			var src = this.imgSrcs[index]["src"];
			var dst = this.imgSrcs[index]["dst"];
			var dst = this.imgSrcs[index]["dst"];
			return this.imgSrcs[index];
		},
		cancel: function(index) {
			console.log(index);
			imgSrcs.splice(index, 1);
			if (imgSrcs.length > 7) {
				add_photo.style.display = "none";
			} else {
				add_photo.style.display = "inline-block";
			}
			this.imgSrcs = imgSrcs;
		},
		addPhoto: function() {
			mui.plusReady(function() {
				showActionSheet();
			});
		}
	}
});

function refreshImg(path, dst, file, url) {
	imgSrcs.push({
		"src": path,
		"dst": dst,
		"file": file,
		"url": url
	});

	addPhoto.imgSrcs = imgSrcs;
	Vue.nextTick(function() {
		setTimeout(function() { 
			if (imgSrcs.length > 7) {
				add_photo.style.display = "none";
			} else {
				add_photo.style.display = "inline-block";
			}
		}, 0);
	})

}

function showActionSheet() {
	var bts = [{
		title: "拍照"
	}, {
		title: "系统相册"
	}];
	plus.nativeUI.actionSheet({
			title: "选择类型",
			cancel: "取消",
			buttons: bts
		},
		function(e) {
			if (e.index == 1) {
				captureImage();
			} else {
				galleryImg();
			}
		}
	);
}
//从相册中选择图片
function galleryImg() {
	plus.gallery.pick(function(e) {
		for (var i in e.files) {
			plus.io.resolveLocalFileSystemURL(e.files[i], function(entry) {
				compressImage(entry.toLocalURL(), entry.name);
			}, function(e) {
				console.log('读取拍照文件错误：' + e.message);
			});
		}
	}, function(e) {
		console.log('取消选择图片');
	}, {
		filter: 'image',
		multiple: true,
		maximum: 8 - imgSrcs.length,
		system: false,
		onmaxed: function() {
			plus.nativeUI.alert('最多只能选择' + (8 - imgSrcs.length) + '张图片');
		}
	});
}
// 拍照
function captureImage() {
	var cmr = plus.camera.getCamera();
	cmr.captureImage(function(path) {
			plus.io.resolveLocalFileSystemURL(path, function(entry) {
				compressImage(entry.toLocalURL(), entry.name);
			}, function(e) {
				console.log('读取拍照文件错误：' + e.message);
			});
		},
		function(e) {
			console.log('失败：' + e.message);
		}, {
			filename: '_doc/camera/',
			index: 1
		});
}

//图片显示  

function showPics(url, dst) { //根据路径读取到文件   	
	plus.io.resolveLocalFileSystemURL(url, function(entry) {
		entry.file(function(file) {
			console.log("sssssssss:  " + url);
			var fileReader = new plus.io.FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onloadend = function(e) {
				var picUrl = e.target.result.toString();
				refreshImg(picUrl, dst, file, url);
			}
		});
	});
}

//压缩图片    
function compressImage(url, filename) {
	var dst = "_doc/upload/" + filename;
	plus.zip.compressImage({
		src: url, //src: (String 类型 )压缩转换原始图片的路径    
		dst: dst, //压缩转换目标图片的路径    
		quality: 1, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100    
		overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件    

	}, function(zip) { //页面显示图片  
		showPics(zip.target, dst);
	}, function(error) {
		plus.nativeUI.toast("压缩图片失败，请稍候再试");
	});
}

var Reporter = document.getElementById("Reporter");
var TimePoint = document.getElementById("TimePoint");
var Longitude = document.getElementById("Longitude");
var Latitude = document.getElementById("Latitude");
var Street = document.getElementById("Street");
var Address = document.getElementById("Address");
var PolluType = document.getElementById("report_source_type_input");
var Attribution = document.getElementById("report_territoriality_btnt_input");
var Description = document.getElementById("Description");
var Position = document.getElementById("Position");
TimePoint.value = new Date().Format("yyyy-MM-dd hh:mm:ss");

mui.plusReady(function() {
	plus.geolocation.watchPosition(function(p) {
		Longitude.value = p.coords.longitude.toFixed(4);
		Latitude.value = p.coords.latitude.toFixed(4);
		Street.value = p.address.street;
		Address.value = p.address.province + p.address.city + p.address.district + p.address.street + p.address.streetNum;
	}, function(e) {
		//alert('Geolocation error: ' + e.message);
	});
})
var urls = new URLs();
var submit_btn = document.getElementById("submit_btn");
submit_btn.addEventListener("click", function() {
	mui.plusReady(function() {

		plus.nativeUI.showWaiting("正在上传...", {
			back: 'none'
		});

		uploaderImages(function(is, imgIds) {
			if (is) {
				uploaderDatas(imgIds, function(is) {
					plus.nativeUI.closeWaiting();
					if (is) {
						plus.nativeUI.toast("上传成功");
					} else {
						plus.nativeUI.toast("上传失败，请重试");
					}
				})
			} else {
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast("图片上传失败，请重试");
			}
		});
	});
});

function uploaderImages(CallBack) {
	var imgNumber = imgSrcs.length;
	var imgIds = new Array();
	if (imgNumber == 0) {
		CallBack(true, imgIds);
	}
	for (var i = 0; i < imgNumber; i++) {
		var imgSrc = imgSrcs[i];
		var task = plus.uploader.createUpload(urls.Supervisor_GridCheck_UploadImg(), {
				method: "POST"
			},
			function(t, status) { //上传完成
				if (status == 200) {
					var obj = JSON.parse(t.responseText);
					if (!obj.IsSuccess) {
						CallBack(false, null);
					} else {
						imgIds.push(obj.ImgId);
						if (imgIds.length == imgNumber) {
							CallBack(true, imgIds);
							console.log("上传成功：" + JSON.stringify(imgIds));
						}
					}
				} else {
					console.log("上传失败：" + status);
					CallBack(false, null);
				}
			});
		task.addFile(imgSrc.url, {
			key: "ImgData"
		});
		task.start();
	}
}

function uploaderDatas(imgIds, CallBack) {
	var ImageIdStr = "";
	for (var i = 0; i < imgIds.length; i++) {
		ImageIdStr = ImageIdStr + imgIds[i] + ",";
	}
	ImageIdStr = ImageIdStr.substr(0, ImageIdStr.length - 1);

	// var body = {
	// 	Reporter: Reporter.value,
	// 	TimePoint: TimePoint.value,
	// 	Longitude: Longitude.value,
	// 	Latitude: Latitude.value,
	// 	PolluType: PolluType.value,
	// 	Attribution: Attribution.value,
	// 	Street: Street.value,
	// 	Position: Position.value,
	// 	Address: Address.value,
	// 	Description: Description.value,
	// 	ImageId: ImageIdStr,
	// }
	// console.log(JSON.stringify(body));
	// 
	// var internet = new Internet();
	// internet.simpleXMLHttpRequest_isGet_body(urls.Supervisor_GridCheck_add(), false, body,
	// 			function(text) {
	// 				console.log(text);
	// 		var obj = JSON.parse(text);
	// 			if (obj.IsSuccess) {
	// 				CallBack(true);
	// 			} else {
	// 				CallBack(false);
	// 			}
	// 			},
	// 			function(e) {
	// 				//getDBData_CallbackNewData();
	// 			},
	// 			function(e) {
	// 				//getDBData_CallbackNewData();
	// 			},
	// 			function(xhr) {
	// 				//CallbackXhr(xhr);
	// 			});



	var task = plus.uploader.createUpload(urls.Supervisor_GridCheck_add(), {
			method: "POST"
		},
		function(t, status) { //上传完成
			if (status == 200) {
				var obj = JSON.parse(t.responseText);
				if (obj.IsSuccess) {
					CallBack(true);
				} else {
					CallBack(false);
				}
				console.log("上传数据成功：" + t.responseText + ImageIdStr);
			} else {
				CallBack(false);
				console.log("上传失败：" + status);
			}
		});

	console.log(Reporter.value);
	task.addData("Reporter", Reporter.value);
	task.addData("TimePoint", TimePoint.value);
	task.addData("Longitude", Longitude.value);
	task.addData("Latitude", Latitude.value);
	task.addData("PolluType", PolluType.value);
	task.addData("Attribution", Attribution.value);
	task.addData("Street", Street.value);
	task.addData("Position", Position.value);
	task.addData("Address", Address.value);
	task.addData("Description", Description.value);
	task.addData("ImageId", ImageIdStr);
	task.start();
}




//查询
var inquire_source_type_text = document.getElementById('inquire_source_type_text');
document.getElementById(
	"inquire_source_type").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = document.getElementById('inquire_source_type');
	menu.btn_text = inquire_source_type_text
	//menu.arrowHeight = 0;
	menu.liDatas = ["==ALL==","道路扬尘", "地铁站", "地下停车场", "堆场", "锅炉", "加油站", "居民生活油烟", "垃圾楼", "楼宇商场与写字楼", "土壤扬尘源（裸地）", "汽车4S站",
		"商业餐饮", "施工扬尘", "移动污染源", "重点工业企业", "其它"
	];
	menu.liValues = ["AQI", "SO2", "NO2", "CO", "O3", "PM2_5", "PM10"];
	menu.show(menu.Direction.auto, function(index, html, value) {
		//source_type_input.value = html;
	});
});

var inquire_territoriality_btn_text = document.getElementById('inquire_territoriality_btn_text');
document.getElementById(
	"inquire_territoriality_btn").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = document.getElementById('inquire_territoriality_btn');
	menu.btn_text = inquire_territoriality_btn_text
	//menu.arrowHeight = 0;
	menu.liDatas = ["==ALL==","仁和镇", "马坡镇", "南法信镇", "天竺镇", "后沙峪镇", "牛栏山镇", "杨镇", "张镇", "大孙各庄镇", "北务镇", "李遂镇", "木林镇", "南彩镇",
		"北小营镇", "李桥镇", "高丽营镇", "赵全营镇", "北石槽镇", "龙湾屯镇", "光明街道", "胜利街道", "石园街道", "双丰街道", "旺泉街道", "空港街道", "临空经济核心区",
		"科技创新产业区", "绿色生态区", "天竺综合保税区"
	];
	menu.liValues = ["AQI", "SO2", "NO2", "CO", "O3", "PM2_5", "PM10"];
	menu.show(menu.Direction.auto, function(index, html, value) {
		//report_territoriality_btnt_input.value = html;
	});
});

var startTime_btn_text = document.getElementById("startTime_btn_text");
var endTime_btn_text = document.getElementById("endTime_btn_text");

startTime_btn_text.innerHTML = new Date().Format("yyyy-M-d");
endTime_btn_text.innerHTML = new Date().Format("yyyy-M-d");

document.getElementById("startTime_btn").addEventListener("click", function() {
	var date = new Date();
	var _self = this;
	var beginY = date.getFullYear() - 3;
	var endY = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	
	console.log(_self.innerText);
	var optionsJson = {
		"value": _self.innerText,
		"type": "date",
		"beginYear": beginY,
		"beginMonth": m,
		"beginDay": 1,
		"endYear": endY,
		"endMonth": m,
		"endDay": d,
	};
	_self.picker = new mui.DtPicker(optionsJson);
	_self.picker.show(function(rs) {
		document.getElementById("startTime_btn_text").innerText = rs.value;
		_self.picker.dispose();
		_self.picker = null;
		//upDownRefresh.headerBeginRefreshing();
	});
});

document.getElementById("endTime_btn").addEventListener("click", function() {
	var date = new Date();
	var _self = this;
	var beginY = date.getFullYear() - 3;
	var endY = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	
	console.log(_self.innerText);
	var optionsJson = {
		"value": _self.innerText,
		"type": "date",
		"beginYear": beginY,
		"beginMonth": m,
		"beginDay": 1,
		"endYear": endY,
		"endMonth": m,
		"endDay": d,
	};
	_self.picker = new mui.DtPicker(optionsJson);
	_self.picker.show(function(rs) {
		document.getElementById("endTime_btn_text").innerText = rs.value;
		_self.picker.dispose();
		_self.picker = null;
		//upDownRefresh.headerBeginRefreshing();
	});
});


function loadData(){
	var PolluType = inquire_source_type_text.innerHTML;
	var Attribution = inquire_territoriality_btn_text.innerHTML;
	if(PolluType == "==ALL==") {
		PolluType = "";
	}
	if(Attribution == "==ALL==") {
		Attribution = "";
	}
	
	var datas = new Datas();
	datas.Supervisor_GridCheck_GetList(startTime_btn_text.innerHTML, endTime_btn_text.innerHTML, PolluType, Attribution, function(data) {
		table.DataList = data.DataList;
	})
}

document.getElementById("search_btn").addEventListener("click", function() {
	loadData();
});

loadData();

var table = new Vue({
	el: '.table',
	data: {
		DataList: []
	},
	methods: {
		delItem:function(item, index) {
			deleteItem(item.ID);
		}
	}
});

function deleteItem(id) {
	mui.plusReady(function() {
		plus.nativeUI.showWaiting("正在删除...", {
			back: 'none'
		});
		var datas = new Datas();
		datas.Supervisor_GridCheck_Delete(id, function(data) {
			plus.nativeUI.closeWaiting();
			if (data.IsSuccess) {
				plus.nativeUI.toast("删除成功");
				loadData();
			} else {
				plus.nativeUI.toast("删除失败");
			}
		});
	});
}
