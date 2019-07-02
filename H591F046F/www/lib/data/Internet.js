function Internet() {
	this.IncreaseColumns; //增加的字段 例如：["one"]
	this.IncreaseColumnValues; //增加的字段的值 例如：["one"]
	this.timeout = 20;
	this.oldxhr;
	this.isArr;
	var _this = this;

	this.simpleXMLHttpRequest_isGet_body = function(url, isGet, body, onload, onerror, ontimeout, CallbackXhr) {
		mui.plusReady(function() {
			url = encodeURI(url);

			var xhr = new plus.net.XMLHttpRequest();
			var CurrentType = plus.networkinfo.getCurrentType();
			if (CurrentType == plus.networkinfo.CONNECTION_NONE) {
				plus.nativeUI.toast("没有网络连接!");
				if (onerror) {
					onerror("没有网络连接!");
				}
				return;
			}
			xhr.onload = function(e) {
				if (onload) {
					onload(xhr.responseText);
				}
			};

			xhr.onerror = function(e) {
				plus.nativeUI.toast("网络不给力！");
				if (onerror) {
					onerror(e);
				}
			};

			xhr.ontimeout = function(e) {
				plus.nativeUI.toast("网络不给力！");
				if (ontimeout) {
					ontimeout(e);
				}
			};

			if (isGet) {
				xhr.open("GET", url);
				xhr.send();
			} else {
				xhr.open("POST", url);
				xhr.setRequestHeader('Content-Type', 'application/json');
				if (body) {
					xhr.send(JSON.stringify(body));
				} else {
					xhr.send();
				}
			}

			if (_this.timeout != 0) {
				setTimeout(function() {
					if (xhr.readyState < 4) {
						xhr.abort();
						if (ontimeout) {
							ontimeout("网络请求超时！");
							plus.nativeUI.toast("网络请求超时！");
						}
					}
				}, Number(_this.timeout + "000"));
			}
			if (CallbackXhr) {
				CallbackXhr(xhr);
			}
		})
	}
	
	this.simpleXMLHttpRequest_isGet_body_v2 = function(url, isGet, body, CallbackData, CallbackXhr) {
		_this.simpleXMLHttpRequest_isGet_body(url, isGet, body,function(text) {
					var obj
					try {
						obj = JSON.parse(text);
					} catch (e) {
						
					}
					CallbackData(obj,null);
				},
				function(e) {
					CallbackData(null,e);
				},
				function(e) {
					CallbackData(null,e);
				},
				function(xhr) {
					if(CallbackXhr){
						CallbackXhr(xhr);
					}
				});
	}

	this.CallbackDBData = function() {}
	this.CallbackNewData = function() {}
	this.CallbackXhr = function() {}

	this.GET_url_tableName = function(url, tableName) {
		_this.common_url_tableName_isGet_body(url, tableName, true, null, function(DBData) {
			_this.CallbackDBData(DBData);
		}, function(newData) {
			_this.CallbackNewData(newData);
		}, function(xhr) {
			_this.CallbackXhr(xhr);
		});
	}

	this.POST_url_tableName_body = function(url, tableName, body, CallbackDBData, CallbackNewData, CallbackXhr) {
		_this.common_url_tableName_isGet_body(url, tableName, false, body, function(DBData) {
			_this.CallbackDBData(DBData);
		}, function(newData) {
			_this.CallbackNewData(newData);
		}, function(xhr) {
			_this.CallbackXhr(xhr);
		});
	}

	this.common_url_tableName_isGet_body = function(url, tableName, isGet, body, CallbackDBData, CallbackNewData,
		CallbackXhr) {
		if (_this.oldxhr) {
			console.log("abort()");
			_this.oldxhr.abort();
		}

		var sql = new webSQLTool();
		sql.tableName = tableName;
		sql.isArr = _this.isArr;
		sql.IncreaseColumns = _this.IncreaseColumns;
		sql.IncreaseColumnValues = _this.IncreaseColumnValues;

		var selectWhere = "";
		if (_this.IncreaseColumns) {
			for (var i = 0; i < _this.IncreaseColumns.length; i++) {
				selectWhere += _this.IncreaseColumns[i] + "=?,";
			}
			if (selectWhere.length > 0) {
				selectWhere = selectWhere.substr(0, selectWhere.length - 1);
			}
		}
		sql.selectWhere = selectWhere;
		sql.selectWhereValueArr = _this.IncreaseColumnValues;

		function getDBData() {
			sql.db.transaction(function(tx) {
				sql.select(tx, selectWhere, _this.IncreaseColumnValues, function(obj) {
					CallbackDBData(obj);
				});
			});
		}
		getDBData();

		_this.simpleXMLHttpRequest_isGet_body(url, isGet, body,
			function(text) {
				var obj = JSON.parse(text);
				sql.saveData(obj);
				if (_this.isArr) {
					obj = [];
				} else {
					obj = {};
				}
				CallbackNewData(obj);
			},
			function(e) {
				getDBData();

			},
			function(e) {
				getDBData();

			},
			function(xhr) {
				CallbackXhr(xhr);
			});
	}

	this.GETMN_url_tableName = function(url, tableName) {
		_this.commonMN_url_tableName_isGet_body(url, tableName, true, null, function(DBData) {
			_this.CallbackDBData(DBData);
		}, function(newData) {
			_this.CallbackNewData(newData);
		}, function(xhr) {
			_this.CallbackXhr(xhr);
		});
	}

	this.POSTMN_url_tableName_body = function(url, tableName, body) {
		_this.commonMN_url_tableName_isGet_body(url, tableName, false, body, function(DBData) {
			_this.CallbackDBData(DBData);
		}, function(newData) {
			_this.CallbackNewData(newData);
		}, function(xhr) {
			_this.CallbackXhr(xhr);
		});
	}

	this.commonMN_url_tableName_isGet_body = function(url, tableName, isGet, body, CallbackDBData, CallbackNewData,
		CallbackXhr) {
		mui.plusReady(function() {
			if (_this.oldxhr) {
				console.log("abort()");
				_this.oldxhr.abort();
			}

			function getKeyStr() {
				var key = "";
				key += tableName;
				if (_this.IncreaseColumnValues && _this.IncreaseColumns) {
					for (var i = 0; i < _this.IncreaseColumns.length; i++) {
						var increaseColumn = _this.IncreaseColumns[i];
						var increaseColumnValue = _this.IncreaseColumnValues[i];
						key += "_" + increaseColumn + "(" + increaseColumnValue + ")";
					}
				}
				return key;
			}

			var storage = new StorageTool();
			storage.tableName = getKeyStr();

			function getDBData() {
				var obj
				try {
					obj = JSON.parse(storage.getStr());
				} catch (e) {
					console.log(e + obj);
				}
				CallbackDBData(obj);
			}

			function getDBData_CallbackNewData() {
				var obj
				try {
					obj = JSON.parse(storage.getStr());
				} catch (e) {
					console.log(e + obj);
				}
				CallbackNewData(obj);
			}

			getDBData();

			_this.simpleXMLHttpRequest_isGet_body(url, isGet, body,
				function(text) {
					var obj
					try {
						obj = JSON.parse(text);
						storage.setStr(text);
					} catch (e) {

					}
					CallbackNewData(obj);
				},
				function(e) {
					getDBData_CallbackNewData();
				},
				function(e) {
					getDBData_CallbackNewData();
				},
				function(xhr) {
					CallbackXhr(xhr);
				});
		})

	}
}
