// File: assets/js/menus/menumarketing-plan.js

function initPage() {
    console.log("Marketing Plan page initialized.");

    // --- ELEMEN DOM ---
    const searchOption = document.getElementById('search-option');
    const advancedSearch = document.getElementById('advanced-search');
    const addPlanBtn = document.getElementById('add-plan-btn');
    const modal = document.getElementById('plan-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.btn-cancel');
    const planForm = document.getElementById('plan-form');
    const searchInput = document.getElementById('search-input');
    const tableBody = document.querySelector('#marketing-plan-table tbody');

    // --- ELEMEN DOM UNTUK PENCARIAN LANJUTAN ---
    const advancedSearchBtn = document.getElementById('advanced-search-btn');
    const resetSearchBtn = document.getElementById('reset-search-btn');
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const statusFilterSelect = document.getElementById('status-filter');

    // --- FUNGSI MODAL ---
    function openModal() {
        modal.style.display = 'block';
        planForm.reset(); // Kosongkan form
    }
    function closeModal() {
        modal.style.display = 'none';
    }

    // --- EVENT LISTENER MODAL ---
    addPlanBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
    planForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Data berhasil disimpan! (Fitur ini hanya simulasi)');
        closeModal();
    });

    // --- EVENT LISTENER PENCARIAN LANJUTAN ---
    searchOption.addEventListener('change', () => {
        if (searchOption.value === 'advanced') {
            advancedSearch.style.display = 'flex';
        } else {
            advancedSearch.style.display = 'none';
        }
    });

    // --- EVENT LISTENER UNTUK TOMBOL CARI DAN BATAL ---
    advancedSearchBtn.addEventListener('click', advancedFilterTable);
    resetSearchBtn.addEventListener('click', resetAdvancedSearch);

    // --- FUNGSI FILTER TABEL (Pencarian Umum) ---
    function filterTable() {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let rowContainsFilter = false;

            // Loop melalui semua kolom di baris ini
            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent || cells[j].innerText;
                if (cellText.toLowerCase().includes(filter)) {
                    rowContainsFilter = true;
                    break; // Berhenti jika cocok di salah satu kolom
                }
            }

            rows[i].style.display = rowContainsFilter ? '' : 'none';
        }
    }
    searchInput.addEventListener('input', filterTable);

    // --- FUNGSI FILTER TABEL (Pencarian Lanjutan) ---
    function advancedFilterTable() {
        const dateFrom = dateFromInput.value ? new Date(dateFromInput.value) : null;
        const dateTo = dateToInput.value ? new Date(dateToInput.value) : null;
        const statusFilter = statusFilterSelect.value;

        const rows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowDateText = row.cells[1].textContent; // Kolom Tanggal
            const rowStatus = row.cells[7].textContent;   // Kolom Status

            // Konversi tanggal dari "YYYY-MM-DD" ke objek Date untuk perbandingan
            const rowDate = new Date(rowDateText);

            let showRow = true;

            // Filter berdasarkan tanggal dari
            if (dateFrom && rowDate < dateFrom) {
                showRow = false;
            }

            // Filter berdasarkan tanggal sampai
            if (dateTo && rowDate > dateTo) {
                showRow = false;
            }

            // Filter berdasarkan status
            if (statusFilter && rowStatus !== statusFilter) {
                showRow = false;
            }

            // Tampilkan atau sembunyikan baris
            row.style.display = showRow ? '' : 'none';
        }
    }

    // --- FUNGSI RESET PENCARIAN LANJUTAN ---
    function resetAdvancedSearch() {
        // Kosongkan input filter
        dateFromInput.value = '';
        dateToInput.value = '';
        statusFilterSelect.value = '';
        
        // Tampilkan semua baris tabel
        const rows = tableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = '';
        }
    }

    // --- EVENT LISTENER TOMBOL AKSI DI TABEL ---
    tableBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-update')) {
            const row = target.closest('tr');
            const id = row.cells[0].textContent;
            console.log(`Update data untuk ID: ${id}`);
            alert(`Fitur update untuk ID: ${id} (Simulasi)`);
        }
        if (target.classList.contains('btn-delete')) {
            const row = target.closest('tr');
            const id = row.cells[0].textContent;
            if (confirm(`Apakah Anda yakin ingin menghapus data dengan ID: ${id}?`)) {
                console.log(`Hapus data untuk ID: ${id}`);
                row.remove(); // Hapus baris dari tabel (simulasi)
                alert(`Data dengan ID: ${id} telah dihapus (Simulasi)`);
            }
        }
    });
    
    // --- LOGIKA PAGINASI (PLACEHOLDER) ---
    // Logika untuk mengubah data tabel saat halaman paginasi diklik
    // akan memerlukan backend atau array data yang lebih kompleks.
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.id) { // Jika bukan tombol prev/next
                document.querySelector('.page-btn.active').classList.remove('active');
                this.classList.add('active');
                console.log(`Pindah ke halaman ${this.textContent}`);
                // Di sini logika untuk menampilkan data halaman baru akan ditempatkan
            }
        });
    });
}