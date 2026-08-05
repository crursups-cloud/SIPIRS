// ==========================================
// SIPIRS - EDIT PUBLICATION
// ==========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbx_nglSPAgsqihJ3Xn_oIj8EComgbuAtXsJ7V14J4tycZR_osEHpCZeXo6iMK3H8_YJ/exec";

const publicationID =
new URLSearchParams(window.location.search)
.get("id");

// ==========================================
// Upload PDF
// ==========================================

async function uploadPDF(){

    const file =
    document.getElementById("pdfFile").files[0];

    // kalau user tidak memilih PDF baru
    if(!file){

        return "";

    }

    const base64 =
    await fileToBase64(file);

    const formData =
    new FormData();

    formData.append("action","uploadPDF");
    formData.append("filename",file.name);
    formData.append("file",base64);

    const response =
    await fetch(API_URL,{
        method:"POST",
        body:formData
    });

    const result =
    await response.json();

    if(result.status){

        return result.url;

    }

    alert(result.message);

    return "";

}

// ==========================================
// Convert File ke Base64
// ==========================================

function fileToBase64(file){

    return new Promise(function(resolve){

        const reader =
        new FileReader();

        reader.onload=function(){

            resolve(reader.result.split(",")[1]);

        };

        reader.readAsDataURL(file);

    });

}

let oldPDF = "";

async function loadMasterData(){

    try{

        const response =
        await fetch(
            API_URL+"?action=getMasterData"
        );

        const result =
        await response.json();

        if(!result.status) return;

        const jenisSelect =
        document.getElementById("jenisPublikasi");

        result.jenisPublikasi.forEach(item=>{

            const option =
            document.createElement("option");

            option.value=item.id;
            option.textContent=item.nama;

            jenisSelect.appendChild(option);

        });

        const indexingSelect =
        document.getElementById("indexing");

        result.indexing.forEach(item=>{

            const option =
            document.createElement("option");

            option.value=item.id;
            option.textContent=item.nama;

            indexingSelect.appendChild(option);

        });

    }

    catch(err){

        console.log(err);

    }

}
function bindDeleteAuthor(){

    document
    .querySelectorAll(".btn-remove-author")
    .forEach(function(btn){

        btn.onclick=function(){

            this.closest(".author-item").remove();

            renumberAuthor();

        }

    });

}

async function loadPublication(){

    try{

        const response=
        await fetch(API_URL +
            "?action=getPublicationDetail&id=" +
            publicationID

        );

        const result=
        await response.json();

        if(!result.status){

            alert(result.message);

            return;

        }

        const p=
        result.publication;

        document.getElementById("publicationID")
        .textContent=p.PublikasiID;

        document.getElementById("judul")
        .value=p.Judul;

        document.getElementById("jenisPublikasi")
        .value=p.JenisPublikasiID;

        document.getElementById("namaJurnalPenerbit")
        .value=p.NamaJurnalPenerbit;

        document.getElementById("volume")
        .value=p.Volume;

        document.getElementById("issue")
        .value=p.Issue;

        document.getElementById("halaman")
        .value=p.Halaman;

        document.getElementById("tahunTerbit")
        .value=p.TahunTerbit;

        document.getElementById("doi")
        .value=p.DOI;

        document.getElementById("issn")
        .value=p.ISSN;

        document.getElementById("isbn")
        .value=p.ISBN;

        document.getElementById("linkPublikasi")
        .value=p.LinkPublikasi;

        // simpan link PDF lama
        oldPDF = p.LinkPDFDrive || "";

        document.getElementById("abstract")
        .value=p.Abstract;

        document.getElementById("kataKunci")
        .value=p.KataKunci;

        document.getElementById("bahasa")
        .value=p.Bahasa;

        document.getElementById("indexing")
        .value=p.IndexingID;

        document.getElementById("peringkatIndex")
        .value=p.PeringkatIndex;

        if(p.StatusOpenAccess=="Ya"){

            document.getElementById("openAccessYa")
            .checked=true;

        }else{

            document.getElementById("openAccessTidak")
            .checked=true;
    
        }

        const authorContainer =
document.getElementById("authorContainer");

authorContainer.innerHTML = "";

p.authors.forEach(function(author,index){

    authorContainer.innerHTML += `

    <div class="author-card author-item">

        <div class="d-flex justify-content-between align-items-center mb-3">

            <strong>Penulis ${index+1}</strong>
            
            <button
                type="button"
                class="btn btn-outline-danger btn-sm btn-remove-author">

                <i class="bi bi-trash"></i>

            </button>

        </div>

        <div class="row g-3">

            <div class="col-md-6">

                <label class="form-label">
                    Nama Author
                </label>

                <input
                    type="text"
                    class="form-control author-name"
                    value="${author.NamaAuthor || ""}">

            </div>

            <div class="col-md-6">

                <label class="form-label">
                    Afiliasi
                </label>

                <input
                    type="text"
                    class="form-control author-affiliation"
                    value="${author.Afiliasi || ""}">

            </div>

        </div>

        <div class="mt-3">

            <div class="form-check form-check-inline">

                <input
                    class="form-check-input author-rsup"
                    type="checkbox"
                    ${author.IsRSUP ? "checked" : ""}>

                <label class="form-check-label">

                    Author RSUP

                </label>

            </div>

            <div class="form-check form-check-inline">

                <input
                    class="form-check-input author-corresponding"
                    type="checkbox"
                    ${author.IsCorresponding ? "checked" : ""}>

                <label class="form-check-label">

                    Corresponding

                </label>

            </div>

        </div>

    </div>

    `;

});
      bindDeleteAuthor();
        document.getElementById("loadingData")
        .classList.add("d-none");

        document.getElementById("publicationForm")
        .classList.remove("d-none");

    }

    catch(err){

        console.log(err);

    }

}
document.addEventListener(

    "DOMContentLoaded",

    async function(){

        await loadMasterData();

        await loadPublication();

    }

);

