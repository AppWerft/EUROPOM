const BASEURL="http://www.apfelsorten.ch/images/apfelsorten/images/",MINIBASEURL="http://www.apfelsorten.ch/images/apfelsorten/thumbnails/";exports.create=function(e){var t=JSON.parse(e),i=Ti.UI.createWindow({fullscreen:!0,title:t.title,navBarHidden:!1,backgroundColor:"white"});return setTimeout(function(){i.add(Ti.UI.createImageView({image:t.image,defaultImage:"assets/dummy.jpg",top:0,left:0,width:"35%"}));var e=Ti.UI.createView({layout:"vertical",height:Ti.UI.SIZE,top:0,left:"140dp"});i.add(e),e.add(Ti.UI.createLabel({left:0,text:t.referent,font:{fontSize:"16dp"},top:"5dp",color:"#444",height:Ti.UI.SIZE})),e.add(Ti.UI.createLabel({left:0,text:t.title,top:"5dp",color:"#060",font:{fontSize:"20dp",fontWeight:"bold",fontFamily:"Vollkorn-Regular"},height:Ti.UI.SIZE}));var o=Ti.UI.createScrollView({top:"160dp",bottom:t.thumbs?"100dp":0,layout:"vertical",height:Ti.UI.FILL,width:Ti.UI.FILL,contentHeight:Ti.UI.SIZE,scrollType:"vertical"});if(i.add(o),t.audio&&o.add(require("ui/audioplayer.widget").create(i,t.audio)),o.add(Ti.UI.createLabel({left:"10dp",right:"10dp",text:t.summary||"Hier sollte die Summary zu lesen sein …",font:{fontSize:"18dp"},top:"5dp",bottom:"10dp",color:"#444",height:Ti.UI.SIZE})),void 0!=t.video){var r=Ti.UI.createImageView({top:"10dp",width:Ti.UI.FILL,height:Ti.UI.SIZE,image:t.video.poster}),a=Ti.UI.createImageView({image:"/assets/start.png",width:"100dp",height:"100dp",zIndex:999,borderWidth:1,borderColor:"red"});o.add(r),r.add(a),r.addEventListener("click",function(){require("vendor/video.widget").create({mp4:t.video.mp4,poster:t.video.poster})})}if(t.slides&&t.thumbs){var n=Ti.UI.createScrollView({bottom:0,height:"100dp",scrollType:"horizontal",showHorizontalScrollIndicator:!0,width:Ti.UI.FILL,backgroundColor:"#666",contentWidth:Ti.UI.SIZE,horizontalWrap:!1,layout:"horizontal",contentHeight:"100dp"}),d=t.slides.replace(/\.pdf/gi,"");i.add(n);for(var s=0;s<t.thumbs&&32>s;s++){var l=d+"-"+s+".png";console.log(l);var c=Ti.UI.createImageView({height:Ti.UI.FILL,width:"100dp",left:0,top:0,image:l});n.add(c)}n.addEventListener("click",function(){console.log("Info: click on pdf thumb gallery received");var e=require("ui/progress.widget").create();i.add(e),require("ui/remotepdfviewer").createPDFViewer(t.slides,e)})}},10),i.addEventListener("open",function(){if(Ti.Android&&i.activity){var e=i.activity.actionBar;e&&(e.displayHomeAsUp=!0,e.onHomeIconItemSelected=function(){i.close()})}}),i};