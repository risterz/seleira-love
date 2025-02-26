document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });

    // Animate elements on scroll
    const fadeElements = document.querySelectorAll('.about-text, .gallery-item, .contact-form');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInOnScroll = new IntersectionObserver(function(entries, fadeInOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                fadeInOnScroll.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInOnScroll.observe(element);
    });

    // Rose Animation on Scroll
    const roseIllustration = document.querySelector('.rose-illustration');
    const parallaxBg = document.querySelector('.parallax-bg');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Parallax background effect
        parallaxBg.style.transform = `translateY(${scrollY * 0.2}px)`;
        
        // Rose scaling and rotation effect
        const scaleValue = Math.min(1, 0.2 + (scrollY / 200) * 0.8);
        const rotateValue = Math.min(10, -5 + (scrollY / 200) * 15);
        
        roseIllustration.style.transform = `scale(${scaleValue}) rotate(${rotateValue}deg)`;
    }
    
    // Initial call to set initial state
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Create floating heart particles
    function createFloatingHearts() {
        const container = document.getElementById('floatingHeartsContainer');
        
        // Create 15-20 heart particles with different sizes and positions
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart', 'floating-heart');
            
            // Random position
            const posX = Math.random() * 100;
            heart.style.left = `${posX}%`;
            
            // Random size
            const size = Math.random() * 16 + 10;
            heart.style.fontSize = `${size}px`;
            
            // Random opacity
            const opacity = Math.random() * 0.3 + 0.3;
            heart.style.opacity = opacity;
            
            // Random animation duration and delay
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 15;
            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            
            container.appendChild(heart);
        }
    }
    
    // Create initial hearts
    createFloatingHearts();

    // Cursor trail effect
    const cursorTrail = document.getElementById('cursorTrail');
    const particles = [];
    const particleCount = 15;
    let mouseX = 0;
    let mouseY = 0;

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cursor-particle');
        cursorTrail.appendChild(particle);
        particles.push({
            element: particle,
            x: 0,
            y: 0,
            size: Math.random() * 3 + 2,
            speedX: 0,
            speedY: 0
        });
    }

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Update particle positions in animation loop
    function updateParticles() {
        particles.forEach((particle, index) => {
            // Calculate target position with delay based on index
            const targetX = mouseX;
            const targetY = mouseY;
            
            // Ease towards target position
            particle.speedX = (targetX - particle.x) * (0.1 - index * 0.005);
            particle.speedY = (targetY - particle.y) * (0.1 - index * 0.005);
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Set particle position
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            particle.element.style.width = `${particle.size}px`;
            particle.element.style.height = `${particle.size}px`;
            particle.element.style.opacity = 1 - (index / particleCount);
        });
        
        requestAnimationFrame(updateParticles);
    }
    
    updateParticles();

    // Form animation enhancements
    const contactForm = document.querySelector('.contact-form');
    const envelope = document.querySelector('.envelope');

    if (contactForm && envelope) {
        // Create floating hearts for the contact section
        const flyingHeartsContainer = document.querySelector('.flying-hearts');
        
        if (flyingHeartsContainer) {
            for (let i = 0; i < 8; i++) {
                const heart = document.createElement('i');
                heart.classList.add('fas', 'fa-heart');
                heart.style.position = 'absolute';
                heart.style.fontSize = `${Math.random() * 10 + 8}px`;
                heart.style.color = `rgba(255, ${Math.random() * 50 + 50}, ${Math.random() * 50 + 50}, 0.7)`;
                
                // Position randomly around the form
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = `${Math.random() * 100}%`;
                
                // Set custom animation properties
                heart.style.setProperty('--tx', `${(Math.random() * 200 - 100)}px`);
                heart.style.setProperty('--ty', `${(Math.random() * -200 - 50)}px`);
                heart.style.setProperty('--r', `${Math.random() * 360}deg`);
                
                // Set animation
                heart.style.animation = `fly-heart ${Math.random() * 5 + 5}s ease-in-out infinite`;
                heart.style.animationDelay = `${Math.random() * 5}s`;
                
                flyingHeartsContainer.appendChild(heart);
            }
        }
        
        // Enhanced form submission animation
        contactForm.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                return; // Let the browser handle invalid form
            }
            
            e.preventDefault();
            
            // Add sent class to envelope for animation
            envelope.classList.add('sent');
            
            // Change button text and animate
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('span');
            const btnIcon = submitBtn.querySelector('i');
            
            btnText.textContent = 'Sending...';
            btnIcon.style.animation = 'heartBeat 1s ease-out infinite';
            
            // Simulate sending
            setTimeout(() => {
                btnText.textContent = 'Sent with Love';
                btnIcon.style.animation = '';
                btnIcon.classList.remove('fa-heart');
                btnIcon.classList.add('fa-check');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = '<i class="fas fa-heart"></i> Your message has been delivered with love!';
                successMsg.style.color = 'var(--dark-accent)';
                successMsg.style.textAlign = 'center';
                successMsg.style.marginTop = '15px';
                successMsg.style.fontFamily = "'Great Vibes', cursive";
                successMsg.style.fontSize = '1.2rem';
                successMsg.style.opacity = '0';
                successMsg.style.transition = 'opacity 0.5s ease';
                
                this.appendChild(successMsg);
                
                // Fade in success message
                setTimeout(() => {
                    successMsg.style.opacity = '1';
                }, 100);
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    envelope.classList.remove('sent');
                    btnText.textContent = 'Seal with Love';
                    btnIcon.classList.remove('fa-check');
                    btnIcon.classList.add('fa-heart');
                    
                    // Fade out success message
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 500);
                }, 3000);
            }, 1500);
        });
    }
});

// Create a heartbeat animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes heartBeat {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style); 