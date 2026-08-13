"use strict";

const poster = document.querySelector(".poster");
const glow = document.querySelector(".cursor-glow");
const hero = document.querySelector(".hero");
const slices = document.querySelectorAll(".slice");
const light = document.querySelector(".light");
const river = document.querySelector(".river-image");
const shiv = document.querySelector(".shiv img");

/*=============================
CURSOR GLOW
=============================*/

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


function updateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.left = glowX + "px";
    glow.style.top = glowY + "px";

    requestAnimationFrame(updateGlow);

}

updateGlow();


/*=============================
POSTER PARALLAX
=============================*/

poster.addEventListener("mousemove", e => {

    const rect = poster.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x / rect.width - .5) * 18;
    const rotateX = (.5 - y / rect.height) * 18;
    hero.style.transform = `
    translate(-50%,-50%)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    `;

});


poster.addEventListener("mouseleave", () => {
    hero.style.transform =
    "translate(-50%,-50%) rotateX(0deg) rotateY(0deg)";
});


/*=============================
SLICE HOVER TILT
=============================*/

slices.forEach(slice => {

    slice.addEventListener("mousemove", e => {

        const rect = slice.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = (rect.height / 2 - y) / 12;
        const ry = (x - rect.width / 2) / 12;
        slice.style.transform = `
        perspective(1200px)
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        scale(1.08)
        translateY(-20px)
        `;

    });
    slice.addEventListener("mouseleave", () => {
        slice.style.transform = "";
    });
});


/*=============================
LIGHT FOLLOW
=============================*/

poster.addEventListener("mousemove", e => {
    const rect = poster.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    light.style.left = x + "px";
    light.style.top = y + "px";

});


/*=============================
RIVER PARALLAX
=============================*/

poster.addEventListener("mousemove", e => {
    const rect = poster.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const moveX = (x - .5) * 40;
    const moveY = (y - .5) * 40;
    river.style.transform =
        `translate(${moveX}px,${moveY}px) scale(1.08)`;
});
poster.addEventListener("mouseleave", () => {
    river.style.transform =
        "translate(0,0) scale(1)";
});


/*=============================
SHIV FLOAT
=============================*/

let angle = 0;

function animateShiv() {

    angle += .01;

    const y = Math.sin(angle) * 12;

    const rotate = Math.sin(angle * .6) * 2;

    shiv.style.transform =
        `translateY(${y}px) rotate(${rotate}deg)`;

    requestAnimationFrame(animateShiv);

}

animateShiv();

slices.forEach(slice => {

    slice.addEventListener("mouseenter", () => {

        slice.style.boxShadow = `
        0 35px 80px rgba(0,0,0,.55),
        0 0 45px rgba(255,190,90,.45)
        `;

    });

    slice.addEventListener("mouseleave", () => {

        slice.style.boxShadow = "";

    });

});

window.addEventListener("resize", () => {

    mouseX = innerWidth / 2;
    mouseY = innerHeight / 2;

});

const riverContainer = document.querySelector(".river-image");

let riverScale = 1;
let riverRotation = 0;
let riverOffsetX = 0;
let riverOffsetY = 0;
let targetX = 0;
let targetY = 0;

poster.addEventListener("mousemove", (e) => {

    const rect = poster.getBoundingClientRect();

    const mx = (e.clientX - rect.left) / rect.width;
    const my = (e.clientY - rect.top) / rect.height;

    targetX = (mx - 0.5) * 40;
    targetY = (my - 0.5) * 25;

});

/*----------------------------------
River Animation
----------------------------------*/

let riverTime = 0;

function animateRiver() {

    riverTime += 0.003;

    riverScale = 1.08 + Math.sin(riverTime) * 0.05;

    riverRotation = Math.sin(riverTime * 0.45) * 1.4;

    riverOffsetX += (targetX - riverOffsetX) * 0.03;
    riverOffsetY += (targetY - riverOffsetY) * 0.03;

    riverContainer.style.transform = `
        translate(${riverOffsetX}px, ${riverOffsetY}px)
        scale(${riverScale})
        rotate(${riverRotation}deg)
    `;

    requestAnimationFrame(animateRiver);

}

animateRiver();


/*----------------------------------
Floating Background Motion
----------------------------------*/

let bgPos = 50;

