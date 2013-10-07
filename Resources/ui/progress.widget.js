exports.create = function() {
	var self = Ti.UI.createView({
		bottom : 0,
		height : '100dp'
	});
	self.progress = Ti.UI.createProgressBar({
		width : '90%',
		min : 0,
		max : 1
	});
	self.add(self.progress);
	self.progress.show();
	return self;
};
