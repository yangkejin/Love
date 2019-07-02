var DateTool = (function() {
	return {
		dateFormat: function(dt, format) {
			dt = dt.replace(/T/g, " ");
			dt = dt.replace(/-/g, "/");
			var newDt = new Date(dt);
			var o = {
				"M+": newDt.getMonth() + 1, //month 
				"d+": newDt.getDate(), //day 
				"h+": newDt.getHours(), //hour 
				"m+": newDt.getMinutes(), //minute 
				"s+": newDt.getSeconds(), //second 
				"q+": Math.floor((newDt.getMonth() + 3) / 3), //quarter 
				"S": newDt.getMilliseconds() //millisecond 
			};
			if(/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (newDt.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for(var k in o) {
				if(new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			if(format.indexOf('aN') >= 0) {
				format = format.replace(new RegExp('aN', 'g'), '—');
			}
			return format;
		},
		JSONDateStrToDate: function(JSONDateStr) {
			var date = eval('new ' + JSONDateStr.substr(1, JSONDateStr.length - 2));
			return date;
		},
		JSONDateStrToDateFormat: function(JSONDateStr,fmt) {
			if(JSONDateStr == null) {
				return "—";
			}else {
				var date = eval('new ' + JSONDateStr.substr(1, JSONDateStr.length - 2));
				return date.Format(fmt);
			}
		}
	}
})();

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// let time1 = new Date().Format("yyyy-MM-dd");
// let time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
 
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}; 