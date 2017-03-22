//open source + kickstarter
//piitch raconter l'histoire des cd
//des valeurs qui drive le projet
//les solutions qu'on apporte
//notre produit en est la 
//les resultats (visibilité git + kickstarter)
//buisness plan -> abonnement par ecoute
//projection dans l'avenir la renaissance


var ongl = document.getElementById("btn");
if (ongl)
    ongl.addEventListener("click", MakePic);

function MakePic(fenetre, tab) {
    if (!fenetre) {
        chrome.windows.getLastFocused(function(fenetre) { MakePic(fenetre); });
    } else {
        if (!tab) {
            chrome.tabs.getSelected(fenetre.id, function(tab) { MakePic(fenetre, tab); });
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
        localStorage['musique'] = tab.url;
        document.location.href = "../vue/addMusic.html";
    }
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
window.addEventListener('load', Onload);

function Onload() {
    var objUser = JSON.parse(readCookie("userPlugin"));
    document.getElementById("name").innerHTML = objUser.name;
}
var deconnect = document.getElementById("deconnect")
if (deconnect)
    deconnect.addEventListener("click", deconnection);

function deconnection() {
    createCookie("userPlugin", "", -1);
    document.location.href = "../../index.html";
}