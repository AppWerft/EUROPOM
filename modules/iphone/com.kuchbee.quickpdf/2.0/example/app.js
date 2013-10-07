// Create a Window
var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});


var quickpdfreader = require('com.kuchbee.quickpdf');
Ti.API.info("module is => " + quickpdfreader);

var button = Ti.UI.createButton({
	top:10,
	left:10,
	right:10,
	title:'Open Pdf File'
});

win.add(button);
button.addEventListener('click',function(e){
	quickpdfreader.openPDF({
		file: 'app',
		password: '',
		isMailEnabled:false, // Is mail option enabled or not
		loadFileFrom: 'resources',
		close: function(e){
			alert('closed');
		}
	});
});

win.open();
