var main = document.getElementById('main');
main.classList.add('show');
var browser = browser || chrome;
var musicName = document.getElementById('musicName');
var playlistName = document.getElementById('playlistName');
var prevM = document.getElementById('previousbtn');
var prevP = document.getElementById('previousbtnP');
var nextM = document.getElementById('nextbtn');
var nextP = document.getElementById('nextbtnP');
var close = document.getElementById("cloclo");
var ProfilName = document.getElementById("name");

var namePlaylist = [];
var idPlaylist = [0];
var MusicFromPlaylist = [{}];
var cptPlaylist = 0;
var cptMusic = 0;

//récupération de la musique d'une playlist apres un changement de playlist ou le premier load
function getMusicFromPlaylist(){
    console.log("TESTESTEST");
    jQuery.get('https://localhost:8000/api/musiclink',
    function (data){
        if (data){
            console.log("api/musiclink" ,data);
            for (var i = 0; i < data.length; i++){
                if (data[i].usr_id == JSON.parse(localStorage.getItem("id")) && data[i].playlist_id == idPlaylist[cptPlaylist]){
                    MusicFromPlaylist[cptMusic] = data[i].Music;
                    console.log("Music ooo ",  MusicFromPlaylist[cptMusic]);
                    cptMusic++;
                }
            }
            cptMusic = 0;
                    if ((MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group).length > 20){
                         musicName.innerHTML = (MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group).slice(0, 16) + "...";
                    }
                    else{
                        musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group;
                    }
                    console.log("MusiqueToPlay", MusicFromPlaylist[cptMusic].music_url);
            localStorage.setItem("MusiqueToPlay", MusicFromPlaylist[cptMusic].music_url);            
        }
    });
}
// récupération des différentes playlist au load de la page
jQuery.get('https://localhost:8000/api/playlist/',
function (data){
    if (data){
        console.log("api/playlist", data);
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
        getMusicFromPlaylist();
    }
});

if (nextP)
    nextP.addEventListener("click", goNextP);
function goNextP()
{
//    console.log("goNext" + cptPlaylist + namePlaylist.length);
    if (namePlaylist.length -1 > cptPlaylist){
        cptPlaylist++;
        playlistName.innerHTML = namePlaylist[cptPlaylist];        
    }
    else{
        cptPlaylist = 0;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
    }
    cptMusic = 0;
    MusicFromPlaylist = [{}];
    getMusicFromPlaylist();
}


if (prevP)
prevP.addEventListener("click", goPrevP);
function goPrevP()
{
if (cptPlaylist == 0){
    cptPlaylist = namePlaylist.length -1;
    playlistName.innerHTML = namePlaylist[cptPlaylist];        
}
    else {
        cptPlaylist--;
        playlistName.innerHTML = namePlaylist[cptPlaylist];
    }
    cptMusic = 0;
    MusicFromPlaylist = [{}];
    getMusicFromPlaylist();
}

function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}

if (nextM)
    nextM.addEventListener("click", goNextM);
function goNextM()
{
console.log("YOYYYOYOYOYOYYYOYOYOYOYOYOYOYOYOYOOYYO");    
  //  console.log("goNext" + cptMusic + MusicFromPlaylist[cptMusic].music_name);
    if (MusicFromPlaylist.length -1 > cptMusic){
        cptMusic++;
        if ((MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group).length > 20){
            musicName.innerHTML = (MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group).slice(0, 16) + "...";
       }
       else{
           musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group;
       }//        musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name;        
    }
    else{
        cptMusic = 0;
        if ((MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group).length > 20){
            musicName.innerHTML = (MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group).slice(0, 16) + "...";
       }
       else{
           musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name + " - " + MusicFromPlaylist[cptMusic].music_group;
       }
    }
    localStorage.setItem("MusiqueToPlay", MusicFromPlaylist[cptMusic].music_url);
}

if (prevM)
    prevM.addEventListener("click", goPrevM);
function goPrevM()
{
//    console.log("goPrev !!!  " + cptMusic + MusicFromPlaylist[cptMusic].music_name);
    if (cptMusic == 0){
        cptMusic = MusicFromPlaylist.length -1;
        console.log(MusicFromPlaylist[cptMusic]);
        musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name;        
    }
    else{
        cptMusic--;
        musicName.innerHTML = MusicFromPlaylist[cptMusic].music_name;
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
//check url pour pouvoir passer sur la page d'ajout de la musique
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
        console.log("api/user", data);
        ProfilName.innerHTML = data.User.usr_login;
    }
}
);
/*
jQuery.get('https://localhost:8000/api/music/' + 1,
function (data){
    if (data){
        console.log(data.Music);
        musicName.innerHTML = data.Music.music_name + " - " + data.Music.music_group;
    }
}
);*/
