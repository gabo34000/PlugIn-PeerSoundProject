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
             if (url.indexOf("www.youtube.com/watch?v=") > 0){
                var urlStringified = JSON.stringify(url);
                localStorage.setItem("musicToAdd", urlStringified);
                main.classList.remove('show');
                setTimeout(function(){
                 document.location.href = "takeMusic.html"
                }, 500);
            }
        }
    }
}

var musicAdded = localStorage.getItem('musicAdded');
musicAdded = JSON.parse(musicAdded);
if (musicAdded == 1){
    $(function(){
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        function show_popup(){
            $(".popup").slideUp();
        };
        window.setTimeout( show_popup, 2000 );
     });
     popup.classList.toggle("hidden");
     musicAdded = 0;
     localStorage.setItem('musicAdded', musicAdded);     
}

jQuery.get('https://localhost:8000/api/user/' + JSON.parse(localStorage.getItem("id")),
function (data){
    if (data){
        console.log(data);
    }
}
);