// CANVAS SETUP !!!!
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// initialise variables
const particles = [];

const n = 15;
const startX = 500;
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const barrierX = 300;
const E_max = 100;
const E_min = 2;
const v_max = 2;
const v_min = 1;

// physics constants
const m = 1;
const hbar = 1; // normalised for simplicity...
const v0 = 5;
const A_mag = 50

time = 0



// spawn in particles
for (let i = 0; i < n; i++) {
    let E = Math.random() * (E_max-E_min) + E_min
    let k = Math.sqrt(2*m*E)/hbar;
    let omega = E / hbar;
    let kappa = E < v0 ? Math.sqrt(2*m*(v0-E))/hbar :0;
    let A0 = Math.random()*A_mag + 5



  particles.push({
    x: -startX*Math.random(),
    y0: Math.random() * canvasHeight,
    y: 0,
    vx: 1.5+1.5*Math.random(),
    E: E,
    k: k,
    omega: omega,
    phi: Math.random()*2*Math.PI,
    A: A0,
    kappa: kappa,
    barrierX: barrierX,
    state: "outside",
    colour: "#d8d0c7",
    r: 5,
    history: [],
    historyLength: Math.random()*200+100
  });
}



function updateParticles() {
    time += 0.1;
  for (let p of particles) {
    if (p.x < p.barrierX) {
        // inside : sine
        p.x += p.vx;
        p.y = p.y0 + p.A * Math.sin(p.k * p.x - p.omega * time + p.phi)
    } else {
        let dBarrier = p.x - p.barrierX;
        let decayA = p.A * Math.exp(-p.kappa * dBarrier);
        p.x += p.vx;
        p.y = p.y0 + decayA * Math.sin(p.k * p.x - p.omega * time + p.phi);

    }
    if (p.x > 0 && p.state == "outside"){
        p.state = "travelling"
    }

    if (p.x > canvasWidth) {
        p.vx = -p.vx;
    } else if (p.x < 0 && p.state != "outside") {
        p.vx = -p.vx;
    } 

    p.history.push({
        x: p.x,
        y: p.y
    });
    if (p.history.length > p.historyLength){
        p.history.shift();
    }
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    // trajectory
    ctx.beginPath();
    ctx.moveTo(p.history[0]?.x || p.x, p.history[0]?.y || p.y);
    for (let h of p.history) {
        ctx.lineTo(h.x, h.y);
    }
    ctx.strokeStyle = p.colour;
    ctx.lineWidth = 1;
    ctx.stroke();



    // particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.colour;
    ctx.fill();
  }
}

function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

animate();