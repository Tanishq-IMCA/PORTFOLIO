import './style.css';
import anime from 'animejs';

const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const projectsSection = document.querySelector('.projects');
const projectCards = document.querySelectorAll('.project-card');
const logo = document.querySelector('.logo');
const logoPaths = logo.querySelectorAll('path');

// Define media query for mobile
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// Hero section animations
anime.timeline({
  easing: 'easeOutExpo',
})
.add({
  targets: heroTitle,
  translateY: isMobile ? [-50, 0] : [-100, 0], // Smaller translation for mobile
  opacity: [0, 1],
  duration: 1000,
})
.add({
  targets: heroSubtitle,
  translateY: isMobile ? [50, 0] : [100, 0], // Smaller translation for mobile
  opacity: [0, 1],
  duration: 1000,
}, '-=500');

// Projects section scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: projectCards,
        translateY: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        easing: 'easeOutExpo',
        duration: 1000,
      });
      observer.unobserve(projectsSection);
    }
  });
}, {
  threshold: 0.2,
});

observer.observe(projectsSection);

// SVG Logo animation
logoPaths.forEach(path => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
});

anime({
  targets: logoPaths,
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: anime.stagger(250),
  direction: 'alternate',
  loop: true,
});
