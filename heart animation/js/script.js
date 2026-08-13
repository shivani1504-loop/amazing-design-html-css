const canvas = document.getElementById("heartCanvas");

const ctx = canvas.getContext("2d");

let width;
let height;

function resize(){

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize",resize);
/* ===========================================
      PARTICLE HEART ENGINE
=========================================== */

const particles = [];
const heartPoints = [];

const TOTAL_POINTS = 4500;

/* Heart Formula
   x = 16sin³(t)
   y = 13cos(t)-5cos2t-2cos3t-cos4t
*/

for (let i = 0; i < TOTAL_POINTS; i++) {

    const t = Math.random() * Math.PI * 2;

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    heartPoints.push({

        x: x,
        y: -y

    });

}


class Particle {

    constructor(target) {

        this.target = target;

        this.reset();

    }

    reset() {

        this.x =
            Math.random() * width;

        this.y =
            Math.random() * height;

        this.vx = 0;
        this.vy = 0;

        this.size =
            Math.random() * 2 + 1;

        this.alpha =
            Math.random();

    }

    update() {

        const tx =
            width / 2 + this.target.x * 18;

        const ty =
            height / 2 + this.target.y * 18;

        const dx = tx - this.x;
        const dy = ty - this.y;

        this.vx += dx * 0.0018;
        this.vy += dy * 0.0018;

        this.vx *= 0.93;
        this.vy *= 0.93;

        this.x += this.vx;
        this.y += this.vy;

    }

    draw() {

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,70,150,${this.alpha})`;

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "#ff2d2d";

        ctx.arc(

            this.x,

            this.y,

            this.size,

            0,

            Math.PI * 2

        );

        ctx.fill();

    }

}


/* Create Particles */

for (let i = 0; i < heartPoints.length; i++) {

    particles.push(

        new Particle(

            heartPoints[i]

        )

    );

}
/* ===========================================
          ANIMATION LOOP
=========================================== */

function animate() {

    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.fillRect(0,0,width,height);

    for(const p of particles){

        p.update();

        p.draw();

    }

}

animate();
/* ==========================================
        CYAN GLOWING RING
========================================== */

const ringParticles = [];

class RingParticle {

    constructor(){

        this.reset();

    }

    reset(){

        this.angle = Math.random() * Math.PI * 2;

        this.radius = 120 + Math.random() * 90;

        this.size = Math.random()*2 + 1;

        this.speed = 0.001 + Math.random()*0.003;

        this.alpha = 0.2 + Math.random()*0.8;

    }

    update(){

        this.angle += this.speed;

    }

    draw(){

        const x =
            width/2 +
            Math.cos(this.angle) * this.radius;

        const y =
            height/2 + 170 +
            Math.sin(this.angle) * this.radius * .35;

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(80,255,255,${this.alpha})`;

        ctx.shadowBlur = 20;

        ctx.shadowColor = "#6dfcff";

        ctx.arc(x,y,this.size,0,Math.PI*2);

        ctx.fill();

    }

}

for(let i=0;i<1700;i++){

    ringParticles.push(

        new RingParticle()

    );

}
/* ==========================================
        PARTICLE FOUNTAIN
========================================== */

const fountain = [];

class Fountain{

    constructor(){

        this.reset();

    }

    reset(){

        this.x =
            width/2 +
            (Math.random()-0.5)*70;

        this.y =
            height/2 +170;

        this.vx =
            (Math.random()-0.5)*1.2;

        this.vy =
            -(Math.random()*7+3);

        this.life = 100;

        this.size =
            Math.random()*2+1;

    }

    update(){

        this.life--;

        this.vy += .08;

        this.x += this.vx;

        this.y += this.vy;

        if(this.life<=0){

            this.reset();

        }

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle=
        `rgba(255,255,255,${this.life/100})`;

        ctx.shadowBlur=18;

        ctx.shadowColor="#ffffff";

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

for(let i=0;i<500;i++){

    fountain.push(

        new Fountain()

    );

}
/* ==========================================
        SPARKLES
========================================== */

const sparkles=[];

class Spark{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*width;

        this.y=Math.random()*height;

        this.size=Math.random()*2;

        this.alpha=Math.random();

        this.speed=.2+Math.random();

    }

    update(){

        this.y-=this.speed;

        if(this.y<0){

            this.y=height;

            this.x=Math.random()*width;

        }

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle=
        `rgba(255,255,255,${this.alpha})`;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

for(let i=0;i<300;i++){

    sparkles.push(

        new Spark()

    );

}