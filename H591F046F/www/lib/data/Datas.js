function Datas() {
	this.CallbackDBData = function() {}
	this.CallbackNewData = function() {}
	this.CallbackXhr = function() {}
		
	this.GetGridStationAQI = function(ReportTimeType,PollutantCode,CallbackDBData, CallbackNewData) {
		var urls = new URLs(); 
		var internet = new Internet();
		internet.IncreaseColumns = ["ReportTimeTypes","PollutantCodes"];
		internet.IncreaseColumnValues = [ReportTimeType,PollutantCode];
		internet.GETMN_url_tableName(urls.GetGridStationAQI(ReportTimeType,PollutantCode), "GridStationAQI");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	 
	this.GetAnalyiseReportList = function(StationId,ReportTimeType,sdtDate,edtDate,CallbackDBData, CallbackNewData) {
		var urls = new URLs(); 
		var internet = new Internet();
		internet.IncreaseColumns = ["StationIds","ReportTimeTypes","sdtDates","edtDates"];
		internet.IncreaseColumnValues = [StationId,ReportTimeType,sdtDate,edtDate];
		internet.GETMN_url_tableName(urls.GetAnalyiseReportList(StationId,ReportTimeType,sdtDate,edtDate), "AnalyiseReportList");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.GetReportStationByReportType = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs(); 
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetReportStationByReportType(), "ReportStationByReportType");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.PreViewPDF = function(Id,CallbackDBData, CallbackNewData) {
		var urls = new URLs(); 
		var internet = new Internet();
		internet.IncreaseColumns = ["Ids"];
		internet.IncreaseColumnValues = [Id];
		internet.GETMN_url_tableName(urls.GetAnalyiseReportList(StationId,ReportTimeType,sdtDate,edtDate), "PreViewPDF");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	

	this.GetCityPollutant = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetCityPollutant(), "CityPollutant");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetRank = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetRank(), "Rank");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetForCast = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetForCast(), "ForCast");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetStandardRate = function(CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.GETMN_url_tableName(urls.GetStandardRate(), "Chart");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}

	this.GetGridAndStationPollutant_Area = function(Area,CallbackDBData, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.IncreaseColumns = ["Area"];
		internet.IncreaseColumnValues = [Area];
		internet.GETMN_url_tableName(urls.GetGridAndStationPollutant_Area(Area), "GridAndStationPollutant");
		internet.CallbackDBData = function(DBData) {
			CallbackDBData(DBData);
		}
		internet.CallbackNewData = function(newData) {
			CallbackNewData(newData);
		};
	}
	
	this.Supervisor_GridCheck_GetList = function(sdtDate,edtDate,PolluType,Attribution, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.Supervisor_GridCheck_GetList(sdtDate,edtDate,PolluType,Attribution),
		true,null,function(data){
			CallbackNewData(data);
		});
	}
	
	this.Supervisor_GridCheck_Delete = function(id, CallbackNewData) {
		var urls = new URLs();
		var internet = new Internet();
		internet.simpleXMLHttpRequest_isGet_body_v2(urls.Supervisor_GridCheck_Delete(id),
		true,null,function(data){
			CallbackNewData(data);
		});
	}

	this.login = function(user, pas, onload, onerror, ontimeout) {
		var urls = new URLs();
		mui.plusReady(function() {
			var body = {
				userName: user,
				password: pas
			};
			//TestUser   111
			var xhr = new plus.net.XMLHttpRequest();
			var CurrentType = plus.networkinfo.getCurrentType();
			if(CurrentType == plus.networkinfo.CONNECTION_NONE) {
				plus.nativeUI.toast("没有网络连接!");
				if(onerror) {
					onerror("没有网络连接!");
				}
				return;
			}
			xhr.onload = function(e) {
				var obj
				try {
					obj = JSON.parse(xhr.responseText);
				} catch(e) {
					console.log(e);
				}
				onload(obj);
			};

			xhr.onerror = function(e) {
				plus.nativeUI.toast("网络不给力！");
				if(onerror) {
					onerror(e);
				}
			};

			xhr.ontimeout = function(e) {
				plus.nativeUI.toast("网络不给力！");
				if(ontimeout) {
					ontimeout(e);
				}
			};

			xhr.open("POST", urls.AppLogOn());
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(body));
			
			setTimeout(function() {
				if(xhr.readyState < 4) {
					xhr.abort();
					if(ontimeout) {
						ontimeout("网络请求超时！");
					    plus.nativeUI.toast("网络请求超时！");
					}
				}
			}, 8000);

		})
	}

}