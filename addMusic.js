if (localStorage['musique'])
    document.getElementById("conteneur").innerHTML = localStorage['musique']; //'<img href="' + adresse + '" alt="riendutout"/>';//alert(localStorage['musique']);
//alert(localStorage['musique']);
var idMusicV1 = localStorage['musique'].slice("https://www.youtube.com/watch?v=".length, localStorage['musique'].length);
//alert("test : " + idMusicV1);
var index = idMusicV1.indexOf("&index");
var list = idMusicV1.indexOf("&list");
var idMusicV2 = "";
//alert("index" + index + "list" + list);
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
    /* on crée une balise<script type="text/javascript"></script> */
    var script = document.createElement('script');
    script.type = 'text/javascript';
    /* On fait pointer la balise sur le script qu'on veut charger
       avec en prime un timestamp pour éviter les problèmes de cache
    */
    script.src = url + '?' + (new Date().getTime());
    /* On dit d'exécuter cette fonction une fois que le script est chargé */
    if (callback) {
        script.onreadystatechange = callback;
        script.onload = script.onreadystatechange;
    }
    /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
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
    var name = document.getElementById("firstname");
    name.value = title;
    var artiste = document.getElementById("artiste");
    if (artist != "")
        artiste.value = artist;
}

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