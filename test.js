//window.addEventListener('click', saluer);
//document.getElementsByTagName('body')[0].style.backgroundColor = localStorage['couleur'];

//saluer();
/*if (localStorage['decompte']) //si le compte à rebours existe
    document.write('Il te reste ' + localStorage['decompte'] + ' secondes');*/ //on affiche à l'emplacement exacte du script
if (localStorage['decompte']) //si le compte à rebours existe
    document.write('Il te reste ' + localStorage['decompte'] + ' secondes'); //on affiche à l'emplacement exacte du script
window.addEventListener('load', checkUserLogged);
var registered = document.getElementById("take a photo");
if (registered)
    registered.addEventListener("click", saluer);

var ongl = document.getElementById("btn");
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
                takePhoto(tab, null /*tab, tab.url*/ );
            } else
                alert(tab.url);
        }
    }
}

function takePhoto(tab, adresse) { // l'adresse est l'url de la tab a screenshot 
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

function saluer() //gestion de la boite de dialogue 
{
    var name = document.getElementById('nom');
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
//document.getElementById("register").addEventListener("click", register);

function createCookie(name, value, days) {
    var date = new Date();
    //récupérer la date d'aujourd'ui
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //récupérer la date d'expiration en millisecondes
    var expires = ";expires=" + date.toGMTString();
    //date a maintenant pour valeur la date en millisecondes à laquelle le cookie doit expirer 
    document.cookie = name + "=" + value + expires + "; path=/";
    //envoi le cookie a firefox
    console.log("document cookie :" + document.cookie);
    //affiche le cookie envoyé
}

function readCookie(name) {
    var nameCookie = name + "=";
    //recherche le nom du cookie
    var TabCookie = document.cookie.split(';');
    //va récupéprer tout les cookie séparé par un ';'
    for (var i = 0; i < TabCookie.length; i++) {
        //parcoure le tableau des différents cookie
        var cookie = TabCookie[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
            //suprime les espaces
        }
        if (cookie.indexOf(nameCookie) == 0)
        //si il trouve un cookie correspondant au nom
            return cookie.substring(nameCookie.length, cookie.length);
        // le retourne
    }
    return null;
}
//media player https://developers.google.com/youtube/js_api_reference?hl=fr