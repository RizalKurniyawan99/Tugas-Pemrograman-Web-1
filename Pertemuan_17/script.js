const container = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');

let score = 0;
let isGameOver = false;

// ==========================================
// 1. PARENT CLASS (Inheritance Base)
// ==========================================
class GameObject {
    constructor(width, height, x, y, className) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        
        // Membuat elemen HTML untuk objek ini
        this.element = document.createElement('div');
        this.element.classList.add('game-object', className);
        this.updatePosition();
        
        // Memasukkan elemen ke dalam area game
        container.appendChild(this.element);
    }

    // Mengupdate posisi elemen di layar berdasarkan koordinat X dan Y
    updatePosition() {
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    // Menghapus elemen dari layar
    destroy() {
        this.element.remove();
    }
}

// ==========================================
// 2. CHILD CLASS (Inheritance)
// ==========================================

// Class Hero mewarisi GameObject
class Hero extends GameObject {
    constructor(x, y) {
        // Memanggil constructor milik Parent Class (GameObject)
        super(40, 40, x, y, 'hero'); 
    }

    // Method khusus untuk menggerakkan Hero ke kanan/kiri
    move(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x -= 20;
        } else if (direction === 'right' && this.x < (400 - this.width)) {
            this.x += 20;
        }
        this.updatePosition();
    }
}

// Class Enemy mewarisi GameObject
class Enemy extends GameObject {
    constructor(x, speed) {
        // Memanggil constructor Parent Class, y dimulai dari atas (-40)
        super(30, 30, x, -40, 'enemy'); 
        this.speed = speed;
    }

    // Method khusus untuk menggerakkan Enemy ke bawah
    fall() {
        this.y += this.speed;
        this.updatePosition();
    }
}

// ==========================================
// 3. INSTANCE & GAME LOGIC
// ==========================================

// Membuat INSTANCE dari class Hero
const player = new Hero(180, 540); 

// Array untuk menampung INSTANCE dari Enemy
let enemies = [];

// Handle Input Keyboard untuk menggerakkan Hero
window.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    if (e.key === 'ArrowLeft') player.move('left');
    if (e.key === 'ArrowRight') player.move('right');
});

// Loop untuk memunculkan musuh secara acak
function spawnEnemy() {
    if (isGameOver) return;
    
    const randomX = Math.floor(Math.random() * 370); // Posisi X acak
    const randomSpeed = Math.floor(Math.random() * 4) + 3; // Kecepatan acak (3 - 6)
    
    // Membuat INSTANCE baru dari Enemy dan dimasukkan ke array
    enemies.push(new Enemy(randomX, randomSpeed));
    
    // Spawn musuh lagi setelah waktu acak
    setTimeout(spawnEnemy, 1000);
}

// Fungsi utama untuk update jalannya game (Game Loop)
function gameUpdate() {
    if (isGameOver) return;

    for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];
        enemy.fall();

        // 1. Cek jika musuh lolos (melewati bawah layar) -> Dapat Skor
        if (enemy.y > 600) {
            score += 10;
            scoreDisplay.innerText = score;
            enemy.destroy();
            enemies.splice(i, 1);
            continue;
        }

        // 2. Cek Tabrakan (Collision Detection) antara Player dan Enemy
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.width > enemy.y
        ) {
            // Jika bertabrakan, Game Over
            isGameOver = true;
            gameOverScreen.classList.remove('hidden');
        }
    }

    // Ulangi fungsi update menggunakan requestAnimationFrame (~60fps)
    requestAnimationFrame(gameUpdate);
}

// Menjalankan Game
spawnEnemy();
gameUpdate();