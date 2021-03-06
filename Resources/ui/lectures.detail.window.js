const BASEURL = 'http://www.apfelsorten.ch/images/apfelsorten/images/';
const MINIBASEURL = 'http://www.apfelsorten.ch/images/apfelsorten/thumbnails/';

exports.create = function(_event) {
	var event = JSON.parse(_event);
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : event.title,
		navBarHidden : false,
		backgroundColor : 'white',
	});
	setTimeout(function() {
		self.add(Ti.UI.createImageView({
			image : event.image,
			defaultImage : 'assets/dummy.jpg',
			top : 0,
			left : 0,
			width : '35%',
		}));
		var container = Ti.UI.createView({
			layout : 'vertical',
			height : Ti.UI.SIZE,
			top : 0,
			left : '140dp'
		});
		self.add(container);
		container.add(Ti.UI.createLabel({
			left : 0,
			text : event.referent,
			font : {
				fontSize : '16dp'
			},
			top : '5dp',
			color : '#444',
			height : Ti.UI.SIZE,
		}));
		container.add(Ti.UI.createLabel({
			left : 0,
			text : event.title,
			top : '5dp',
			color : '#060',
			font : {
				fontSize : '20dp',
				fontWeight : 'bold',
				fontFamily : 'Vollkorn-Regular'
			},
			height : Ti.UI.SIZE,
		}));
		var scroller = Ti.UI.createScrollView({
			top : '160dp',
			bottom : event.thumbs ? '100dp' : 0,
			layout : 'vertical',
			height : Ti.UI.FILL,
			width : Ti.UI.FILL,
			contentHeight : Ti.UI.SIZE,
			scrollType : 'vertical'
		});
		self.add(scroller);
		if (event.audio)
			scroller.add(require('ui/audioplayer.widget').create(self, event.audio));

		scroller.add(Ti.UI.createLabel({
			left : '10dp',
			right : '10dp',
			text : event.summary || 'Hier sollte die Summary zu lesen sein …',
			font : {
				fontSize : '18dp'
			},
			top : '5dp',
			bottom : '10dp',
			color : '#444',
			height : Ti.UI.SIZE,
		}));
		if (event.video != undefined) {
			var poster = Ti.UI.createImageView({
				top : '10dp',
				width : Ti.UI.FILL,
				height : Ti.UI.SIZE,
				image : event.video.poster
			});
			var arrow = Ti.UI.createImageView({
				image : '/assets/start.png',
				width : '100dp',
				height : '100dp',
				zIndex : 999,
				borderWidth : 1,
				borderColor : 'red'
			});
			scroller.add(poster);
			poster.add(arrow);
			poster.addEventListener('click', function() {
				require('vendor/video.widget').create({
					mp4 : event.video.mp4,
					poster : event.video.poster,
				});
			});
		}
		if (event.slides) {
			if (event.thumbs) {
				var gallery = Ti.UI.createScrollView({
					bottom : 0,
					height : '100dp',
					scrollType : 'horizontal',
					showHorizontalScrollIndicator : true,
					width : Ti.UI.FILL,
					backgroundColor : '#666',
					contentWidth : Ti.UI.SIZE,
					horizontalWrap : false,
					layout : 'horizontal',
					contentHeight : '100dp'
				});
				var path = event.slides.replace(/\.pdf/gi, '');
				self.add(gallery);
				for (var i = 0; i < event.thumbs && i < 32; i++) {
					var url = path + '-' + i + '.png';
					// output of imagemagick
					console.log(url);
					var thumb = Ti.UI.createImageView({
						height : Ti.UI.FILL,
						width : '100dp',
						left : 0,
						top : 0,
						image : url
					});
					gallery.add(thumb);
				}
				gallery.addEventListener('click', function() {
					console.log('Info: click on pdf thumb gallery received');
					var progresswidget = require('ui/progress.widget').create();
					self.add(progresswidget);
					require('ui/remotepdfviewer').createPDFViewer(event.slides, progresswidget);
				});
			}

		};
	}, 10);
	self.addEventListener('open', function() {
		if (Ti.Android) {
			if (self.activity) {
				var actionBar = self.activity.actionBar;
				if (actionBar) {
					actionBar.displayHomeAsUp = true;
					actionBar.onHomeIconItemSelected = function() {
						self.close();
					};
				}
			}
		}
	});
	return self;
};
