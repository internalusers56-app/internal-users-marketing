document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMEN DOM ---
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const pageTitle = document.getElementById('page-title');
    const contentArea = document.getElementById('content-area');
    const logoutBtn = document.getElementById('logout-btn');

    // --- FUNGSI UNTUK MEMUAT HALAMAN (HTML, CSS, JS) ---
    async function loadPage(pageName) {
        console.log(`--- Memulai proses load untuk halaman: ${pageName} ---`);

        try {
            // 1. Muat CSS Halaman
            const cssPath = `assets/css/menus/menu${pageName}.css`;
            console.log(`1. Mencoba memuat CSS dari: ${cssPath}`);
            await loadPageCSS(cssPath);

            // 2. Muat Konten HTML
            const htmlPath = `assets/pages/menu${pageName}.html`;
            console.log(`2. Mencoba memuat HTML dari: ${htmlPath}`);
            const response = await fetch(htmlPath);
            if (!response.ok) {
                throw new Error(`Gagal mengambil ${htmlPath}. Status: ${response.status}`);
            }
            const html = await response.text();
            contentArea.innerHTML = html;
            console.log("HTML berhasil dimuat dan dimasukkan ke content-area.");

            // 3. Update Judul Halaman
            const titleMap = { /* ... */ };
            pageTitle.textContent = titleMap[pageName] || 'Halaman';

            // 4. Muat dan Jalankan JS Halaman
            const jsPath = `assets/js/menus/menu${pageName}.js`;
            console.log(`3. Mencoba memuat JS dari: ${jsPath}`);
            await loadPageJS(jsPath);

            // 5. Update Active State di Menu
            updateActiveMenu(pageName);
            console.log(`--- Proses load untuk halaman ${pageName} selesai ---`);

        } catch (error) {
            console.error(`Error saat memuat halaman ${pageName}:`, error);
            contentArea.innerHTML = `<h2>Error</h2><p>${error.message}</p><p>Cek tab Console (F12) untuk detail lebih lanjut.</p>`;
        }
    }

    function loadPageCSS(cssPath) {
        return new Promise((resolve) => {
            const oldCSS = document.getElementById('page-css');
            if (oldCSS) oldCSS.remove();

            const link = document.createElement('link');
            link.id = 'page-css';
            link.rel = 'stylesheet';
            link.href = cssPath;
            link.onload = () => { console.log("CSS berhasil dimuat."); resolve(); };
            link.onerror = () => { console.error("Gagal memuat CSS."); resolve(); }; // Lanjutkan walaupun CSS gagal
            document.head.appendChild(link);
        });
    }

    function loadPageJS(jsPath) {
        return new Promise((resolve) => {
            const oldJS = document.getElementById('page-js');
            if (oldJS) oldJS.remove();

            const script = document.createElement('script');
            script.id = 'page-js';
            script.src = jsPath;
            script.onload = () => {
                console.log("JS berhasil dimuat.");
                if (typeof window.initPage === 'function') {
                    console.log("Menjalankan fungsi initPage()...");
                    window.initPage();
                } else {
                    console.log("Tidak ada fungsi initPage() yang ditemukan.");
                }
                resolve();
            };
            script.onerror = () => { console.error("Gagal memuat JS."); resolve(); }; // Lanjutkan walaupun JS gagal
            document.body.appendChild(script);
        });
    }

    function updateActiveMenu(pageName) {
        document.querySelectorAll('.menu-item, .submenu-item').forEach(item => item.classList.remove('active'));
        const activeMenuItem = document.querySelector(`[data-page="${pageName}"]`);
        if (activeMenuItem) activeMenuItem.classList.add('active');
    }

    // --- EVENT LISTENER (TIDAK BERUBAH) ---
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('collapsed'));
    mobileMenuToggle.addEventListener('click', () => sidebar.classList.toggle('mobile-open'));

    document.querySelector('.sidebar-nav').addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        e.preventDefault();
        if (link.parentElement.classList.contains('has-submenu')) {
            link.parentElement.classList.toggle('submenu-open');
            return;
        }
        const page = link.closest('[data-page]')?.dataset.page;
        if (page) {
            loadPage(page);
            if (window.innerWidth <= 768) sidebar.classList.remove('mobile-open');
        }
    });

    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Apakah Anda yakin ingin keluar?')) {
            alert('Anda telah berhasil logout.');
        }
    });

    // --- INISIALISASI ---
    loadPage('dashboard');
});