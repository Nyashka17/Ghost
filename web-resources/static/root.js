// Инициализация частиц (туман/дым на чёрном фоне)
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#333333' },  // Серый для тумана
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 0.5, direction: 'none', random: true, straight: false }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' } } },
    retina_detect: true
});

// Canvas для призраков
const canvas = document.getElementById('ghostCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ghosts = [];

function createGhost() {
    const ghost = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30 + Math.random() * 20,
        opacity: 0,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    };
    ghosts.push(ghost);
}

function drawGhosts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ghosts.forEach((ghost, index) => {
        ctx.globalAlpha = ghost.opacity;
        const gradient = ctx.createRadialGradient(ghost.x, ghost.y, 0, ghost.x, ghost.y, ghost.size);
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ghost.x, ghost.y, ghost.size, 0, Math.PI * 2);
        ctx.fill();

        ghost.x += ghost.vx;
        ghost.y += ghost.vy;
        ghost.opacity += 0.01;
        if (ghost.opacity > 0.6) ghost.opacity = 0.6;
        if (ghost.opacity <= 0 || ghost.x < 0 || ghost.x > canvas.width || ghost.y < 0 || ghost.y > canvas.height) {
            ghosts.splice(index, 1);
        }
    });
    requestAnimationFrame(drawGhosts);
}

drawGhosts();
setInterval(createGhost, 3000);  // Новый призрак каждые 3 сек

// Жуткие надписи
const messages = [
    "I see you",
    "I'm watching you",
    "Just a little longer and I'll be here"
];
const overlay = document.getElementById('messageOverlay');

function showMessage() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    overlay.textContent = msg;
    overlay.style.opacity = 1;
    setTimeout(() => { overlay.style.opacity = 0; }, 3000);
}

setInterval(showMessage, 8000);  // Надпись каждые 8 сек

// Адаптация canvas при ресайзе
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
