function webSQLTool() {
	this.db = window.openDatabase("YKJDB", "1.0", "DB", 10 * 1024 * 1024);
	var rowid = "rowid";
	var rowidType = rowid + " INTEGER PRIMARY KEY AUTOINCREMENT,";
	var columnStr = "";
	var columnArr = new Array();
	var insertValueStr = "";
	var insertValueArr = new Array();
	this.IncreaseColumns;
	this.IncreaseColumnValues;
	this.selectWhere;
	this.selectWhereValueArr;
	this.isArr;
	this.tableName;
	var _this = this;
/*
console.log(Object.prototype.toString.call(123)) //[object Number]
console.log(Object.prototype.toString.call('123')) //[object String]
console.log(Object.prototype.toString.call(undefined)) //[object Undefined]
console.log(Object.prototype.toString.call(true)) //[object Boolean]
console.log(Object.prototype.toString.call({})) //[object Object]
console.log(Object.prototype.toString.call([])) //[object Array]
console.log(Object.prototype.toString.call(function(){})) //[object Function]
*/
	this.saveData = function(newData) {
		if(Object.prototype.toString.call(newData) == "[object Object]") {
			_this.isArr = false;
			for(key in newData) {
				columnStr += key + ",";
				insertValueStr += "?,";
				columnArr.push(key);
			}
		} else if(Object.prototype.toString.call(newData) == "[object Array]") {
			_this.isArr = true;
			if(newData.length > 0) {
				for(key in newData[0]) {
					columnStr += key + ",";
					insertValueStr += "?,";
					columnArr.push(key);
				}
			}
		}
		
		if(_this.IncreaseColumnValues && _this.IncreaseColumns) {
			for(var i=0; i<_this.IncreaseColumns.length; i++) {
				var increaseColumn = _this.IncreaseColumns[i];
//				var increaseColumnValue = _this.IncreaseColumnValues[i];
				insertValueStr += "?,";
				columnStr += increaseColumn + ",";
//				columnArr.push(increaseColumn);
			}
		}
	    console.log(columnArr);

		if(columnStr.length > 0) {
			columnStr = columnStr.substr(0, columnStr.length - 1);
		}
		if(insertValueStr.length > 0) {
			insertValueStr = insertValueStr.substr(0, insertValueStr.length - 1);
		}

		_this.db.transaction(function(tx) {
			_this.createTable(tx);
			_this.select(tx, _this.selectWhere, _this.selectWhereValueArr, function(DBData) {
				if(!DBData || DBData.length == 0) {
					if(_this.isArr) {
						for(var i = 0; i < newData.length; i++) {
							_this.insert(tx, newData[i]);
						}
					} else {
						_this.insert(tx, newData);
					}
				} else {
					if(_this.isArr) {
						if(newData.length >= DBData.length) {
							for(var i = 0; i < DBData.length; i++) {
								_this.update(tx, newData[i], rowid + "=" + DBData[i].rowid);
							}
							for(var i = DBData.length;i<newData.length;i++) {
								_this.insert(tx, newData[i]);
							}
						} else {
							for(var i = 0; i < newData.length; i++) {
								_this.update(tx, newData[i], rowid + "=" + DBData[i].rowid);
							}
							for(var i = newData.length;i<DBData.length;i++) {
								_this.delegate(tx, rowid + "=" + DBData[i].rowid);
							}
						}
					}else {
						_this.update(tx, newData, rowid + "=" + DBData.rowid);
					}
				}
			});
		});

	}

	this.createTable = function(tx) {
		var createDataSQL = "CREATE TABLE IF NOT EXISTS " + _this.tableName + " (" + rowidType + columnStr + ")";
		tx.executeSql(createDataSQL, [], function(tx, results) {}, function(tx, error) {
			console.log("error:"+createDataSQL);
		});
	}

	this.insert = function(tx, dic) {
		var valueArr = new Array();
		for(var j = 0; j < columnArr.length; j++) {
			valueArr.push(dic[columnArr[j]]);
		}
		if(_this.IncreaseColumnValues && _this.IncreaseColumns) {
			for(var i=0; i<_this.IncreaseColumnValues.length; i++) {
				var increaseColumnValue = _this.IncreaseColumnValues[i];
				valueArr.push(increaseColumnValue);
			}
		}
		var insertDataSQL = "INSERT INTO " + _this.tableName + " (" + columnStr + ") VALUES (" + insertValueStr + ")";
		tx.executeSql(insertDataSQL, valueArr, function(tx, results) {}, function(tx, error) {
			console.log("error:"+insertDataSQL);
		});
	}

	this.update = function(tx, dic, where) {
		var valueArr = new Array();
		var SETStr = "";
		for(var j = 0; j < columnArr.length; j++) {
			valueArr.push(dic[columnArr[j]]);
			SETStr += columnArr[j] + "= ?,";
		}
		if(_this.IncreaseColumnValues && _this.IncreaseColumns) {
			for(var i=0; i<_this.IncreaseColumns.length; i++) {
				var increaseColumn = _this.IncreaseColumns[i];
				var increaseColumnValue = _this.IncreaseColumnValues[i];
				valueArr.push(increaseColumnValue);
				SETStr += increaseColumn + "= ?,";
			}
		}
		if(SETStr.length > 0) {
			SETStr = SETStr.substr(0, SETStr.length - 1);
		}
		var updateDataSQL = "UPDATE " + _this.tableName + " SET " + SETStr + " WHERE " + where;
		tx.executeSql(updateDataSQL, valueArr, function(tx, results) {}, function(tx, error) {
			console.log("error:"+updateDataSQL);
		});
	}

	this.delegate = function(tx, where) {
		var deleteDataSQL = "DELETE FROM " + _this.tableName + " WHERE " + where;
		tx.executeSql(deleteDataSQL, [],
			function(tx, results) {},
			function(tx, error) {
				console.log("error:"+deleteDataSQL);
			});
	}

	this.select = function(tx, where, whereValueArr, Callback) {
		var selectSQL = "SELECT * FROM " + _this.tableName;
		if(where && where.length > 0) {
			selectSQL += " WHERE "+where;
		}
		tx.executeSql(selectSQL, whereValueArr,
			function(tx, results) {
				if(!_this.isArr) {
					if(results.rows.length > 0) {
						Callback(results.rows.item(0));
					}else {
						Callback([]);
					}
				} else {
					var len = results.rows.length;
					var i;
					var arr = new Array();
					for(i = 0; i < len; i++) {
						arr.push(results.rows.item(i));
					}
					Callback(arr);
				}
			},
			function(tx, error) {
				console.log("error:"+selectSQL);
				if(_this.isArr) {
					Callback([]);
				}else {
				    Callback({});
				}
			});
	}

}