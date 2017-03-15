if (localStorage['decompte']) //si le compte à rebours existe
    document.write('Il te reste ' + localStorage['decompte'] + ' secondes'); //on affiche à l'emplacement exacte du script
window.addEventListener('load', checkUserLogged);

var registered = document.getElementById("register");
if (registered)
    registered.addEventListener("click", saluer);

var ongl = document.getElementById("btn");
if (ongl)
    ongl.addEventListener("click", newTab);

function MakePic(fenetre, tab) {
    if (!fenetre) {
        chrome.windows.getLastFocused(function(fenetre) { newTab(fenetre); });
    } else {
        if (!tab) {
            chrome.tabs.getSelected(fenetre.id, function(tab) { newTab(fenetre, tab); });
        } else {
            url = tab.url;
            if (url.indexOf("youtube") != -1) {
                takePhoto(tab, null);
            } else
                alert(tab.url);
        }
    }
}

function takePhoto(tab, adresse) {
    if (!adresse) {
        chrome.tabs.captureVisibleTab(tab.windowId, null, function(adresse) { takePhoto(tab, adresse); });
    } else {
        document.getElementById("conteneur").innerHTML = '<img src="' + adresse + '" alt="riendutout"/>';
    }
}


function User(name, mdp) {
    this.name = name;
    this.mdp = mdp;
}

function checkUserLogged() {
    if (readCookie("userPlugin")) {
        console.log("j'ai trouvé un cookie");
        document.location.href = "options.html";

        /* var ajouterNom = (localStorage['compte']) ? ', ' + localStorage['compte'] : '';
         if (!localStorage['compte']) //le compte n'existe pas (première utilisation ou réinstallation)
         {
             localStorage['compte'] = 1;
             console.log('salutation pour la première fois' + ajouterNom);
         } else {
             localStorage['compte'] = parseInt(localStorage['compte']) + 1; //on transforme la chaine de caractère en int, on incrémente, puis on stocke le nouveau nombre
             console.log('salutation pour la ' + localStorage['compte'] + 'eme fois' + ajouterNom);
         }*/
    }
}
var user;

function saluer() {
    console.log("ça passe dans saluer");
    var name = document.getElementById('username');
    var mdp = document.getElementById('password');
    console.log(name.value);
    if (name.value != "" && mdp.value != "") {
        user = new User(name.value, mdp.value);
        var userjson = JSON.stringify(user);
        console.log(userjson);
        createCookie("userPlugin", userjson, 1000);
        document.location.href = "options.html";
    } else
        console.log("pas de nom ou mdp");
}

function createCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = ";expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
    console.log("document cookie :" + document.cookie);
}

function readCookie(name) {
    var nameCookie = name + "=";
    var TabCookie = document.cookie.split(';');

    for (var i = 0; i < TabCookie.length; i++) {
        var cookie = TabCookie[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameCookie) == 0)
            return cookie.substring(nameCookie.length, cookie.length);
    }
    return null;
}
//media player https://developers.google.com/youtube/js_api_reference?hl=fr