function Segmentation() {
	this.liDatas = ["国控排名", "微型排名"];
	this.liValues = ["shunyi", "beijing", "jingjinyi", "226"];
	this.id = "seg_ul";
	var ul, li;
	this.content;
	this.selectBgColor = "white";
	this.unselectBgColor = "rgba(0,0,0,0)";
	this.selectTextColor = "#1e6dcc";
	this.unselectTextColor = "white";
	this.defaultSelectIndex = 0;
	this.borderColor = "white";
	this.radius = "5px";
	this.fontSize = "15px";
	this.padding = "6px"
	this.CallBack;
	var _this = this;

	this.show = function() {
		ul = document.getElementById(_this.id)
		if(ul) {
			//$("#page").empty();
			_this.content.removeChild(ul);
			ul = null;
		}

		ul = document.createElement("ul");
		ul.setAttribute("id", _this.id);
		ul.style.margin = 0;
		ul.style.padding = 0;
		ul.style.listStyle = "none";
		ul.style.fontSize = _this.fontSize;
		//	 	ul.style.display = "inline-block"
		_this.content.appendChild(ul);
		for(var i = 0; i < _this.liDatas.length; i++) {
			var str = _this.liDatas[i];
			li = document.createElement("li");
			li.setAttribute("value", _this.liValues[i]);
			li.style.listStyleType = "none";
			li.style.padding = _this.padding;
			li.style.border = "1px solid " + _this.borderColor;
			li.style.display = "inline";
			li.style.color = _this.unselectTextColor;
			li.style.backgroundColor = _this.unselectBgColor;
			li.innerHTML = str;
			if(i == _this.defaultSelectIndex) {
				li.style.color = _this.selectTextColor;
				li.style.backgroundColor = _this.selectBgColor;
				if(_this.CallBack) {
					_this.CallBack(i, _this.liDatas[i], _this.liValues[i]);
				}
			}
			if(i == 0) {
				li.setAttribute("class", "active");
				li.style.borderRadius = _this.radius+" 0px 0px "+_this.radius;
			}
			if(i == _this.liDatas.length - 1) {
				li.style.borderRadius = "0px "+_this.radius+" "+_this.radius+" 0px";
			} else {
				li.style.borderRight = "none";
			}
			ul.appendChild(li);
		}
		
		mui('#'+_this.id).on('tap', 'li', function(e) {
			//$("#seg_ul li").on("click", function(ev) {
			var str = "#"+_this.id+" li";
			console.log(str);
			$(str).css({
				"background-color": _this.unselectBgColor,
				"color": _this.unselectTextColor
			});
			$(this).css({
				"background-color": _this.selectBgColor,
				"color": _this.selectTextColor
			});
			type = $(this).attr("type");
			var index = $(this).index(); //获取索引下标 也从0开始
			var text = $(this).text(); //文本内容
			var value = this.getAttribute("value");
			if(_this.CallBack) {
				_this.CallBack(index, text, value);
			}
		});
	}
}