// ==========================================
// SIPIRS - LOGIN
// ==========================================

document
.getElementById("loginForm")
.addEventListener("submit", loginUser);

async function loginUser(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    try{

        const response = await fetch(
            API_URL +
            "?action=login" +
            "&email=" + encodeURIComponent(email) +
            "&password=" + encodeURIComponent(password)
        );

        const data = await response.json();

        if(data.status){

            alert("Login Berhasil. Selamat datang " + data.nama);

            localStorage.setItem("sipirsUser",JSON.stringify(data));

            window.location.href="../pages/dashboard.html";

        }else{

            alert(data.message);

        }

    }catch(error){

        console.error(error);

        alert("Tidak dapat terhubung ke server.");

    }

}
function togglePassword(){

    const input =
    document.getElementById("password");

    const icon =
    document.querySelector("#togglePassword i");

    if(input.type==="password"){

        input.type="text";  

        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

    }else{

        input.type="password";

        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");

    }

}

document
.getElementById("togglePassword")
.addEventListener(
    "click",
    togglePassword
);
