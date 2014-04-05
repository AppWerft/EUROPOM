exports.start = function() {
	var e = (arguments[0] || {}, "https://play.google.com/store/apps/details?id=" + Ti.App.getId()), t = Ti.Network.createHTTPClient({
		onload : function() {
			var t = /itemprop="softwareVersion">(.*?)</m.exec(this.responseText);
			if (t && ( version = t[1].replace(/\s+/g, "")) != Ti.App.getVersion()) {
				var r = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ["Zum Store", "Abbruch"],
					message : "Es gibt eine neue Version im Playstore.\n\nDiese App auf dem " + Ti.Platform.model + " von " + Ti.Platform.manufacturer + " hat die Version " + Ti.App.getVersion() + " – im Store ist derweil " + version + ".\n\nMöchtest Du erneuern?",
					title : "Neue Version Europom2013"
				});
				r.addEventListener("click", function(t) {
					t.index != t.source.cancel && Ti.Platform.openURL(e);
				}), r.show();
			} else
				Ti.Android && Ti.UI.createNotification({
					message : "Europom2013 ist in neuester Version (" + Ti.App.getVersion() + ")"
				}).show();
		}
	});
	t.open("GET", e), t.send();
}; 