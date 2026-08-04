// ==========================================
// SIPIRS - PUBLICATION DETAIL
// ==========================================


// ==========================================
// API URL
// ==========================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbx_nglSPAgsqihJ3Xn_oIj8EComgbuAtXsJ7V14J4tycZR_osEHpCZeXo6iMK3H8_YJ/exec";


// ==========================================
// GET PUBLICATION ID
// ==========================================

function getPublicationID() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("id");

}


// ==========================================
// LOAD DETAIL
// ==========================================

async function loadPublicationDetail() {

    const publicationID =
        getPublicationID();


    console.log(
        "Publication ID:",
        publicationID
    );


    if (!publicationID) {

        showError(
            "ID publikasi tidak ditemukan."
        );

        return;

    }


    try {


        const response =
            await fetch(
                API_URL +
                "?action=getPublicationDetail&id=" +
                encodeURIComponent(
                    publicationID
                )
            );


        const result =
            await response.json();


        console.log(
            "Publication Detail:",
            result
        );


        if (!result.status) {

            showError(
                result.message ||
                "Data publikasi tidak ditemukan."
            );

            return;

        }


        displayPublication(
            result.publication
        );


    } catch (error) {

        console.error(
            "Detail Error:",
            error
        );


        showError(
            "Terjadi kesalahan saat mengambil data publikasi."
        );

    }

}


// ==========================================
// DISPLAY PUBLICATION
// ==========================================

function displayPublication(pub) {
    
// ==========================================
// TOMBOL EDIT PUBLIKASI
// ==========================================

const editButton =
    document.getElementById("editPublicationBtn");

if (editButton && pub.PublikasiID) {

    editButton.href =
        "edit-publication.html?id=" +
        encodeURIComponent(pub.PublikasiID);

}

    // ==========================================
    // INFORMASI UTAMA
    // ==========================================

    setText(
        "detailPublikasiID",
        pub.PublikasiID
    );


    setText(
        "detailJudul",
        pub.Judul
    );


    setText(
        "detailJenis",
        pub.NamaJenisPublikasi
    );


    setText(
        "detailTahun",
        pub.TahunTerbit
    );


    setText(
        "detailJurnal",
        pub.NamaJurnalPenerbit
    );


    setText(
        "detailVolume",
        pub.Volume
    );


    setText(
        "detailIssue",
        pub.Issue
    );


    setText(
        "detailHalaman",
        pub.Halaman
    );


    setText(
        "detailDOI",
        pub.DOI
    );


    setText(
        "detailISSN",
        pub.ISSN
    );


    setText(
        "detailISBN",
        pub.ISBN
    );


    setText(
        "detailBahasa",
        pub.Bahasa
    );


    // ==========================================
    // INDEXING
    // ==========================================

    setText(
        "detailIndexing",
        pub.NamaIndexing
    );


    setText(
        "detailPeringkat",
        pub.PeringkatIndex
    );


    setText(
        "detailOpenAccess",
        pub.StatusOpenAccess
    );


    // ==========================================
    // ABSTRACT
    // ==========================================

    setText(
        "detailAbstract",
        pub.Abstract || "-"
    );


    // ==========================================
    // KEYWORDS
    // ==========================================

    renderKeywords(
        pub.KataKunci
    );


    // ==========================================
    // LINK PUBLIKASI
    // ==========================================

    setLink(
        "linkPublikasi",
        pub.LinkPublikasi
    );


    setLink(
        "linkPDF",
        pub.LinkPDFDrive
    );


    // ==========================================
    // STATUS
    // ==========================================

    const status =
        document.getElementById(
            "detailStatus"
        );


    if (status) {

        status.textContent =
            pub.NamaStatusVerifikasi ||
            pub.StatusVerifikasiID ||
            "Menunggu Verifikasi";

    }


    // ==========================================
    // AUTHOR
    // ==========================================

    renderAuthors(
        pub.authors || []
    );


    // ==========================================
    // SHOW
    // ==========================================

    document
        .getElementById(
            "loadingDetail"
        )
        .classList
        .add("d-none");


    document
        .getElementById(
            "detailContainer"
        )
        .classList
        .remove("d-none");

}


// ==========================================
// RENDER AUTHORS
// ==========================================

function renderAuthors(authors) {


    const container =
        document.getElementById(
            "authorContainer"
        );


    if (!container) return;


    if (
        !authors ||
        authors.length === 0
    ) {

        container.innerHTML = `

            <div class="text-muted">

                Belum ada data author.

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    authors.forEach(
        function(author, index) {


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "author-card";


            card.innerHTML = `

                <div class="d-flex
                            justify-content-between
                            align-items-start">


                    <div>

                        <div class="author-name">

                            ${escapeHTML(
                                author.NamaAuthor ||
                                author.name ||
                                "-"
                            )}

                        </div>


                        <div class="author-affiliation">

                            ${escapeHTML(
                                author.Afiliasi ||
                                author.affiliation ||
                                "-"
                            )}

                        </div>

                    </div>


                    <div class="text-end">


                        <span class="badge bg-light text-dark">

                            Penulis ${index + 1}

                        </span>


                        ${
                            author.IsRSUP
                            ? `
                                <span
                                    class="badge bg-success">

                                    RSUP Surabaya

                                </span>
                              `
                            : ""
                        }


                        ${
                            author.IsCorresponding
                            ? `
                                <span
                                    class="badge bg-primary">

                                    Corresponding Author

                                </span>
                              `
                            : ""
                        }

                    </div>


                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


// ==========================================
// RENDER KEYWORDS
// ==========================================

function renderKeywords(keywords) {


    const container =
        document.getElementById(
            "detailKeywords"
        );


    if (!container) return;


    if (!keywords) {

        container.textContent =
            "-";

        return;

    }


    const keywordList =
        String(keywords)
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(
                item =>
                    item.length > 0
            );


    container.innerHTML = "";


    keywordList.forEach(
        function(keyword) {


            const badge =
                document.createElement(
                    "span"
                );


            badge.className =
                "keyword-badge";


            badge.textContent =
                keyword;


            container.appendChild(
                badge
            );

        }
    );

}


// ==========================================
// SET TEXT
// ==========================================

function setText(
    elementID,
    value
) {

    const element =
        document.getElementById(
            elementID
        );


    if (!element) return;


    element.textContent =
        value !== undefined &&
        value !== null &&
        value !== ""
            ? value
            : "-";

}


// ==========================================
// SET LINK
// ==========================================

function setLink(
    elementID,
    url
) {

    const element =
        document.getElementById(
            elementID
        );


    if (!element) return;


    if (!url) {

        element.classList.add(
            "disabled"
        );

        element.removeAttribute(
            "href"
        );

        return;

    }


    element.href = url;

}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(message) {


    const loading =
        document.getElementById(
            "loadingDetail"
        );


    const errorBox =
        document.getElementById(
            "errorDetail"
        );


    const errorMessage =
        document.getElementById(
            "errorMessage"
        );


    if (loading) {

        loading.classList.add(
            "d-none"
        );

    }


    if (errorBox) {

        errorBox.classList.remove(
            "d-none"
        );

    }


    if (errorMessage) {

        errorMessage.textContent =
            message;

    }

}


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// DOM READY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPublicationDetail();

    }
);
document
.getElementById("deletePublicationBtn")
.addEventListener("click",function(){

document
.getElementById("deleteTitle")
.textContent=
pub.Judul;

const modal=
new bootstrap.Modal(
document.getElementById("deleteModal")
);

modal.show();

});
