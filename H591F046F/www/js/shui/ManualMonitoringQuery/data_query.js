var liDatas = [];
var liValues = [];
var datas = new Datas();
datas.GetQueryTemplate(function(DBData) {
	if (DBData) {
		filterData(DBData.ExtensionData);
	}
}, function(NewData) {
	if (NewData) {
		filterData(NewData.ExtensionData);
	}
});

function filterData(arr) {
	liDatas = [];
	liValues = [];
	for (var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		liDatas.push(dic.Name);
		liValues.push(dic.Id);
	}
}

var format = document.getElementById("format");
var formatSelectValue;
format.addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = document.getElementById('format');
	menu.btn_text = format;
	menu.arrowHeight = 0;
	menu.liDatas = liDatas;
	menu.liValues = liValues;
	menu.show(menu.Direction.auto, function(index, html, value) {
		format.value = html;
		formatSelectValue = value;
	});
});

var start_time = document.getElementById("start_time");
start_time.addEventListener("click", function() {
	var date = new Date();
	var _self = this;
	var beginY = 2015;
	var endY = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();

	var optionsJson = {
		"value": _self.value,
		"type": "month",
		"beginYear": beginY,
		"beginMonth": m,
		"endYear": endY,
		"endMonth": m,
	};
	_self.picker = new mui.DtPicker(optionsJson);
	_self.picker.show(function(rs) {
		var value = rs.value;
		value = value.replace(new RegExp('/', 'g'), '-');
		start_time.value = value;
		_self.picker.dispose();
		_self.picker = null;
		//upDownRefresh.headerBeginRefreshing();
	});
});

var end_time = document.getElementById("end_time");
end_time.addEventListener("click", function() {
	var date = new Date();
	var _self = this;
	var beginY = 2015;
	var endY = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();

	var optionsJson = {
		"value": _self.value,
		"type": "month",
		"beginYear": beginY,
		"beginMonth": m,
		"endYear": endY,
		"endMonth": m,
	};
	_self.picker = new mui.DtPicker(optionsJson);
	_self.picker.show(function(rs) {
		var value = rs.value;
		value = value.replace(new RegExp('/', 'g'), '-');
		end_time.value = value;
		_self.picker.dispose();
		_self.picker = null;
		//upDownRefresh.headerBeginRefreshing();
	});
});

document.getElementById("query").addEventListener("click", function() { 
	
	var table_content_title = document.getElementById("Table_content_title");
	table_content_title.innerHTML = start_time.value +"至"+end_time.value +"监测结果";
	
	var datas = new Datas();
	datas.GetSearchData(start_time.value, end_time.value, formatSelectValue, function(DBData) {
		// if(DBData) {
		// 	app.Data = DBData.ExtensionData.Data;
		// }
	}, function(NewData) {
		if (NewData) {
			app.ExtensionData = NewData.ExtensionData;
			app.Columns = NewData.ExtensionData.Columns;
			//console.log(app.Columns);
		}
	});
});

var app = new Vue({
	el: '.table_content',
	data: {
		ExtensionData: [],
		Columns: []
	},
	methods: {
		getItemValue: function(item, key) {
			return item[key];
		}
	}
});
