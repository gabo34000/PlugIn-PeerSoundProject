	var iframe = document.getElementById('PSPFrame');
if (!iframe){
var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('index.html');
    iframe.id = "PSPFrame";
    setTimeout(function(){
    	iframe.className += 'showPSP';
  	}, 500);
    document.body.appendChild(iframe);
}
}