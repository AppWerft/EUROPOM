exports.create = function() {
	Ti.UI.backgroundImage = '/assets/bg.png';
	var self = Ti.UI.createTabGroup({
		navBarHidden : false,
		backgroundColor : '#070',
		fullscreen : true,
		title : 'europom2013 in Hamburg',
		exitOnClose : true
	});
	var tab1 = Ti.UI.createTab({
		title : 'Vorträge',
		window : require('ui/lectures.window').create()
	});
	var tab2 = Ti.UI.createTab({
		title : 'Äpfel-DB',
		window : require('ui/apfelDB.window').create()
	});
	var tab3 = Ti.UI.createTab({
		title : 'Lageplan',
		window : require('ui/gmap.window').create()
	});
	var tab4 = Ti.UI.createTab({
		title : 'Vereinsnews',
		window : require('ui/apfelfeed.window').create()
	});
	self.addTab(tab1);
	self.addTab(tab3);
	self.addTab(tab4);
	self.addTab(tab2);
	self.addEventListener('open', function() {
		if (Ti.Android) {
			self.activity = self.getActivity();
			self.actionBar = self.activity.actionBar;
			if (self.actionBar) {
				self.activity.onCreateOptionsMenu = function(e) {
					e.menu.clear();
					e.activity = self.activity;
					e.actionBar = self.actionBar;
					self.activeTab && self.activeTab.fireEvent('onCreateOptionsMenu', e);
				};
				self.actionBar.setTitle('EUROPOM2013');
				self.activity.invalidateOptionsMenu();
			}
		}
	});
	return self;
};
