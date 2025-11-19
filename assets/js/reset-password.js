document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA SLIDESHOW GAMBAR (SAMA DENGAN HALAMAN LAIN) ---
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


    // --- LOGIKA FORM RESET PASSWORD & TOAST ---
    const resetPasswordForm = document.getElementById('reset-password-form');
    const resetPasswordBtn = document.getElementById('reset-password-btn');
    const toast = document.getElementById('toast');

    function showToast(message, type = 'success') {
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    resetPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Ambil nilai dari input
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validasi: Cek apakah password cocok
        if (newPassword !== confirmPassword) {
            showToast('Password tidak cocok. Silakan coba lagi.', 'error');
            return; // Hentikan proses jika tidak cocok
        }

        // 1. Kunci tombol dan ubah teks
        resetPasswordBtn.disabled = true;
        resetPasswordBtn.textContent = 'Mereset...';

        // Simulasi proses reset password ke server
        setTimeout(() => {
            const isSuccess = true; 

            if (isSuccess) {
                showToast('Password berhasil direset! Mengalihkan ke halaman login...', 'success');
                resetPasswordForm.reset();
                // Redirect ke halaman login setelah beberapa saat
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                showToast('Terjadi kesalahan. Silakan coba lagi nanti.', 'error');
            }

            // 2. Buka kunci tombol setelah toast selesai
            setTimeout(() => {
                resetPasswordBtn.disabled = false;
                resetPasswordBtn.textContent = 'Reset Password';
            }, 4000);

        }, 2000);
    });

});