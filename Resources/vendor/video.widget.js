exports.create = function(_args) {
	if (Ti.Network.online == false || !_args.mp4)
		return;
	var url = _args.mp4;
	var win = Ti.UI.createWindow({
		backgroundColor : 'white',
		orientationModes : [Ti.UI.LANDSCAPE_RIGHT, Ti.UI.LANDSCAPE_LEFT]
	});
	win.add(Ti.UI.createImageView({
		image : _args.poster
	}));
	var videoplayer = Ti.Media.createVideoPlayer({
		autoplay : true,
		fullscreen : true,
		backgroundColor : '#333',
		url : url,
		mediaControlStyle : Ti.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Ti.Media.VIDEO_MODE_FILL
	});
	videoplayer.addEventListener('playbackstate', function(_e) {
		console.log(_e.playbackState);
	});
	videoplayer.addEventListener('complete', function(e) {
		if (e.reason == 0) {
			win.close();
		};
	});
	videoplayer.addEventListener('fullscreen', function(e) {
		if (e.entering == 0) {
			win.close();
		};
	});
};
