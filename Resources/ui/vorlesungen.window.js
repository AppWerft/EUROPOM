exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundImage : '/assets/bg.png',
		barColor : '#060'
	});
	self.listView = Ti.UI.createListView({
		bottom : '20dp',
		templates : {
			'plants' : require('ui/TEMPLATES').eventrow
		},
		defaultItemTemplate : 'plants',
	});
	self.listView.addEventListener('itemclick', function(_e) {
		var win = require('ui/eventdetail.window').create(_e.itemId);
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
		Ti.App.PommesModel.getAllEvents({
			onload : function(events) {
				var sections = [];
				for (var t = 0; t < events.length; t++) {
					var data = [];
					var sessions = events[t].sessions;
					for (var a = 0; a < sessions.length; a++) {
						data.push({
							pic : {
								image : sessions[a].image
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
					};
					sections[t] = Ti.UI.createListSection({
						headerTitle : events[t].theme,
						items : data
					});
					self.listView.setSections(sections);
				}

			}
		});
	}, 40);
	return self;
};
