exports.create = function() {
	var self = Ti.UI.createWindow({
		backgroundImage : '/assets/bg.png'
	});
	const START = 0.003;
	var region = {
		latitude : 53.5591561,
		longitude : 9.8597789,
		latitudeDelta : START,
		longitudeDelta : START
	};
	self.gmap = Ti.App.GMap.createView({
		userLocation : false,
		enableZoomControls : false,
		mapType : Ti.App.GMap.HYBRID_TYPE,
		userLocationButton : true,
		region : region
	});
	var linne = Ti.App.GMap.createAnnotation({
		latitude : 53.5597870,
		longitude : 9.8597789,
		title : 'Carl-von-Linné-Hörsaal',
		subtitle : "Bio-Zentrum der Universität Hamburg"
	});
	self.gmap.addAnnotation(linne);
	self.gmap.addEventListener('complete', function() {
		console.log('Info: map complete');
		self.gmap.selectAnnotation(linne);
	});
	self.addEventListener('open', function() {
		self.add(self.gmap);
	});
	return self;
};
