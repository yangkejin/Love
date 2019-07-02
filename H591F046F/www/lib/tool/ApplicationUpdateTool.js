function ApplicationUpdateTool() {
	
	var appStoreId = "1208398213";
	var appStoreURL = "https://itunes.apple.com/lookup?id="+appStoreId;
	
	var portNumber = "http://suncereltd.6655.la:8089/AQIMonitor/";
	
	var apkURL = function(version) {
		return portNumber+"VersionUpdate?VersionCode="+version;
	};
	
	var wgtURL = function(type,version) {
		return portNumber+"wdtVersionUpdate?type="+type+"&VersionCode="+version;
	}; 
	
	/**
	 * 检查安装包
	 * CallBackWgtUpdate - 回调检查wgt更新，如果有安装包更新，就不会回调
	 */
	function examinationInstallationPackage(CallBackWgtUpdate) {
		function toNum(a) {
			var a = a.toString();
			var c = a.split('.');
			var num_place = ["", "0", "00", "000", "0000"],
				r = num_place.reverse();
			for(var i = 0; i < c.length; i++) {
				var len = c[i].length;
				c[i] = r[len] + c[i];
			}
			var res = c.join('');
			return res;
		}

		function cpr_version(newV, oldV) {
			var _a = toNum(newV),
				_b = toNum(oldV);
			if(_a > _b) {
				return true;
			} else {
				return false;
			}
		}
		var oldV = plus.runtime.version;  
		if(plus.os.name == 'Android') {
			mui.ajax(apkURL(oldV), {
				dataType: 'text',
				type: 'get',
				timeout: 20000,
				success: function(data) {
					if(data != null && data.indexOf("apk") >= 0) { 
						mui.confirm('发现android新版本', '检查更新', ['立即更新', '下次再说'], function(e) {
							if(e.index == 0) {
								data = data.replace(new RegExp("\"", 'g'), "");
								downWgtOrApk(data,false);
							} else {
								return;
							}
						})
					}else {
						CallBackWgtUpdate();
					}
				},
				error: function(xhr, type, errorThrown) {
					console.log("error")
				}
			});
		} else if(plus.os.name == 'iOS'){
			mui.ajax(appStoreURL, {
				dataType: 'json',
				type: 'get',
				timeout: 20000,
				success: function(data) {
					if(data != null) {
						var newV = 0;
						try {
							newV = data.results[0].version;
						} catch(e) {

						}
						if(cpr_version(newV, oldV)) {
							mui.confirm('发现ios新版本', '检查更新', ['立即更新', '下次再说'], function(e) {
								if(e.index == 0) {
									try {
										var trackViewUrl = data.results[0].trackViewUrl;
										trackViewUrl = trackViewUrl.replace("https", "itms-apps");
										plus.runtime.openURL(trackViewUrl);
									} catch(e) {

									}
								} else {
									return;
								}
							});
						} else {
							CallBackWgtUpdate();
						}
					}
				},
				error: function(xhr, type, errorThrown) {
					console.log("ios更新error")
				}
			});
		}
	}

	function examinationWgt() {
		function updateWgt(url) {
			mui.ajax(url, {
				dataType: 'text',
				type: 'get',
				timeout: 20000,
				success: function(data) {
					console.log(data + "");
					if(data != null && data.indexOf("wgt") >= 0) {
						mui.confirm('发现在线升级资源', '检查更新', ['立即更新', '下次再说'], function(e) {
							if(e.index == 0) {
								data = data.replace(new RegExp("\"", 'g'), "");
								downWgtOrApk(data,true);
							} else {
								return;
							}
						})
					}
				},
				error: function(xhr, type, errorThrown) {
					console.log("error")
				}
			});
		}
		
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			var type;
			if(plus.os.name == 'ios'){
				type = 'ios';
			}else  if(plus.os.name == 'Android') {
				type = 'android';
			}
			updateWgt(wgtURL(type,inf.version));
		});
	}

	function downWgtOrApk(url,isWgt) {
		console.log(url);
		var wgtWaiting = plus.nativeUI.showWaiting("下载文件...");
		var task = plus.downloader.createDownload(url, {
			filename: "_downloads/"
		}, function(d, status) {
			if(status == 200) {
				console.log("下载wgt成功：" + d.filename);
				if(isWgt) {
					 installWgt(d.filename); // 安装wgt包
				}else {
					installApk(d.filename); // 安装apk包
				}
			} else {
				console.log("下载wgt失败！" + status);
				mui.alert("下载失败！");
			}
			wgtWaiting.close();
		})

		task.addEventListener("statechanged", function(download, status) {
			switch(download.state) {
				case 2:
					//wgtWaiting.setTitle("已连接到服务器");
					break;
				case 3:
					setTimeout(function() {
						var percent = download.downloadedSize / download.totalSize * 100;
						wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
					}, 0);
					break;
				case 4:
					//wgtWaiting.setTitle("下载完成");
					break;
			}
		});
		task.start();
	};

	// 更新应用资源
	function installWgt(path) {
		plus.nativeUI.showWaiting("安装wgt文件...");
		plus.runtime.install(path, {}, function() {
			plus.nativeUI.closeWaiting();
			console.log("安装wgt文件成功！");
			plus.nativeUI.alert("应用资源更新完成！", function() {
				plus.runtime.restart();
			});
		}, function(e) {
			plus.nativeUI.closeWaiting();
			console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
			plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
		});
	}
	
	function installApk(path) {
		plus.runtime.install(path, {}, function() {
			
		}, function(e) {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.alert("安装apk文件失败[" + e.code + "]：" + e.message);
		});
	}

	this.start = function() {
		mui.plusReady(function() {
			examinationInstallationPackage(function() {
				examinationWgt();
			});
		});
	}
}