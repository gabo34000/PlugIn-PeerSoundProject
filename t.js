var unique = require('uniq');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
var foo = require('./foo.js');
console.log(foo(4));
//console.log("background");
/*function newTab(fenetre,tab)
		{
		if (!fenetre) // premier appel : aucun paramètre existant
			{
			chrome.windows.getLastFocused(function(fenetre){newTab(fenetre);});//on demande la fenêtre visible
			}
		else
			{
			if (!tab) // deuxième appel : 1 paramètre existant (fenetre)
				{
				chrome.tabs.getSelected(fenetre.id,function(tab){newTab(fenetre,tab);});//on demande la fenêtre visible, et on appelle la fonction une deuxième fois
				}
			else // troisième appel : 2 paramètres existants (fenetre et tab)
				{
				chrome.tabs.create({url:tab.url});
				}
			}
		}*/

/*
function faireJoujou(fenetre) {
    
    //on fait joujou
}
chrome.tabs.getSelected(null, function(onglet) { faireJoujou(onglet); });
*/

//chrome.windows.create({ url: "http://www.siteduzero.com" }) // charger une window

/*

localStorage['decompte'] = 15 * 60; //15*60 secondes <=> 15 minutes
function decompter() //appellée toute les 2 secondes
{
    localStorage['decompte'] = parseInt(localStorage['decompte']) - 2; // -2 car c'est toutes les 2 secondes
    if (parseInt(localStorage['decompte']) <= 0) {
        alert("driiiiiiiiing : 15 minutes écoulées ! Fini l'ordinateur"); //le pauvre
        clearInterval(repetition); //on arrète le compte à rebours
    }
}
var repetition = setInterval(decompter, 2000); //toutes les 2 secondes -> ne pas surcharger le navigateur*/