import './style.css';
import anime from 'animejs';

// --- DOM Elements ---
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const projectsSection = document.querySelector('.projects');
const projectCards = document.querySelectorAll('.project-card');
const logo = document.querySelector('.logo');
const logoPaths = logo.querySelectorAll('path');
const scrollIndicator = document.querySelector('.scroll-indicator');
const indicatorLines = document.querySelectorAll('.indicator-line');
const sections = document.querySelectorAll('section[id]');

// --- Initial Animations ---

// Media Query for responsive animations
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// Hero section entrance
anime.timeline({
  easing: 'easeOutExpo',
})
.add({
  targets: heroTitle,
  translateY: isMobile ? [-50, 0] : [-100, 0],
  opacity: [0, 1],
  duration: 1000,
})
.add({
  targets: heroSubtitle,
  translateY: isMobile ? [50, 0] : [100, 0],
  opacity: [0, 1],
  duration: 1000,
}, '-=500');

// Scroll indicator entrance
anime({
  targets: '.scroll-indicator',
  translateX: [50, 0],
  opacity: [0, 1],
  easing: 'easeOutExpo',
  delay: 1500, // Delay to let the hero animation finish
  duration: 1000,
});


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


// --- Scroll-Based Animations ---

// Project cards entrance
const projectsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: projectCards,
        translateY: [40, 0],
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: 'spring(1, 90, 15, 0)',
      });
      projectsObserver.unobserve(projectsSection);
    }
  });
}, { threshold: 0.2 });

projectsObserver.observe(projectsSection);


// Scroll indicator active state
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Get the id of the current section
      const currentSectionId = entry.target.id;
      
      // Remove active class from all lines
      indicatorLines.forEach(line => {
        line.classList.remove('active');
        // Check if the line's href corresponds to the current section
        const lineHref = line.getAttribute('href').substring(1);
        if (lineHref === currentSectionId) {
          // Add active class to the matching line
          line.classList.add('active');
        }
      });
    }
  });
}, { 
  threshold: 0.5 // Trigger when 50% of the section is visible
});

// Observe each section
sections.forEach(section => {
  sectionObserver.observe(section);
});
