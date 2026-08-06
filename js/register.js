// ==========================================
// SIPIRS - REGISTER
// ==========================================

// ==========================================
// LOAD MASTER DATA
// ==========================================

async function loadRegisterMasterData() {

    try {

        const response = await fetch(
            API_URL + "?action=getRegisterMasterData"
        );

        const result = await response.json();

        if (!result.status) {

            alert(result.message);
            return;

        }

        // ==========================
        // DEPARTEMEN
        // ==========================

        const departemen =
        document.getElementById("departemenID");

        departemen.innerHTML =
        '<option value="">Pilih Departemen</option>';

        result.departemen.forEach(function(item){

            departemen.innerHTML += `
                <option value="${item.id}">
                    ${item.nama}
                </option>
            `;

        });

        // ==========================
        // JABATAN
        // ==========================

        const jabatan =
        document.getElementById("jabatanID");

        jabatan.innerHTML =
        '<option value="">Pilih Jabatan</option>';

        result.jabatan.forEach(function(item){

            jabatan.innerHTML += `
                <option value="${item.id}">
                    ${item.nama}
                </option>
            `;

        });

    }

    catch(err){

        console.error(err);

        alert("Gagal memuat data master.");

    }

}

// ==========================================
// REGISTER
// ==========================================

async function registerUser(e){

    e.preventDefault();

    const password =
    document.getElementById("password").value.trim();

    const confirmPassword =
    document.getElementById("confirmPassword").value.trim();

    // ==========================
    // VALIDASI
    // ==========================

    if(password !== confirmPassword){

        alert("Konfirmasi password tidak sama.");

        return;

    }

    if(password.length < 8){

        alert("Password minimal 8 karakter.");

        return;

    }

    const data = {

        action:"registerUser",

        namaLengkap:
        document.getElementById("namaLengkap").value.trim(),

        nip:
        document.getElementById("nip").value.trim(),

        email:
        document.getElementById("email").value.trim(),

        password:password,

        departemenID:
        document.getElementById("departemenID").value,

        jabatanID:
        document.getElementById("jabatanID").value,

        nomorHP:
        document.getElementById("nomorHP").value.trim(),

        // Default Role = Peneliti
        roleID:"ROL-001"

    };

    try{

        const btn =
        document.querySelector("#registerForm button[type='submit']");

        btn.disabled = true;

        btn.innerHTML =
        `<span class="spinner-border spinner-border-sm"></span>
        Mendaftarkan...`;

        const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify(data)

        });

        const result =
        await response.json();

        btn.disabled = false;

        btn.innerHTML = "Daftar";

        if(result.status){

            alert("Registrasi berhasil. Silakan login.");

            window.location.href =
            "login.html";

        }

        else{

            alert(result.message);

        }

    }

    catch(err){

        console.error(err);

        alert("Registrasi gagal.");

    }

}

// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

function togglePassword(inputID, buttonID){

    const input = document.getElementById(inputID);
    const icon = document.querySelector(`#${buttonID} i`);

    if(input.type==="password"){

        input.type="text";
        icon.className="bi bi-eye-slash";

    }else{

        input.type="password";
        icon.className="bi bi-eye";

    }

}


// ==========================================
// LOAD PAGE
// ==========================================

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

        document
        .getElementById("togglePassword")
        .addEventListener("click",function(){

                togglePassword("password","togglePassword");

            });

        document
        .getElementById("toggleConfirmPassword")
        .addEventListener("click",function(){

                togglePassword(
                    "confirmPassword",
                    "toggleConfirmPassword"
                );

            });

    }
);
