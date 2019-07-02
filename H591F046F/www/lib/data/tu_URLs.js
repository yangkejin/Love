function tu_URLs() {
	var _this = this;
	this.getPortNumber = function() {
		return "http://117.121.97.120:9007/webapi/api/";
	}
	
	//站点列表
	this.GetStationList = function() {
		return _this.getPortNumber()+"System/GetStationList";
	}
	
	//站点状态
	this.GetStationStatus = function() {
		return _this.getPortNumber()+"MonitorManage/GetStationStatus?stationType=";
	}
	
	//样品列表
	this.GetSampleInfoListByStationCode = function(stationCode) {
		return _this.getPortNumber()+"MonitorManage/GetSampleInfoListByStationCode?stationCode="+stationCode;
	}
	
	//监测数据
	this.GetSampleInfoDataList = function(infoId) {
		return _this.getPortNumber()+"MonitorManage/GetSampleInfoDataList?infoId="+infoId;
	}
	
	//流转记录
	this.GetSampleTransferBookedList = function(sampleInfoCode) {
		return _this.getPortNumber()+"MonitorManage/GetSampleTransferBookedList?sampleInfoCode="+sampleInfoCode;
	}
	
	//获取图片地址
	this.GetATTACHMENTSrc = function(attachmentId) {
		return _this.getPortNumber()+"MonitorManage/GetATTACHMENTSrc?attachmentId="+attachmentId;
	}
}