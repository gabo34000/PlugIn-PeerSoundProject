var main = document.getElementById('main');
main.classList.add('show');
var browser = browser || chrome;
var musicName = document.getElementById('musicName');
var playlistName = document.getElementById('playlistName');
var prev = document.getElementById('previousbtn');
var prevP = document.getElementById('previousbtnP');
var next = document.getElementById('nextbtn');
var nextP = document.getElementById('nextbtnP');
var close = document.getElementById("cloclo");

var namePlaylist = [];
var idPlaylist = [0];
var cptPlaylist = 0;
var nameMusic = [];
var idMusic = [0];
var cptMusic = 0;

function getMusicFromPlaylist(){
    jQuery.get('https://localhost:8000/api/musiclink',
    function (data){
        if (data){
            console.log(data);
            for (var i = 0; i < data.length; i++){
                if (data[i].usr_id == JSON.parse(localStorage.getItem("id")) && data[i].playlist_id == idPlaylist[cptPlaylist]){
                    idMusic[cptMusic] == data[i].music_id;
                    cptMusic++;
                }
            }
            cptMusic = 0;
            jQuery.get('https://localhost:8000/api/music/' + idMusic[cptMusic],
            function (data){
                if (data){
                    console.log(data.Music);
                    if ((data.Music.music_name + " - " + data.Music.music_group).length > 20)
                    musicName.innerHTML = (data.Music.music_name + " - " + data.Music.music_group).slice(0, 16) + "...";
                    else
                        musicName.innerHTML = data.Music.music_name + " - " + data.Music.music_group;
                }
            });
        }
    });
}

jQuery.get('https://localhost:8000/api/playlist/',
function (data){
    if (data){
        console.log(data);
        for (var i = 0; i < data.length; i++){
            if (data[i].playlist_creator == JSON.parse(localStorage.getItem("id")))
                {
                    namePlaylist[cptPlaylist] = data[i].playlist_name;
                    idPlaylist[cptPlaylist] = data[i].playlist_id;
                    cptPlaylist++;
                }
        }
        cptPlaylist = 0;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
       // getMusicFromPlaylist();
    }
});

/*
if (prev)
    prev.addEventListener("click", goPrev);
function goPrev()
{
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

*/
if (nextP)
    nextP.addEventListener("click", goNext);
function goNext()
{
    console.log("goNext" + cptPlaylist + namePlaylist.length);
    if (namePlaylist.length -1> cptPlaylist){
        cptPlaylist++;
        playlistName.innerHTML = namePlaylist[cptPlaylist];        
    }
    else{
        cptPlaylist = 0;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
    }   
}

if (prevP)
prevP.addEventListener("click", goPrev);
function goPrev()
{
if (cptPlaylist == 0){
    cptPlaylist = namePlaylist.length -1;
    playlistName.innerHTML = namePlaylist[cptPlaylist];        
}
    else {
        cptPlaylist--;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
    }
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
