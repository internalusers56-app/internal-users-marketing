document.addEventListener('DOMContentLoaded', () => {
    // --- KONFIGURASI UNTUK GOOGLE APPS SCRIPT (GAS) ---
    // GANTI 'YOUR_GAS_WEB_APP_URL' dengan URL Web App dari GAS Anda
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwvL7jTI_L1EMe1DweGtL9-okYsfkv_LXgBv-u4SXjeK8zQHh28a3ACiZUzfoeuK8zC/exec';

    // --- ELEMEN DOM ---
    const signupForm = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');
    const toast = document.getElementById('toast');

    // --- FUNGSI UNTUK MENAMPILKAN NOTIFIKASI (TOAST) ---
    // Menampilkan pesan sukses atau error kepada pengguna.
    function showToast(message, type = 'success') {
        toast.className = `toast ${type}`; // Menambah class 'success' atau 'error'
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        toast.classList.add('show');

        // Sembunyikan toast setelah 4 detik
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // --- LOGIKA UTAMA SAAT FORM DIKIRIM (SIGNUP) ---
    signupForm.addEventListener('submit', async (event) => {
        // Mencegah form melakukan reload halaman default
        event.preventDefault();

        // 1. Nonaktifkan tombol dan ubah teks untuk memberikan feedback visual
        signupBtn.disabled = true;
        signupBtn.textContent = 'Mendaftarkan...';

        try {
            // 2. Ambil semua nilai dari form
            const fullname = document.getElementById('fullname').value;
            const no_whatsapp = document.getElementById('no_whatsapp').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // 3. Siapkan data yang akan dikirim ke GAS
            const now = new Date().toISOString();
            const newUserData = {
                id: `users-${Date.now()}`, // Buat ID unik berdasarkan timestamp
                fullname: fullname,
                no_whatsapp: no_whatsapp,
                email: email,
                password: password, // PENTINGAN: Seharusnya di-hash di sisi server (GAS)
                id_role: "", // Role kosong, menunggu persetujuan admin
                is_active: false, // User belum aktif hingga disetujui admin
                status_approval: 'Pending', // Status awal adalah 'Pending'
                created_at: now,
                updated_at: now
            };

            // 4. Kirim data ke Google Apps Script menggunakan metode POST
            const response = await fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            });

            // 5. Periksa apakah pengiriman berhasil
            const result = await response.json();

            if (response.ok && result) {
                // Jika berhasil, tampilkan pesan sukses
                showToast('Pendaftaran berhasil! Menunggu persetujuan admin.', 'success');
                signupForm.reset(); // Kosongkan form
                
                // 6. Arahkan pengguna ke halaman login setelah beberapa detik
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                // Jika gagal, tampilkan pesan error dari server
                showToast(result.error || 'Terjadi kesalahan saat mendaftar.', 'error');
            }

        } catch (error) {
            // Tangani error jaringan atau error lainnya
            console.error("Signup Error:", error);
            showToast('Terjadi kesalahan jaringan. Silakan coba lagi.', 'error');
        } finally {
            // 7. Aktifkan kembali tombol dan kembalikan teks aslinya, terlepas dari hasilnya
            signupBtn.disabled = false;
            signupBtn.textContent = 'Daftar Sekarang';
        }
    });

    // --- LOGIKA UNTUK SLIDESHOW GAMBAR (Sama dengan halaman lain) ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Fungsi untuk menampilkan slide tertentu
    function showSlide(index) {
        // Sembunyikan semua slide dan hapus class 'active' dari semua dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Tampilkan slide dan dot yang dipilih
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Fungsi untuk pindah ke slide berikutnya
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Tambahkan event listener untuk setiap dot agar bisa diklik
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Ubah slide secara otomatis setiap 3 detik
    setInterval(nextSlide, 3000);
});
