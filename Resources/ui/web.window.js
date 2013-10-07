exports.create = function(html) {
	var self = Ti.UI.createWindow({
		modal : true,
		backgroundColor : 'white',
		title : ''
	});
	self.open();
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
		html : html,
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

};
