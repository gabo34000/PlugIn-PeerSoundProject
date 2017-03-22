if (localStorage['musique'])
    document.getElementById("conteneur").innerHTML = localStorage['musique'];
var idMusicV1 = localStorage['musique'].slice("https://www.youtube.com/watch?v=".length, localStorage['musique'].length);
var index = idMusicV1.indexOf("&index");
var list = idMusicV1.indexOf("&list");
var idMusicV2 = "";

if (index >= list) {
    if (list != -1) {
        idMusicV2 = idMusicV1.slice(0, list);
        alert("list" + idMusicV2);
    } else if (list == -1 && index != -1) {
        idMusicV2 = idMusicV1.slice(0, index);
    } else {
        idMusicV2 = idMusicV1;
    }
} else if (index <= list) {
    if (index != -1) {
        idMusicV2 = idMusicV1.slice(0, index);
        alert("index" + idMusicV2);
    } else if (index == -1 && list != -1) {
        idMusicV2 = idMusicV1.slice(0, list);
    } else {
        idMusicV2 = idMusicV1;
    }
} else {
    idMusicV2 = idMusicV1;
}

var include = function(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url + '?' + (new Date().getTime());
    if (callback) {
        script.onreadystatechange = callback;
        script.onload = script.onreadystatechange;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}

var artist = "";
var title = "";
var url = 'https://www.youtube.com/watch?v=' + idMusicV2;
$.getJSON('https://noembed.com/embed', { format: 'json', url: url }, function(data) {
    console.log(data.title);
    var test = data.title.indexOf(" - ");
    if (test != -1) {
        artist = data.title.slice(0, test);
        title = data.title.slice(test + 3, data.title.length);
    } else {
        title = data.title;
    }
    addInfMusic();
});

function addInfMusic() {
    console.log("artist :" + artist + " title :" + title);
    var pourquoipas = document.getElementById("pourquoipas");
    pourquoipas.innerHTML = "";
    var pourquoipass = document.getElementById("pourquoipass");
    pourquoipass.innerHTML = "";
    var name = document.getElementById("firstname");
    name.value = title;
    var artiste = document.getElementById("artiste");
    if (artist != "")
        artiste.value = artist;
}