// Global scope functions agar bisa dibaca oleh onclick HTML
function switchTab(tabName) {
    // Sembunyikan semua konten kartu
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    
    // Hapus kelas aktif dari semua tombol menu
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active-tab'));
    
    // Tampilkan konten yang dipilih
    const targetContent = document.getElementById('content-' + tabName);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Beri efek aktif ke tombol yang diklik
    const targetBtn = document.getElementById('btn-' + tabName);
    if (targetBtn) {
        targetBtn.classList.add('active-tab'); // FIXED: classList diperbaiki agar menu lancar kembali
    }
}

function selectRegion(region) {
    alert('Kamu memilih menu komisi: ' + region.toUpperCase() + '. Form input detail akan kita buat di tahap selanjutnya!');
}

function handleLogin(e) {
    e.preventDefault();
    alert('Sistem otentikasi login admin sedang dipersiapkan!');
}

// Menjalankan efek visual setelah halaman siap
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LOGIKA MOUSE GLOW TRAILING
    // ==========================================
    const mouseGlow = document.getElementById('mouseGlow');
    
    if (mouseGlow) {
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.opacity = '1';
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseleave', () => {
            mouseGlow.style.opacity = '0';
        });
    }

    // ==========================================
    // 2. LOGIKA ANIMASI PARTIKEL BACKDROP CANVAS
    // ==========================================
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 70; // Kepadatan partikel kecil bervariasi

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.2 + 0.4; // Berbagai ukuran acak kecil-kecil
            this.speedX = Math.random() * 0.4 - 0.2; // Bergerak random lambat
            this.speedY = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Efek berkedip perlahan menghilang random
            this.opacity += this.fadeSpeed * this.fadeDirection;
            if (this.opacity >= 0.8 || this.opacity <= 0.15) {
                this.fadeDirection *= -1;
            }

            // Loop posisi jika mentok ujung layar
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`; // Cahaya butiran warna ungu lembut
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
});