async function updatePublication(e){

    e.preventDefault();

    let pdfURL = oldPDF;

    // kalau user upload PDF baru
    if(document.getElementById("pdfFile").files.length > 0){

        const uploadedPDF = await uploadPDF();

        if(!uploadedPDF){
            alert("Upload PDF gagal");
            return;            
        }
        pdfURL=uploadedPDF

    }
    const authors = [];

document
.querySelectorAll(".author-item")
.forEach(function(item){

    const nama = item.querySelector(".author-name").value.trim();

    if(nama=="") return;

    authors.push({

        name:nama,

        affiliation:
        item.querySelector(".author-affiliation").value,

        isRSUP:
        item.querySelector(".author-rsup").checked,

        isCorresponding:
        item.querySelector(".author-corresponding").checked

    });

});
    

    const data = {

        action: "updatePublication",

        InputByUserID: localStorage.getItem("userID"),
        
        PublikasiID: publicationID,

        Judul: document.getElementById("judul").value,

        JenisPublikasiID: document.getElementById("jenisPublikasi").value,

        NamaJenisPublikasi: document.getElementById("jenisPublikasi")
        .options[document.getElementById("jenisPublikasi").selectedIndex].text,  
            
        NamaJurnalPenerbit: document.getElementById("namaJurnalPenerbit").value,

        Volume: document.getElementById("volume").value,

        Issue: document.getElementById("issue").value,

        Halaman: document.getElementById("halaman").value,

        TahunTerbit: document.getElementById("tahunTerbit").value,

        DOI: document.getElementById("doi").value,

        ISSN: document.getElementById("issn").value,

        ISBN: document.getElementById("isbn").value,

        LinkPublikasi: document.getElementById("linkPublikasi").value,

        LinkPDFDrive: pdfURL,

        Abstract: document.getElementById("abstract").value,

        KataKunci: document.getElementById("kataKunci").value,

        Bahasa: document.getElementById("bahasa").value,

        IndexingID: document.getElementById("indexing").value,

        NamaIndexing: document.getElementById("indexing").options[
        document.getElementById("indexing").selectedIndex].text, 
        
        PeringkatIndex: document.getElementById("peringkatIndex").value,

        StatusOpenAccess:
            document.getElementById("openAccessYa").checked
            ? "Ya"
            : "Tidak",

        authors: authors

    };

    const response = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify(data)
    });

    const result = await response.json();

    alert(result.message);

    if(result.status){

        window.location.href =
        "publication-detail.html?id=" + publicationID;

    }

}
document
.getElementById("addAuthorBtn")
.addEventListener("click",function(){

    const container =
    document.getElementById("authorContainer");

    const jumlah =
    container.querySelectorAll(".author-item").length+1;

    container.insertAdjacentHTML("beforeend",`

<div class="author-card author-item">

<div class="d-flex justify-content-between align-items-center mb-3">

<strong>Penulis ${jumlah}</strong>

<button
type="button"
class="btn btn-outline-danger btn-sm btn-remove-author">

<i class="bi bi-trash"></i>

</button>

</div>

<div class="row g-3">

<div class="col-md-6">

<label class="form-label">
Nama Author
</label>

<input
type="text"
class="form-control author-name">

</div>

<div class="col-md-6">

<label class="form-label">
Afiliasi
</label>

<input
type="text"
class="form-control author-affiliation">

</div>

</div>

<div class="mt-3">

<div class="form-check form-check-inline">

<input
class="form-check-input author-rsup"
type="checkbox">

<label class="form-check-label">

Author RSUP

</label>

</div>

<div class="form-check form-check-inline">

<input
class="form-check-input author-corresponding"
type="checkbox">

<label class="form-check-label">

Corresponding

</label>

</div>

</div>

</div>

`);

bindDeleteAuthor();
renumberAuthor();
    
});

document
.getElementById("publicationForm")
.addEventListener("submit", updatePublication);

document
.getElementById("btnCancel")
.addEventListener("click", function(){

    window.location.href =
        "publication-detail.html?id=" +
        publicationID;

});

function renumberAuthor(){

    document
    .querySelectorAll(".author-item strong")
    .forEach(function(item,index){

        item.textContent =
        "Penulis " + (index+1);

    });

}
