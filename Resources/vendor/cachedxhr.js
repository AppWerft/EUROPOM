exports.get = function(_options) {
	var md5, url = _options.url;
	if (!url) {
		console.log('Warning: missing url in cachedxhr-client');
		return;
	}
	var key = Ti.Utils.md5HexDigest(url);
	if (Ti.App.Properties.hasProperty(key)) {
		console.log('Info: old data exists of url=' + url + ' width key=' + key);
		try {
			var data = JSON.parse(Ti.App.Properties.getString(key));
			md5 = Ti.Utils.md5HexDigest(JSON.stringify(data));
			_options.onload && _options.onload(data);
		} catch(E) {
			Ti.App.Properties.removeProperty(key);
			console.log('saved data kaputt');
		}
	}
	if (!Ti.Network.online) {
		Ti.Android && Ti.Android.createNotification({
			message : 'Netz nicht da'
		}).show();
		return;
	}
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			var data;
			if (this.responseText.match(/<\?xml/)) {
				
				var xml = this.responseText.replace(/&amp;/gm,'&')
					.replace(/&nbsp;/gm,' ').replace(/&bdquo;/gm,'„').replace(/&rdquo;/gm,'“')
					.replace(/&auml;/gm,'ä').replace(/&ouml;/gm,'ö').replace(/&uuml;/gm,'ü')
					.replace(/&Auml;/gm,'Ä').replace(/&Ouml;/gm,'Ö').replace(/&Uuml;/gm,'Ü')
					.replace(/&szlig;/gm,'ß');
				Ti.Android && Ti.UI.createNotification({
					message : 'Apfelnachrichten aktualisiert'
				}).show();
				var XMLTools = require("vendor/XMLTools");
				var xmltools = new XMLTools(xml);
				data = xmltools.toObject();
			} else {
				console.log('Info: received data is JSON: ' + this.responseText.length / 1000 + 'kB');
				try {
					data = JSON.parse(this.responseText);
				} catch(E) {
					console.log('Info: received data is JSON and invalide: ' + E);
					return;
				}
			}
			console.log( typeof data);
			Ti.App.Properties.setString(key, JSON.stringify(data));
			if (!md5 || md5 != Ti.Utils.md5HexDigest(JSON.stringify(data)))
				_options.onload && _options.onload(data);
		},
		onerror : function(e) {
			console.log('Error: ' + e.error);
			if (Ti.App.Properties.hasProperty(key)) {
				_options.onload && _options.onload(JSON.parse(Ti.App.Properties.getString(key)));
			} else if (_options.defaultjson) {
				var data = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, _options.defaultjson).read().text);
				_options.onload && _options.onload(data);
			}
		}
	});
	xhr.open('GET', url, true);
	xhr.send();
	console.log('Info: start data xhr width ' + JSON.stringify(_options));

};
