document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA SLIDESHOW GAMBAR ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Sembunyikan semua slide dan hapus class active dari dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Tampilkan slide dan dot yang dipilih
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Event listener untuk navigasi dot
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto slide setiap 3 detik
    setInterval(nextSlide, 3000);


    // --- LOGIKA FORM & TOAST ---
    const signupForm = document.getElementById('signup-form');
    const signupBtn = document.getElementById('signup-btn');
    const toast = document.getElementById('toast');

    // Fungsi untuk menampilkan Toast
    function showToast(message, type = 'success') {
        toast.className = `toast ${type}`; // Set class (success/error)
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
        toast.classList.add('show');

        // Sembunyikan toast setelah 4 detik
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // Event listener untuk submit form
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah reload halaman

        const emailInput = document.getElementById('email').value;
            if (!emailInput.endsWith('@gmail.com')) {
                showToast('Hanya alamat Gmail yang diizinkan.', 'error');
                return; // Hentikan proses jika bukan Gmail
            }

        // 1. Kunci tombol dan ubah teks
        signupBtn.disabled = true;
        signupBtn.textContent = 'Mendaftarkan...';

        // Simulasi proses pendaftaran (misalnya, ke server)
        setTimeout(() => {
            const isSuccess = true; 

            if (isSuccess) {
                showToast('Pendaftaran berhasil! Silakan cek email Anda.', 'success');
                signupForm.reset(); // Kosongkan form
            } else {
                showToast('Pendaftaran gagal. Email mungkin sudah digunakan.', 'error');
            }

            // 2. Buka kunci tombol setelah toast selesai ditampilkan
            setTimeout(() => {
                signupBtn.disabled = false;
                signupBtn.textContent = 'Daftar Sekarang';
            }, 4000);

        }, 2000); // Simulasi delay proses 2 detik
    });

});