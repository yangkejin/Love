mui.plusReady(function(){
    var self = plus.webview.currentWebview();
    var ReportNO = self.ReportNO;
	//loadData("2018081011484760");
	loadData(ReportNO);
});

var app = new Vue({
	el: '.table',
	data: {
		list: []
	},
	methods: {
		getTimePoint:function(time) {
			return DateTool.JSONDateStrToDateFormat(time, "yyyy-MM-dd");
		},
		viewClick:function(item) {
			mui.openWindow({
				url: 'PDF.html',
				id: 'PDF',
				extras: {
					FILEPATH: item.FILEPATH
				},
				waiting: {
					title: '正在跳转...',
				}
			});
		}
	}
});

function loadData(ReportNO) {
	var datas = new Datas();
	datas.GetFileLists(ReportNO,function(DBData){
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