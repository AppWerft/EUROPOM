exports.createPDFViewer = function(_pdfurl) {
	var self = Ti.UI.createWindow();
	var pdfview = Ti.UI.createWebView({
		url : _pdfurl
	});
	self.add(pdfview);
	self.addEventListener('longpress', function() {
		self.close();
	});
};
