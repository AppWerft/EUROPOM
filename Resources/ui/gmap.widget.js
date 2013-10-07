exports.create = function() {
	var self = Ti.UI.createWindow({
		modal : true,
		width : '85%',
		height : '75%'
	});
	const START = 0.3;
	if (Ti.Geolocation.locationServicesEnabled) {
		Ti.Geolocation.purpose = 'Get Current Location';
		if (Ti.Android) {
			Ti.Geolocation.Android.addLocationRule(Ti.Geolocation.Android.createLocationRule({
				provider : Ti.Geolocation.PROVIDER_GPS,
				accuracy : 10,
				maxAge : 300,
				minAge : 10
			}));
			Ti.Geolocation.Android.addLocationProvider(Ti.Geolocation.Android.createLocationProvider({
				name : Ti.Geolocation.PROVIDER_GPS,
				minUpdateTime : 600,
				minUpdateDistance : 100
			}));
		}
		Ti.Geolocation.addEventListener('location', function(_e) {
			console.log(_e);
			if (!_e.success) {
				_e.coords = Ti.Geolocation.getLastGeolocation();
				console.log(_e.coords);
			}
			if (!_e.coords) {
				return;
			}
			self.gmap = Ti.App.GMap.createView({
				userLocation : true,
				enableZoomControls : false,
				mapType : Ti.App.GMap.TERRAIN_TYPE,
				userLocationButton : true,
				region : {
					latitude : _e.coords.latitude,
					longitude : _e.coords.longitude,
					latitudeDelta : START,
					longitudeDelta : START
				}
			});
			var mypin = Ti.App.GMap.createAnnotation({
				latitude : _e.coords.latitude,
				longitude : _e.coords.longitude,
				draggable : true
			});
			self.gmap.addAnnotation(mypin);
			self.add(self.gmap);

		});
		// perform other operations with Ti.Geolocation
	} else {
		alert('Bitte schalte den Zugriff auf die Geolocation frei');
	}

	return self;
};
