exports.create=function(){var e=Ti.UI.createWindow({modal:!0,width:"85%",height:"75%"});const t=.3;return Ti.Geolocation.locationServicesEnabled?(Ti.Geolocation.purpose="Get Current Location",Ti.Android&&(Ti.Geolocation.Android.addLocationRule(Ti.Geolocation.Android.createLocationRule({provider:Ti.Geolocation.PROVIDER_GPS,accuracy:10,maxAge:300,minAge:10})),Ti.Geolocation.Android.addLocationProvider(Ti.Geolocation.Android.createLocationProvider({name:Ti.Geolocation.PROVIDER_GPS,minUpdateTime:600,minUpdateDistance:100}))),Ti.Geolocation.addEventListener("location",function(i){if(console.log(i),i.success||(i.coords=Ti.Geolocation.getLastGeolocation(),console.log(i.coords)),i.coords){e.gmap=Ti.App.GMap.createView({userLocation:!0,enableZoomControls:!1,mapType:Ti.App.GMap.TERRAIN_TYPE,userLocationButton:!0,region:{latitude:i.coords.latitude,longitude:i.coords.longitude,latitudeDelta:t,longitudeDelta:t}});var o=Ti.App.GMap.createAnnotation({latitude:i.coords.latitude,longitude:i.coords.longitude,draggable:!0});e.gmap.addAnnotation(o),e.add(e.gmap)}})):alert("Bitte schalte den Zugriff auf die Geolocation frei"),e};