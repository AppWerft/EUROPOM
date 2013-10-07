Array.prototype.isArray = true;
exports.create = function() {
	var self = Ti.UI.createWindow({
		backgroundImage : '/assets/bg.png',
		barColor : '#040',
		exitOnClose : true,
		title : 'Apfel-Nachrichten'
	});
	self.listView = Ti.UI.createListView({
		templates : {
			'feed' : require('ui/TEMPLATES').feedrow
		},
		defaultItemTemplate : 'feed',
	});
	self.add(self.listView);
	self.listView.addEventListener('itemclick', function(_e) {
		if (Ti.Android)require('ui/web.window').create(_e.itemId).open();
		else self.tab.open(require('ui/web.window').create(_e.itemId));
	});
	var updateFeed = function() {
		require('vendor/cachedxhr').get({
			url : 'http://pomologen-verein.de/startseite/rss.xml',
			onload : function(_data) {
				console.log(_data);
				var sections = [];
				if (_data.channel && _data.channel.description)
					self.title = _data.channel.description;
				else {
					console.log("Warning: no valide RSS");
					return;
				}
				var items = (_data.channel.item && _data.channel.item.isArray) ? _data.channel.item : [];
				var data = [];
				if (items.isArray)
					for (var i = 0; i < items.length; i++) {
						var description= items[i].description.replace(/\.\.\./,' …');
						console.log(description);
						data.push({
							title : {
								text : items[i].title
							},
							text : {
								text : description
							},
							
							properties : {
								itemId : JSON.stringify(items[i]),
								accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
							}
						});
					}
					console.log(data);
				sections.push(Ti.UI.createListSection({
					items : data
				}));
				
				self.listView.setSections(sections);
			}
		});
	};

	self.addEventListener('focus', updateFeed);
	console.log('=================');
	//	updateFeed();
	return self;
};
