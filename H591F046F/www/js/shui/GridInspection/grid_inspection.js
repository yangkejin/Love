var app = new Vue({
	el: '.latest-news',
	data: {
		ExtensionData: {}
	}
});
var textAutoScroll = new TextAutoScroll();
var lastEvent = document.getElementById("lastEvent");

var datas = new Datas();
datas.GetLastEvent(function(NewData) {
	app.ExtensionData = NewData.ExtensionData;
	Vue.nextTick(function() {
		setTimeout(function() {
			textAutoScroll.startScroll(lastEvent,textAutoScroll.ScrollTypeEnum.LeftRight);
		}, 0);
	})
});

var app2 = new Vue({
	el: '.second-menu',
	data: {
		ExtensionData: {}
	}
});

datas.GetEventTaskSurvey(function(NewData) {
	 app2.ExtensionData = NewData.ExtensionData;
	// Vue.nextTick(function() {
	// 	setTimeout(function() { 
	// 		textAutoScroll.startScroll(lastEvent,textAutoScroll.ScrollTypeEnum.LeftRight);
	// 	}, 0);
	// })
});
