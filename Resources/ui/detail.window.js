const BASEURL = 'http://www.apfelsorten.ch/images/apfelsorten/images/';
const MINIBASEURL = 'http://www.apfelsorten.ch/images/apfelsorten/thumbnails/';

exports.create = function(_pom) {
	var pomme = JSON.parse(_pom);
	var self = Ti.UI.createWindow({
		modal : true,
		title : pomme.title,
		backgroundColor : 'white'
	});
	var views = [];
	for (var i = 0; i < pomme.pics.length; i++) {
		views.push(Ti.UI.createImageView({
			image : BASEURL + pomme.pics[i],
			defaultImage : MINIBASEURL + pomme.pics[i],
			width : Ti.UI.FILL,
			top : '10dp',
			height : Ti.UI.SIZE
		}));
	}
	self.scroller = Ti.UI.createScrollableView({
		top : 0,
		views : views
	});
	self.add(self.scroller);
	return self;
};
