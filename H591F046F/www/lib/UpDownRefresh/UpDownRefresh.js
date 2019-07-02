function UpDownRefresh(identifier) {
	this.iscroll;//iscroll对象
	this.wrapper;//iscroll最外层的div wrapper
//	this.identifier;//唯一标尺
	this.content;//不是滚动视图的对象

	var header_refresh_icon, footer_refresh_icon;
	var _this = this;
	var isRefresh = false,
		isBeingRefresh = false,
		isFooterRefresh = false,
		isFooterBeingRefresh = false;
	var bodyWidth = document.body.offsetWidth ? document.body.offsetWidth : document.documentElement.clientWidth;
	var headerRefreshingCallBack, footerRefreshingCallBack;//刷新回调
	var yDistance = 30; //触发刷新的距离
	var contentTop;
	
	function commonrefresh_icon_style(refresh_icon) {
		refresh_icon.style.backgroundColor = "white";
		refresh_icon.style.textAlign = "center";
		refresh_icon.style.width = "40px";
		refresh_icon.style.height = "40px";
		refresh_icon.style.lineHeight = "36px";
		refresh_icon.style.borderRadius = "50%";
		refresh_icon.style.color = "black";
		refresh_icon.style.fontSize = "8px";
		refresh_icon.style.position = "absolute";
		refresh_icon.style.padding = "2px";
		refresh_icon.style.display = "none";
		refresh_icon.style.boxShadow = " 0 0 30px black";
	}
	
	this.addHeaderRefreshing = function(CallBack) {
		if(_this.iscroll) {
			addScrollerHeaderRefreshing(CallBack);
		} else if(_this.content){
			addContentHeaderRefreshing(CallBack);
		}
	}

	function addScrollerHeaderRefreshing(CallBack) {
		_this.headerRefreshingCallBack = CallBack;
		
		header_refresh_icon = document.getElementById("header_refresh_icon_"+identifier)
		if(header_refresh_icon != null) {
			wrapper.removeChild(header_refresh_icon);
			header_refresh_icon = null;
		}
		
		header_refresh_icon = document.createElement("div");
		header_refresh_icon.setAttribute("id","header_refresh_icon_"+identifier);
		header_refresh_icon.style.top = 0;
		
		commonrefresh_icon_style(header_refresh_icon);
		wrapper.appendChild(header_refresh_icon);
		
		_this.iscroll.on("scrollEnd", function() {
			if(!isBeingRefresh) {
				if(isRefresh) {
					_this.headerBeginRefreshing();
				} else {
					_this.headerEndRefreshing();
				}
			}
		});

		_this.iscroll.on("scroll", function() {
			var y = this.y;
			if(!isBeingRefresh) {
				if(y < 0) {
					header_refresh_icon.style.top = y + "px";
				} else {
					header_refresh_icon.innerHTML = "下拉刷新";
					header_refresh_icon.style.display = "inline-block";
					isRefresh = false;
					if(y > yDistance) {
						y = yDistance;
						header_refresh_icon.innerText = "释放刷新";
						isRefresh = true;
					}
					header_refresh_icon.style.top = y + "px";
				}
				header_refresh_icon.style.left = (bodyWidth - header_refresh_icon.getBoundingClientRect().width) / 2 + "px";
			}
		});
	}

	function addContentHeaderRefreshing(CallBack) {

		_this.headerRefreshingCallBack = CallBack;

		_this.content.addEventListener('touchstart', touch, false);
		_this.content.addEventListener('touchmove', touch, false);
		_this.content.addEventListener('touchend', touch, false);
		
		var clientRect = _this.content.getBoundingClientRect();
	   contentTop = clientRect.top + document.body.scrollTop;

		var startY, moveY;
		header_refresh_icon = document.getElementById("header_refresh_icon_"+identifier)
		if(header_refresh_icon != null) {
			_this.content.removeChild(header_refresh_icon);
			header_refresh_icon = null;
		}
		header_refresh_icon = document.createElement("div");
		header_refresh_icon.setAttribute("id","header_refresh_icon_"+identifier);
		
		header_refresh_icon.style.top = contentTop +"px";
		commonrefresh_icon_style(header_refresh_icon);
		_this.content.appendChild(header_refresh_icon);

		function touch(event) {
			switch(event.type) {
				case "touchstart":
					startY = event.touches[0].pageY;
					break;

				case "touchend":
					if(!isBeingRefresh) {
						if(isRefresh) {
							_this.headerBeginRefreshing();
						} else {
							_this.headerEndRefreshing();
						}
					}
					break;

				case "touchmove":
					event.preventDefault();
					moveY = event.touches[0].pageY;
					var y = moveY - startY;
					if(!isBeingRefresh) {
						if(y < 0) {
							var top = contentTop+y;
							if(top < contentTop) {
								top = contentTop;
							}
							header_refresh_icon.style.top =  top+ "px";
						} else {
							header_refresh_icon.innerText = "下拉刷新";
							header_refresh_icon.style.display = "inline-block";
							isRefresh = false;
							if(y > yDistance) {
								y = yDistance;
								header_refresh_icon.innerText = "释放刷新";
								isRefresh = true;
							}
							header_refresh_icon.style.top = (contentTop+y) + "px";
						}
						header_refresh_icon.style.left = (bodyWidth - header_refresh_icon.getBoundingClientRect().width) / 2 + "px";
					}
					break;
			}
		}
	}

	this.headerBeginRefreshing = function() {
		isRefresh = true;
		isBeingRefresh = true;
		header_refresh_icon.style.display = "inline-block";
		if(contentTop) {
			header_refresh_icon.style.top = (yDistance+contentTop) + "px";
		}else {
			header_refresh_icon.style.top = yDistance + "px";
		}
		header_refresh_icon.innerHTML = '<div class="UpDownRefresh_loading"></div>';
		header_refresh_icon.style.left = (bodyWidth - header_refresh_icon.getBoundingClientRect().width) / 2 + "px";
		_this.headerRefreshingCallBack();
	}

	this.headerEndRefreshing = function() {
		isRefresh = false;
		isBeingRefresh = false;
		header_refresh_icon.style.display = "none";
		if(contentTop) {
			header_refresh_icon.style.top = contentTop+"px";
		}else {
			header_refresh_icon.style.top = 0;
		}
	}

	this.addFooterRefreshing = function(CallBack) {
		_this.footerRefreshingCallBack = CallBack;
		scroller = document.querySelector(_this.scrollerEl);
		footer_refresh_icon = document.createElement("div");
		footer_refresh_icon.style.bottom = 0;
		commonrefresh_icon_style(footer_refresh_icon);

		wrapper.appendChild(footer_refresh_icon);

		var maxScrollY = _this.iscroll.maxScrollY;
		_this.iscroll.on("scrollEnd", function() {
			if(!isFooterBeingRefresh) {
				if(isFooterRefresh) {
					_this.footerBeginRefreshing();
				} else {
					_this.footerEndRefreshing();
				}
			}
		});

		_this.iscroll.on("scroll", function() {
			var y = this.y;
			if(!isFooterBeingRefresh) {
				if(y > maxScrollY) {
					footer_refresh_icon.style.bottom = (maxScrollY - y) + "px";
				} else {
					footer_refresh_icon.innerText = "上拉加载";
					footer_refresh_icon.style.display = "inline-block";
					isFooterRefresh = false;

					if(y < maxScrollY) {
						y = maxScrollY - y;
						if(y > yDistance) {
							y = yDistance;
							footer_refresh_icon.innerText = "释放加载";
							isFooterRefresh = true;
						}
					}
					footer_refresh_icon.style.bottom = y + "px";
				}
				footer_refresh_icon.style.left = (bodyWidth - footer_refresh_icon.getBoundingClientRect().width) / 2 + "px";
			}
		});
	}
	
	this.footerBeginRefreshing = function() {
		isFooterRefresh = true;
		isFooterBeingRefresh = true;
		footer_refresh_icon.style.display = "inline-block";
		footer_refresh_icon.style.bottom = yDistance + "px";
		footer_refresh_icon.innerHTML = '<div class="UpDownRefresh_loading"></div>';
		footer_refresh_icon.style.left = (bodyWidth - footer_refresh_icon.getBoundingClientRect().width) / 2 + "px";
		_this.footerRefreshingCallBack();
	}

	this.footerEndRefreshing = function() {
		isFooterRefresh = false;
		isFooterBeingRefresh = false;
		footer_refresh_icon.style.display = "none";
		footer_refresh_icon.style.bottom = 0;
	}

}