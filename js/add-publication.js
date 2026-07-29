// ==========================================
// SIPIRS - ADD PUBLICATION
// ==========================================


// ==========================================
// 1. TAMBAH & HAPUS AUTHOR
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const addAuthorBtn =
        document.getElementById("addAuthorBtn");

    const authorContainer =
        document.getElementById("authorContainer");


    // ==========================================
    // TAMBAH AUTHOR
    // ==========================================

    if (addAuthorBtn && authorContainer) {

        addAuthorBtn.addEventListener("click", function () {

            // Hitung jumlah author yang sudah ada
            const authorCount =
                authorContainer.querySelectorAll(".author-item").length + 1;


            const authorHTML = `

                <div class="author-card author-item">

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

                        <!-- NAMA AUTHOR -->

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


                        <!-- AFILIASI -->

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

                        <!-- AUTHOR RSUP -->

                        <div class="form-check form-check-inline">

                            <input
                                class="form-check-input author-rsup"
                                type="checkbox"
                                name="authorRSUP[]">

                            <label class="form-check-label">

                                Author RSUP Surabaya

                            </label>

                        </div>


                        <!-- CORRESPONDING AUTHOR -->

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

                </div>

            `;


            authorContainer.insertAdjacentHTML(
                "beforeend",
                authorHTML
            );


            // Rapikan nomor author
            updateAuthorNumbers();

        });

    }


    // ==========================================
    // HAPUS AUTHOR
    // ==========================================

    document.addEventListener("click", function (event) {

        const removeButton =
            event.target.closest(".remove-author");


        if (removeButton) {

            const authorCard =
                removeButton.closest(".author-item");


            if (authorCard) {

                authorCard.remove();

                updateAuthorNumbers();

            }

        }

    });


    // ==========================================
    // UPDATE NOMOR AUTHOR
    // ==========================================

    function updateAuthorNumbers() {

        const authors =
            document.querySelectorAll(".author-item");


        authors.forEach(function (author, index) {

            const title =
                author.querySelector("strong");


            if (title) {

                title.textContent =
                    "Penulis " + (index + 1);

            }

        });

    }


    // ==========================================
    // 2. SUBMIT FORM
    // ==========================================

    const form =
        document.getElementById("publicationForm");


    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();


            alert(
                "Form berhasil dibaca. Berikutnya kita akan menghubungkannya ke Google Apps Script."
            );

        });

    }

});
