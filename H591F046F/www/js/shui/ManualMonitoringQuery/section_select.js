mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var selectData = self.selectData;
	app.selectData = selectData;
});

var app = new Vue({
	el: '.content',
	data: {
		ExtensionData: [],
		Sections: [],
		selectData: []
	},
	methods: {
		delItem: function(item, index) {
			app.selectData.splice(getArrIndex(app.selectData, item), 1);
		},
		selectLeftItem: function(item, index) {
			initData(index);
		},
		selectRightItem: function(item, index) {
			//selectRightItem(item);
			if (isPresence(this.selectData, item)) {
				this.selectData.splice(getArrIndex(this.selectData, item), 1);
			} else {
				this.selectData.push(item);
			}
			this.$forceUpdate();
		},
		bindImgSrc: function(item) {
			var src = "";
			for (var i = 0; i < this.selectData.length; i++) {
				var dic = this.selectData[i];
				if (item.Name == dic.Name) {
					src = "url(../../../img/shui/Selected.png)";
				}
			}
			return {
				"background-image": src
			};
		},
		bindBgColor: function(isSelect) {
			var color;
			if (isSelect) {
				color = "white";
			} else {
				color = "#f1f2f3";
			}
			return {
				"background-color": color,
			};
		}
	}
});

function selectRightItem(item) {
	if (isPresence(app.selectData, item)) {
		app.selectData.splice(getArrIndex(app.selectData, item), 1);
	} else {
		app.selectData.push(item);
	}
	app.$forceUpdate();
}

function isPresence(arr, item) {
	for (var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		if (dic.Name == item.Name) {
			return true;
		}
	}
	return false;
}

function getArrIndex(arr, item) {
	for (var i = 0; i < arr.length; i++) {
		var dic = arr[i];
		if (dic.Name == item.Name) {
			return i;
		}
	}
}


var datas = new Datas();
datas.GetRiverSections(function(DBData) {
	if (DBData) {
		app.ExtensionData = DBData.ExtensionData;
		initData(0);
	}
}, function(NewData) {
	if (NewData) {
		app.ExtensionData = NewData.ExtensionData;
		initData(0);
	}
});

function initData(index) {
	for (var i = 0; i < app.ExtensionData.length; i++) {
		var dic = app.ExtensionData[i];
		if (i == index) {
			dic.isSelect = true;
			app.Sections = app.ExtensionData[index].Sections;
		} else {
			dic.isSelect = false;
		}
	}
}

document.getElementById("none_v").addEventListener("click", function() {
	mui.plusReady(function() {
		mui.fire(plus.webview.getWebviewById("trend_query.html"), 'section_select_back', app.selectData);
	})
	mui.back();
});
