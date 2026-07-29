// ==========================================
// SIPIRS - ADD PUBLICATION
// ==========================================


// ==========================================
// URL GOOGLE APPS SCRIPT
// ==========================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbx_nglSPAgsqihJ3Xn_oIj8EComgbuAtXsJ7V14J4tycZR_osEHpCZeXo6iMK3H8_YJ/exec";


// ==========================================
// DOM READY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    const form =
        document.getElementById("publicationForm");


    const addAuthorBtn =
        document.getElementById("addAuthorBtn");


    const authorContainer =
        document.getElementById("authorContainer");


    // ==========================================
    // 1. TAMBAH AUTHOR
    // ==========================================

    if (addAuthorBtn && authorContainer) {

        addAuthorBtn.addEventListener("click", function () {


            const authorCount =
                authorContainer
                    .querySelectorAll(".author-item")
                    .length + 1;


            const authorCard =
                document.createElement("div");


            authorCard.className =
                "author-card author-item";


            authorCard.innerHTML = `

                <div class="d-flex justify-content-between align-items-center mb-3">

                    <strong>
                        Penulis ${authorCount}
                    </strong>

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger remove-author">

                        <i class="bi bi-trash"></i>
                        Hapus

                    </button>

                </div>


                <div class="row g-3">

                    <div class="col-md-6">

                        <label class="form-label">

                            Nama Author
                            <span class="required">*</span>

                        </label>

                        <input
                            type="text"
                            class="form-control author-name"
                            name="authorName[]"
                            placeholder="Nama lengkap author"
                            required>

                    </div>


                    <div class="col-md-6">

                        <label class="form-label">

                            Afiliasi

                        </label>

                        <input
                            type="text"
                            class="form-control author-affiliation"
                            name="authorAffiliation[]"
                            placeholder="Contoh: RSUP Surabaya">

                    </div>

                </div>


                <div class="mt-3">

                    <div class="form-check form-check-inline">

                        <input
                            class="form-check-input author-rsup"
                            type="checkbox"
                            name="authorRSUP[]">

                        <label class="form-check-label">

                            Author RSUP Surabaya

                        </label>

                    </div>


                    <div class="form-check form-check-inline">

                        <input
                            class="form-check-input author-corresponding"
                            type="checkbox"
                            name="authorCorresponding[]">

                        <label class="form-check-label">

                            Corresponding Author

                        </label>

                    </div>

                </div>

            `;


            authorContainer.appendChild(authorCard);


            // Tombol hapus

            const removeButton =
                authorCard.querySelector(
                    ".remove-author"
                );


            removeButton.addEventListener(
                "click",
                function () {

                    authorCard.remove();

                    updateAuthorNumbers();

                }
            );

        });

    }


    // ==========================================
    // 2. UPDATE NOMOR AUTHOR
    // ==========================================

    function updateAuthorNumbers() {


        const authors =
            authorContainer.querySelectorAll(
                ".author-item"
            );


        authors.forEach(
            function (author, index) {


                const title =
                    author.querySelector("strong");


                if (title) {

                    title.textContent =
                        "Penulis " + (index + 1);

                }

            }
        );

    }


    // ==========================================
    // 3. SUBMIT FORM
    // ==========================================

    if (form) {


        form.addEventListener(
            "submit",
            async function (event) {


                event.preventDefault();


                // ------------------------------------------
                // VALIDASI
                // ------------------------------------------

                if (!form.checkValidity()) {

                    form.reportValidity();

                    return;

                }


                // ------------------------------------------
                // TOMBOL SIMPAN
                // ------------------------------------------

                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                const originalButton =
                    submitButton.innerHTML;


                submitButton.disabled = true;


                submitButton.innerHTML = `

                    <span
                        class="spinner-border spinner-border-sm me-2">
                    </span>

                    Menyimpan...

                `;


                try {


                    // ==========================================
                    // AMBIL DATA AUTHOR
                    // ==========================================

                    const authors = [];


                    const authorItems =
                        authorContainer.querySelectorAll(
                            ".author-item"
                        );


                    authorItems.forEach(
                        function (authorItem) {


                            const name =
                                authorItem
                                    .querySelector(
                                        ".author-name"
                                    )
                                    .value
                                    .trim();


                            const affiliation =
                                authorItem
                                    .querySelector(
                                        ".author-affiliation"
                                    )
                                    .value
                                    .trim();


                            const isRSUP =
                                authorItem
                                    .querySelector(
                                        ".author-rsup"
                                    )
                                    .checked;


                            const isCorresponding =
                                authorItem
                                    .querySelector(
                                        ".author-corresponding"
                                    )
                                    .checked;


                            authors.push({

                                name:
                                    name,

                                affiliation:
                                    affiliation,

                                isRSUP:
                                    isRSUP,

                                isCorresponding:
                                    isCorresponding

                            });

                        }
                    );


                    // ==========================================
                    // DATA PUBLIKASI
                    // ==========================================

                    const data = {

                        action:
                            "addPublication",


                        InputByUserID:
                            localStorage.getItem(
                                "userID"
                            ) || "",


                        Judul:
                            document
                                .getElementById("judul")
                                .value
                                .trim(),


                        JenisPublikasiID:
                            document
                                .getElementById(
                                    "jenisPublikasi"
                                )
                                .value,


                        NamaJurnalPenerbit:
                            document
                                .getElementById(
                                    "namaJurnalPenerbit"
                                )
                                .value
                                .trim(),


                        Volume:
                            document
                                .getElementById("volume")
                                .value
                                .trim(),


                        Issue:
                            document
                                .getElementById("issue")
                                .value
                                .trim(),


                        Halaman:
                            document
                                .getElementById("halaman")
                                .value
                                .trim(),


                        TahunTerbit:
                            document
                                .getElementById("tahunTerbit")
                                .value,


                        DOI:
                            document
                                .getElementById("doi")
                                .value
                                .trim(),


                        ISSN:
                            document
                                .getElementById("issn")
                                .value
                                .trim(),


                        ISBN:
                            document
                                .getElementById("isbn")
                                .value
                                .trim(),


                        LinkPublikasi:
                            document
                                .getElementById(
                                    "linkPublikasi"
                                )
                                .value
                                .trim(),


                        LinkPDFDrive:
                            document
                                .getElementById(
                                    "linkPDFDrive"
                                )
                                .value
                                .trim(),


                        Abstract:
                            document
                                .getElementById("abstract")
                                .value
                                .trim(),


                        KataKunci:
                            document
                                .getElementById("kataKunci")
                                .value
                                .trim(),


                        Bahasa:
                            document
                                .getElementById("bahasa")
                                .value,


                        IndexingID:
                            document
                                .getElementById("indexing")
                                .value,


                        PeringkatIndex:
                            document
                                .getElementById(
                                    "peringkatIndex"
                                )
                                .value
                                .trim(),


                        StatusVerifikasiID:
                            "",


                        StatusOpenAccess:
                            document.querySelector(
                                'input[name="statusOpenAccess"]:checked'
                            )?.value || "",


                        authors:
                            authors

                    };


                    // ==========================================
                    // KIRIM KE APPS SCRIPT
                    // ==========================================

                    const response =
                        await fetch(
                            API_URL,
                            {

                                method:
                                    "POST",

                                body:
                                    JSON.stringify(data)

                            }
                        );


                    const result =
                        await response.json();


                    // ==========================================
                    // HASIL
                    // ==========================================

                    if (result.status) {


                        alert(
                            "Publikasi berhasil disimpan!\n\n" +
                            "ID Publikasi: " +
                            result.PublikasiID
                        );


                        window.location.href =
                            "dashboard.html";


                    } else {


                        alert(
                            "Publikasi gagal disimpan.\n\n" +
                            result.message
                        );

                    }


                } catch (error) {


                    console.error(
                        "SIPIRS Error:",
                        error
                    );


                    alert(
                        "Terjadi kesalahan saat menghubungkan ke server.\n\n" +
                        error.message
                    );


                } finally {


                    submitButton.disabled =
                        false;


                    submitButton.innerHTML =
                        originalButton;

                }

            }
        );

    }

});
