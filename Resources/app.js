(function() {
	var Pommes = require('model/pommes');
	Ti.App.PommesModel = new Pommes();
	Ti.App.GMap = Ti.Android ? require('ti.map') : Ti.Map;
	require('ui/tabgroup').create().open();
	require('vendor/versionsreminder').start();
})();
