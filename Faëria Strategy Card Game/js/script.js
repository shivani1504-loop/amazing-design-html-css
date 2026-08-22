document.addEventListener("DOMContentLoaded", () => {

    // ================= 1. MAGICAL CANVASES PARTICLE SYSTEM =================
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = Math.random() * -0.8 - 0.2;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.7 + 0.2;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y < 0) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(243, 194, 98, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ================= 2. SINGLE PAGE APPLICATION (SPA) ROUTER =================
    const navTriggers = document.querySelectorAll(".nav-trigger");
    const pages = document.querySelectorAll(".spa-page");
    const navLinks = document.querySelectorAll(".main-navbar .nav-link");

    function navigateToPage(targetId) {
        pages.forEach(page => {
            page.classList.remove("active-page");
        });

        const targetPage = document.getElementById(targetId);
        if (targetPage) {
            targetPage.classList.add("active-page");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        navLinks.forEach(link => {
            if (link.getAttribute("data-target") === targetId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    navTriggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const target = trigger.getAttribute("data-target");
            if (target) navigateToPage(target);
        });
    });

    // ================= 3. SCROLL REVEAL ANIMATIONS =================
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const elementInView = (el, dividend = 1.25) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add("animated");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.1)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Trigger once on load

    // ================= 4. VIDEO & LOGIN MODAL SYSTEM =================
    const videoModal = document.getElementById("videoModal");
    const youtubeIframe = document.getElementById("youtubeIframe");
    const closeVideo = document.getElementById("closeVideo");

    document.querySelectorAll("#openVideo, .video-trigger").forEach(btn => {
        btn.addEventListener("click", () => {
            const videoId = btn.getAttribute("data-video") || "ndgC2Zf-eK8";
            youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            videoModal.style.display = "flex";
        });
    });

    closeVideo.addEventListener("click", () => {
        videoModal.style.display = "none";
        youtubeIframe.src = "";
    });

    const loginModal = document.getElementById("loginModal");
    document.getElementById("openSignIn").addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "flex";
    });

    document.getElementById("closeLogin").addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // Close modal on outside click
    window.addEventListener("click", (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = "none";
            youtubeIframe.src = "";
        }
        if (e.target === loginModal) {
            loginModal.style.display = "none";
        }
    });

    // ================= 5. INTERACTIVE GAMEBOARD SLIDER =================
    const boardImages = [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80"
    ];
    let currentSlide = 0;

    const sliderImg = document.getElementById("sliderImg");
    const slideNum = document.getElementById("slideNum");

    document.getElementById("prevSlide").addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + boardImages.length) % boardImages.length;
        sliderImg.style.opacity = "0";
        setTimeout(() => {
            sliderImg.src = boardImages[currentSlide];
            slideNum.textContent = (currentSlide + 1) * 6;
            sliderImg.style.opacity = "1";
        }, 200);
    });

    document.getElementById("nextSlide").addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % boardImages.length;
        sliderImg.style.opacity = "0";
        setTimeout(() => {
            sliderImg.src = boardImages[currentSlide];
            slideNum.textContent = (currentSlide + 1) * 6;
            sliderImg.style.opacity = "1";
        }, 200);
    });

    // ================= 6. PARALLAX MOUSE EFFECT FOR OGRE =================
    const ogre = document.querySelector(".ogre-monster");
    window.addEventListener("mousemove", (e) => {
        if (ogre) {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            ogre.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // Smooth Scroll to Beta Section
    document.querySelectorAll(".scroll-to-beta").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".footer-signup").scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Form Submit handlers
    document.getElementById("betaForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you! Your email has been registered for the Beta.");
        e.target.reset();
    });

    document.getElementById("supportForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Support Ticket submitted successfully!");
        e.target.reset();
    });

    document.getElementById("loginForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Login successful!");
        loginModal.style.display = "none";
    });
});