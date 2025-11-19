document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA SLIDESHOW GAMBAR (SAMA DENGAN SIGNUP) ---
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


    // --- LOGIKA FORM LOGIN & TOAST ---
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const toast = document.getElementById('toast');

    function showToast(message, type = 'success') {
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const emailInput = document.getElementById('email').value;
            if (!emailInput.endsWith('@gmail.com')) {
                showToast('Hanya alamat Gmail yang diizinkan.', 'error');
                return; // Hentikan proses jika bukan Gmail
            }

        // 1. Kunci tombol dan ubah teks
        loginBtn.disabled = true;
        loginBtn.textContent = 'Memproses...';

        // Simulasi proses login ke server
        setTimeout(() => {
            // Ganti nilai ini untuk testing
            const isSuccess = true; 

            if (isSuccess) {
                showToast('Login berhasil! Mengalihkan ke dashboard...', 'success');
                loginForm.reset();
                // Di sini Anda bisa menambahkan logika redirect, misalnya:
                // window.location.href = 'dashboard.html';
            } else {
                showToast('Login gagal. Email atau password salah.', 'error');
            }

            // 2. Buka kunci tombol setelah toast selesai
            setTimeout(() => {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Masuk';
            }, 4000);

        }, 2000); // Simulasi delay proses 2 detik
    });

});