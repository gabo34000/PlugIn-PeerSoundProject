if (localStorage['musique'])
    document.getElementById("conteneur").innerHTML = localStorage['musique']; //'<img href="' + adresse + '" alt="riendutout"/>';//alert(localStorage['musique']);
//alert(localStorage['musique']);
var idMusicV1 = localStorage['musique'].slice("https://www.youtube.com/watch?v=".length, localStorage['musique'].length);
//alert("test : " + idMusicV1);
var index = idMusicV1.indexOf("&index");
var list = idMusicV1.indexOf("&list");
var idMusicV2 = "";
alert("index" + index + "list" + list);
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
alert("ID MUSIC " + idMusicV2);

function include(fileName) {
    document.write("<script type='text/javascript' src='" + fileName + "'></script>");
}
include("https://code.jquery.com/jquery-1.11.3.js");
//var id = 'rVqAdIMQZlk';
var url = 'https://www.youtube.com/watch?v=' + idMusicV2;
$.getJSON('https://noembed.com/embed', { format: 'json', url: url }, function(data) {
    alert(data.title);
});

/*var ongl = document.getElementById("btn");
if (ongl)
    ongl.addEventListener("click", newTab);

function newTab(fenetre, tab) { //check sur quelle page nous sommes si c'est youtube la dupliquer sinon alert l'url de la page
    if (!fenetre) // premier appel : aucun paramètre existant
    {
        chrome.windows.getLastFocused(function(fenetre) { newTab(fenetre); }); //on demande la fenêtre visible
    } else {
        if (!tab) // deuxième appel : 1 paramètre existant (fenetre)
        {
            chrome.tabs.getSelected(fenetre.id, function(tab) { newTab(fenetre, tab); }); //on demande la fenêtre visible, et on appelle la fonction une deuxième fois
        } else // troisième appel : 2 paramètres existants (fenetre et tab)
        {
            url = tab.url;
            if (url.indexOf("youtube") != -1) {
                //chrome.tabs.create({ url: tab.url });
                takePhoto(tab, null );
            } else
                alert(tab.url);
        }
    }
}

function takePhoto(tab, adresse) { // l'adresse est l'url de la tab a screenshot 
    if (!adresse) {
        chrome.tabs.captureVisibleTab(tab.windowId, null, function(adresse) { takePhoto(tab, adresse); });
    } else {
        //      var img = "";
        //    img = '<img src="' + adresse + '" alt="riendutout"/>';
        //alert(img);
        alert(tab.url);
        document.location.href = "addMusic.html";
        alert(document.location.href);
        localStorage['musique'] = "test";
        //       document.getElementById("conteneur").innerHTML = "tets"; //'<img href="' + adresse + '" alt="riendutout"/>';
    }
}*/