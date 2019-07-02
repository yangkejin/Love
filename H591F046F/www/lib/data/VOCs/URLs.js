function URLs() {
	var _this = this;
	
	// enterpriseType （1造纸厂，2工业涂装，21包装印刷）
	/**
	 * ExamineType
	 * [Description("填报中")]
        EAdding=0
        [Description("已提交")]
        Esubmit=1
        [Description("审核中")]
        AAuditing=2
        [Description("审核通过")]
        Apost=3
        [Description("审核不通过")]
        AnoPost=4
	 * */
	this.getPortNumber = function() {
		return "http://117.121.97.120:9009/App/";
	}
	
	//地图
	this.GetAllEnterpriseNewFirstDatas  = function() {
		return _this.getPortNumber()+"GetAllEnterpriseNewFirstDatas";
	}
	
	//地图 企业点击详细信息
	this.GetEnterpriseYearById = function(enterpriseID) {
		return _this.getPortNumber()+"GetEnterpriseYearById?enterpriseID="+enterpriseID;
	}
	
	//企业信息列表
	this.EnterpriseInfo = function(enterpriseType,searchKey) {
		var url = _this.getPortNumber()+"EnterpriseInfo?enterpriseType="+enterpriseType+"&searchKey="+searchKey;
		return url;
	} 
	
	//企业排放
	this.GetEmission = function(EnterpriseType,StreetCode) {
		return _this.getPortNumber()+"GetEmission?EnterpriseType="+EnterpriseType+"&StreetCode="+StreetCode;
	}
	
	//街镇信息
	this.GetStreetInfo = function() {
		return _this.getPortNumber()+"GetStreetInfo";
	}
	
	//审核企业信息列表查询
	this.GetEnterpriseReport = function(EnterpriseType,StreetCode,ExamineType) {
		return _this.getPortNumber()+"GetEnterpriseReport?EnterpriseType="+EnterpriseType+"&StreetCode="+StreetCode+"&ExamineType="+ExamineType;
	}
	
	//获取审核企业文件信息
	this.GetFileLists = function(ReportNO) {
		 var str = _this.getPortNumber()+"GetFileList?ReportNO="+ReportNO;
		return str;
	}
}
