// CANVAS SETUP !!!!
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// constants
const G = 1

class Nucleus {
    constructor(x, y, radius, mass) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mass = mass;
        this.shells = [];
    }

    addShell(shell) {
        this.shells.push(shell);
        shell.parent = this;
    }

    update(dt) {
        this.shells.forEach(shell => shell.update(dt));
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
        this.shells.forEach(shell => shell.draw(ctx));
    }
}

class Shell {
    constructor(radius, angularVelocity) {
        this.radius = radius;
        this.angularVelocity = angularVelocity;
        this.electrons = [];
        this.angle = 0;
        this.parent = null; // add to nucleus !!
    }

    addAtom(atom) {
        this.electrons.push(atom);
        atom.parent = this;
    }

    update(dt) {
        this.angle += this.angularVelocity * dt;
        this.electrons.forEach(atom => atom.update(dt));
    }

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.parent.x, this.parent.y, this.radius, 0, Math.PI*2);
        ctx.stroke();
        this.electrons.forEach(atom => atom.draw(ctx));
    }

}

class Electron {
    constructor(radius, mass, phase = 0) {
        this.radius = radius;
        this.mass = mass;
        this.phase = phase;
        this.parent = null;
    }

    update (dt) {

    }

    draw (ctx) {
        const angle = this.parent.angle + this.phase;
        const cx = this.parent.parent.x + Math.cos(angle) * this.parent.radius;
        const cy = this.parent.parent.y + Math.sin(angle) * this.parent.radius;

        ctx.beginPath();
        ctx.arc(cx, cy, this.radius, 0, Math.PI*2);
        ctx.fill()

    }
}

const nucleus = new Nucleus(canvas.width*0.75, canvas.height/2, 2, 1);
const a0 = 2000;

Z = 75;

let electrons_to_allocate = Z;
shells = []
n = 0
while (electrons_to_allocate > 0) {
    electrons = 2*(n**2);
    if (electrons <= electrons_to_allocate) {
        shells.push(electrons);
        electrons_to_allocate -= electrons;
    } else {
        shells.push(electrons_to_allocate);
        electrons_to_allocate = 0;
    }
    n++;
}
for (let i = 0; i < shells.length; i++) {
    shell = new Shell((i**2)*a0/Z, 0.2);
    for (let j = 0; j < shells[i]; j++) {
        shell.addAtom(new Electron(4, 1, (j/shells[i])*Math.PI*2));
    }
    nucleus.addShell(shell);
}






const dt = 0.1

function updateParticles() {
    nucleus.update(dt);
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nucleus.draw(ctx);
}


function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

animate();