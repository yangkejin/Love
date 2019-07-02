function TextAutoScroll() {  
    var _this = this;  
    this.ScrollTypeEnum = {  
        LeftRight: 0,//左右滚动  
        Left: 1,//像左滚动  
    };  
    this.space = 4;//文本添加的空格数  
    var spaceStr = "";  
    this.speed = 20;//速度  
    this.ScrollEndStopTime = 800;//滚动到尽头停止的时间  
      
    this.startScroll = function(element, scrollTypeEnum) {  
        for(var i=0; i<_this.space;i++) {  
            spaceStr += " ";  
        }  
        element.style.whiteSpace = "nowrap"; //文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。  
        element.style.overflow = "hidden"; //内容会被修剪，并且其余内容是不可见的。  
        if(scrollTypeEnum == _this.ScrollTypeEnum.LeftRight) {  
            LeftRight(element);  
        } else {  
            Left(element);  
        }  
    }  
  
    function LeftRight(element) {  
        var isRight = false;  
        element.innerHTML = spaceStr + element.innerHTML + spaceStr;  
        if(element.scrollWidth > element.clientWidth) {  
            LeftRightTime(element, isRight);  
        }  
    }  
  
    function LeftRightTime(element, isRight) {  
        var interval = setInterval(function() {  
            if(!isRight) {  
                element.scrollLeft = element.scrollLeft + 1;  
                if(element.scrollLeft >= element.scrollWidth - element.clientWidth) {  
                    isRight = true;  
                    clearInterval(interval);  
                    setTimeout(function() {  
                        LeftRightTime(element, isRight);  
                    }, _this.ScrollEndStopTime);  
                }  
            } else {  
                element.scrollLeft = element.scrollLeft - 1;  
                if(element.scrollLeft == 0) {  
                    isRight = false;  
                    clearInterval(interval);  
                    setTimeout(function() {  
                        LeftRightTime(element, isRight);  
                    },  _this.ScrollEndStopTime);  
                }  
            }  
        }, _this.speed);  
    }  
  
    function Left(element) {  
        var oldScrollWidth = element.scrollWidth;  
        element.innerHTML = element.innerHTML + spaceStr + element.innerHTML;  
        if(element.scrollWidth > element.clientWidth) {  
            LeftTime(element, oldScrollWidth);  
        }  
    }  
  
    function LeftTime(element, oldScrollWidth) {  
        var interval = setInterval(function() {  
            element.scrollLeft = element.scrollLeft + 1;  
            if(element.scrollLeft >= oldScrollWidth) {  
                clearInterval(interval);  
                element.scrollLeft = 0;  
                setTimeout(function() {  
                    LeftTime(element, oldScrollWidth);  
                },  _this.ScrollEndStopTime);  
            }  
        },  _this.speed);  
    }  
}  