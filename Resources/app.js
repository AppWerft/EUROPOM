(function() {
	var Pommes = require('model/pommes');
//	Ti.App.KenBurns= require('vendor/ti.kenburns').Slideshow();
	Ti.App.PommesModel = new Pommes();
	Ti.App.GMap = Ti.Android ? require('ti.map') : Ti.Map;
	console.log('Info: Maps module included. ===================================')
	require('ui/tabgroup').create().open();
})();
