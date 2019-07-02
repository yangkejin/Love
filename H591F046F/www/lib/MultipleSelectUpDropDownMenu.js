function MultipleSelectUpDropDownMenu() {
	var mask, ul, li, arrow;
	this.arrowHeight = 0;
	this.btn;
	this.btn_text;
	this.liDatas = ["综合指数", "SO2", "NO2", "CO", "O3", "PM2.5", "PM10"];
	this.liValues = ["shunyi", "beijing", "jingjinyi", "226"];
	this.selectDatas = new Array();
	this.fontSize = "12px";
	var bodyHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	var bodyWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
	var ulMaxWith = bodyWidth - 20;
	this.MaxHeight = 0;

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
		maskStyle.textAlign = "center"
		maskStyle.top = 0;
		maskStyle.left = 0;
		maskStyle.height = bodyHeight + "px";
		if(bodyHeight == 0) {
			maskStyle.height = 100 + "vh";
		}
		maskStyle.width = "100vw";
		maskStyle.backgroundColor = "rgba(0,0,0,.2)";
		maskStyle.zIndex = 9999;
		maskStyle.fontSize = _this.fontSize;

		var mask_content = document.createElement("div");
		mask_content.style.position = "relative";
		mask_content.style.boxShadow = " 0 0 50px #888888";
		mask_content.style.borderRadius = "5px";
		mask_content.style.backgroundColor = "white";
		mask.appendChild(mask_content);

		ul = document.createElement("ul");
		ul.setAttribute("id", "upDropDownMenu_ul");
		//		ul.style.backgroundColor = "rgba(0,0,0,.2)";
		ul.style.overflow = "auto";
		ul.style.paddingTop = "5px";
		ul.style.paddingBottom = "5px";
		ul.style.width = maxStr(_this.liDatas).width(_this.fontSize) + "px";
		ul.style.maxWidth = ulMaxWith + "px";
		ul.style.position = "relative";

		var ulStyprMaxHeight;
		var ulStyprMaxHeightInt;
		if(Direction == _this.Direction.bottom) {
			ulStyprMaxHeightInt = bodyHeight - bodyTop - clientRect.height - 51;
			ulStyprMaxHeight = (bodyHeight - bodyTop - clientRect.height - 51) + "px";
		} else if(Direction == _this.Direction.top) {
			ulStyprMaxHeightInt = bodyTop - 45;
		}
		if(_this.MaxHeight < ulStyprMaxHeightInt && _this.MaxHeight != 0) {
			ulStyprMaxHeightInt = _this.MaxHeight;
		}
		ulStyprMaxHeight = ulStyprMaxHeightInt + "px";

		ul.style.maxHeight = ulStyprMaxHeight;

		for(var i = 0; i < _this.liDatas.length; i++) {
			li = document.createElement("li");
			li.setAttribute("value", _this.liValues[i]);
			li.style.listStyleType = "none";
			li.style.padding = "5px"
			li.style.textAlign = "center";
			//if(i != _this.liDatas.length - 1) {
			li.style.border = "1px solid #ccc";
			li.style.borderTop = "none";
			li.style.borderLeft = "none";
			li.style.borderRight = "none";
			//}
			li.style.height = "auto";
			li.style.wordBreak = "break-all";
			li.style.wordWrap = "break-word";
			var checkedStr = '';
			if( _this.selectDatas.indexOf(_this.liDatas[i]) != -1) {
				checkedStr = 'checked="checked"';
			}

			li.innerHTML = '<div class="mui-input-row mui-checkbox">' +
				'<label>' + _this.liDatas[i] +
				'</label>' +
				'<input '+checkedStr+' name="checkbox1" data="' + _this.liDatas[i] + '" value="' + _this.liValues[i] + '" " type="checkbox">' +
				'</div>'

			ul.appendChild(li);
		}
		if(_this.selectDatas) {
			for(var i = 0; i < _this.selectDatas.length; i++) {
				var input = document.getElementById("checkbox1");
				if(input) {
					input.checked = true;
				}
			}
		}
		var ulHeight = mask_content.style.height;
		mask_content.appendChild(ul);

		var ulStyleTop;
		if(Direction == _this.Direction.bottom) {
			ulStyleTop = bodyTop + clientRect.height + _this.arrowHeight;
		} else if(Direction == _this.Direction.top) {
			ulStyleTop = bodyTop - ul.offsetHeight - _this.arrowHeight - 40;
		}
		mask_content.style.top = ulStyleTop + "px";

		var ulLeft = 0;
		if(ul.offsetWidth > clientRect.width) {
			ulLeft = (ul.offsetWidth - clientRect.width) / 2;
		} else {
			mask_content.style.width = clientRect.width + "px";
		}
		if(clientRect.left - ulLeft < 10) {
			mask_content.style.left = 10 + "px";
		} else {
			if((clientRect.left - ulLeft + ul.offsetWidth - 20) > ulMaxWith) {
				mask_content.style.right = 10 + "px";
			} else {
				mask_content.style.left = (clientRect.left - ulLeft) + "px";
			}
		}

		var btn_div = document.createElement("div");
		btn_div.style.position = "relative";
		btn_div.style.width = "100%";
		btn_div.style.height = "40px";
		btn_div.style.lineHeight = "40px";
		mask_content.appendChild(btn_div);

		var cancel = document.createElement("button");
		cancel.setAttribute("id", "MultipleSelectUpDropDownMenu_cancel");
		cancel.setAttribute("class", "mui-btn");
		cancel.style.marginTop = "5px";
		cancel.style.width = "30%";
		cancel.style.height = "30px";
		cancel.innerHTML = "关闭";
		btn_div.appendChild(cancel);

		var done = document.createElement("button");
		done.setAttribute("id", "MultipleSelectUpDropDownMenu_done");
		done.setAttribute("class", "mui-btn");
		done.style.marginTop = "5px";
		done.style.marginLeft = "20%";
		done.style.width = "30%";
		done.style.height = "30px";
		done.innerHTML = "完成";
		btn_div.appendChild(done);

		arrow = document.createElement("div");
		arrow.style.width = 0;
		arrow.style.height = 0;
		arrow.style.display = "block";
		arrow.style.position = "absolute";
		arrow.style.left = (clientRect.left + clientRect.width / 2 - _this.arrowHeight) + "px";
		if(Direction == _this.Direction.bottom) {
			arrow.style.top = (ulStyleTop - _this.arrowHeight) + "px";
			arrow.style.borderBottom = _this.arrowHeight + "px solid white";
		} else if(Direction == _this.Direction.top) {
			arrow.style.top = (ulStyleTop + ul.offsetHeight + 0) + "px";
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

		document.getElementById("MultipleSelectUpDropDownMenu_cancel").addEventListener("click", function(ev) {
			closeMenu();
		});

		document.getElementById("MultipleSelectUpDropDownMenu_done").addEventListener("click", function(ev) {
			var upDropDownMenu_ul = document.getElementById("upDropDownMenu_ul");
			var count = upDropDownMenu_ul.querySelectorAll('input[type="checkbox"]:checked').length;
			console.log(count);
			var checkboxArray = [].slice.call(upDropDownMenu_ul.querySelectorAll('input[type="checkbox"]'));
			var values = [];
			var datas = [];

			checkboxArray.forEach(function(box) {
				if(box.checked) {
					values.push(box.getAttribute("value"));
					datas.push(box.getAttribute("data"));
				}
			});
			if(CallBack) {
				CallBack(1, datas, values);
			}
			closeMenu();
		});
		//				mask.addEventListener("click", function(ev) {
		//					closeMenu();
		//				});

		//		$("#upDropDownMenu_ul li").on("click", function(ev) {
		//						if(_this.btn_text) {
		//							_this.btn_text.innerHTML = this.innerHTML;
		//						}
		//						closeMenu();
		//						var index = $(this).index(); //获取索引下标 也从0开始
		//						var html = $(this).html(); //文本内容
		//						var value = this.getAttribute("value");
		//						if(CallBack){ 
		//							CallBack(index, html, value);
		//						}
		//		});
	}
}