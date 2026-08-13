// ==========================
// GSAP INTRO
// ==========================

window.addEventListener("load", () => {

    gsap.from(".logo h3", {
        y: 40,
        opacity: 0,
        duration: 0.8
    });

    gsap.from(".logo h1", {
        y: 70,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    gsap.from(".logo p", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.4
    });

    gsap.from("nav li", {
        y: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.7,
        ease: "back.out(1.7)"
    });

    gsap.from(".glass-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        delay: 1
    });

});


// ==========================
// ACTIVE NAVBAR
// ==========================

const items = document.querySelectorAll("nav li");

items.forEach(item => {

    item.addEventListener("click", () => {

        items.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

    });

});


// ==========================
// MOUSE GLOW
// ==========================

const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", e => {

    gsap.to(glow, {

        x: e.clientX,
        y: e.clientY,

        duration: .35,

        ease: "power2.out"

    });

});


// ==========================
// MAGNETIC BUTTON EFFECT
// ==========================

document.querySelectorAll("nav button").forEach(btn => {

    btn.addEventListener("mousemove", e => {

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;

        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {

            x: x * .25,

            y: y * .25,

            duration: .25

        });

    });

    btn.addEventListener("mouseleave", () => {

        gsap.to(btn, {

            x: 0,

            y: 0,

            duration: .4,

            ease: "elastic.out(1,0.4)"

        });

    });

});


// ==========================
// FLOATING GLASS CARD
// ==========================

const card = document.querySelector(".glass-card");

document.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - 0.5) * 18;

    const y = (e.clientY / window.innerHeight - 0.5) * 18;

    gsap.to(card, {

        rotationY: x,

        rotationX: -y,

        transformPerspective: 1000,

        transformOrigin: "center",

        duration: .6

    });

});


// ==========================
// PARALLAX MESH
// ==========================

const mesh = document.querySelector(".mesh");

document.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - .5) * 50;

    const y = (e.clientY / window.innerHeight - .5) * 50;

    gsap.to(mesh, {

        x,

        y,

        duration: 1.2,

        ease: "power3.out"

    });

});


// ==========================
// CONTINUOUS FLOAT
// ==========================

gsap.to(".glass-card", {

    y: -12,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut",

    duration: 3

});


// ==========================
// MESH ROTATION
// ==========================

gsap.to(".mesh", {

    rotation: 360,

    duration: 60,

    ease: "none",

    repeat: -1

});
//===========================
// CUSTOM CURSOR
//===========================

const cursor=document.createElement("div");

cursor.className="cursor";

document.body.appendChild(cursor);

document.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

document.querySelectorAll("button,.glass-card").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.classList.add("active");

});

el.addEventListener("mouseleave",()=>{

cursor.classList.remove("active");

});

});


//===========================
// PARTICLES
//===========================

function createParticle(){

const p=document.createElement("div");

p.className="particle";

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=(4+Math.random()*6)+"s";

document.body.appendChild(p);

setTimeout(()=>{

p.remove();

},10000);

}

setInterval(createParticle,250);


//===========================
// NAVBAR RIPPLE
//===========================

document.querySelectorAll("nav button").forEach(btn=>{

btn.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

ripple.style.position="absolute";

ripple.style.width="10px";

ripple.style.height="10px";

ripple.style.borderRadius="50%";

ripple.style.background="rgba(0,255,132,.5)";

ripple.style.left=e.offsetX+"px";

ripple.style.top=e.offsetY+"px";

ripple.style.transform="translate(-50%,-50%) scale(0)";

ripple.style.pointerEvents="none";

btn.appendChild(ripple);

gsap.to(ripple,{

scale:20,

opacity:0,

duration:.8,

onComplete(){

ripple.remove();

}

});

});

});


//===========================
// FLOAT ANIMATION
//===========================

gsap.to(".logo",{

y:-8,

repeat:-1,

yoyo:true,

duration:3,

ease:"sine.inOut"

});

// ==========================
// IMAGE ZOOM
// ==========================

const image = document.querySelector(".editor-image img");

card.addEventListener("mouseenter", () => {

    gsap.to(image, {

        scale: 1.06,

        duration: .6

    });

});

card.addEventListener("mouseleave", () => {

    gsap.to(image, {

        scale: 1,

        duration: .6

    });

});