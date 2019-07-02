function URLs() {
	var _this = this;

	this.getPortNumber = function() {
		return "http://117.121.97.120:9005/webapi/";
	}
	
	/****自动监测数据****/
	//获取区县信息
	this.GetRegions  = function() {
		return _this.getPortNumber()+"GetRegions"; 
	}
	//获取站点各监测项数据
	this.GetInstrumentList  = function(searchKey,regions) {
		return _this.getPortNumber()+"GetInstrumentList?searchKey="+searchKey+"&regions="+regions; 
	}
	
	//获取自动站站点信息
	this.GetWoStations  = function() {
		return _this.getPortNumber()+"GetWoStations";
	}
	
	//根据站点获取监测项
	this.GetStationDetectionItems  = function(stationId) {
		return _this.getPortNumber()+"GetStationDetectionItems?stationId="+stationId; 
	}
	
	//自动站监测数据查询
	this.GetStationData  = function(stationId,itemIds,sdtTime,edtTime) {
		return _this.getPortNumber()+"GetStationData?stationId="+stationId+"&itemIds="+itemIds+"&sdtTime="+sdtTime+"&edtTime="+edtTime; 
	}
	
	
	/****网格化巡检****/
	//获取最近一条事件提醒
	this.GetLastEvent  = function() {
		return _this.getPortNumber()+"GetLastEvent";
	}
	
	//获取事件任务概况
	this.GetEventTaskSurvey  = function() {
		return _this.getPortNumber()+"GetEventTaskSurvey";
	} 
	
	//获取事件提醒
	this.GetEventList  = function() {
		return _this.getPortNumber()+"GetEventList";
	}
	
	//获取待处置任务列表
	this.GetPendingDisposaList  = function() {
		return _this.getPortNumber()+"GetPendingDisposaList";
	}
	
	//获取当前任务步骤信息
	this.GetTaskStepInfoes  = function(taskId) {
		var str = _this.getPortNumber()+"GetTaskStepInfoes?taskId="+taskId;
		console.log(str);
		return str;
	}
	
	//获取任务信息
	this.GetGDTaskDetail  = function(taskId) {
		return _this.getPortNumber()+"GetGDTaskDetail?taskId="+taskId;
	}
	
	//获取当前任务步骤信息
	this.GetRemainToBeDoneList  = function() {
		return _this.getPortNumber()+"GetRemainToBeDoneList";
	}
	
	//获取现场处置信息
	this.GetDisposalDetail  = function(taskId) {
		return _this.getPortNumber()+"GetDisposalDetail?taskId="+taskId;
	}
	
	//现场处置
	this.TaskDisposal  = function(taskId) {
		return _this.getPortNumber()+"TaskDisposal";
	}
	
	//获取反馈结办信息
	this.GetFeedbackDetail  = function(taskId) {
		return _this.getPortNumber()+"GetFeedbackDetail?taskId="+taskId;
	}
	
	//反馈办结
	this.TaskComplete  = function(taskId) {
		return _this.getPortNumber()+"TaskComplete";
	}
	
	//获取已办结任务列表
	this.GetComplatedList  = function() {
		return _this.getPortNumber()+"GetComplatedList";
	}
	
	/****手工监测数据****/
	//获取查询模板
	this.GetQueryTemplate  = function() {
		return _this.getPortNumber()+"GetQueryTemplate";
	}
	
	//手工数据查询
	this.GetSearchData  = function(sdtDate,edtDate,templateId) {
		return _this.getPortNumber()+"GetSearchData?sdtDate="+sdtDate+"&edtDate="+edtDate+"&templateId="+templateId;
	}
	
	//断面模版
	this.GetRiverSections  = function() {
		return _this.getPortNumber()+"GetRiverSections";
	}
	
	//获取手工系统监测项目
	this.GetDetectionItems  = function() {
		return _this.getPortNumber()+"GetDetectionItems";
	}
	
	//获取趋势查询数据
	this.GetTrendData  = function(sectionId,sdtDate,edtDate,itemIds) {
		return _this.getPortNumber()+"GetTrendData?sectionId="+sectionId+"&sdtDate="+sdtDate+"&edtDate="+edtDate+"&itemIds="+itemIds;
	}
	
}
