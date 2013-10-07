exports.createPDFViewer = function(_pdfurl, _progresswidget) {
	var getFromCache = function(_pdf, _onload) {
		var pdffile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Ti.Utils.md5HexDigest(_pdfurl)+ '.pdf');
		if (pdffile.exists()) {
			console.log('Info:  pdf was alreadystored => displaying');
			_progresswidget.hide();
			_onload({
				path : pdffile,
				file : Ti.Utils.md5HexDigest(_pdfurl)
			});
		} else {
			var xhr = Ti.Network.createHTTPClient({
				onload : function(e) {
					console.log(e.status);
					_progresswidget.hide();
					pdffile.write(this.responseData);
					_onload({
						path : pdffile,
						file : Ti.Utils.md5HexDigest(_pdfurl)
					});
				},
				onerror : function(e) {
					console.log(e.error);
				},
				ondatastream : function(_e) {
					_progresswidget.progress.value = _e.progress;
				}
			});
			xhr.open('GET', _pdf);
			console.log('Info: getting pdf=' + _pdf);
			xhr.send(null);
			console.log('Info: start pdf downloading');
		}
	};
	console.log('Info: start pdf displaying');
	getFromCache(_pdfurl, function(_pdf) {
		console.log('Info: pdf is caching and ready for display');
		if (Ti.Filesystem.isExternalStoragePresent()) {
			var filenameBase = new Date().getTime();
			tmpFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, filenameBase + '.europom.pdf');
			tmpFile.write(_pdf.path.read());
			if (tmpFile.exists()) {
				var intent = Ti.Android.createIntent({
					action : Ti.Android.ACTION_VIEW,
					type : "application/pdf",
					data : tmpFile.getNativePath()
				});
				try {
					Ti.Android.currentActivity.startActivity(intent);
				} catch(e) {
					Ti.API.debug(e);
					alert('No apps PDF apps installed!');
				}
			} else {
				Ti.API.info('starting intent tmpFile exists: ' + tmpFile.exists());
				alert('Our file disappeared!');
			}
		} else {
			console.log('Info: iOS node');
			var quickpdfreader = require('com.kuchbee.quickpdf');
			quickpdfreader.openPDF({
				file : _pdf.file,
				password : '',
				isMailEnabled : false,
				loadFileFrom : 'document',
				close : function(e) {
					alert('closed');
				}
			});
			/*var doc = Ti.UI.iOS.createDocumentViewer({
			 url : _appFile.nativePath
			 });
			 doc.show();*/
		}
	});
	return;
};
