sessionStorage.removeItem('infos');

var docActive = document.activeElement;
document.activeElement.blur();

var iframe = document.getElementById('doggyFrame');
iframe.classList.remove('showdoggy');
setTimeout(function(){
iframe.parentElement.removeChild(iframe);
}, 1000);

/*
for (var i = 0; i < iframes.length; i++) {
		iframes[i].classList.remove('showdoggy');
		//setTimeout(function(){
    	iframes[i].parentNode.removeChild(iframes[i]);
    //}, 1000);
}*/

docActive = document.activeElement;