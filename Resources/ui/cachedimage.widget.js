exports.create = function(_options) {
	var imageDirectoryName = 'cache4image', url = _options.url, imageViewObject = _options.view, onload = _options.onload;
	// Grab the filename
	var filename = url.split('/');
	filename = filename[filename.length - 1];
	// Try and get the file that has been previously cached
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);

	if (file.exists()) {
		// If it has been cached, assign the local asset path to the image view object.
		if (imageViewObject)
			imageViewObject.image = file.nativePath;

		if (onload)
			onload(file.nativePath);
		//To release memory
		file = null;
	} else {
		// If it hasn't been cached, grab the directory it will be stored in.
		var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
		if (!g.exists()) {
			// If the directory doesn't exist, make it
			g.createDirectory();
		};

		// Create the HTTP client to download the asset.
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function() {
			if (xhr.status == 200) {
				// On successful load, take that image file we tried to grab before and
				// save the remote image data to it.
				file.write(xhr.responseData);
				// Assign the local asset path to the image view object.
				if (imageViewObject)
					imageViewObject.image = file.nativePath;
				if (onload)
					onload(file.nativePath);
				//To release memory
				file = null;
			};
		};

		// Issuing a GET request to the remote URL
		xhr.open('GET', url);
		// Finally, sending the request out.
		xhr.send();
	};
};
