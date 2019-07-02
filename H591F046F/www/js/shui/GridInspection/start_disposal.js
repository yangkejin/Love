var recording = new Vue({
	el: '.recording_ul',
	data: {
		list: []
	},
	methods: {
		playRecording: function(item) {
			startPlay(item.path);
		}
	}
});

var r, t, ri;
var rt = document.getElementById("recording_info");

function startRecord() {
	r = plus.audio.getRecorder();
	if (r == null) {
		return;
	}
	var dateStr = new Date().Format("yyyyMMddhhmmss");
	r.record({
		filename: '_doc/audio/' + dateStr + '.wav'
	}, function(p) {
		plus.io.resolveLocalFileSystemURL(p, function(entry) {
			// entry.remove(function(entry) {
			// 	plus.console.log("Remove succeeded");
			// }, function(e) {
			// 	alert(e.message);
			// });

			recording.list.push({
				"name": entry.name,
				"path": p
			});
			rt.innerText = "开始录音";
		}, function(e) {
			console.log('读取录音文件错误：' + e.message);
		});
	}, function(e) {
		console.log('录音失败：' + e.message);
	});
	t = 0;
	ri = setInterval(function() {
		t++;
		rt.innerText = timeToStr(t);
	}, 1000);
}

// 停止录音
function stopRecord() {
	clearInterval(ri);
	ri = null;
	r.stop();
	r = null;
	t = 0;
}

// 开始播放
function startPlay(url) {

	p = plus.audio.createPlayer(url);
	p.play(function() {
		console.log('播放完成！');
		// 播放完成
		//		pt.innerText = timeToStr(d)+'/'+timeToStr(d);
		//		ps.style.webkitTransition = 'all 0.3s linear';
		//		ps.style.width = L+'px';
		//		stopPlay();
	}, function(e) {
		console.log('播放音频文件"' + url + '"失败：' + e.message);
	});
	// 获取总时长
	var d = p.getDuration();
	//	if(!d){
	//		pt.innerText = '00:00:00/'+timeToStr(d);
	//	}

}

function ultZeroize(v, l) {
	var z = "";
	l = l || 2;
	v = String(v);
	for (var i = 0; i < l - v.length; i++) {
		z += "0";
	}
	return z + v;
};

function timeToStr(ts) {
	if (isNaN(ts)) {
		return "--:--:--";
	}
	var h = parseInt(ts / 3600);
	var m = parseInt((ts % 3600) / 60);
	var s = parseInt(ts % 60);
	return (ultZeroize(h) + ":" + ultZeroize(m) + ":" + ultZeroize(s));
};

var isRecord = false;
document.getElementById("recording_btn").addEventListener("tap", function() {
	mui.plusReady(function() {

		if (!isRecord) {
			startRecord();
			isRecord = true;
		} else {
			stopRecord();
			isRecord = false;
		}
	})
});


function uploaderVedioes(CallBack) {
	var list = recording.list;
	var Vedioes = new Array();
	if (list.length == 0) {
		CallBack(true, Vedioes);
	}
	for (var i = 0; i < list.length; i++) {
		var path = list[i].path;
		var task = plus.uploader.createUpload("http://117.121.97.120:9005/webapi/WaterGrid_UploadVedio", {
				method: "POST"
			},
			function(t, status) { //上传完成
				if (status == 200) {
					var obj = JSON.parse(t.responseText);
					if (!obj.Success) {
						CallBack(false, null);
					} else {
						Vedioes.push(obj.ExtensionData.path);
						if (Vedioes.length == list.length) {
							CallBack(true, Vedioes);
							console.log("上传成功：" + JSON.stringify(Vedioes));
						}
					}
				} else {
					console.log("上传失败：" + status);
					CallBack(false, null);
				}
			});

		task.addFile(path, {
			key: "VedioData"
		});
		task.start();
	}
}

function uploaderImages(CallBack) {
	var list = addPhoto.imgSrcs;
	var imgIds = new Array();
	if (list.length == 0) {
		CallBack(true, imgIds);
	}
	for (var i = 0; i < list.length; i++) {
		var imgSrc = list[i];
		var task = plus.uploader.createUpload("http://117.121.97.120:9005/webapi/WaterGrid_UploadImg", {
				method: "POST"
			},
			function(t, status) { //上传完成
				if (status == 200) {
					var obj = JSON.parse(t.responseText);
					if (!obj.Success) {
						CallBack(false, null);
					} else {
						imgIds.push(obj.ExtensionData.path);
						if (imgIds.length == list.length) {
							CallBack(true, imgIds);
							console.log("上传成功：" + JSON.stringify(imgIds));
						}
					}
				} else {
					console.log("上传失败：" + status);
					CallBack(false, null);
				}
			});
		task.addFile(imgSrc.dst, {
			key: "ImgData"
		});
		task.start();
	}
}

