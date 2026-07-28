const user = JSON.parse(localStorage.getItem("sipirsUser"));

if(!user){

    window.location.href="login.html";

}

document.getElementById("welcome").innerHTML =
"Selamat Datang, " + user.nama + " 👋";

document.getElementById("userName").innerHTML =
user.nama;

function logout(){

    localStorage.removeItem("sipirsUser");

    window.location.href="../index.html";

}
