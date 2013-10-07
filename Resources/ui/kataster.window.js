const START = 0.01;
exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		title : 'Baumkataster Streuobstbestände',
		//backgroundImage : '/assets/bg.png'
	});
	var scroller = Ti.UI.createScrollView({
		top : 0,
		left : '10dp',
		right : '10dp',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		contentHeight : Ti.UI.SIZE,
		scrollType : 'vertical',
		layout : 'vertical'
	});
	self.add(scroller);
	var title = Ti.UI.createLabel({
		text : 'Bestandsaufnahme von Streuobstwiesen/ Obstgärten',
		top : '10dp',
		width : Ti.UI.FILL,
		backgroundColor : 'white',
		textAlign : 'center',
		color : '#343',
		font : {
			fontSize : '22dp',
			fontWeight : 'bold',
			fontFamily : 'Vollkorn-Regular'
		}
	});
	scroller.add(title);

	var basicSwitch = Ti.UI.createSwitch({
		titleOff : ' Die Daten sind nur für den internen Gebrauch des PV zu verwenden',
		titleOn : 'Die Daten dürfen veröffentlicht werden.',
		value : true,
		top : '10dp',
		width : Ti.UI.FILL,
		height : 120
	});
	scroller.add(basicSwitch);
	var map = Ti.UI.createView({
		top : '10dp',
		height : '70dp'
	});
	map.text = Ti.UI.createLabel({
		left : 0,
		width : '45%'
	});
	map.button = Ti.UI.createButton({
		title : 'Standortkarte',
		right : 0,
		width : '45%'
	});
	map.button.addEventListener('click', function() {
		var mapwidget = require('ui/gmap.widget').create();
		mapwidget.open();
	});
	map.add(map.text);
	map.add(map.button);
	scroller.add(map);
	var sorten = Ti.App.PommesModel.getAllSorten();
	var picker = Ti.UI.createPicker({
		top : '10dp',
		right : '10dp',
		useSpinner : false,
	});
	var rows = [];
	for (var i = 0; i < sorten.length; i++) {
		rows.push(Ti.UI.createPickerRow({
			title : sorten[i]
		}));
	}
	picker.add(rows);
	picker.selectionIndicator = true;
	scroller.add(picker);
	var besitzer = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : '10dp',
		width : Ti.UI.FILL,
		height : '50dp',
		hintText : 'Besitzer'
	});
	scroller.add(besitzer);
	var betreiber = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : '10dp',
		width : Ti.UI.FILL,
		height : '50dp',
		hintText : 'Betreiber'
	});
	scroller.add(betreiber);
	var ansprechpartner = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : '10dp',
		width : Ti.UI.FILL,
		height : '50dp',
		hintText : 'Ansprechpartner'
	});
	scroller.add(ansprechpartner);
	var pomologe = Ti.UI.createTextField({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : '10dp',
		width : Ti.UI.FILL,
		height : '50dp',
		hintText : 'Pomologe'
	});
	scroller.add(pomologe);
	var bemerkung = Ti.UI.createTextArea({
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color : '#336699',
		top : '10dp',
		width : Ti.UI.FILL,
		height : '300dp',
		hintText : 'Bemerkungen'
	});
	scroller.add(bemerkung);
	return self;
};
