// 1. Generate Background Stars
const starsContainer = document.getElementById('starsContainer');
const starCount = 45;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  
  const size = Math.random() * 3 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
  
  starsContainer.appendChild(star);
}

// 2. Cute Symbol Generator for Matrix Rain
function randomText() {
  const symbols = [
    "✦", "★", "💖", "🌸", "✨", "♥", "❄", "｡", 
    "0", "1", "♡", "♫", "✿", "⚡", "✧", "☁"
  ];
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// 3. Matrix Rain Droplet Creator
function rain() {
  const cloud = document.getElementById('mainCloud');
  const e = document.createElement('div');
  e.classList.add('drop');
  cloud.appendChild(e);

  const left = Math.floor(Math.random() * 240);
  const size = Math.random() * 1.2;
  const duration = Math.random() * 1.2;

  e.innerText = randomText();
  e.style.left = left + 'px';
  e.style.fontSize = 0.6 + size + 'em';
  e.style.animationDuration = 1.3 + duration + 's';

  setTimeout(() => {
    if (cloud.contains(e)) {
      cloud.removeChild(e);
    }
  }, 2500);
}

setInterval(rain, 45);

// 4. Smooth Mouse Follower Light & Sparkle Trail
const light = document.getElementById('light');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Position main radial light spotlight
  light.style.left = `${x}px`;
  light.style.top = `${y}px`;

  // Create subtle cursor particle trails
  if (Math.random() > 0.4) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('trail-sparkle');
    
    const size = Math.random() * 6 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }
});

