function AQITool() {
	var Colors = ["rgb(22,189,62)",
		"rgb(218,195,0)",
		"rgb(237,143,40)",
		"rgb(218,38,38)",
		"rgb(156,38,155)",
		"rgb(140,27,62)",
		"rgb(109,105,105)"
	];

	var Healths = ["空气质量令人满意，基本无空气污染",
		"空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响",
		"易感人群症状有轻度加剧，健康人群出现刺激症状",
		"进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响",
		"心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状",
		"健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病",
		"—"
	];

	var Sugges = ["各类人群可正常活动",
		"极少数异常敏感人群应减少户外活动",
		"儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼",
		"儿童、老年人及心脏病、呼吸系统疾病患者应避免长时间、高强度的户外锻炼，一般人群适量减少户外活动",
		"儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动",
		"儿童、老年人和病人应当留在室内，避免体力消耗，一般人群应避免户外活动",
		"—"
	];
	var Qualitys = ["优", "良", "轻度污染", "中度污染", "重度污染", "严重污染", "—"];
	var AbbreviationQualitys = ["优", "良", "轻度", "中度", "重度", "严重", "—"];

	this.InComeType = {
		AQI: 0,
		Quality: 1,
		AbbreviationQuality: 2,
		Level:3
	}

	this.ObtainType = {
		Health: 0,
		Sugge: 1,
		Color: 2,
		Quality: 3,
		AbbreviationQuality: 4,
		TextColor:5
	}

	var _this = this;

	this.getObtain = function(inComeType, value, obtainType) {
		var level;
		switch(inComeType) {
			case _this.InComeType.AQI:
				level = _this.getAQILevel(value);
				break;
			case _this.InComeType.Quality:
				level = _this.getQualityLevel(value);
				break;
			case _this.InComeType.AbbreviationQuality:
				level = _this.getAbbreviationQualityLevel(value);
				break;
			case _this.InComeType.Level:
				if(value < 0) {
					value = 6
				}
				level = value;
				break;
			default:
		}
		switch(obtainType) {
			case _this.ObtainType.Health:
				return Healths[level];
			case _this.ObtainType.Sugge:
				return Sugges[level];
			case _this.ObtainType.Color:
				return Colors[level];
			case _this.ObtainType.Quality:
				return Qualitys[level];
			case _this.ObtainType.AbbreviationQuality:
				return AbbreviationQualitys[level];
			case _this.ObtainType.TextColor:
				var textColor;
				if(level == 1) {
					textColor = "rgb(0,0,0)"
				}else {
					textColor = "rgb(255,255,255)"
				}
				return textColor;
			default:
		}
	}

	this.getAQILevel = function(AQI) {
		var i = AQI;
		if(0 <= i && i <= 50) {
			return 0;
		} else if(50 < i && i <= 100) {
			return 1;
		} else if(100 < i && i <= 150) {
			return 2;
		} else if(150 < i && i <= 200) {
			return 3;
		} else if(200 < i && i <= 300) {
			return 4;
		} else if(i > 300) {
			return 5;
		} else {
			return 6;
		}
	}

	this.getQualityLevel = function(quality) {
		if(quality == "优") {
			return 0;
		} else if(quality == "良") {
			return 1;
		} else if(quality == "轻度污染") {
			return 2;
		} else if(quality == "中度污染") {
			return 3;
		} else if(quality == "重度污染") {
			return 4;
		} else if(quality == "严重污染") {
			return 5;
		} else {
			return 6;
		}
	}

	this.getAbbreviationQualityLevel = function(abbreviationQuality) {
		if(abbreviationQuality == "优") {
			return 0;
		} else if(abbreviationQuality == "良") {
			return 1;
		} else if(abbreviationQuality == "轻度") {
			return 2;
		} else if(abbreviationQuality == "中度") {
			return 3;
		} else if(abbreviationQuality == "重度") {
			return 4;
		} else if(abbreviationQuality == "严重") {
			return 5;
		} else {
			return 6;
		}
	}

}