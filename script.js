// ===== NÚT HIỆN THIỆP =====
const showButton = document.getElementById("showButton");
const guideInfo = document.getElementById("guideInfo");
const closeButton = document.getElementById("closeButton");

showButton.addEventListener("click", function () {
    guideInfo.classList.remove("hidden");
    showButton.classList.add("hidden");
});

closeButton.addEventListener("click", function () {
    guideInfo.classList.add("hidden");
    showButton.classList.remove("hidden");
});


// ============================
// ===== PHÁO HOA CANVAS =====
// ============================

var canvas = document.getElementById("cas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function random(min, max) {
    return Math.random() * (max - min) + min;
}

var fireworks = [];

function createFirework() {
    fireworks.push({
        x: random(0, canvas.width),
        y: canvas.height,
        radius: 3,
        color: `hsl(${random(0, 360)},100%,50%)`,
        speed: random(4, 7),
        exploded: false,
        particles: []
    });
}

function createParticles(firework) {
    for (let i = 0; i < 50; i++) {
        firework.particles.push({
            x: firework.x,
            y: firework.y,
            angle: random(0, Math.PI * 2),
            speed: random(1, 5),
            life: 100
        });
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {

        if (!firework.exploded) {
            firework.y -= firework.speed;

            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.radius, 0, Math.PI * 2);
            ctx.fillStyle = firework.color;
            ctx.fill();

            if (firework.y < random(100, 300)) {
                firework.exploded = true;
                createParticles(firework);
            }
        } else {

            firework.particles.forEach((p) => {
                p.x += Math.cos(p.angle) * p.speed;
                p.y += Math.sin(p.angle) * p.speed;
                p.life--;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = firework.color;
                ctx.fill();
            });

            firework.particles = firework.particles.filter(p => p.life > 0);

            if (firework.particles.length === 0) {
                fireworks.splice(index, 1);
            }
        }
    });

    if (Math.random() < 0.05) {
        createFirework();
    }
}

animate();
