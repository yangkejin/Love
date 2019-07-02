function URLs() {
	var _this = this;
	this.getPortNumber = function() {
		return "http://117.121.97.120:9006/AQIMonitor/";
		//return  "http://suncereltd.6655.la:8089/AQIMonitor/";
		//return "http://10.10.10.17:9067/AQIMonitor/";
	}
	
	this.GetCityPollutant = function() {
		return _this.getPortNumber()+"GetCityPollutant";
	}
	
	this.GetRank = function() {
		return _this.getPortNumber()+"GetRank";
	}
	
	this.GetForCast = function() {
		return _this.getPortNumber()+"GetForCast";
	}
	
	this.GetStandardRate = function() {
		return _this.getPortNumber()+"GetStandardRate";
	}
	
	this.GetGridAndStationPollutant_Area = function(Area) {
		return _this.getPortNumber()+"GetGridAndStationPollutant";
	}
	
	this.AppLogOn = function() {
		return _this.getPortNumber()+"AppLogOn";
	}
	
	/**排名
//  LiveTime("LiveTime",3),//实时
//  DayTime("DayTime",4), //当日
//  WeekTime("WeekTime",5), //星期
//  MonthTime("MonthTime",6), //月
//  SeasonTime("SeasonTime",7), //季
//  YearTime("YearTime",8);//年
	ComplexIndex = 综合指数
*/
	this.GetGridStationAQI = function(ReportTimeType,PollutantCode) {
		var str = _this.getPortNumber()+"GetGridStationAQI?ReportTimeType="+ReportTimeType+"&PollutantCode="+PollutantCode;
		return str;
	}
	/**分析
	 * 4:日  5：周  6:月  7：季  8：年 12：空气质量日报
	 * */
	this.GetAnalyiseReportList = function(StationId,ReportTimeType,sdtDate,edtDate) {
		var str = _this.getPortNumber()+"GetAnalyiseReportList?StationId="+StationId+"&ReportTimeType="+ReportTimeType+
		"&sdtDate="+sdtDate+"&edtDate="+edtDate;
		return str;
	}
	/**
	 * 分析城市
	 * */
	this.GetReportStationByReportType = function() {
		var str = _this.getPortNumber()+"GetReportStationByReportType?Type=6";
		return str;
	}
	/**
	 * 分析PDF
	 * */
	this.PreViewPDF = function(Id) {
		var str = _this.getPortNumber()+"PreViewPDF?Id="+Id;
		console.log(str);
		return str;
	}
	
	
	/**
	 * 上传数据
	 * */
	this.Supervisor_GridCheck_add = function() {
		var str = _this.getPortNumber()+"Supervisor_GridCheck_add";
		return str;
	}
	/**
	 * 上传照片
	 * */
	this.Supervisor_GridCheck_UploadImg = function() {
		var str = _this.getPortNumber()+"Supervisor_GridCheck_UploadImg";
		console.log(str);
		return str;
	}
	/**
	 * 删除表单
	 * */
	this.Supervisor_GridCheck_Delete = function(id) {
		var str = _this.getPortNumber()+"Supervisor_GridCheck_Delete?id="+id;
		return str;
	}
	/**
	 * 查询表单
	 * */
	this.Supervisor_GridCheck_GetList = function(sdtDate,edtDate,PolluType,Attribution) {
		var str = _this.getPortNumber()+"Supervisor_GridCheck_GetList?sdtDate="+sdtDate+"&edtDate="+edtDate+"&PolluType="+PolluType+"&Attribution="+Attribution;
		return str;
	}
}
