const BASEURL = 'http://www.apfelsorten.ch/images/apfelsorten/thumbnails/';
exports.create = function() {
	var cacheImage = function(_url, _view) {
		return;
		require('ui/cachedimage.widget').create({
			url : _url,
			onload : function(path) {
				_view.image = path;
			}
		});
	};
	var self = Ti.UI.createWindow({
		barColor : '#050',
		title : 'Alte Apfelsorten',
		exitOnClose : true
	});
	var pommesTemplate = require('ui/TEMPLATES').pommerow;
	self.listView = Ti.UI.createListView({
		templates : {
			'poms' : pommesTemplate
		},
		defaultItemTemplate : 'poms',
	});
	var pommes = Ti.App.PommesModel.getAll();
	var data = [];
	for (var a = 0; a < pommes.length; a++) {
		if (!pommes[a].title.match(/unbekannt/g)) {
			var item = {
				title : {
					text : pommes[a].title
				},
				p1 : {
					image : BASEURL + pommes[a].pics[0]
				},
				p2 : {
					image : BASEURL + pommes[a].pics[1]
				},
				p3 : {
					image : BASEURL + pommes[a].pics[2]
				},
				properties : {
					itemId : JSON.stringify(pommes[a]),
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
				}
			};
			data.push(item);
			if (pommes[a].pics[0])
				cacheImage(BASEURL + pommes[a].pics[0], item.p1);
			if (pommes[a].pics[1])
				cacheImage(BASEURL + pommes[a].pics[1], item.p2);
			if (pommes[a].pics[2])
				cacheImage(BASEURL + pommes[a].pics[2], item.p3);
		}
	};
	self.listView.setSections([Ti.UI.createListSection({
		items : data,
	})]);
	self.listView.addEventListener('itemclick', function(_e) {
		console.log(_e.itemId);
		require('ui/detail.window').create(_e.itemId).open();
	});
	self.add(self.listView);
	self.addEventListener('open', function() {
		if (Ti.App.Properties.hasProperty('alert'))
			return;
		var dialog = Ti.UI.createAlertDialog({
			message : "Diese Apfel-Datenbank stellt lediglich eine technische Machbarkeitsstudie dar und wird zeitnah durch „echte“ Äpfel ersetzt. Dank an 'apfelsorten.ch'!",
			ok : 'Verstanden',
			title : 'Hinweis'
		});
		dialog.show();
		dialog.addEventListener('click', function() {
			Ti.App.Properties.setString('alert', '1')
		});
	});
	return self;
};
