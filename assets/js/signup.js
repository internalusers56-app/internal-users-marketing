document.addEventListener('DOMContentLoaded', () => {
    // --- GANTI DENGAN API ID ANDA DARI SHEETDB ---
    const SHEETDB_API_ID = 'https://sheetdb.io/api/v1/hnryotv4dhvzy'; 
    const SHEETDB_URL = `https://api.sheetdb.io/v1/api/${SHEETDB_API_ID}`;

    // --- ELEMEN DOM ---
    const signupForm = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');
    const toast = document.getElementById('toast');

    // --- FUNGSI NOTIFIKASI TOAST ---
    function showToast(message, type = 'success') {
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 4000);
    }

    // --- LOGIKA SIGNUP KE SHEETDB ---
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 1. Kunci tombol dan ubah teks
        signupBtn.disabled = true;
        signupBtn.textContent = 'Mendaftarkan...';

        try {
            // 2. Ambil nilai dari form
            const fullname = document.getElementById('fullname').value;
            const no_whatsapp = document.getElementById('no_whatsapp').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const id_role = document.getElementById('id_role').value;

            // 3. Siapkan data untuk dikirim
            const now = new Date().toISOString();
            const newUserData = {
                id: `users-${Date.now()}`, // Buat ID unik
                fullname: fullname,
                no_whatsapp: no_whatsapp,
                email: email,
                password: password, // CATATAN: Seharusnya di-hash, tapi ini untuk simulasi
                id_role: id_role,
                is_active: true, // Default: true
                status_approval: 'Pending', // Default: Pending, menunggu persetujuan admin
                created_at: now,
                updated_at: now
            };

            // 4. Kirim data ke SheetDB
            const response = await fetch(SHEETDB_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserData)
            });

            const result = await response.json();

            if (response.ok && result) {
                showToast('Pendaftaran berhasil! Menunggu persetujuan admin.', 'success');
                signupForm.reset();
                setTimeout(() => {
                    window.location.href = 'index.html'; // Arahkan ke login
                }, 2000);
            } else {
                showToast(result.error || 'Terjadi kesalahan saat mendaftar.', 'error');
            }

        } catch (error) {
            console.error("Signup Error:", error);
            showToast('Terjadi kesalahan jaringan. Silakan coba lagi.', 'error');
        } finally {
            // 5. Buka kunci tombol setelah proses selesai
            signupBtn.disabled = false;
            signupBtn.textContent = 'Daftar Sekarang';
        }
    });

    // --- LOGIKA SLIDESHOW (Sama dengan halaman lain) ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(nextSlide, 3000);
});
