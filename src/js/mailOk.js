sessionStorage.removeItem('infos');
var close = document.getElementById("cloclo"),
		main = document.getElementById('main');
		main.classList.add('show');
  if (close)
    close.addEventListener("click", closer)

function closer(){
  sessionStorage.removeItem('infos');
  chrome.tabs.executeScript(null, {file: "closer.js"});
}

setTimeout(function(){
  closer();
}, 500);
