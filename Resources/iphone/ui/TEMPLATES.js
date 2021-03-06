exports.pommerow = {
	properties : {
		height : 130,
		backgroundColor : 'white',
	},
	events : {
		click : function() {
		}
	},
	childTemplates : [{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			layout : 'horizontal',
		},
		events : {
			click : function() {
			}
		},
		childTemplates : [{
			type : 'Ti.UI.ImageView',
			bindId : 'p1',
			properties : {
				left : 0,
				top : 0,
				height : Ti.UI.SIZE,
				bottom : '30dp',
				width : '33%',
			},
			events : {
				'click' : function() {
				}
			}
		}, {
			type : 'Ti.UI.ImageView',
			bindId : 'p2',
			properties : {
				left : 0,
				top : 0,
				bottom : '30dp',
				height : Ti.UI.SIZE,
				width : '33%',
			},
			events : {
				'click' : function() {
				}
			}
		}, {
			type : 'Ti.UI.ImageView',
			bindId : 'p3',
			properties : {
				left : 0,
				top : 0,
				bottom : '30dp',
				height : Ti.UI.SIZE,
				width : '33%',
			},
			events : {
				'click' : function() {
				}
			}
		}]
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			left : 10,
			bottom : 10,
			color : '#007700',
			font : {
				fontSize : '16dp',
				fontFamily : 'Vollkorn-Regular'
			}
		},
		events : {
			click : function() {
			}
		}

	}]
};

exports.eventrow = {
	properties : {
		height : 140,
		backgroundColor : 'white',
	},
	events : {
		click : function() {
		}
	},
	childTemplates : [{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			left : "110dp",
			right : 0,
			layout : 'vertical',
		},
		events : {
			click : function() {
			}
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'referent',
			properties : {
				left : 0,
				font : {
					fontSize : '14dp'
				},
				top : '5dp',
				color : '#444',
				height : '20dp',
			},
			events : {
				'click' : function() {
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				left : 0,
				top : 0,
				color : '#060',
				font : {
					fontSize : '18dp',
					fontWeight : 'bold',
					fontFamily : 'Vollkorn-Regular'
				},
				height : '72dp',
			},
			events : {
				'click' : function() {
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'date',
			properties : {
				left : 0,
				top : '10dp',
				color : 'black',
				textAlign : 'right',
				height : Ti.UI.SIZE,
				font : {
					fontSize : '14dp',
				},
			},
			events : {
				'click' : function() {
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'zeit',
			properties : {
				left : 0,
				top : 0,
				font : {
					fontSize : '16dp',
					fontWeight : 'bold'
				},
				height : Ti.UI.SIZE,
			},
			events : {
				'click' : function() {
				}
			}
		}]
	}, {
		type : 'Ti.UI.ImageView',
		bindId : 'pic',
		properties : {
			left : 0,
			defaultImage : 'assets/dummy.jpg',
			top : 0,
			bottom : '5dp',
			width : '100dp',
			height : Ti.UI.SIZE
		},
		events : {
			click : function() {
			}
		}

	}]
};

exports.feedrow = {
	properties : {
		height : 136,
		backgroundColor : 'white',
	},
	events : {
		click : function() {
		}
	},
	childTemplates : [{
		type : 'Ti.UI.View',
		properties : {
			width : Ti.UI.FILL,
			left : "75dp",
			layout : 'vertical',
		},
		events : {
			click : function() {
			}
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				left : 0,
				top : '5dp',
				color : '#060',
				font : {
					fontSize : '18dp',
					fontWeight : 'bold',
					fontFamily : 'Vollkorn-Regular'
				},
				height : '46dp',
			},
			events : {
				'click' : function() {
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'text',
			properties : {
				left : 0,
				top : 0,
				bottom : '10dp',
				color : 'black',
				textAlign : 'left',
				height : '50dp',
				font : {
					fontSize : '13dp',
				},
			},
			events : {
				'click' : function() {
				}
			}
		}]
	}, {
		type : 'Ti.UI.ImageView',
		bindId : 'pic',
		properties : {
			left : 0,
			image : '/assets/pmlv.png',
			top : '10dp',
			width : '60dp',
			height : '60dp',
			height : Ti.UI.SIZE
		},
		events : {
			click : function() {
			}
		}

	}]
};