function animateBackground() {

    bgPos += 0.015;

    riverContainer.style.backgroundPosition =
        `${50 + Math.sin(bgPos) * 12}% ${50 + Math.cos(bgPos) * 8}%`;

    requestAnimationFrame(animateBackground);

}

animateBackground();


/*----------------------------------
Brightness Pulse
----------------------------------*/

let brightness = 1;

function riverLight() {

    brightness = 1 + Math.sin(Date.now() * 0.0005) * 0.08;

    riverContainer.style.filter =
        `brightness(${brightness}) contrast(1.15) saturate(1.25)`;

    requestAnimationFrame(riverLight);

}

riverLight();


/*----------------------------------
Soft Idle Motion
----------------------------------*/

let idle = 0;

function idleMotion() {

    idle += 0.01;

    hero.style.transform = `
        translate(-50%,-50%)
        translateY(${Math.sin(idle) * 4}px)
    `;

    requestAnimationFrame(idleMotion);

}

idleMotion();


/*----------------------------------
Poster Entrance
----------------------------------*/

poster.animate(

[
{
opacity:0,
transform:"scale(.9)"
},

{
opacity:1,
transform:"scale(1)"
}

],

{

duration:1800,
easing:"ease-out",
fill:"forwards"

}

);

const particleWrapper = document.querySelector(".particles");
const TOTAL_PARTICLES = 80;

const particles = [];

for (let i = 0; i < TOTAL_PARTICLES; i++) {

    const p = document.createElement("span");

    p.className = "dynamic-particle";

    const size = Math.random() * 5 + 2;

    const obj = {

        el: p,

        x: Math.random() * poster.clientWidth,

        y: Math.random() * poster.clientHeight,

        size,

        speed: Math.random() * 0.6 + 0.2,

        drift: (Math.random() - 0.5) * 0.8,

        opacity: Math.random() * 0.8 + 0.2,

        scale: Math.random() + 0.5

    };

    p.style.position = "absolute";

    p.style.width = size + "px";

    p.style.height = size + "px";

    p.style.borderRadius = "50%";

    p.style.pointerEvents = "none";

    p.style.background = "rgba(255,215,140,.9)";

    p.style.boxShadow = "0 0 12px rgba(255,215,140,.8)";

    particleWrapper.appendChild(p);

    particles.push(obj);

}

/*----------------------------------
Animation Loop
----------------------------------*/

function animateParticles() {

    const w = poster.clientWidth;
    const h = poster.clientHeight;

    particles.forEach((particle) => {

        particle.y -= particle.speed;

        particle.x += particle.drift;

        particle.scale += 0.002;

        if (particle.y < -20) {

            particle.y = h + 20;

            particle.x = Math.random() * w;

            particle.scale = Math.random() + 0.5;

        }

        if (particle.x < -10) particle.x = w + 10;

        if (particle.x > w + 10) particle.x = -10;

        particle.el.style.transform = `
            translate(${particle.x}px,${particle.y}px)
            scale(${particle.scale})
        `;

        particle.el.style.opacity = particle.opacity;

    });

    requestAnimationFrame(animateParticles);

}

animateParticles();

/*----------------------------------
Mouse Interaction
----------------------------------*/

poster.addEventListener("mousemove", (e) => {

    const rect = poster.getBoundingClientRect();

    const mx = e.clientX - rect.left;

    const my = e.clientY - rect.top;

    particles.forEach((particle) => {

        const dx = particle.x - mx;
        const dy = particle.y - my;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {

            particle.x += dx * 0.03;
            particle.y += dy * 0.03;

        }

    });

});

/*----------------------------------
Twinkle Effect
----------------------------------*/

setInterval(() => {

    particles.forEach((particle) => {

        particle.opacity = 0.3 + Math.random() * 0.8;

    });

}, 600);

/*----------------------------------
Resize Support
----------------------------------*/

window.addEventListener("resize", () => {

    particles.forEach((particle) => {

        particle.x = Math.random() * poster.clientWidth;
        particle.y = Math.random() * poster.clientHeight;

    });

});
const lightingLayer = document.createElement("div");
lightingLayer.className = "lighting-layer";

poster.appendChild(lightingLayer);

/*======================================
LIGHT RAYS
======================================*/

const rays = [];

const TOTAL_RAYS = 8;

