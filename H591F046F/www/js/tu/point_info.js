var popu_list = document.getElementsByClassName("popu_list")[0];

var point_info = new Vue({
	el: ".point_info",
	data: {
		dic: {}
	}
});

var sampling = new Vue({
	el: ".sampling",
	data: {
		dic: {}
	},
	methods: {
		BEFORE_PICTURE: function() {
			return getImgSrc(this.dic.BEFORE_PICTURE, "BEFORE_PICTURE");
		},
		AROUNDN: function() {
			return getImgSrc(this.dic.AROUNDN, "AROUNDN");
		},
		AFTER_PICTURE: function() {
			return getImgSrc(this.dic.AFTER_PICTURE, "AFTER_PICTURE");
		},
		AROUNDW: function() {
			return getImgSrc(this.dic.AROUNDW, "AROUNDW");
		},
		CURRENT_PICTURE: function() {
			return getImgSrc(this.dic.CURRENT_PICTURE, "CURRENT_PICTURE");
		},
		AROUNDE: function() {
			return getImgSrc(this.dic.AROUNDE, "AROUNDE");
		},
		SELFIE_PICTURE: function() {
			return getImgSrc(this.dic.SELFIE_PICTURE, "SELFIE_PICTURE");
		},
		AROUNDS: function() {
			return getImgSrc(this.dic.AROUNDS, "AROUNDS");
		},
		MORE_PICTURE: function() {
			return getImgSrc(this.dic.MORE_PICTURE, "MORE_PICTURE");
		}
	}
});

function getImgSrc(attachmentId, id) {
	if(!attachmentId) {
		return "../../img/tu/default_poto.png";
	}
	var data = new tu_Datas();
	data.GetATTACHMENTSrc(attachmentId, function(DBData) {
		if(DBData) {
			document.getElementById(id).src = DBData;
		}
	}, function(NewData) {
		if(NewData) {
			document.getElementById(id).src = NewData;
		}
	});
}

var monitoring_data = new Vue({
	el: ".monitoring_data",
	data: {
		list: []
	}
});

var circulation_record = new Vue({
	el: ".circulation_record",
	data: {
		list: []
	}
});

mui.plusReady(function() {

	var self = plus.webview.currentWebview();
	point_info.dic = self.item; //获得参数

	setTimeout(function() {
		myScroll.refresh();
	}, 0);

	var data = new tu_Datas();
	data.GetSampleInfoListByStationCode(self.item.STATIONCODE, function(DBData) {
		if(DBData) {
			refreshPopuListDom(DBData);
		} else {
			refreshPopuListDom([]);

			//popu_list_vue.list = [];
		}
		//					setTimeout(function() {
		//						myScroll.refresh();
		//					}, 0);
	}, function(NewData) {
		if(NewData) {
			refreshPopuListDom(NewData);
		} else {
			refreshPopuListDom([]);
		}
		//					setTimeout(function() {
		//						myScroll.refresh();
		//					}, 0);
	});

	function getMonitoringData(infoId) {
		var data = new tu_Datas();
		data.GetSampleInfoDataList(infoId, function(DBData) {
			if(DBData) {
				monitoring_data.list = DBData;
			} else {
				monitoring_data.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
				}, 0);
			})
		}, function(NewData) {
			if(NewData) {
				monitoring_data.list = NewData;
			} else {
				monitoring_data.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
				}, 0);
			})
		});
	}

	function getGetSampleTransferBookedList(SAMPLECODE) {

		var data = new tu_Datas();
		data.GetSampleTransferBookedList(SAMPLECODE, function(DBData) {
			if(DBData) {
				circulation_record.list = DBData;
			} else {
				circulation_record.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
				}, 0);
			})
		}, function(NewData) {
			if(NewData) {
				circulation_record.list = NewData;
			} else {
				circulation_record.list = [];
			}
			Vue.nextTick(function() {
				setTimeout(function() {
					myScroll.refresh();
				}, 0);
			})
		});
	}

	var number_btn_sample_code = document.getElementById("sample_code");
	var samplingArr;
	function refreshPopuListDom(arr) {
		var popu_list_ul = document.getElementById("popu_list_ul");
		var htmlStr = "";
		samplingArr  = arr;
		for(var i = 0; i < arr.length; i++) {
			var item = arr[i];
			if(i == 0) {
				htmlStr += '<li class="popu_list_item">' +
					'<p id="SAMPLECODE_' + i + '" class="STATIONCODE" style="color:#2a68cd">采样编号：' + item.STATIONCODE + '</p>' +
					'<p id="SAMPLEDEPTH_' + i + '"class="SAMPLEDEPTH" style="color:#2a68cd">采样深度(cm)：' + item.SAMPLEDEPTH + '</p>' +
					'<div id="select_img_' + i + '"class="selected_img"></div>' +
					'</li>'
				sampling.dic = item;
				number_btn_sample_code.innerText = item.SAMPLECODE;
				getMonitoringData(item.ID);
				getGetSampleTransferBookedList(item.SAMPLECODE);
			} else {
				htmlStr += '<li class="popu_list_item">' +
					'<p id="SAMPLECODE_' + i + '" class="STATIONCODE">采样编号：' + item.SAMPLECODE + '</p>' +
					'<p id="SAMPLEDEPTH_' + i + '"class="SAMPLEDEPTH">采样深度(cm)：' + item.SAMPLEDEPTH + '</p>' +
					'<div id="select_img_' + i + '"class="unselected_img"></div>' +
					'</li>'
			}
		}

		popu_list_ul.innerHTML = htmlStr;

		mui('#popu_list_ul').on('tap', 'li', function(e) {
			var index = $(this).index(); //获取索引下标 也从0开始
			sampling.dic = samplingArr[index];

			number_btn_sample_code.innerText = sampling.dic.SAMPLECODE;
			getMonitoringData(sampling.dic.ID);
			getGetSampleTransferBookedList(sampling.dic.SAMPLECODE);

			$("#popu_list_ul li p").css({
				"color": "black"
			});

			var selected_imgs = document.getElementsByClassName("selected_img");
			for(var i = 0; i < selected_imgs.length; i++) {
				selected_imgs[i].setAttribute("class", "unselected_img");
			}

			var select_img = document.getElementById("select_img_" + index);
			select_img.setAttribute("class", "selected_img");

			$("#SAMPLECODE_" + index).css({
				"color": "#2a68cd"
			});
			$("#SAMPLEDEPTH_" + index).css({
				"color": "#2a68cd"
			});
			popu_list.style.display = "none";
		});
	}
});

document.getElementById("back_v").addEventListener("tap", function() {
	mui.back();
});
document.getElementsByClassName("colse")[0].addEventListener("tap", function() {
	popu_list.style.display = "none";
});
document.getElementsByClassName("number_btn")[0].addEventListener("tap", function() {
	popu_list.style.display = "block";
});

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

setTimeout(function() {
	myScroll.refresh();
}, 0);