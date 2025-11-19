document.addEventListener('DOMContentLoaded', () => {

    // --- GANTI DENGAN URL WEB APP ANDA DARI GAS ---
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwvL7jTI_L1EMe1DweGtL9-okYsfkv_LXgBv-u4SXjeK8zQHh28a3ACiZUzfoeuK8zC/exec'; // PASTE URL ANDA DI SINI

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

    // --- LOGIKA SIGNUP KE GAS ---
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

            // 3. Siapkan data untuk dikirim
            const newUserData = {
                id: `users-${timestamp.getTime()}`,
                fullname: fullname,
                no_whatsapp: no_whatsapp,
                email: email,
                password: password, // CATATAN: Seharusnya di-hash di sisi server untuk keamanan
                id_role: "",
                is_active: false, // Default: false, menunggu persetujuan admin
                status_approval: 'Pending', // Status awal adalah 'Pending'
                created_at: timestamp, // SESUAI: 'creat_at'
                updated_at: timestamp  // SESUAI: 'update_at'
            };

            // 4. Kirim data ke Web App GAS
            const response = await fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUserData)
            });

            // 5. Proses respons dari GAS
            const result = await response.json();

            if (result.status === 'success') {
                showToast(result.message, 'success');
                signupForm.reset();
                setTimeout(() => {
                    window.location.href = 'index.html'; // Arahkan ke login
                }, 2000);
            } else {
                showToast(result.message, 'error');
            }

        } catch (error) {
            console.error("Signup Error:", error);
            showToast('Terjadi kesalahan jaringan. Silakan coba lagi.', 'error');
        } finally {
            // 6. Buka kunci tombol setelah proses selesai
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

