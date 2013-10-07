exports.get = function(_options) {
	var md5, url = _options.url;
	var key = Ti.Utils.md5HexDigest(url);
	if (Ti.App.Properties.hasProperty(key)) {
		var data = JSON.parse(Ti.App.Properties.getString(key));
		md5 = Ti.Utils.md5HexDigest(JSON.stringify(data));
		console.log('Info: old json found => onload');
		_options.onload && _options.onload(data);
	}
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			console.log(this.status);
			console.log(e.status);
			var data;
			if (this.responseText.match(/<\?xml/)) {
				var XMLTools = require("vendor/XMLTools");
				var xmltools = new XMLTools(this.responseText);
				data = xmltools.toObject();
				console.log(data);
			} else
				data = this.responseText;
			Ti.App.Properties.setString(key, JSON.stringify(data));
			if (!md5 || md5 != Ti.Utils.md5HexDigest(JSON.stringify(data)))
				_options.onload && _options.onload(data);
		},
		onerror : function(e) {
			console.log('Warning: ' + e.error);
			if (Ti.App.Properties.hasProperty(key)) {
				_options.onload && _options.onload(JSON.parse(Ti.App.Properties.getString(key)));
			} else if (_options.defaultjson) {

			}
		}
	});
	xhr.open('GET', url, true);
	xhr.send();
	console.log('Info: start data xhr');
};
