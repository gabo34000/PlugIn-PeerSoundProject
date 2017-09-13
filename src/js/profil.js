var main = document.getElementById('main');
main.classList.add('show');

var close = document.getElementById("cloclo");
if (close)
  close.addEventListener("click", closer);

function closer(){
chrome.tabs.executeScript(null, {file: "closer.js"});
}

var add = document.getElementById('buttonAdd');
if (add)
    add.addEventListener("click", getMusic);

function getMusic()
{
    getLink();
}

function getLink(fenetre, tab) {
    if (!fenetre) {
         chrome.windows.getLastFocused(function(fenetre) { getLink(fenetre); });
     } else {
         if (!tab) {
             chrome.tabs.getSelected(fenetre.id, function(tab) { getLink(fenetre, tab); });
         } else {
             var url = tab.url;
             if (url.indexOf("youtube") > 0)
             var urlStringified = JSON.stringify(url);
             localStorage.setItem("musicToAdd", urlStringified);
             main.classList.remove('show');
             setTimeout(function(){
                 document.location.href = "takeMusic.html"
             }, 500);
         }
     }
 }