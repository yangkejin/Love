var app = new Vue({
	el: '.all_content',
	data: {
		ExtensionData: {},
		Detail: {}
	},
	methods: {
		getTimePoint:function(TimePoint) {
			return DateTool.JSONDateStrToDateFormat(TimePoint, "yyyy-MM-dd");
		},
		editSamplingPoint:function(item, index) {
			var sampling_point_content = document.getElementById("sampling_point_content");
			sampling_point_content.style.display = "block";
			item["index"] = index;
			this.Detail = item;
		},
		deleteSamplingPoint:function(item, index) {
			this.ExtensionData.Detail.splice(index, 1);
		},
		addSamplingPoint:function() {
			var detail = {
				"SampleDetailId": null,
				"JobId": null,
				"SampleId": null,
				"Vertical": 0,
				"Deep": 0,
				"SampleTime": null,
				"SampleCode": null,
				"DetectionItem": "硒,阴离子表面活性剂,铜,挥发酚,六价铬,汞,溶解氧,高锰酸盐指数,粪大肠菌群,水温,pH,化学需氧量,生化需氧量,镉,铅,砷,锌,硫化物,石油类,氨氮,总磷,总氮,氟化物,氰化物",
				"SampleCount": 0,
				"SampleValume": 0,
				"KeepCondition": null,
				"SampleDesc": null,
				"StorageQuality": null,
				"StorageColor": null,
				"StorageCapacity": null,
				"KeepName": null,
				"KeepAddNum": 0,
				"CreateUser": null,
				"CreateTime": "/Date(-62135596800000)/"
			};
			this.ExtensionData.Detail.push(detail);
		},
		closeSamplingPoint:function(item, index) {
			var sampling_point_content = document.getElementById("sampling_point_content");
			sampling_point_content.style.display = "none";
			this.ExtensionData.Detail[index] = item;
		},
		saveSamplingPoint:function(item, index) {
			var sampling_point_content = document.getElementById("sampling_point_content");
			sampling_point_content.style.display = "none";
			this.ExtensionData.Detail[index] = item;
		},
		submitSamplingPoint:function() {
			submit();
		}
	}
});

function submit() {
	plus.nativeUI.showWaiting("正在提交...", {
		back: 'none'
	});
	var datas = new OSM_shui_Datas();
	var dic = app.ExtensionData;

	for (var i = 0; i < dic.Detail.length; i++) {
		var detail = dic.Detail[i];
		delete detail["CreateUser"];
		delete detail["CreateTime"];
	}

	var jsonStr = JSON.stringify(app.ExtensionData);
	datas.SavSampleRecord(jsonStr, function(data) {
		plus.nativeUI.closeWaiting();
		if (data.Success) {
			plus.nativeUI.toast("上传成功");
		} else {
			plus.nativeUI.toast(data.Message);
		}
	});
}


var JobId = "";
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	JobId = self.JobId;
	console.log("JobId:" + JobId);
	loadData(JobId);
});

function loadData(JobId) {
	console.log("JobId:" + JobId);
	var datas = new OSM_shui_Datas();
	datas.GetSampleRecordModel(JobId, function(data) {
		if(data) {
			app.ExtensionData = data.ExtensionData;
		}else {
			app.ExtensionData = {};
		}
	});
}
