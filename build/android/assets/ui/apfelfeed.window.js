Array.prototype.isArray=!0,exports.create=function(){var e=Ti.UI.createWindow({backgroundImage:"/assets/bg.png",barColor:"#040",exitOnClose:!0,title:"Apfel-Nachrichten"});e.listView=Ti.UI.createListView({templates:{feed:require("ui/TEMPLATES").feedrow},defaultItemTemplate:"feed"}),e.add(e.listView),e.listView.addEventListener("itemclick",function(t){Ti.Android?require("ui/web.window").create(t.itemId).open():e.tab.open(require("ui/web.window").create(t.itemId))});var t=function(){require("vendor/cachedxhr").get({url:"http://pomologen-verein.de/startseite/rss.xml",onload:function(t){console.log(t);var i=[];if(!t.channel||!t.channel.description)return void console.log("Warning: no valide RSS");e.title=t.channel.description;var r,o=t.channel.item&&t.channel.item.isArray?t.channel.item:[],n=[],s=/<img src="(.*?)"/gm;if(o.isArray)for(var a=0;a<o.length;a++){var l=o[a],c=l.description.replace(/\.\.\./," …"),p=s.exec(l["content:encoded"]);r=p?"http://pomologen-verein.de/"+p[1]:null,console.log(c),n.push({title:{text:l.title},description:{text:""+c},pic:{image:r},properties:{itemId:JSON.stringify(o[a]),accessoryType:Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE}})}i.push(Ti.UI.createListSection({items:n})),e.listView.setSections(i)}})};return e.addEventListener("focus",t),console.log("================="),e};