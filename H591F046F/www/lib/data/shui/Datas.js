function Datas() {
	
	this.GetRegions = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetRegions(), "GetRegions");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetInstrumentList = function(searchKey,regions,CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetInstrumentList(searchKey,regions),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	
	this.GetWoStations = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetWoStations(), "GetWoStations");
		internet.CallbackDBData = function(DBData) { 
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetStationDetectionItems = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetStationDetectionItems(""), "GetStationDetectionItems");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetStationData = function(stationId,itemIds,sdtTime,edtTime,CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["stationIds","itemIdss","sdtTimes","edtTimes"];
		internet.IncreaseColumnValues = [stationId,itemIds,sdtTime,edtTime];
		internet.GETMN_url_tableName(urls.GetStationData(stationId,itemIds,sdtTime,edtTime), "GetStationData");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	
	

	this.GetLastEvent = function(CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetLastEvent(),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.GetEventTaskSurvey = function(CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetEventTaskSurvey(),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			}); 
	}
	
	this.GetEventList = function(CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetEventList(),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.GetPendingDisposaList = function(CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetPendingDisposaList(),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.GetTaskStepInfoes = function(taskId, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetTaskStepInfoes(taskId),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.GetGDTaskDetail = function(taskId, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetGDTaskDetail(taskId),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.GetDisposalDetail = function(taskId, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetDisposalDetail(taskId),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.GetRemainToBeDoneList = function(CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetRemainToBeDoneList(),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.GetComplatedList = function(CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetComplatedList(),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.TaskDisposal = function(jsonStr,CallbackNewData) {
		var body = {
			disposalDetail:jsonStr
		}
		
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.TaskDisposal(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	
	this.GetFeedbackDetail = function(taskId, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.GetFeedbackDetail(taskId),
			true, null,
			function(data, e) {
				CallbackNewData(data, e);
			});
	}
	
	this.TaskComplete = function(jsonStr,CallbackNewData) {
		var body = {
			completedDetail:jsonStr
		}
		
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.TaskComplete(),
			false, body,
			function(data,e) {
				CallbackNewData(data,e);
			});
	}
	
	
	this.GetQueryTemplate = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetQueryTemplate(), "GetQueryTemplateDatas");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetSearchData = function(sdtDate,edtDate,templateId, CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["sdtDates","edtDates","templateIds"];
		internet.IncreaseColumnValues = [sdtDate,edtDate,templateId];
		internet.GETMN_url_tableName(urls.GetSearchData(sdtDate,edtDate,templateId), "GetSearchDatas");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetRiverSections = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetRiverSections(), "GetRiverSections");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetDetectionItems = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetDetectionItems(), "GetDetectionItems");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetTrendData = function(sectionId,sdtDate,edtDate,itemIds, CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["sectionIds","sdtDates","edtDates","itemIds"];
		internet.IncreaseColumnValues = [sectionId,sdtDate,edtDate,itemIds];
		internet.GETMN_url_tableName(urls.GetTrendData(sectionId,sdtDate,edtDate,itemIds), "GetTrendData");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
}
