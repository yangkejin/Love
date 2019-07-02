
var enterpriseType = "";
document.getElementById("corporate_type_btn").addEventListener("click", function() {
	var menu = new upDropDownMenu();
	menu.btn = this;
	menu.btn_text = document.getElementById('corporate_type_btn_text');
	menu.liDatas = ["==ALL==", "造纸厂", "工业涂装", "包装印刷"];
	menu.liValues = ["","1", "2", "21"];
	menu.show(menu.Direction.bottom, function(index, html, value) {
		enterpriseType = value;
		
	});
});

document.getElementById("search_btn").addEventListener("click", function() {
	loadData();
});

var search_input = document.getElementById("search_input");

var app = new Vue({
	el: '.table',
	data: {
		list: []
	},
	methods: {
		getTimePoint:function(time) {
			return DateTool.JSONDateStrToDateFormat(time,"yyyy-MM-dd");
		},
		getENTERPRISETYPE:function(ENTERPRISETYPE) {
			var type = "";
			if(ENTERPRISETYPE == 1) {
				type = "造纸厂";
			}else if(ENTERPRISETYPE == 2) {
				type = "工业涂装";
			}else if(ENTERPRISETYPE == 21) {
				type = "包装印刷";
			}
			return type;
		}
	}
});

function loadData() {
	var datas = new Datas();
	console.log("enterpriseType："+enterpriseType);
	datas.EnterpriseInfo(enterpriseType,search_input.value,function(DBData){
		if(DBData){
			app.list = DBData.datas;
		}else {
			app.list = [];
		}
	},function(NewData){
		if(NewData){
			app.list = NewData.datas;
		}else {
			app.list = [];
		}
	});
}

loadData();
