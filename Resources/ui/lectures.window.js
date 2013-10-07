Array.prototype.isArray = true;

exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundImage : '/assets/bg.png',
		barColor : '#060',title:'Apfelfachvorträge'
	});
	self.listView = Ti.UI.createListView({
		bottom : '20dp',
		templates : {
			'plants' : require('ui/TEMPLATES').eventrow
		},
		defaultItemTemplate : 'plants',
	});
	self.listView.addEventListener('itemclick', function(_e) {
		var win = require('ui/lectures.detail.window').create(_e.itemId);
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win, {
				animate : true
			});
	});

	self.add(Ti.UI.createImageView({
		image : '/assets/bottomlogo.png',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		bottom : 0,
		zIndex : 99999
	}));

	setTimeout(function() {
		self.add(self.listView);
		require('vendor/cachedxhr').get({
			url : 'http://lab.min.uni-hamburg.de/store/europom/events.json',
			defaultjson : 'model/events.json',
			onload : function(_events) {
				var sections = [];
				console.log(_events.length);
				for (var t = 0; t < _events.length; t++) {
					var data = [];
					var themetitle = _events[t].theme;
					
					var sessions = _events[t].sessions;
					if (sessions && sessions.isArray)
						for (var a = 0; a < sessions.length; a++) {
							data.push({
								pic : {
									image : sessions[a].image || '/assets/dummy.jpg'
								},
								title : {
									text : sessions[a].title
								},
								referent : {
									text : sessions[a].referent
								},
								date : {
									text : sessions[a].date + ' Uhr'
								},
								properties : {
									itemId : JSON.stringify(sessions[a]),
									accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
								}
							});
						}
					;
					sections[t] = Ti.UI.createListSection({
						headerTitle : themetitle,
						items : data
					});
					self.listView.setSections(sections);
				}

			}
		});
	}, 40);
	return self;
};
