//图片动画封装 
    function AnimationTool(opts) {  
        for(var i in AnimationTool.DEFAULTS) {  
            if (opts[i] === undefined) {  
                opts[i] = AnimationTool.DEFAULTS[i];  
            }  
        }  
        this.opts = opts;  
        this.timer = null;  
        this.elem = document.getElementById(opts.el);  
        if(window.Worker) {
		  myWorker = new Worker('worker.js');	
		}
    }
    
    
    AnimationTool.prototype.startAnim = function () {  
        this.stopAnim();  
        var _this = this;
        this.timer = window.setInterval(function () {         
            var startIndex = _this.opts.startIndex;  
            if (startIndex == 360) {  
                _this.opts.startIndex = 0;   
            }  
            _this.elem.style.webkitTransform = "rotate("+ (startIndex) +"deg)";  
            _this.opts.startIndex += 5;  
            
        }, this.opts.delay);  
  
//      setTimeout(() => {  
//          this.stopAnim();  
//      }, this.opts.duration); 
    }  
    
    AnimationTool.prototype.stopAnim = function() {  
        if (this.timer != null) {  
            clearInterval(this.timer);  
        }  
    }  
    
    AnimationTool.DEFAULTS = {  
        delay : 20,  
        startIndex : 0,  
        endIndex : 360  
    }  
    

 onmessage = function(ev) {
    		if(ev.data == 'startAnim') {
    			var animationTool = new AnimationTool({
					el: "refreshImg"
				});
				
								animationTool.startAnim();

    		}
    }