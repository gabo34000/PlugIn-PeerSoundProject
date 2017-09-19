var artist = document.getElementById("boxArtist"),
    date = document.getElementById("boxDate"),
    description = document.getElementById("boxDescription"),
    popError = document.getElementById("errorPop"),
    closeError = document.getElementById('close_a'),
    btnClose = document.getElementById('close_b'),
    textarea1 = document.getElementById('textarea1'),
    textarea2 = document.getElementById('textarea2'),
    textarea3 = document.getElementById('textarea3'),
    main = document.getElementById('main');

setTimeout(function(){
    main.classList.add('show');
}, 500);

var valid = document.getElementById("validButton");
if (valid)
    valid.addEventListener("click", sendMusic);

var close = document.getElementById("cloclo");
  if (close)
    close.addEventListener("click", closer)

function closer(){
  sessionStorage.removeItem('infos');
  chrome.tabs.executeScript(null, {file: "closer.js"});
}

if (artist){
    if (artist.value){
        artist.className = 'onfocus';
    }
    artist.onkeydown = function(){
        artist.className = 'onfocus';
    };
}

if (date){
    if(date.value){
        date.className = 'onfocus';
    }
    date.onkeydown = function(){
        date.className = 'onfocus';
    };
}

if(closeError)
    closeError.addEventListener("click", hidePop);

if(btnClose)
    btnClose.addEventListener("click", hidePop);

var url = JSON.parse(localStorage.getItem("musicToAdd"));
var boxUrl = document.getElementById("boxUrl");

$.getJSON('https://noembed.com/embed', //avoir le titre de la musique
{format: 'json', url: url}, function (data) {
    boxUrl.value = data.title;
});
   

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function sendMusic() {
    var title = document.getElementById("boxUrl");
    if (title.value && artist.value && date.value && description.value) {
        var infs = {
            title  : title.value,
            artist : artist.value,
            date : date.value
        }
        textarea1.className = '';
        textarea2.className = '';
        popError.className = '';
        sessionStorage.setItem("infos", JSON.stringify(infs));
        main.classList.remove('show');
        setTimeout(function(){
            document.location.href = "musicOk.html"
        }, 500);
    }
    else {
        textarea1.className = 'blur';
        textarea2.className = 'blur';
        textarea3.className = 'blur';
        popError.className = 'show';
    }
}

function hidePop() {
    setTimeout(function(){
       popError.className = '';
    },200);
    textarea1.className = 'stop';
    textarea2.className = 'stop';
    textarea3.className = 'stop';
    
}

function focusInput() {
    textarea1.className = 'onfocus';
    textarea2.className = 'onfocus';
    textarea3.className = 'onfocus';
}