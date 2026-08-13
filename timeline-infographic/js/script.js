const cards=document.querySelectorAll(".card");
cards.forEach(card=>{
card.addEventListener("mousemove",(e)=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;
const centerX=rect.width/2;
const centerY=rect.height/2;
const rotateX=((y-centerY)/10)*-1;
const rotateY=((x-centerX)/10);
card.style.transform=`
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0deg) rotateY(0deg)";

});

});
const glow=document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});