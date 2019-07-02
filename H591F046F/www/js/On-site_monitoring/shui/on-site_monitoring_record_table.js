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
				"WitnessDataId": null,
				"JobId": null,
				"SampleWitnessId": null,
				"Virtical": 0,
				"Deep": 0,
				"WitnessTime": null,
				"MachineName": null,
				"MachineCode": null,
				"MachineExpiry": null,
				"Experience": null,
				"WT": 0,
				"WDO": 0,
				"WPH": 0,
				"WRCOND": 0,
				"TURBIDITY": 0,
				"PELLUCIDITY": 0,
				"VEL": 0,
				"FLOWRATE": 0
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
	datas.SavSampleWitnessedRecord(jsonStr, function(data) {
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
	datas.GetSampleWitnessedRecordModel(JobId, function(data) {
		if(data) {
			app.ExtensionData = data.ExtensionData;
		}else {
			app.ExtensionData = {};
		}
	});
}
