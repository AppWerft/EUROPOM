exports.create = function(_data) {
	var data = JSON.parse(_data);
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		title : data.title,
		fullscreen : false
	});
	if (Ti.Android) {
		var container = Ti.UI.createScrollView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			contentHeight : Ti.UI.SIZE,
			scrollType : 'vertical'
		});
		self.add(container);
		var web = Ti.UI.createLabel({
			font : {
				fontSize : '18dp',
				fontWeight : 'bold',
				fontFamily : 'Vollkorn-Regular'
			},
			html : data['content:encoded'],
			color : '#464',
			width : Ti.UI.FILL,
			top : '10dp',
			left : '10dp',
			right : '10dp',
			bottom : '10dp',
			height : Ti.UI.FILL
		});
		web.addEventListener('load', function() {
			self.backgroundColor = 'white';
		});
		container.add(web);
	} else {
		var container = Ti.UI.createWebView({
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			html : data['content:encoded']
		});
		self.add(container);
	}
	return self;

};
