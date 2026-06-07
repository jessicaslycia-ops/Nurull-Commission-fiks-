// Memastikan script berjalan setelah seluruh elemen HTML termuat sempurna
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOGIKA TAB NAVIGATION (MENU UTAMA)
    // ==========================================
    function switchTab(tabName) {
        // Sembunyikan semua konten kartu
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        // Hapus kelas aktif dari semua tombol menu
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active-tab'));
        
        // Tampilkan konten yang dipilih
        document.getElementById('content-' + tabName).classList.remove('hidden');
        // Beri efek aktif ke tombol yang diklik
        document.getElementById('btn-' + tabName).classList.add('active-tab');
    }

    // Menghubungkan tombol ke fungsi global agar bisa dipanggil onclick
    window.switchTab = switchTab;

    window.selectRegion = function(region) {
        alert('Kamu memilih menu komisi: ' + region.toUpperCase() + '. Form input detail akan kita buat di tahap selanjutnya!');
    }

    window.handleLogin = function(e) {
        e.preventDefault();
        alert('Sistem otentikasi login admin sedang dipersiapkan!');
    }


    // ==========================================
    // 2. LOGIKA MOUSE GLOW TRAILING
    // ==========================================
    const mouseGlow = document.getElementById('mouseGlow');
    if (!mouseGlow) return; // Keamanan jika elemen tidak ditemukan

    document.addEventListener('mousemove', (e) => {
        // Memunculkan efek glow dan memposisikannya tepat di kursor mouse (center)
        mouseGlow.style.opacity = '1';
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    });

    // Jika kursor keluar dari jendela browser, sembunyikan cahayanya secara perlahan
    document.addEventListener('mouseleave', () => {
        mouseGlow.style.opacity = '0';
    });


    // ==========================================
    // 3. LOGIKA ANIMASI PARTIKEL BERGERAK RANDOM
    // ==========================================
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return; // Keamanan jika kanvas tidak ditemukan
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 80; // Jumlah butiran partikel di layar

    // Fungsi menyesuaikan ukuran kanvas dengan ukuran layar laptop/HP secara otomatis
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Reinisi partikel agar tidak hilang saat resize
        initParticles();
    }

    window.addEventListener('resize', handleResize);
    // Inisiasi awal ukuran kanvas
    handleResize();

    // Cetak Biru (Blueprint) Objek Partikel Tunggal
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Ukuran lebih bervariasi (0.3px sampai 2.8px)
            this.size = Math.random() * 2.5 + 0.3; 
            // Kecepatan gerak acak lambat
            this.speedX = Math.random() * 0.35 - 0.175; 
            this.speedY = Math.random() * 0.35 - 0.175; 
            // Transparansi awal bervariasi
            this.opacity = Math.random() * 0.6 + 0.15; 
            // Kecepatan kelap-kelip memudar
            this.fadeSpeed = Math.random() * 0.006 + 0.003; 
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        }

        // Menggerakkan posisi partikel
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Efek kelap-kelip (memudar lambat dan kembali terang)
            this.opacity += this.fadeSpeed * this.fadeDirection;
            if (this.opacity >= 0.9 || this.opacity <= 0.1) {
                this.fadeDirection *= -1; // Balikkan arah opasitas
            }

            // Jika partikel keluar dari area layar kanvas, kembalikan ke sisi seberang
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }

        // Menggambar partikel ke layar kanvas
        draw() {
            ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`; // Warna ungu neon
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Inisialisasi awal kumpulan partikel
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Perulangan animasi (*Loop Animation*) berkelanjutan
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan kanvas per frame
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    // Jalankan sistem partikel
    animate();
});
