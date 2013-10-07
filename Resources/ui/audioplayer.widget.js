const MILK = 0.8;
exports.create = function(window, url, duration) {
	if (!url)
		return;
	var audioPlayer = Ti.Media.createAudioPlayer({
		url : url,
		allowBackground : true
	});
	var self = Ti.UI.createView({
		right : '5dp',
		left : '5dp',
		height : '45dp'
	});
	self.progress = Ti.UI.createProgressBar({
		min : 0,
		max : duration || 1800,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		right : 0,
		left : '160dp'
	});
	self.add(self.progress);
	self.navi = Ti.UI.createView({
		backgroundImage : '/assets/player.png',
		width : '150dp',
		left : '5dp',
		height : '45dp'
	});
	self.add(self.navi);

	var pause = Ti.UI.createView({
		left : 0,
		width : '50dp',
		height : '50dp',
		backgroundColor : 'white',
		opacity : MILK
	});
	var start = Ti.UI.createView({
		width : '50dp',
		height : '50dp',
		backgroundColor : 'white',
		opacity : 0,
	});
	var stop = Ti.UI.createView({
		right : 0,
		width : '50dp',
		height : '50dp',
		backgroundColor : 'white',
		opacity : MILK
	});
	self.navi.add(pause);
	self.navi.add(start);
	self.navi.add(stop);
	self.navi.addEventListener('click', function() {
		if (audioPlayer.playing || audioPlayer.paused) {
			start.setOpacity(0);
			stop.setOpacity(MILK);
			Ti.Media.vibrate();
			audioPlayer.stop();
			
			if (Ti.Platform.name === 'android') {
				audioPlayer.release();
			}
		} else {
			start.setOpacity(MILK);
			stop.setOpacity(0);
			audioPlayer.start();

		}
	});
	audioPlayer.addEventListener('progress', function(_e) {
		console.log(_e.progress / 1000);
		self.progress.setValue(_e.progress / 1000);
	});
	window.addEventListener('close', function() {
		if (audioPlayer.playing || audioPlayer.paused) {
			setTimeout(function() {
				audioPlayer.stop();
				if (Ti.Platform.osname === 'android') {
					audioPlayer.release();
				}
			}, 10);
			alert('Die Audiowiedergabe wird abgebrochen.');
		}
	});
	return self;
};
