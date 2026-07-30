// ==========================================
// SIPIRS - EDIT PUBLICATION
// ==========================================

const API_URL =
"https://script.google.com/macros/s/AKfycbx_nglSPAgsqihJ3Xn_oIj8EComgbuAtXsJ7V14J4tycZR_osEHpCZeXo6iMK3H8_YJ/exec";

const publicationID =
new URLSearchParams(window.location.search)
.get("id");

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
async function loadPublication(){

    try{

        const response=
        await fetch(API_URL+
            "?action=getPublicationDetail"+
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

        document.getElementById("linkPDFDrive")
        .value=p.LinkPDFDrive;

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
