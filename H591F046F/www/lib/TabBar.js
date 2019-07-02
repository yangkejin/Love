function tabbar() {
	this.subpages = []; //页面的html  
	this.Titles = []; //标题名  
	this.SelectImages = []; //选中的图片  
	this.UnSelectImages = []; //未选中的图片  
	this.SelectTextColor = []; //选中的文本颜色  
	this.UnSelectTextColor = []; //未选中的文本颜色  
	this.defaultSelectIndex = 0; //默认选中的索引  
	this.isSingleWebView = true; //是否使用一个webView，false - 使用多个webView

	var subpage_style = {
		top: '0px',
		bottom: '51px'
	};

	var _this = this;
	var aniShow = {};
	var aArr = []; //a标签数组  
	var imgArr = []; //img标签数组  
	var labelSpanArr = []; //span标签数组  
	var bodyHeight = document.body.offsetHeight ? document.body.offsetHeight : document.documentElement.clientHeight;
	var iframe;
	this.clickCallBack = function() {};

	this.init = function() { //添加视图  
		var nav = document.querySelector("nav");

		//设置tab顶部的横线
		var bar_tab = document.getElementsByClassName("mui-bar-tab")[0];
		bar_tab.style.borderTop = "1px solid rgba(0,0,0,.3)";

		for(var i = 0; i < _this.subpages.length; i++) {
			var a = document.createElement("a");
			a.className = "mui-tab-item mui-active";
			a.href = _this.subpages[i];
			a.id = i;
			aArr.push(a);
			nav.appendChild(a);

			var span = document.createElement("span");
			span.className = "mui-icon";
			var img = document.createElement("img");
			img.width = "20";
			img.height = "20";
			if(i == _this.defaultSelectIndex) {
				img.src = _this.SelectImages[i];
			} else {
				img.src = _this.UnSelectImages[i];
			}
			imgArr.push(img);
			span.appendChild(img);
			a.appendChild(span);

			var span2 = document.createElement("span");
			span2.className = "mui-tab-label";
			span2.innerHTML = _this.Titles[i];
			if(i == _this.defaultSelectIndex) {
				span2.style.color = _this.SelectTextColor[i];
			} else {
				span2.style.color = _this.UnSelectTextColor[i];
			}
			labelSpanArr.push(span2);
			a.appendChild(span2);
		}
	}

	this.showTabBar = function() {
		_this.clickCallBack(_this.defaultSelectIndex);

		if(mui.os.plus) {
			//创建子页面，首个选项卡页面显示，其它均隐藏；  
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				if(_this.isSingleWebView) {
					var temp = {};
					var sub = plus.webview.open(_this.subpages[_this.defaultSelectIndex], _this.subpages[_this.defaultSelectIndex], subpage_style);
					self.append(sub);
				} else {
					for(var i = 0; i < _this.subpages.length; i++) {
						var temp = {};
						var sub = plus.webview.open(_this.subpages[i], _this.subpages[i], subpage_style);
						if(i == _this.defaultSelectIndex) {
							temp[_this.subpages[i]] = "true";
							mui.extend(aniShow, temp);
						} else {
							sub.hide();
						}
						self.append(sub);
					}
				}

				//当前激活选项  
				var activeTab = _this.defaultSelectIndex;
				//选项卡点击事件  
				mui('.mui-bar-tab').on('tap', 'a', function(e) {
					var targetTab = this.getAttribute('href');
					var id = this.getAttribute('id');
					_this.clickCallBack(id);
					if(targetTab == id) {
						return;
					}
					for(var i = 0; i < labelSpanArr.length; i++) {
						var label = labelSpanArr[i];
						label.style.color = _this.UnSelectTextColor[i];
						var img = imgArr[i];
						img.src = _this.UnSelectImages[i];
					}
					labelSpanArr[id].style.color = _this.SelectTextColor[id];
					imgArr[id].src = _this.SelectImages[id];

					//显示目标选项卡  
					//若为iOS平台或非首次显示，则直接显示  
					//if(mui.os.ios || aniShow[targetTab]) {
					if(_this.isSingleWebView) {
						if(sub.getURL().indexOf(targetTab) == -1) {
							console.log(sub.getURL());
							sub.loadURL(targetTab);
						}
					} else {
						plus.webview.show(targetTab);
						//mui.fire(plus.webview.getWebviewById(targetTab), 'tabBar_refresh');
					}

					//					} else {
					//						//否则，使用fade-in动画，且保存变量  
					//						var temp = {};
					//						temp[targetTab] = "true";
					//						mui.extend(aniShow, temp);
					//						plus.webview.show(targetTab, "fade-in", 300);
					//					}
					if(!_this.isSingleWebView) {
						//隐藏当前;  
						plus.webview.hide(activeTab);
					}
					//更改当前活跃的选项卡  
					activeTab = id;

				});
			});
		} else {
			if(!iframe) {
				iframe = document.createElement("iframe");
				iframe.width = "100%";
				iframe.height = (bodyHeight - 50) + "px";
				iframe.frameBorder = "0";
				iframe.style.position = "fixed";
				iframe.style.top = "0px";
				iframe.src = _this.subpages[_this.defaultSelectIndex];
				document.body.appendChild(iframe);
			}

			//当前激活选项  
			var activeTab = _this.defaultSelectIndex;
			//选项卡点击事件  
			mui('.mui-bar-tab').on('tap', 'a', function(e) {
				var targetTab = this.getAttribute('href');
				var id = this.getAttribute('id');
				_this.clickCallBack(id);
				if(targetTab == id) {
					return;
				}
				for(var i = 0; i < labelSpanArr.length; i++) {
					var label = labelSpanArr[i];
					label.style.color = _this.UnSelectTextColor[i];
					var img = imgArr[i];
					img.src = _this.UnSelectImages[i];
				}
				labelSpanArr[id].style.color = _this.SelectTextColor[id];
				imgArr[id].src = _this.SelectImages[id];
				if(iframe.src.indexOf(targetTab) == -1) {
					iframe.src = targetTab;
				}
				//更改当前活跃的选项卡  
				activeTab = id;
			});
		}
	}
}