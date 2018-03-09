var main = document.getElementById('main');
main.classList.add('show');
var browser = browser || chrome;
var musicName = document.getElementById('musicName');
var prev = document.getElementById('previousbtn');
var next = document.getElementById('nextbtn');
var close = document.getElementById("cloclo");

if (prev)
    prev.addEventListener("click", goPrev);

function goPrev()
{   
    console.log("maniite");
    var num = localStorage.getItem("numMusic");
    if (num > 1)
        num--;
    jQuery.get('https://localhost:8000/api/music/' + num,
    function (data){
        if (data){
            console.log(data.Music);
            if (data.Music != undefined){
                if ((data.Music.music_name + " - " + data.Music.music_group).length > 20)
                musicName.innerHTML = (data.Music.music_name + " - " + data.Music.music_group).slice(0, 16) + "...";
                else
                    musicName.innerHTML = data.Music.music_name + " - " + data.Music.music_group;
                localStorage.setItem("numMusic", num);
            }
        }
    }
    );
}


if (next)
    next.addEventListener("click", goNext);

function goNext()
{

    var num = localStorage.getItem("numMusic");
    num++;
    jQuery.get('https://localhost:8000/api/music/' + num,
    function (data){
        if (data){
            console.log(data.Music);
            if (data.Music != undefined)
            if ((data.Music.music_name + " - " + data.Music.music_group).length > 20)
            musicName.innerHTML = (data.Music.music_name + " - " + data.Music.music_group).slice(0, 16) + "...";
            else
                musicName.innerHTML = data.Music.music_name + " - " + data.Music.music_group;
            localStorage.setItem("numMusic", num); 
        }
    }
    );
}

if (close)
  close.addEventListener("click", closer);

function closer(){
browser.tabs.executeScript(null, {file: "closer.js"});
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
         browser.windows.getLastFocused(function(fenetre) { getLink(fenetre); });
     } else {
         if (!tab) {
             browser.tabs.getSelected(fenetre.id, function(tab) { getLink(fenetre, tab); });
         } else {
             var url = tab.url;
             if (url.indexOf("www.youtube.com/watch?v=") > 0 || url.indexOf("soundcloud.com/") > 0){
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

jQuery.get('https://localhost:8000/api/music/' + 1,
function (data){
    if (data){
        console.log(data.Music);
        musicName.innerHTML = data.Music.music_name + " - " + data.Music.music_group;
    }
}
);
