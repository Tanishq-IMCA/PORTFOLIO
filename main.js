import './style.css';
import anime from 'animejs';

// --- DOM Elements ---
const heroTitle = document.querySelector('.hero-title');
const heroSubtitle = document.querySelector('.hero-subtitle');
const logoImg = document.querySelector('.logo-img'); // Select the new image logo
const scrollIndicator = document.querySelector('.scroll-indicator');
const indicatorLines = document.querySelectorAll('.indicator-line');
const sections = document.querySelectorAll('main > section[id]');
const animatableElements = document.querySelectorAll('.animatable');

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

// Logo image entrance animation
anime({
  targets: logoImg,
  opacity: [0, 1],
  scale: [0.8, 1],
  easing: 'easeOutBack',
  duration: 1200,
  delay: 800, // Delay after hero text appears
});

// Scroll indicator entrance
anime({
  targets: '.scroll-indicator',
  translateX: [50, 0],
  opacity: [0, 1],
  easing: 'easeOutExpo',
  delay: 1500,
  duration: 1000,
});


// --- Scroll-Based Animations ---

// Generic observer for all animatable elements
const animationObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      
      // Use a staggered delay for elements of the same type (like skill tags)
      const delay = target.dataset.stagger || 0;

      anime({
        targets: target,
        translateY: [40, 0],
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: delay,
        easing: 'spring(1, 90, 15, 0)',
        // Remove the class after animation to prevent re-triggering
        complete: () => target.classList.remove('animatable'),
      });

      observer.unobserve(target);
    }
  });
}, { threshold: 0.2 });

// Stagger children of a container (like .skills-list)
const containers = document.querySelectorAll('.skills-list');
containers.forEach(container => {
  const children = container.querySelectorAll('.animatable');
  children.forEach((child, i) => {
    child.dataset.stagger = i * 100;
  });
});

// Observe all animatable elements
animatableElements.forEach(el => {
  animationObserver.observe(el);
});


// Scroll indicator active state
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const currentSectionId = entry.target.id;
      
      indicatorLines.forEach(line => {
        line.classList.remove('active');
        const lineHref = line.getAttribute('href').substring(1);
        if (lineHref === currentSectionId) {
          line.classList.add('active');
        }
      });
    }
  });
}, { 
  threshold: 0.5
});

// Observe each section
sections.forEach(section => {
  sectionObserver.observe(section);
});