document.getElementById("submit").addEventListener("tap", function() {
	mui.plusReady(function() {
		plus.nativeUI.showWaiting("正在提交...", {
			back: 'none'
		});
		uploaderImages(function(is, Photoes) {
			if (is) {
				app.ExtensionData.Photoes = Photoes.join(",");
				uploaderVedioes(function(is, Vedioes) {
					if (is) {
						app.ExtensionData.Vedioes = Vedioes.join(",");
						var jsonStr = JSON.stringify(app.ExtensionData);
						var datas = new Datas();
						datas.TaskDisposal(jsonStr, function(data, e) {
							plus.nativeUI.closeWaiting();
							if (data.Success) {
								mui.back();
								plus.nativeUI.toast("上传成功");
							} else {
								plus.nativeUI.toast(data.Message);
							}
						})
					}
				});
			}
		});
	})
});





window.addEventListener("load", function() {
	FastClick.attach(document.body);
}, false);

document.getElementById("back_v").addEventListener("tap", function() {
	mui.back();
});

document.getElementById("GPS_btn").addEventListener("tap", function() {
	var GPS_info = document.getElementById("GPS_info");
	mui.plusReady(function() {
		plus.geolocation.getCurrentPosition(function(p) {
			var str = "经度：" + p.coords.longitude.toFixed(4) + " 纬度：" + p.coords.latitude.toFixed(4);
			GPS_info.innerText = str;
			app.ExtensionData.GPS = str;
		}, function(e) {
			alert('Geolocation error: ' + e.message);
		});
	})
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
			return {
				"src": src,
				"dst": dst
			};
		},
		cancel: function(index) {
			imgSrcs.splice(index, 1);
			if (imgSrcs.length > 7) {
				add_photo.style.display = "none";
			} else {
				add_photo.style.display = "inline-block";
			}
			this.imgSrcs = imgSrcs;
		}
	}
});

function refreshImg(path, dst) {
	imgSrcs.push({
		"src": path,
		"dst": dst
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
			var fileReader = new plus.io.FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onloadend = function(e) {
				var picUrl = e.target.result.toString();
				refreshImg(picUrl, dst);
				console.log(dst);
			}
		});
	});
} //压缩图片    

function compressImage(url, filename) {
	var dst = "_doc/upload/" + filename;
	plus.zip.compressImage({
		src: url, //src: (String 类型 )压缩转换原始图片的路径    
		dst: dst, //压缩转换目标图片的路径    
		quality: 40, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100    
		overwrite: true //overwrite: (Boolean 类型 )覆盖生成新文件    

	}, function(zip) { //页面显示图片  

		showPics(zip.target, dst);
	}, function(error) {
		plus.nativeUI.toast("压缩图片失败，请稍候再试");
	});
}

document.getElementById("add_photo").addEventListener("tap", function() {
	mui.plusReady(function() {
		showActionSheet();
	});
});

var ID = "";

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	ID = self.ID;
	getData();
	//upDownRefresh.headerBeginRefreshing();
});


var app = new Vue({
	el: '.vue_content',
	data: {
		ExtensionData: {}
	},
	methods: {
		getDivId: function(index) {
			return "enterprise_problem_" + index;
		},
		getInputId: function(index) {
			return "enterprise_problem_" + index + "_input";
		},
		ExistingProblems: function(item, index) {
			console.log(JSON.stringify(item));
			var input = document.getElementById("enterprise_problem_" + index + "_input");
			var menu = new MultipleSelectUpDropDownMenu();
			menu.btn = document.getElementById("enterprise_problem_" + index);
			var value = item.ExistingProblems;
			if (value) {
				var arr = value.split(",");
				menu.selectDatas = arr;
			}
			menu.liDatas = ["排污口颜色异常", "河岸垃圾堆积", "水体颜色异常"];
			menu.liValues = ["排污口颜色异常", "河岸垃圾堆积", "水体颜色异常"];
			menu.show(menu.Direction.auto, function(menu_index, html, value) {
				//input.value = html;
				app.ExtensionData.Details[index].ExistingProblems = html.join(',');
				console.log(JSON.stringify(app.ExtensionData));

			});
		},
		submit: function() {
			console.log(JSON.stringify(app.ExtensionData));
		}
	}
});

function getData() {
	var datas = new Datas();
	datas.GetDisposalDetail(ID, function(NewData) {
		console.log(JSON.stringify(NewData));
		if (NewData) {
			app.ExtensionData = NewData.ExtensionData;
		} else {
			app.ExtensionData = {};
		}
	});
}
