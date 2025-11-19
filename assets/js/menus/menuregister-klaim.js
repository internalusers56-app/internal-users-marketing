// File: assets/js/menus/menuregister-klaim.js

function initPage() {
    console.log("Register Klaim page initialized.");

    // --- ELEMEN DOM ---
    const searchOption = document.getElementById('search-option');
    const advancedSearch = document.getElementById('advanced-search');
    const addPlanBtn = document.getElementById('add-plan-btn');
    const modal = document.getElementById('plan-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.btn-cancel');
    const planForm = document.getElementById('plan-form');
    const searchInput = document.getElementById('search-input');
    const tableBody = document.querySelector('#register-klaim-table tbody');

    // --- ELEMEN DOM UNTUK PENCARIAN LANJUTAN ---
    const advancedSearchBtn = document.getElementById('advanced-search-btn');
    const resetSearchBtn = document.getElementById('reset-search-btn');
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');
    const statusFilterSelect = document.getElementById('status-filter');

    // --- FUNGSI MODAL ---
    function openModal() { modal.style.display = 'block'; planForm.reset(); }
    function closeModal() { modal.style.display = 'none'; }

    // --- EVENT LISTENER MODAL ---
    addPlanBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target == modal) closeModal(); });
    planForm.addEventListener('submit', (event) => { event.preventDefault(); alert('Data berhasil disimpan! (Simulasi)'); closeModal(); });

    // --- EVENT LISTENER PENCARIAN LANJUTAN ---
    searchOption.addEventListener('change', () => {
        if (searchOption.value === 'advanced') {
            advancedSearch.style.display = 'flex';
        } else {
            advancedSearch.style.display = 'none';
        }
    });
    advancedSearchBtn.addEventListener('click', advancedFilterTable);
    resetSearchBtn.addEventListener('click', resetAdvancedSearch);

    // --- FUNGSI FILTER TABEL (Pencarian Umum) ---
    function filterTable() {
        const filter = searchInput.value.toLowerCase();
        const rows = tableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let rowContainsFilter = false;
            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent || cells[j].innerText;
                if (cellText.toLowerCase().includes(filter)) { rowContainsFilter = true; break; }
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
            const rowDateText = row.cells[5].textContent; // Kolom Tgl Lapor
            const rowStatus = row.cells[6].textContent;   // Kolom Status
            const rowDate = new Date(rowDateText);
            let showRow = true;
            if (dateFrom && rowDate < dateFrom) showRow = false;
            if (dateTo && rowDate > dateTo) showRow = false;
            if (statusFilter && rowStatus !== statusFilter) showRow = false;
            row.style.display = showRow ? '' : 'none';
        }
    }

    // --- FUNGSI RESET PENCARIAN LANJUTAN ---
    function resetAdvancedSearch() {
        dateFromInput.value = ''; dateToInput.value = ''; statusFilterSelect.value = '';
        const rows = tableBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) { rows[i].style.display = ''; }
    }

    // --- EVENT LISTENER TOMBOL AKSI DI TABEL ---
    tableBody.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-update')) {
            const row = target.closest('tr');
            const id = row.cells[0].textContent;
            console.log(`Update data untuk No. Register: ${id}`);
            alert(`Fitur update untuk No. Register: ${id} (Simulasi)`);
        }
        if (target.classList.contains('btn-delete')) {
            const row = target.closest('tr');
            const id = row.cells[0].textContent;
            if (confirm(`Apakah Anda yakin ingin menghapus data dengan No. Register: ${id}?`)) {
                console.log(`Hapus data untuk No. Register: ${id}`);
                row.remove();
                alert(`Data dengan No. Register: ${id} telah dihapus (Simulasi)`);
            }
        }
    });
    
    // --- LOGIKA PAGINASI (PLACEHOLDER) ---
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.id) {
                document.querySelector('.page-btn.active').classList.remove('active');
                this.classList.add('active');
                console.log(`Pindah ke halaman ${this.textContent}`);
            }
        });
    });
}