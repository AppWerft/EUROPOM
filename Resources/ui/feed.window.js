Array.prototype.isArray = true;
exports.create = function() {
	var sections = [];
	var self = Ti.UI.createWindow({
		backgroundImage : '/assets/bg.png',
		barColor : '#040',
		title : 'Apfel-Nachrichten'
	});
	self.listView = Ti.UI.createListView({
		templates : {
			'plants' : require('ui/TEMPLATES').feedrow
		},
		defaultItemTemplate : 'plants',
	});
	self.add(self.listView);
	self.listView.addEventListener('itemclick', function(_e) {
		require('ui/web.window').create(_e.itemId);
	});
	var updateFeed = function() {
		require('vendor/cachedxhr').get({
			url : 'http://pomologen-verein.de/startseite/rss.xml',
			onload : function(_data) {
				var items = (_data.channel.item.isArray) ?_data.channel.item : [];
				console.log(items);
				var data = [];  
				if (items.isArray)
					for (var i = 0; i < items.length; i++) {
						data.push({
							title : {
								text : items[i].title
							},
							description : {
								text : items[i].description
							},
							properties : {
								itemId : items[i]['content:encoded'],
								accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
							}
						});
					}
				
				sections[0] = Ti.UI.createListSection({
					items : data
				});
				console.log(data);
			//	self.listView.setSections(sections);
			}
		});
	};

	//	self.addEventListener('focus', updateFeed);
	updateFeed();
	return self;
};
