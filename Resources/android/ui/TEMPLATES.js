exports.pommerow = {
	properties : {
		height : Ti.UI.SIZE,
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
		height : Ti.UI.SIZE,
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
			right : '20dp',
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
					fontSize : '16dp'
				},
				top : '5dp',
				color : '#444',
				height : Ti.UI.SIZE,
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
				top : '5dp',
				color : '#060',
				font : {
					fontSize : '22dp',
					fontWeight : 'bold',
					fontFamily : 'Vollkorn-Regular'
				},
				height : Ti.UI.SIZE,
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
			defaultImage : '/assets/dummy.jpg',
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
		height : Ti.UI.SIZE,
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
			left : "95dp",
			right : '10dp',
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
				height : Ti.UI.SIZE,
			},
			events : {
				'click' : function() {
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'description',
			properties : {
				left : 0,
				top : '5dp',
				bottom : '10dp',
				color : 'black',
				textAlign : 'left',
				height : Ti.UI.SIZE,
				font : {
					fontSize : '14dp',
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
			width : '90dp',
			height : '90dp',
			height : Ti.UI.SIZE
		},
		events : {
			click : function() {
			}
		}

	}]
};