for (let i = 0; i < TOTAL_RAYS; i++) {

    const ray = document.createElement("div");

    ray.className = "light-ray";

    ray.style.position = "absolute";

    ray.style.width = `${80 + Math.random() * 120}px`;

    ray.style.height = `${700 + Math.random() * 300}px`;

    ray.style.left = `${Math.random() * 100}%`;

    ray.style.top = "-250px";

    ray.style.pointerEvents = "none";

    ray.style.opacity = "0.18";

    ray.style.filter = "blur(18px)";

    ray.style.background = `
        linear-gradient(
            to bottom,
            rgba(255,240,180,.75),
            rgba(255,220,120,.18),
            transparent
        )
    `;

    ray.style.transformOrigin = "top center";

    lightingLayer.appendChild(ray);

    rays.push({

        element: ray,

        angle: Math.random() * 360,

        speed: .15 + Math.random() * .3,

        rotate: Math.random() * 8 - 4

    });

}

/*======================================
SPARKLES
======================================*/

const sparkleLayer = document.createElement("div");

sparkleLayer.className = "sparkle-layer";

poster.appendChild(sparkleLayer);

const sparkles = [];

const TOTAL_SPARKLES = 45;

for (let i = 0; i < TOTAL_SPARKLES; i++) {

    const star = document.createElement("div");

    star.style.position = "absolute";

    star.style.width = "5px";

    star.style.height = "5px";

    star.style.borderRadius = "50%";

    star.style.pointerEvents = "none";

    star.style.background = "#FFD98A";

    star.style.boxShadow =
        "0 0 15px rgba(255,230,150,.95)";

    sparkleLayer.appendChild(star);

    sparkles.push({

        element: star,

        x: Math.random() * poster.clientWidth,

        y: Math.random() * poster.clientHeight,

        alpha: Math.random(),

        speed: .5 + Math.random(),

        size: 2 + Math.random() * 4

    });

}

/*======================================
LIGHT RAY ANIMATION
======================================*/

function animateLightRays() {

    rays.forEach(ray => {

        ray.angle += ray.speed;

        const swing = Math.sin(ray.angle * Math.PI / 180) * 12;

        ray.element.style.transform = `
            rotate(${ray.rotate + swing}deg)
            scaleY(${1 + Math.sin(ray.angle / 30) * .12})
        `;

        ray.element.style.opacity =
            .10 + Math.abs(Math.sin(ray.angle / 50)) * .25;

    });

    requestAnimationFrame(animateLightRays);

}

animateLightRays();

/*======================================
SPARKLE ANIMATION
======================================*/

function animateSparkles() {

    sparkles.forEach(star => {

        star.alpha += star.speed * .02;

        const opacity = .2 + Math.abs(Math.sin(star.alpha)) * .8;

        const scale = .5 + Math.abs(Math.sin(star.alpha)) * 1.4;

        star.element.style.opacity = opacity;

        star.element.style.transform = `
            translate(${star.x}px,${star.y}px)
            scale(${scale})
        `;

        star.element.style.width = star.size + "px";
        star.element.style.height = star.size + "px";

    });

    requestAnimationFrame(animateSparkles);

}

animateSparkles();

/*======================================
MOUSE LIGHT
======================================*/

poster.addEventListener("mousemove", e => {

    const rect = poster.getBoundingClientRect();

    const mx = e.clientX - rect.left;

    const my = e.clientY - rect.top;

    lightingLayer.style.background = `
    radial-gradient(
        circle at ${mx}px ${my}px,
        rgba(255,225,150,.12),
        transparent 45%
    )`;

});

/*======================================
GOLDEN FLASH
======================================*/

setInterval(() => {

    const flash = document.createElement("div");

    flash.style.position = "absolute";

    flash.style.left = Math.random() * 100 + "%";

    flash.style.top = Math.random() * 100 + "%";

    flash.style.width = "6px";

    flash.style.height = "6px";

    flash.style.borderRadius = "50%";

    flash.style.pointerEvents = "none";

    flash.style.background = "#FFE4A6";

    flash.style.boxShadow =
        "0 0 25px rgba(255,220,130,.95)";

    flash.style.transition = "all .8s ease";

    sparkleLayer.appendChild(flash);

    requestAnimationFrame(() => {

        flash.style.transform = "scale(4)";

        flash.style.opacity = "0";

    });

    setTimeout(() => flash.remove(), 800);

}, 250);