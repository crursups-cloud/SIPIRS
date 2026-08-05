// ==========================================
// SIPIRS - REGISTER
// ==========================================

async function loadRegisterMasterData(){

    try{

        const response =
        await fetch(
            API_URL + "?action=getRegisterMasterData"
        );

        const result =
        await response.json();

        if(!result.status){

            alert(result.message);
            return;

        }

        // ==========================
        // Departemen
        // ==========================

        const departemen =
        document.getElementById("departemenID");

        result.departemen.forEach(function(item){

            departemen.innerHTML += `
                <option value="${item.id}">
                    ${item.nama}
                </option>
            `;

        });

        // ==========================
        // Jabatan
        // ==========================

        const jabatan =
        document.getElementById("jabatanID");

        result.jabatan.forEach(function(item){

            jabatan.innerHTML += `
                <option value="${item.id}">
                    ${item.nama}
                </option>
            `;

        });

    }

    catch(err){

        console.log(err);

        alert("Gagal memuat data master.");

    }

}
async function registerUser(e){

    e.preventDefault();

    const password =
    document.getElementById("password").value;

    const confirm =
    document.getElementById("confirmPassword").value;

    if(password != confirm){

        alert("Konfirmasi password tidak sama.");

        return;

    }

    const data = {

        action:"registerUser",

        namaLengkap:
        document.getElementById("namaLengkap").value,

        nip:
        document.getElementById("nip").value,

        email:
        document.getElementById("email").value,

        password:password,

        departemenID:
        document.getElementById("departemenID").value,

        jabatanID:
        document.getElementById("jabatanID").value,

        nomorHP:
        document.getElementById("nomorHP").value,

        orcid:
        document.getElementById("orcid").value,

        // otomatis Peneliti
        roleID:"ROL-001"

    };

    try{

        const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify(data)

        });

        const result =
        await response.json();

        alert(result.message);

        if(result.status){

            window.location.href="login.html";

        }

    }

    catch(err){

        console.log(err);

        alert("Registrasi gagal.");

    }

}
document.addEventListener(

    "DOMContentLoaded",

    function(){

        loadRegisterMasterData();

        document
        .getElementById("registerForm")
        .addEventListener(
            "submit",
            registerUser
        );

    }

);
