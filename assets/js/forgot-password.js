document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA SLIDESHOW GAMBAR ---
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


    // --- LOGIKA FORM LUPA PASSWORD & TOAST ---
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const resetBtn = document.getElementById('reset-btn');
    const toast = document.getElementById('toast');

    function showToast(message, type = 'success') {
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    forgotPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // 1. Kunci tombol dan ubah teks
        resetBtn.disabled = true;
        resetBtn.textContent = 'Mengirim...';

        // Simulasi proses pengiriman email ke server
        setTimeout(() => {
            const isSuccess = true; 

            if (isSuccess) {
                showToast('Tautan reset telah dikirim ke email Anda!', 'success');
                forgotPasswordForm.reset();
            } else {
                showToast('Gagal mengirim tautan. Email tidak ditemukan.', 'error');
            }

            // 2. Buka kunci tombol setelah toast selesai
            setTimeout(() => {
                resetBtn.disabled = false;
                resetBtn.textContent = 'Kirim Tautan Reset';
            }, 4000);

        }, 2000);
    });

});