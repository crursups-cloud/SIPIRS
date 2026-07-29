// ==========================================
// SIPIRS - PUBLICATION LIST
// ==========================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbx_nglSPAgsqihJ3Xn_oIj8EComgbuAtXsJ7V14J4tycZR_osEHpCZeXo6iMK3H8_YJ/exec";


// ==========================================
// DATA GLOBAL
// ==========================================

let publications = [];


// ==========================================
// LOAD PUBLICATIONS
// ==========================================

async function loadPublications() {

    const tableBody =
        document.getElementById("publicationTableBody");

    try {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-muted py-5">
                    <i class="bi bi-hourglass-split me-2"></i>
                    Memuat data publikasi...
                </td>
            </tr>
        `;


        const response =
            await fetch(
                API_URL + "?action=getPublications"
            );


        const result =
            await response.json();


        console.log("Publication Data:", result);


        if (!result.status) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8"
                        class="text-center text-danger py-5">

                        Gagal mengambil data publikasi.

                    </td>
                </tr>
            `;

            console.error(result.message);

            return;

        }


        publications =
            result.publications || [];


        // Tampilkan data

        renderPublications(publications);


        // Buat filter

        createYearFilter(publications);

        createIndexingFilter(publications);


    } catch (error) {

        console.error(
            "Error load publications:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="8"
                    class="text-center text-danger py-5">

                    Terjadi kesalahan saat mengambil
                    data publikasi.

                </td>
            </tr>
        `;

    }

}


// ==========================================
// RENDER PUBLICATIONS
// ==========================================

function renderPublications(data) {

    const tableBody =
        document.getElementById(
            "publicationTableBody"
        );


    const totalPublication =
        document.getElementById(
            "totalPublication"
        );


    totalPublication.textContent =
        data.length;


    // Tidak ada data

    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8"
                    class="text-center text-muted py-5">

                    <i class="bi bi-database-x fs-3 d-block mb-2"></i>

                    Belum ada publikasi yang terdaftar.

                </td>
            </tr>
        `;

        return;

    }


    tableBody.innerHTML = "";


    data.forEach(function(pub, index) {


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>


            <td class="judul-publikasi">

                ${escapeHTML(
                    pub.Judul || "-"
                )}

            </td>


            <td>

                ${escapeHTML(
                    pub.NamaJenisPublikasi || "-"
                )}

            </td>


            <td>

                ${escapeHTML(
                    pub.NamaJurnalPenerbit || "-"
                )}

            </td>


            <td>

                ${escapeHTML(
                    pub.TahunTerbit || "-"
                )}

            </td>


            <td>

                ${escapeHTML(
                    pub.NamaIndexing || "-"
                )}

            </td>


            <td>

                <span class="badge bg-secondary badge-status">

                    ${escapeHTML(
                        pub.NamaStatusVerifikasi ||
                        pub.StatusVerifikasiID ||
                        "Menunggu Verifikasi"
                    )}

                </span>

            </td>


            <td>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-success"
                    onclick="viewPublication('${escapeAttribute(pub.PublikasiID)}')">

                    <i class="bi bi-eye"></i>

                    Lihat

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// ==========================================
// FILTER TAHUN
// ==========================================

function createYearFilter(data) {

    const select =
        document.getElementById(
            "filterTahun"
        );


    if (!select) return;


    const years =
        [...new Set(
            data
                .map(pub => pub.TahunTerbit)
                .filter(year => year)
        )];


    years.sort(
        (a, b) =>
            Number(b) - Number(a)
    );


    select.innerHTML = `
        <option value="">
            Semua Tahun
        </option>
    `;


    years.forEach(function(year) {

        const option =
            document.createElement("option");

        option.value = year;

        option.textContent = year;

        select.appendChild(option);

    });

}


// ==========================================
// FILTER INDEXING
// ==========================================

function createIndexingFilter(data) {

    const select =
        document.getElementById(
            "filterIndexing"
        );


    if (!select) return;


    const indexings =
        [...new Set(
            data
                .map(pub => pub.NamaIndexing)
                .filter(indexing => indexing)
        )];


    indexings.sort();


    select.innerHTML = `
        <option value="">
            Semua Indexing
        </option>
    `;


    indexings.forEach(function(indexing) {

        const option =
            document.createElement("option");

        option.value = indexing;

        option.textContent = indexing;

        select.appendChild(option);

    });

}


// ==========================================
// SEARCH + FILTER
// ==========================================

function filterPublications() {

    const search =
        document.getElementById(
            "searchPublication"
        ).value
        .toLowerCase()
        .trim();


    const year =
        document.getElementById(
            "filterTahun"
        ).value;


    const indexing =
        document.getElementById(
            "filterIndexing"
        ).value;


    const filtered =
        publications.filter(function(pub) {


            const text = `

                ${pub.Judul || ""}

                ${pub.NamaJurnalPenerbit || ""}

                ${pub.DOI || ""}

            `.toLowerCase();


            const matchSearch =
                !search ||
                text.includes(search);


            const matchYear =
                !year ||
                String(pub.TahunTerbit) ===
                String(year);


            const matchIndexing =
                !indexing ||
                pub.NamaIndexing === indexing;


            return (
                matchSearch &&
                matchYear &&
                matchIndexing
            );

        });


    renderPublications(filtered);

}


// ==========================================
// LIHAT DETAIL
// ==========================================

function viewPublication(publicationId) {

    window.location.href =
        "publication-detail.html?id=" +
        encodeURIComponent(
            publicationId
        );

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return String(value)
        .replace(/'/g, "\\'");

}


// ==========================================
// DOM READY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log("DOM READY");
        loadPublications();


        const searchInput =
            document.getElementById(
                "searchPublication"
            );


        const yearFilter =
            document.getElementById(
                "filterTahun"
            );


        const indexingFilter =
            document.getElementById(
                "filterIndexing"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                filterPublications
            );

        }


        if (yearFilter) {

            yearFilter.addEventListener(
                "change",
                filterPublications
            );

        }


        if (indexingFilter) {

            indexingFilter.addEventListener(
                "change",
                filterPublications
            );

        }

    }
);
console.log("PUBLICATION.JS BERHASIL DIMUAT");
