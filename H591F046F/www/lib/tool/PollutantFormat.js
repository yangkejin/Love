var PollutantFormat = (function(win, doc) {
	var arr = ["μg/m3", "mg/m3", "PM10", "PM2.5", "O3", "O3_8H", "SO2", "NO2", "NOX", "NOx"];
	var arrHtml = ["μg/m<sup>3</sup>", "mg/m<sup>3</sup>", "PM<sub>10</sub>", "PM<sub>2.5</sub>", "O<sub>3</sub>", "O<sub>3</sub>_8H", "SO<sub>2</sub>", "NO<sub>2</sub>", "NO<sub>X</sub>", "NO<sub>x</sub>"];
	var Chineses = ["颗粒物PM10", "细颗粒物PM2.5", "颗粒物(PM10)", "细颗粒物(PM2.5)", "臭氧1小时", "臭氧8小时", "臭氧", "二氧化硫", "二氧化氮", "一氧化碳"];
	var Englishs = ["PM10", "PM2.5", "PM10", "PM2.5", "O3", "O3_8H", "O3", "SO2", "NO2", "CO"];
	var _this = this;
	function getPollutantFormat(content) {
		if(!content) {
			return "—";
		}
		for(var i = 0; i < Chineses.length; i++) {
			if(content.indexOf(Chineses[i]) >= 0) {
				content = content.replace(new RegExp(Chineses[i], 'g'), Englishs[i]);//由于“()”在RegExp不能完成替换，增加下面方法
				
				if (content.indexOf("颗粒物(PM10)") >= 0) {
					content = content.replace(/颗粒物\(PM10\)/g,"PM10"); 
				}
				if (content.indexOf("细颗粒物(PM2.5)") >= 0) {
					content = content.replace(/细颗粒物\(PM2.5\)/g,"PM2.5"); 
				}
			}
		}
		for(var i = 0; i < arr.length; i++) {
			if(content.indexOf(arr[i]) >= 0) {
				var html = arrHtml[i];
				content = content.replace(new RegExp(arr[i], 'g'), html);
			}
		}
		return content;
	}
	
	return {
		setPollutantFormatById: function(id) {
			var content = doc.getElementById(id).innerText;
			doc.getElementById(id).innerHTML = getPollutantFormat(content);
		},
		getPollutantFormat: function(content) {
			return getPollutantFormat(content);
		}
	}
})(window, document);