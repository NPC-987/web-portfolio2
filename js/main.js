
new WOW().init();


const photonCanvas = document.getElementById('photon');
const pctx = photonCanvas.getContext('2d');


function resizePhoton() {
    photonCanvas.width = window.innerWidth;
    photonCanvas.height = window.innerHeight;
}
window.addEventListener('resize', initPhoton);


function starPoints(cx, cy, spikes, outerR, innerR) {
    const pts = [];
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    for (let i = 0; i < spikes; i++) {
        pts.push({ x: cx + Math.cos(rot) * outerR, y: cy + Math.sin(rot) * outerR });
        rot += step;
        pts.push({ x: cx + Math.cos(rot) * innerR, y: cy + Math.sin(rot) * innerR });
        rot += step;
    }
    return pts;
}


const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

let pCenter, starShape, photons;


function initPhoton() {
    resizePhoton();
    pCenter = { x: photonCanvas.width / 2, y: photonCanvas.height / 2 + 30 }; // 星星中心
    const base = Math.min(photonCanvas.width, photonCanvas.height) * 0.5;
    starShape = starPoints(pCenter.x, pCenter.y, 5, base, base * 0.42);

    photons = [];
    const COUNT = 320;
    for (let i = 0; i < COUNT; i++) {
        const idx = (Math.random() * starShape.length) | 0;
        const a = starShape[idx];
        const b = starShape[(idx + 1) % starShape.length];
        const t = Math.random();
        const tx = a.x + (b.x - a.x) * t;
        const ty = a.y + (b.y - a.y) * t;

        photons.push({
            x: pCenter.x,
            y: pCenter.y,
            tx,
            ty,
            progress: Math.random() * 0.12,
            speed: 0.010 + Math.random() * 0.025,
            size: 1 + Math.random() * 4,
            hue: 200 + Math.random() * 60,
            phase: Math.random() * Math.PI * 20
        });
    }
}


function drawPhoton() {
    const grad = pctx.createLinearGradient(0, 0, 0, photonCanvas.height);
    grad.addColorStop(0.1, '#000010');
    grad.addColorStop(0.35, '#001a33');
    grad.addColorStop(0.7, '#000000');
    grad.addColorStop(0.9, '#0a0a2a');
    grad.addColorStop(1, '#0a1a2f');

    pctx.fillStyle = grad;
    pctx.globalAlpha = 1;
    pctx.fillRect(0, 0, photonCanvas.width, photonCanvas.height);

    pctx.globalCompositeOperation = 'lighter';

    const time = Date.now();
    for (const p of photons) {
        if (p.progress < 1) {
            p.progress = Math.min(1, p.progress + p.speed);
            const e = easeOutCubic(p.progress);
            p.x = pCenter.x + (p.tx - pCenter.x) * e;
            p.y = pCenter.y + (p.ty - pCenter.y) * e;
        } else {
            const jitter = 0.25 + Math.sin(time / 900 + p.phase) * 0.25;
            p.x += (p.tx - p.x) * 0.08 + (Math.sin(time / 300 + p.phase) * jitter);
            p.y += (p.ty - p.y) * 0.08 + (Math.cos(time / 310 + p.phase) * jitter);
        }

        const L = 55 + Math.sin(time / 380 + p.phase) * 28;
        pctx.beginPath();
        pctx.arc(p.x, p.y, p.size, 0, Math.PI * 3);
        pctx.fillStyle = `hsl(${p.hue}, 100%, ${L}%)`;
        pctx.fill();
    }

    pctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(drawPhoton);
}

initPhoton();
drawPhoton();


const text = "請繼續往下瀏覽 ↓";
const speed = 120;
let i = 0;

function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter1").textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

const section2 = document.querySelector("#section2");
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(section2);
        }
    });
}, { threshold: 0.5 });
observer.observe(section2);


const snowCanvas = document.getElementById('snow');
const sctx = snowCanvas.getContext('2d');
function resizeSnow() {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeSnow);
resizeSnow();

const snowflakes = [];
for (let i = 0; i < 150; i++) {
    snowflakes.push({
        x: Math.random() * snowCanvas.width,
        y: Math.random() * snowCanvas.height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.5 - 0.25
    });
}

function drawSnow() {
    sctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    const grad = sctx.createLinearGradient(0, 0, 0, snowCanvas.height);
    grad.addColorStop(0, 'rgba(200,220,255,0.9)');
    grad.addColorStop(1, 'rgba(150,180,255,0.4)');
    sctx.fillStyle = grad;

    for (const f of snowflakes) {
        f.y += f.speedY;
        f.x += f.speedX;
        sctx.beginPath();
        sctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        sctx.fill();
        if (f.y > snowCanvas.height) {
            f.y = 0;
            f.x = Math.random() * snowCanvas.width;
        }
    }
    requestAnimationFrame(drawSnow);
}
drawSnow();


document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
