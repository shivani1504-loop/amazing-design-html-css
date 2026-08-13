const cards = document.querySelectorAll(".card");
cards.forEach(card=>{
card.addEventListener("mousemove",(e)=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;
const centerX=rect.width/2;
const centerY=rect.height/2;
const rotateX=((y-centerY)/18);
const rotateY=((centerX-x)/18);

card.style.transform=`
perspective(1000px)
rotateX(${-rotateX}deg)
rotateY(${rotateY}deg)
translateY(-15px)
scale(1.03)
`;
});

card.addEventListener("mouseleave",()=>{
card.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
});
});

cards.forEach(card=>{
const icon=card.querySelector("i");

let angle=0;
setInterval(()=>{
angle+=0.02;
icon.style.transform=`
translateY(${Math.sin(angle)*5}px)
`;
},25);
});

cards.forEach(card=>{
card.addEventListener("click",(e)=>{
const ripple=document.createElement("span");
ripple.classList.add("ripple");
const rect=card.getBoundingClientRect();
const size=Math.max(rect.width,rect.height);
ripple.style.width=size+"px";
ripple.style.height=size+"px";
ripple.style.left=e.clientX-rect.left-size/2+"px";
ripple.style.top=e.clientY-rect.top-size/2+"px";
card.appendChild(ripple);
setTimeout(()=>{
ripple.remove();
},700);
});
});
cards.forEach(card=>{
card.addEventListener("mousemove",(e)=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;
card.style.setProperty("--x",x+"px");
card.style.setProperty("--y",y+"px");
});
});
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});
cards.forEach(card=>{
observer.observe(card);
});