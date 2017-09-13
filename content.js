	var iframe = document.getElementById('doggyFrame');
if (!iframe){
var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('index.html');
    iframe.id = "doggyFrame";
    setTimeout(function(){
    	iframe.className += 'showdoggy';
  	}, 500);
    document.body.appendChild(iframe);
}
}