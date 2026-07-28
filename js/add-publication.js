const API_URL="URL_WEB_APP_KAMU";

document
.getElementById("publicationForm")
.addEventListener("submit",savePublication);

function savePublication(e){

e.preventDefault();

const form=new FormData();

form.append("action","addPublication");
form.append("judul",judul.value);
form.append("jenis",jenis.value);
form.append("tahun",tahun.value);
form.append("jurnal",jurnal.value);
form.append("doi",doi.value);
form.append("url",url.value);
form.append("status",status.value);
form.append("abstrak",abstrak.value);

fetch(API_URL,{
method:"POST",
body:form
})
.then(r=>r.json())
.then(res=>{

alert(res.message);

if(res.status){

window.location="dashboard.html";

}

});

}
