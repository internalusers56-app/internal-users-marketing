// File: assets/js/menus/menudashboard.js

// Fungsi ini akan dipanggil oleh script.js setelah halaman dashboard dimuat
function initPage() {
    console.log("Dashboard script initialized. Membuat grafik...");

    // --- GRAFIK BATANG 1: Performa Bulanan ---
    const barCtx1 = document.getElementById('barChart1');
    if (barCtx1) {
        new Chart(barCtx1.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
                datasets: [{
                    label: 'Aplikasi Baru',
                    data: [65, 78, 90, 81, 96, 115],
                    backgroundColor: 'rgba(74, 105, 189, 0.6)',
                    borderColor: 'rgba(74, 105, 189, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // --- GRAFIK BATANG 2: Produksi per Cabang ---
    const barCtx2 = document.getElementById('barChart2');
    if (barCtx2) {
        new Chart(barCtx2.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
                datasets: [{
                    label: 'Total Polis',
                    data: [320, 280, 250, 190, 210],
                    backgroundColor: 'rgba(46, 204, 113, 0.6)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // --- GRAFIK DONAT 1: Status Klaim ---
    const doughnutCtx1 = document.getElementById('doughnutChart1');
    if (doughnutCtx1) {
        new Chart(doughnutCtx1.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Disetujui', 'Diproses', 'Ditolak'],
                datasets: [{
                    data: [300, 150, 50],
                    backgroundColor: ['#2ecc71', '#f39c12', '#e74c3c'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // --- GRAFIK DONAT 2: Jenis Kelamin Nasabah ---
    const doughnutCtx2 = document.getElementById('doughnutChart2');
    if (doughnutCtx2) {
        new Chart(doughnutCtx2.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Pria', 'Wanita'],
                datasets: [{
                    data: [650, 480],
                    backgroundColor: ['#3498db', '#e91e63'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // --- GRAFIK DONAT 3: Metode Pembayaran ---
    const doughnutCtx3 = document.getElementById('doughnutChart3');
    if (doughnutCtx3) {
        new Chart(doughnutCtx3.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Transfer', 'Kartu Kredit', 'Tunai'],
                datasets: [{
                    data: [450, 320, 150],
                    backgroundColor: ['#9b59b6', '#1abc9c', '#f1c40f'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // --- GRAFIK DONAT 4: Sumber Lead ---
    const doughnutCtx4 = document.getElementById('doughnutChart4');
    if (doughnutCtx4) {
        new Chart(doughnutCtx4.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Website', 'Sosial Media', 'Referral', 'Lainnya'],
                datasets: [{
                    data: [400, 250, 200, 100],
                    backgroundColor: ['#34495e', '#95a5a6', '#d35400', '#c0392b'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}