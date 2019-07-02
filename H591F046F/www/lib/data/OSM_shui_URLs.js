function OSM_shui_URLs() {
	var _this = this;
	this.getPortNumber = function() {
		return "http://117.121.97.120:9005/webapi/";
	}

	//获取待接收任务列表
	this.GetWaitingTaskList = function(username) {
		return _this.getPortNumber() + "GetWaitingTaskList?username=" + username;
	}
	
	//接收任务
	this.AcceptTask = function() {
		return _this.getPortNumber() + "AcceptTask";
	}
	
	//获取当前任务流程步骤
	this.GetTaskStepInfo = function(userName,JobId) {
		return _this.getPortNumber() + "GetTaskStepInfo?userName="+userName+"&JobId="+JobId;
	}
	
	//获取任务详细信息
	this.GetTaskDetail = function(userName,JobId) {
		return _this.getPortNumber() + "GetTaskDetail?userName="+userName+"&JobId="+JobId;
	}
	
	//获取当前任务记录
	this.GetTaskLogs = function(userName,JobId) {
		return _this.getPortNumber() + "GetTaskLogs?userName="+userName+"&JobId="+JobId;
	}
	
	//获取当前用户采样记录任务
	this.GetSampleTaskList = function(userName) {
		return _this.getPortNumber() + "GetSampleTaskList?userName="+userName;
	}
	
	//获取地表水采样记录表信息
	this.GetSampleRecordModel = function(userName,JobId) {
		return _this.getPortNumber() + "GetSampleRecordModel?userName="+userName+"&JobId="+JobId;
	}
	
	//保存地表水采样记录表信息
	this.SavSampleRecord = function() {
		return _this.getPortNumber() + "SavSampleRecord";
	}
	
	//获取样品编码
	this.CreateSampleCode = function() {
		return _this.getPortNumber() + "CreateSampleCode";
	}
	
	//获取地表水现场监测记录表信息
	this.GetSampleWitnessedRecordModel = function(userName,JobId) {
		var str = _this.getPortNumber() + "GetSampleWitnessedRecordModel?userName="+userName+"&JobId="+JobId;
		return str;
	}
	
	//保存地表水现场监测记录表信息
	this.SavSampleWitnessedRecord = function() {
		return _this.getPortNumber() + "SavSampleWitnessedRecord";
	}
	
	//保存地表水现场监测记录表信息
	this.SubmitSampleRecord = function() {
		return _this.getPortNumber() + "SubmitSampleRecord";
	}
	
	//获取当前用户样品交接任务
	this.GetReceiveTaskList = function() {
		return _this.getPortNumber() + "GetReceiveTaskList";
	}
	
	//交接样品
	this.ReceiveSample = function() {
		return _this.getPortNumber() + "ReceiveSample";
	}
	
	//获取水质样品交接记录表实体
	this.GetSampleHandOverModel = function(userName,JobId) {
		return _this.getPortNumber() + "GetSampleHandOverModel?userName="+userName+"&JobId="+JobId;
	}
	
	//保存水质样品交接记录表信息
	this.SavSampleHandOverModel = function(userName,JobId) {
		return _this.getPortNumber() + "SaveSampleHandOver";
	}
	
	//交接样品提交
	this.SubmitReceiveRecord = function(userName,JobId) {
		return _this.getPortNumber() + "SubmitReceiveRecord";
	}
	
}
