function Datas() {
	this.CallbackDBData = function() {}
	this.CallbackNewData = function() {}
	this.CallbackXhr = function() {}

	this.GetAllEnterpriseNewFirstDatas = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetAllEnterpriseNewFirstDatas(), "AllEnterpriseNewFirstDatas");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetEnterpriseYearById = function(enterpriseID, CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["enterpriseIDs"];
		internet.IncreaseColumnValues = [enterpriseID];
		internet.GETMN_url_tableName(urls.GetEnterpriseYearById(enterpriseID), "EnterpriseYearById");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.EnterpriseInfo = function(enterpriseType, searchKey, CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["enterpriseTypes", "searchKeys"];
		internet.IncreaseColumnValues = [enterpriseType, searchKey];
		internet.GETMN_url_tableName(urls.EnterpriseInfo(enterpriseType, searchKey), "EnterpriseInfoDatas");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetStreetInfo = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetStreetInfo(), "StreetInfoDatas");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetEmission = function(EnterpriseType, StreetCode, CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["EnterpriseTypes", "StreetCode"];
		internet.IncreaseColumnValues = [EnterpriseType, StreetCode];
		internet.GETMN_url_tableName(urls.GetEmission(EnterpriseType, StreetCode), "EmissionDatas");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetEnterpriseReport = function(EnterpriseType, StreetCode, ExamineType, CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["EnterpriseTypes", "StreetCodes", "ExamineTypes"];
		internet.IncreaseColumnValues = [EnterpriseType, StreetCode, ExamineType];
		internet.GETMN_url_tableName(urls.GetEnterpriseReport(EnterpriseType, StreetCode, ExamineType),
			"EnterpriseReportDatas");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetFileLists = function(ReportNO, CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["ReportNOs"];
		internet.IncreaseColumnValues = [ReportNO];
		internet.GETMN_url_tableName(urls.GetFileLists(ReportNO),
			"FileLists");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

}
