exports.create = function() {
	Ti.UI.backgroundImage = '/assets/bg.png';
	var tabGroup = Titanium.UI.createTabGroup({
		backgroundColor : 'white',
		exitOnClose : true
	});
	var tab1 = Titanium.UI.createTab({
		title : 'Vorlesungen',
		icon : 'icon/user.png',
		window : require('ui/vorlesungen.window').create()
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
	var tab5 = Titanium.UI.createTab({
		title : 'Baumkataster',
		icon : 'icon/treeicon.png',
		window : require('ui/kataster.window').create()
	});
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab3);
	if (Ti.Android)
		tabGroup.addTab(tab5);
	tabGroup.addTab(tab4);
	tabGroup.addTab(tab2);
	return tabGroup;
};
