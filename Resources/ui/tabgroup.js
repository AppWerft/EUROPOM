exports.create = function() {
	Ti.UI.backgroundImage = '/assets/bg.png';
	var tabGroup = Titanium.UI.createTabGroup({
		backgroundColor : 'white',
		navBarHidden : true,
		fullscreen : true,
		exitOnClose : true
	});
	var tab1 = Titanium.UI.createTab({
		title : 'Vorlesungen',
		icon : 'icon/user.png',
		window : require('ui/lectures.window').create()
	});
	var tab2 = Titanium.UI.createTab({
		title : 'Äpfel-DB',
		icon : 'icon/plant.png',
		window : require('ui/apfelDB.window').create()
	});
	var tab3 = Titanium.UI.createTab({
		title : 'Lageplan',
		icon : 'icon/mapmarker.png',
		window : require('ui/gmap.window').create()
	});
	var tab4 = Titanium.UI.createTab({
		title : 'Nachrichten',
		icon : 'icon/pvicon.png',
		window : require('ui/apfelfeed.window').create()
	});
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);
	tabGroup.addTab(tab2);
	return tabGroup;
};
