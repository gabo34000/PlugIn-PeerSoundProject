var why = document.getElementById("boxWhy"),
    what = document.getElementById("boxWhat"),
    popError = document.getElementById("errorPop"),
    closeError = document.getElementById('close_a'),
    btnClose = document.getElementById('close_b'),
    textarea1 = document.getElementById('textarea1'),
    textarea2 = document.getElementById('textarea2'),
    main = document.getElementById('main');

setTimeout(function(){
    main.classList.add('show');
}, 500);

var valid = document.getElementById("validButton");
if (valid)
    valid.addEventListener("click", ChangePage);

var infos = sessionStorage.getItem("infos");
infos = JSON.parse(infos);
if(infos) {
    document.getElementById("boxUrl").value = infos.lien;
    document.getElementById("boxWhat").value = infos.what;
    document.getElementById("boxWhy").value = infos.why;
}

var close = document.getElementById("cloclo");
  if (close)
    close.addEventListener("click", closer)

function closer(){
  sessionStorage.removeItem('infos');
  chrome.tabs.executeScript(null, {file: "closer.js"});
}

if (why){
    if (why.value){
        why.className = 'onfocus';
    }
     why.onkeydown = function(){
        why.className = 'onfocus';
    };
}

if (what){
    if(what.value){
        what.className = 'onfocus';
    }

    what.onkeydown = function(){
        what.className = 'onfocus';
    };
}



if(closeError)
    closeError.addEventListener("click", hidePop);

if(btnClose)
    btnClose.addEventListener("click", hidePop);

var url = JSON.parse(localStorage.getItem("musicToAdd"));
var boxUrl = document.getElementById("boxUrl");

$.getJSON('https://noembed.com/embed',
{format: 'json', url: url}, function (data) {
    boxUrl.value = data.title;
});
   

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {}
}

function ChangePage() {
    var lien = document.getElementById("boxUrl");
    if (lien.value && why.value && what.value) {
        var infs = {
            lien  : lien.value,
            why : why.value,
            what : what.value
        }
        textarea1.className = '';
        textarea2.className = '';
        popError.className = '';
        sessionStorage.setItem("infos", JSON.stringify(infs));
        main.classList.remove('show');
        setTimeout(function(){
            document.location.href = "SendArticle.html"
        }, 500);
    }
    else {
        textarea1.className = 'blur';
        textarea2.className = 'blur';
        popError.className = 'show';
    }
}

function hidePop() {
    console.log("lourdddd");
    setTimeout(function(){
       popError.className = '';
    },200);
    textarea1.className = 'stop';
    textarea2.className = 'stop';
}

function focusInput() {
    textarea1.className = 'onfocus';
    textarea2.className = 'onfocus';
}

getLink();
