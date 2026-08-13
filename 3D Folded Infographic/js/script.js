const card = document.getElementById("card");
const shine = document.querySelector(".shine");

let rotateX = 0;
let rotateY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {

    const x = e.clientX;
    const y = e.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    rotateY = (x - centerX) / 25;
    rotateX = -(y - centerY) / 25;

    shine.style.background = `
    radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,.55),
        rgba(255,255,255,.12) 180px,
        transparent 320px
    )`;

});

function animate() {

    currentX += (rotateX - currentX) * .08;
    currentY += (rotateY - currentY) * .08;

    card.style.transform =
        `
        rotateX(${currentX}deg)
        rotateY(${currentY}deg)
        `;

    requestAnimationFrame(animate);
}

animate();



card.addEventListener("mouseenter", () => {

    card.style.transition = ".25s";

    card.style.filter =
    "drop-shadow(0 50px 60px rgba(0,0,0,.25))";

});


card.addEventListener("mouseleave", () => {

    rotateX = 0;
    rotateY = 0;

    card.style.filter =
    "drop-shadow(0 25px 35px rgba(0,0,0,.18))";

});



const layers = document.querySelectorAll(".layer");

layers.forEach((layer,index)=>{

    layer.addEventListener("mouseenter",()=>{

        layer.style.transform =
        "translateZ(40px) scale(1.03)";

        layer.style.zIndex=100-index;

    });

    layer.addEventListener("mouseleave",()=>{

        layer.style.transform =
        "translateZ(0px) scale(1)";

    });

});



let angle = 0;

setInterval(()=>{

    angle+=1;

    shine.style.transform =
    `rotate(${angle}deg)`;

},20);



window.addEventListener("resize",()=>{

    rotateX=0;
    rotateY=0;

});