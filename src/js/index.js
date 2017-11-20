var t = document.getElementById("buttonConnexion");
var main = document.getElementById('main');
var firstCo = document.getElementById('button1Connexion');

    if (firstCo)
      firstCo.addEventListener("click", function(){
        console.log("first Connection");
        closer();
      });


    main.classList.add('show');
if (t)
    t.addEventListener("click", changePage);

if (localStorage.getItem("email")){
   document.location.href = "profil.html";
}

var close = document.getElementById("cloclo");
  if (close)
    close.addEventListener("click", closer);

function closer(){
  chrome.tabs.executeScript(null, {file: "closer.js"});
}

function changePage() {
 if (localStorage.getItem("email")){
    main.classList.remove('show');
    setTimeout(function(){
      document.location.href = "profil.html";
    }, 500);
 }
 else {
    var email = document.getElementById("inputEmail"),
    		pass = document.getElementById("inputPassword");
    if ( (email.value) && (pass.value) ) {
      email.className = '';
        pass.className = '';
        console.log(email.value + pass.value + ']'); 
        jQuery.post('https://localhost:8000/api/auth/login',
        {
          login: email.value,
          password: pass.value
        },
         function (data) {
          console.log(email.value + pass.value + ']');  
           if (data.error != - 1) {
              console.log(data);
              localStorage.setItem("email", email.value);
              console.log(data.account.usr_id);
              localStorage.setItem("id", data.account.usr_id);
              console.log(data.account.usr_firstame);
              localStorage.setItem("name", data.account.usr_firstame);
              main.classList.remove('show');
              setTimeout(function(){
              document.location.href = "./profil.html";
              }, 500);
            }
          });
    } else if ( !(email.value) && (pass.value) ) {
    	email.className = 'error';
    	pass.className = '';
    } else if ( (email.value) && !(pass.value) ) {
    	email.className = '';
    	pass.className = 'error';
    } else if ( !(email.value) && !(pass.value) ) {
    	email.className = 'error';
    	pass.className = 'error';
    }
  }
}

var musicAdded = 0;
localStorage.setItem('musicAdded', musicAdded);