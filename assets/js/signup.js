document.addEventListener('DOMContentLoaded', () => {

    // ===== KONFIGURASI GOOGLE APPS SCRIPT (GAS) =====
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwWYWue9g_x2RhGwLxsgsCiv7ysQKytoxtlCo4FD25nZlx6ggKgcz3s3NLIjEUOYGlL/exec';

    // ===== ELEMENT DOM =====
    const signupForm = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');
    const toast = document.getElementById('toast');

    // ===== TOAST NOTIFICATION =====
    function showToast(message, type = 'success') {
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> 
            ${message}
        `;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // ===== HANDLE SUBMIT SIGNUP =====
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        signupBtn.disabled = true;
        signupBtn.textContent = 'Mendaftarkan...';

        try {
            const fullname = document.getElementById('fullname').value;
            const no_whatsapp = document.getElementById('no_whatsapp').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const now = new Date().toISOString();

            const newUserData = {
                id: `users-${Date.now()}`,
                fullname: fullname,
                no_whatsapp: no_whatsapp,
                email: email,
                password: password,
                id_role: "",
                is_active: false,
                status_approval: "Pending",
                created_at: now,
                updated_at: now
            };

            const response = await fetch(GAS_WEB_APP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: "cors",
                body: JSON.stringify(newUserData)
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                showToast('Pendaftaran berhasil! Menunggu persetujuan admin.', 'success');
                
                signupForm.reset();

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showToast(result.message || "Pendaftaran gagal.", "error");
            }

        } catch (error) {
            console.error("Signup Error:", error);
            showToast("Terjadi kesalahan jaringan. Silakan coba lagi.", "error");
        }

        signupBtn.disabled = false;
        signupBtn.textContent = 'Daftar Sekarang';
    });

    // ===== SLIDESHOW =====
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
