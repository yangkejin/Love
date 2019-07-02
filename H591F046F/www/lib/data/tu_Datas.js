function tu_Datas() {
	this.CallbackDBData = function() {}
	this.CallbackNewData = function() {}
	this.CallbackXhr = function() {}

	this.GetStationList = function(CallbackDBData, CallbackNewData) {
		var urls = new tu_URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetStationList(), "GetStationList");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetStationStatus = function(CallbackDBData, CallbackNewData) {
		var urls = new tu_URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetStationStatus(), "GetStationStatus");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetSampleInfoListByStationCode = function(stationCode, CallbackDBData, CallbackNewData) {
		var urls = new tu_URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["stationCode"];
		internet.IncreaseColumnValues = [stationCode];
		internet.GETMN_url_tableName(urls.GetSampleInfoListByStationCode(stationCode), "GetSampleInfoListByStationCode");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetSampleInfoDataList = function(infoId, CallbackDBData, CallbackNewData) {
		var urls = new tu_URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["infoId"];
		internet.IncreaseColumnValues = [infoId];
		internet.GETMN_url_tableName(urls.GetSampleInfoDataList(infoId), "GetSampleInfoDataList");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetSampleTransferBookedList = function(sampleInfoCode, CallbackDBData, CallbackNewData) {
		var urls = new tu_URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["sampleInfoCode"];
		internet.IncreaseColumnValues = [sampleInfoCode];
		internet.GETMN_url_tableName(urls.GetSampleTransferBookedList(sampleInfoCode), "GetSampleTransferBookedList");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetATTACHMENTSrc = function(attachmentId, CallbackDBData, CallbackNewData) {
		var urls = new tu_URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["attachmentId"];
		internet.IncreaseColumnValues = [attachmentId];
		internet.GETMN_url_tableName(urls.GetATTACHMENTSrc(attachmentId), "GetATTACHMENTSrc");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

}