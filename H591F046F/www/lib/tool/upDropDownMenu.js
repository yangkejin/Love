function upDropDownMenu() {
	var mask, ul, li,arrow;
	this.arrowHeight = 10;
	this.btn;
	this.btn_text;
	this.liDatas = ["综合指数", "SO2", "NO2", "CO", "O3", "PM2.5", "PM10"];
	this.liValues = ["shunyi", "beijing", "jingjinyi", "226"];
	this.fontSize = "12px";
	var bodyHeight = document.body.offsetHeight ? document.body.offsetHeight : document.documentElement.clientHeight;
	var bodyWidth = document.body.offsetWidth ? document.body.offsetWidth : document.documentElement.clientWidth;
	var ulMaxWith = bodyWidth - 20;

	this.Direction = {
		top: 0,
		bottom: 1,
		auto: 2
	}
	var _this = this;

	String.prototype.width = function(font) {
		var f = font || '12px',
			o = $('<div>' + this + '</div>')
			.css({
				'position': 'absolute',
				'float': 'left',
				'white-space': 'nowrap',
				'visibility': 'hidden',
				'font': f
			})
			.appendTo($('body')),
			w = o.offsetWidth;
		o.remove();
		if(w > ulMaxWith) {
			w = ulMaxWith;
		}
		return w;
	};

	function maxStr(datas) {
		var mStr = "";
		for(var i = 0; i < datas.length; i++) {
			if(mStr.length < datas[i].length) {
				mStr = datas[i];
			}
		}
		return mStr;
	};

	function getAbsPoint(e) {
		var x = e.offsetLeft,
			y = e.offsetTop;
		while(e = e.offsetParent) {
			x += e.offsetLeft;
			y += e.offsetTop;
		}
		x = x - document.body.scrollLeft;
		y = y - document.body.scrollTop;
		return {
			x: x,
			y: y
		};
	}

	this.selectedIndex = function(index) {
		_this.btn.innerText = _this.liDatas[index];
	}

	this.show = function(Direction, CallBack) {
		if(Direction == null) {
			Direction = _this.Direction.auto;
		}

		var clientRect = _this.btn.getBoundingClientRect();
		var bodyTop = clientRect.top + document.body.scrollTop;

		if(Direction == _this.Direction.auto) {
			var topHeight = (bodyTop - 45);
			var bottomHeight = (bodyHeight - bodyTop - clientRect.height - 51);

			if(topHeight > bottomHeight) {
				Direction = _this.Direction.top;
			} else {
				Direction = _this.Direction.bottom;
			}
			console.log("Direction:" + bodyHeight);
		}

		if(document.getElementById("upDropDownMenu_mask") != null) {
			document.body.removeChild(document.getElementById("upDropDownMenu_mask"));
		}

		mask = document.createElement("div");
		document.body.appendChild(mask);

		mask.setAttribute("id", "upDropDownMenu_mask");
		var maskStyle = mask.style;
		maskStyle.position = "absolute";
		maskStyle.top = 0;
		maskStyle.left = 0;
		maskStyle.height = bodyHeight + "px";
		if(bodyHeight == 0) {
			maskStyle.height = 100 + "vh";
		}
		maskStyle.width = "100vw";
		maskStyle.backgroundColor = "rgba(0,0,0,0)";
		maskStyle.zIndex = 9999;
		maskStyle.fontSize = _this.fontSize; 

		ul = document.createElement("ul"); 
		ul.setAttribute("id", "upDropDownMenu_ul");
		ul.style.backgroundColor = "white";
		ul.style.overflow = "auto";
		ul.style.borderRadius = "5px";
		ul.style.paddingTop = "5px";
		ul.style.paddingBottom = "5px";
		ul.style.boxShadow = " 0 0 50px #888888";
		ul.style.width = maxStr(_this.liDatas).width(_this.fontSize) + "px";
		ul.style.maxWidth = ulMaxWith + "px";
		ul.style.position = "absolute";

		var ulStyprMaxHeight;
		if(Direction == _this.Direction.bottom) {
			ulStyprMaxHeight = (bodyHeight - bodyTop - clientRect.height - 51) + "px";
		} else if(Direction == _this.Direction.top) {
			ulStyprMaxHeight = (bodyTop - 45) + "px";
		}
		ul.style.maxHeight = ulStyprMaxHeight;

		for(var i = 0; i < _this.liDatas.length; i++) {
			li = document.createElement("li");
			li.setAttribute("value", _this.liValues[i]);
			li.style.listStyleType = "none";
			li.style.padding = "5px"
			li.style.textAlign = "center";
			if(i != _this.liDatas.length - 1) {
				li.style.border = "1px solid #ccc";
				li.style.borderTop = "none";
				li.style.borderLeft = "none";
				li.style.borderRight = "none";
			}
			li.style.height = "auto";
			li.style.wordBreak = "break-all";
			li.style.wordWrap = "break-word";
			li.innerHTML = _this.liDatas[i];
			ul.appendChild(li);
		}
		var ulHeight = ul.style.height; 
		mask.appendChild(ul);

		var ulStyleTop;
		if(Direction == _this.Direction.bottom) {
			ulStyleTop = bodyTop + clientRect.height + _this.arrowHeight;
		} else if(Direction == _this.Direction.top) {
			ulStyleTop = bodyTop - ul.offsetHeight - _this.arrowHeight;
		}
		ul.style.top = ulStyleTop +"px";

		var ulLeft = 0;
		if(ul.offsetWidth > clientRect.width) {
			ulLeft = (ul.offsetWidth - clientRect.width) / 2;
		} else {
			ul.style.width = clientRect.width + "px";
		}
		if(clientRect.left - ulLeft < 10) {
			ul.style.left = 10 + "px";
		} else {
			if((clientRect.left - ulLeft + ul.offsetWidth - 20) > ulMaxWith) {
				ul.style.right = 10 + "px";
			} else {
				ul.style.left = (clientRect.left - ulLeft) + "px";
			}
		}
		
		arrow = document.createElement("div");
		arrow.style.width = 0;
		arrow.style.height = 0;
		arrow.style.display = "block";
	    arrow.style.position = "absolute";
		arrow.style.left = (clientRect.left + clientRect.width/2 - _this.arrowHeight) + "px";
		if(Direction == _this.Direction.bottom) {
			arrow.style.top = (ulStyleTop - _this.arrowHeight) + "px";
			arrow.style.borderBottom = _this.arrowHeight + "px solid white";
		} else if(Direction == _this.Direction.top) {
			arrow.style.top = (ulStyleTop + ul.offsetHeight) + "px";
			arrow.style.borderTop = _this.arrowHeight + "px solid white";
		}
		arrow.style.borderLeft = _this.arrowHeight + "px solid transparent";
		arrow.style.borderRight = _this.arrowHeight + "px solid transparent"; 
		mask.appendChild(arrow);
	
		
		function closeMenu() {
			if(mask) {
				document.body.removeChild(mask);
				mask = null;
			}
		}

		mask.addEventListener("click", function(ev) {
			closeMenu();
		});

		$("#upDropDownMenu_ul li").on("click", function(ev) {
			if(_this.btn_text) {
				_this.btn_text.innerHTML = this.innerHTML;
			}
			closeMenu();
			var index = $(this).index(); //获取索引下标 也从0开始
			var html = $(this).html(); //文本内容
			var value = this.getAttribute("value");
			if(CallBack){ 
				CallBack(index, html, value);
			}
		});
	}
}