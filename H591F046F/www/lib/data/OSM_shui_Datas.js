function OSM_shui_Datas() {
	var username = "";
	this.GetWaitingTaskList = function(CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetWaitingTaskList(username),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.AcceptTask = function(JobId,CallbackNewData) {
		var body = {
			userName:username,
			JobIds:JobId
		}
		
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.AcceptTask(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.GetTaskStepInfo = function(JobId,CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetTaskStepInfo(username,JobId),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.GetTaskDetail = function(JobId,CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetTaskDetail(username,JobId),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.GetTaskLogs = function(JobId,CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetTaskLogs(username,JobId),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.GetSampleTaskList = function(CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetSampleTaskList(username),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	
	this.GetSampleRecordModel = function(JobId,CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetSampleRecordModel(username,JobId),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.SavSampleRecord = function(json,CallbackNewData) {
		var body = {
			userName:username,
			SampleRecord:json
		}
		
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.SavSampleRecord(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.CreateSampleCode = function(CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.CreateSampleCode(),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.GetSampleWitnessedRecordModel = function(JobId,CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetSampleWitnessedRecordModel(username,JobId),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.SavSampleWitnessedRecord = function(json,CallbackNewData) {
		var body = {
			userName:username,
			SampleWitnessedRecord:json
		}
		
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.SavSampleWitnessedRecord(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.SubmitSampleRecord = function(jobId,CallbackNewData) {
		var body = {
			userName:username,
			JobId:jobId
		}
		
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.SubmitSampleRecord(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	
	this.GetReceiveTaskList = function(CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetReceiveTaskList(username),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.ReceiveSample = function(jobId,CallbackNewData) {
		var body = {
			userName:username,
			JobId:jobId
		}
		
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.ReceiveSample(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.GetSampleHandOverModel = function(jobId,CallbackNewData) {
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetSampleHandOverModel(username,jobId),
			true, null,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.SavSampleHandOverModel = function(json,CallbackNewData) {
		var body = {
			userName:username,
			SampleHandOver:json
		}
		
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.SavSampleHandOverModel(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	this.SubmitReceiveRecord = function(jobId,CallbackNewData) {
		var body = {
			userName:username,
			JobId:jobId
		}
		
		var urls = new OSM_shui_URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.SubmitReceiveRecord(),false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
}


