const words = [
  "Linux & Systems Tinker.",
  "B.Tech CSE Student.",
  "Aspiring Software Engineer.",
  "Full Stack Explorer."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const deletingSpeed = 50;
const delayBetweenWords = 1800;
const targetElement = document.getElementById("typing-text");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    targetElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    targetElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, delayBetweenWords);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 400);
    return;
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeEffect, speed);
}

const laptopTerminalText = document.getElementById("laptop-terminal-text");
const laptopTerminalCursor = document.getElementById("laptop-terminal-cursor");
const codeWord = "hello";
let laptopCharIndex = 0;
let laptopIsDeleting = false;

function typeLaptopLoop() {
  if (!laptopTerminalText) return;

  if (!laptopIsDeleting) {
    laptopTerminalText.textContent = "> " + codeWord.substring(0, laptopCharIndex + 1);
    laptopCharIndex++;
    if (laptopTerminalCursor) {
      laptopTerminalCursor.setAttribute("x", 148 + laptopCharIndex * 8.5);
    }

    if (laptopCharIndex === codeWord.length) {
      laptopIsDeleting = true;
      setTimeout(typeLaptopLoop, 1600);
      return;
    }
  } else {
    laptopTerminalText.textContent = "> " + codeWord.substring(0, laptopCharIndex - 1);
    laptopCharIndex--;
    if (laptopTerminalCursor) {
      laptopTerminalCursor.setAttribute("x", 148 + laptopCharIndex * 8.5);
    }

    if (laptopCharIndex === 0) {
      laptopIsDeleting = false;
      setTimeout(typeLaptopLoop, 500);
      return;
    }
  }

  setTimeout(typeLaptopLoop, laptopIsDeleting ? 90 : 180);
}

const navbar = document.getElementById("navbar");
const navLinksContainer = document.getElementById("nav-links");
const navLinks = document.querySelectorAll(".nav-link");
const navCapsule = document.getElementById("nav-capsule");
const sections = document.querySelectorAll("section");

function updateCapsule(targetElement) {
  if (!targetElement || !navCapsule || window.innerWidth <= 768) return;
  navCapsule.style.left = `${targetElement.offsetLeft}px`;
  navCapsule.style.width = `${targetElement.offsetWidth}px`;
  navCapsule.style.opacity = "1";
}

navLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    updateCapsule(link);
  });
});

navLinksContainer.addEventListener("mouseleave", () => {
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    updateCapsule(activeLink);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  typeLaptopLoop();
  document.getElementById("year").textContent = new Date().getFullYear();
  const initialActive = document.querySelector(".nav-link.active");
  if (initialActive) {
    setTimeout(() => {
      updateCapsule(initialActive);
    }, 150);
  }
});

window.addEventListener("resize", () => {
  const activeLink = document.querySelector(".nav-link.active");
  if (activeLink) {
    updateCapsule(activeLink);
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  let currentSectionId = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${currentSectionId}`;
    if (isCurrent && !link.classList.contains("active")) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      updateCapsule(link);
    }
  });
});

const menuToggle = document.getElementById("menu-toggle");
const navLinksList = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinksList.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksList.classList.remove("open");
  });
});

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const particleCount = 45;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.6 + 0.6;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 110) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 110)})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateCanvas);
}

animateCanvas();