Array.prototype.isArray = true;

var Pommes = function() {
	this.pommes = this.importPommes();
	return this;
};

Pommes.prototype.importPommes = function() {
	var items = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'pommes.json').read().text).tr;
	var item = {}, pommes = [];
	for (var i = 0; i < items.length; i++) {
		try {
			if (items[i].td.isArray) {
				for (var j = 0; j < items[i].td.length; j++) {
					if (!j) {
						item = {
							pics : [items[i].td[j].p],
							title : '',
							synonymes : []
						};
					} else {
						item.pics.push(items[i].td[j].p);
					}
				}

			} else {
				item.title = items[i].td.strong.content;
				if (items[i].td.p)
					item.synonymes = items[i].td.p.content.split(', ');
				pommes.push(item);
			}
		} catch(E) {
			//console.log(items[i]);
		}
	};
	return pommes;
};

Pommes.prototype.getAll = function() {
	return this.pommes;
};

Pommes.prototype.getAllSorten = function() {
	var items = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'sorten.json').read().text);
	var sorten = [];
	for (var i = 0; i < items.length; i++) {
		sorten.push(items[i].div[0].a.title);
	}
	items = null;
	sorten.sort();
	return sorten;
};

Pommes.prototype.getAllEvents = function(_options) {
	if (Ti.Ansdroid) {
		var progressIndicator = Ti.UI.Android.createProgressIndicator({
			message : 'Lade Veranstaltungsplan …',
			location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
			type : Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
			cancelable : true,
			min : 0,
			max : 1
		});
	}
	if (!Ti.Network.online) {
		Ti.Android && Ti.Android.createNotification({
			message : 'Netz nicht da, nehme alte Daten'
		}).show();
		return;
	}
	var events = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'events.json').read().text);
	var xhr = Ti.Network.createHTTPClient({
		ondatastream : function(_e) {
			if (progressIndicator)
				progressIndicator.value = _e.progress;
		},
		onload : function() {
			if (progressIndicator)
				progressIndicator.hide();
			Ti.Android && Ti.Android.createNotification({
				message : 'Neue Daten aus dem Netz aktualisiert'
			}).show();
			_options.onload && _options.onload(JSON.parse(this.responseText));
		},
		onerror : function() {
			Ti.Android && Ti.Android.createNotification({
				message : 'Netz nicht da, nehme alte Daten'
			}).show();
			if (progressIndicator)
				progressIndicator.hide();
			_options.onload && _options.onload(events);
		}
	});
	xhr.open('GET', 'http://lab.min.uni-hamburg.de/store/europom/events.json');
	xhr.send();
	if (progressIndicator)
		progressIndicator.show();
	return events;
};
/*
 Pommes.prototype.getFeed = function(_options) {
 var md5;
 if (Ti.App.Properties.hasProperty('ITEMS')) {
 md5 = Ti.Utils.md5HexDigest(Ti.App.Properties.getString('ITEMS'));
 _options.onload && _options.onload(JSON.parse(Ti.App.Properties.getString('ITEMS')));
 }
 var url = 'http://pomologen-verein.de/startseite/rss.xml';
 var xhr = Ti.Network.createHTTPClient({
 onload : function() {
 var XMLTools = require("vendor/XMLTools");
 var xml = new XMLTools(this.responseText);
 var feed = xml.toObject();
 var items = feed.channel.item;
 Ti.App.Properties.setString('ITEMS', JSON.stringify(items));
 if (!md5 || md5 != Ti.Utils.md5HexDigest(JSON.stringify(items)))
 _options.onload && _options.onload(items);
 },
 onerror : function(e) {
 console.log('Error: ' + e.error);
 }
 });
 xhr.open('GET', url, true);
 xhr.send();
 console.log('Info: start feed xhr');
 };
 */
module.exports = Pommes;
