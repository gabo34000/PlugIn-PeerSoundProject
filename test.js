//window.addEventListener('click', saluer);
//document.getElementsByTagName('body')[0].style.backgroundColor = localStorage['couleur'];

//saluer();
window.addEventListener('load', checkUserLogged);
var registered = document.getElementById("register");
if (registered)
    registered.addEventListener("click", saluer);

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