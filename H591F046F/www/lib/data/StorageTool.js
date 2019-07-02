function StorageTool() {

	this.tableName;
	var _this = this;
	
	this.setStr = function(str) {
		 plus.storage.setItem(_this.tableName,str);
	}
	
	this.getStr = function() {
		 return plus.storage.getItem(_this.tableName);
	}
	
	this.removeStr = function() {
		plus.storage.removeItem(_this.tableName);
	}
	
	this.clear = function() {
		plus.storage.clear();
	}
	
	this.getLength = function() {
		return plus.storage.getLength();
	}
	
	this.getKey = function(index) {
		return plus.storage.key(index);
	}
}