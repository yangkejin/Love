var enterpriseType = "";
document.getElementById("corporate_type_btn").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = this;
	menu.btn_text = document.getElementById('corporate_type_btn_text');
	menu.liDatas = ["==ALL==", "造纸厂", "工业涂装", "包装印刷"];
	menu.liValues = ["", "1", "2", "21"];
	menu.show(menu.Direction.bottom, function(index, html, value) {
		enterpriseType = value;
		loadData();
	});
});

var streetCode = "";
document.getElementById("street_town_btn").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = this;
	menu.btn_text = document.getElementById('street_town_btn_text');
	menu.liDatas = StreetLiDatas;
	menu.liValues = StreetCodeLiDatas;
	menu.show(menu.Direction.bottom, function(index, html, value) {
		streetCode = value;
		loadData();
	});
});

var ExamineType = ""
document.getElementById("audit_situation_btn").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = this;
	menu.btn_text = document.getElementById('audit_situation_btn_text');
	menu.liDatas = ["全部", "填报中", "已提交", "审核中", "审核通过", "审核不通过"];
	menu.liValues = ["", "0", "1", "2", "3", "4", "5"];
	menu.show(menu.Direction.bottom, function(index, html, value) {
		ExamineType = value;
		loadData();
	});
});

var StreetLiDatas = ["==ALL=="];
var StreetCodeLiDatas = [""];

function loadStreetInfo() {
	var datas = new Datas();
	datas.GetStreetInfo(function(DBData) {
		filterStreet(DBData);
	}, function(NewData) {
		filterStreet(NewData);
	});
}

loadStreetInfo();

function filterStreet(data) {
	StreetLiDatas = ["==ALL=="];
	StreetCodeLiDatas = [""];
	var arr = [];
	if (data) {
		arr = data.datas;
	}
	for (var i = 0; i < arr.length; i++) {
		var obj = arr[i];
		StreetLiDatas.push(obj.NAME);
		StreetCodeLiDatas.push(obj.AREACODE);
	}
}

var app = new Vue({
	el: '.table',
	data: {
		list: []
	},
	methods: {
		view:function(ReportNO) {
			mui.openWindow({
				url: 'annex.html',
				id: 'annex',
				extras: {
					ReportNO: ReportNO
				},
				waiting: {
					title: '正在跳转...',
				}
			});
		},
		getTimePoint:function(time) {
			return DateTool.JSONDateStrToDateFormat(time, "yyyy-MM-dd");
		},
		getENTERPRISETYPE:function(ENTERPRISETYPE) {
			var type = "";
			if (ENTERPRISETYPE == 1) {
				type = "造纸厂";
			} else if (ENTERPRISETYPE == 2) {
				type = "工业涂装";
			} else if (ENTERPRISETYPE == 21) {
				type = "包装印刷";
			}
			return type;
		},
		getSTATUSCODE:function(STATUSCODE) {
			var status = ""
			if (STATUSCODE == "EAdding") {
				status = "填报中";
			} else if (STATUSCODE == "Esubmit") {
				status = "已提交";
			} else if (STATUSCODE == "AAuditing") {
				status = "审核中";
			} else if (STATUSCODE == "Apost") {
				status = "审核通过";
			} else if (STATUSCODE == "AnoPost") {
				status = "审核不通过";
			}
			console.log(STATUSCODE);
			return status;
		}
	}
});

function loadData() {
	var datas = new Datas();
	datas.GetEnterpriseReport(enterpriseType, streetCode, ExamineType, function(DBData) {
		if (DBData) {
			app.list = DBData.datas;
		} else {
			app.list = [];
		}
	}, function(NewData) {
		if (NewData) {
			app.list = NewData.datas;
		} else {
			app.list = [];
		}
	});
}

loadData();
