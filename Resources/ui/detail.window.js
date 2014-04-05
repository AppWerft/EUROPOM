const BASEURL = 'http://www.apfelsorten.ch/images/apfelsorten/images/';
const MINIBASEURL = 'http://www.apfelsorten.ch/images/apfelsorten/thumbnails/';

exports.create = function(_pom) {
	var pomme = JSON.parse(_pom);
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : pomme.title,
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
	self.add(self.scroller);self.addEventListener('open', function() {
		if (Ti.Android) {
			if (self.activity) {
				var actionBar = self.activity.actionBar;
				if (actionBar) {
					actionBar.displayHomeAsUp=true;
					actionBar.onHomeIconItemSelected = function() {
						self.close();
					};
				}
			}
		}
	});
	return self;
};
