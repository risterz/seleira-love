document.addEventListener('DOMContentLoaded', function() {
    // Current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Subtitle fade in
    setTimeout(() => {
        document.querySelector('.subtitle').classList.add('visible');
    }, 1000);
    
    // Create floating petals/hearts
    const petalContainer = document.querySelector('.petal-container');
    const petalCount = 15;
    
    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }
    
    // Create new petal every few seconds
    setInterval(createPetal, 3000);
    
    // Handle scrolling rose animation
    window.addEventListener('scroll', handleScroll);
    
    // Initial scroll check
    handleScroll();
    
    // Add background shine effect
    addBackgroundShine();
    
    // Add light particles to the header
    createLightParticles();
    
    // Form animation and validation effects
    const formInputs = document.querySelectorAll('#messageForm input, #messageForm textarea');
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Basic validation feedback
            if (this.value.trim() !== '') {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else if (this.required) {
                this.classList.add('invalid');
                this.classList.remove('valid');
            }
        });
    });
    
    // This is the correct form submission handler - keep only this one
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable button during "sending"
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending love... <i class="fas fa-heart"></i>';
            
            // Get form values directly from the form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Debug log the values
            console.log("Form values:", { name, email, message });
            
            // Format message for Telegram
            const formattedMessage = `
💌 New Love Letter for Seleira 💌

From: ${name || "Anonymous"}
Email: ${email || "Not provided"}

Message:
${message || "No message content"}
            `;
            
            // Direct call to Telegram API with specific channel ID
            const TELEGRAM_BOT_TOKEN = '7740455140:AAGqpwpFSvGvHcg0etTTdVeBIU6l1mwrZC4';
            const TELEGRAM_CHANNEL_ID = '-1002413000076';
            
            fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHANNEL_ID,
                    text: formattedMessage,
                    parse_mode: 'HTML'
                })
            })
            .then(response => {
                // Log the entire response for debugging
                console.log('Raw response:', response);
                return response.json();
            })
            .then(data => {
                // Log the parsed data for debugging
                console.log('Response data:', data);
                
                // Check if the API call was successful
                if (!data.ok) {
                    throw new Error('Telegram API error: ' + data.description);
                }
                
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
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Fade out success message
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 500);
                }, 3000);
            })
            .catch(error => {
                // Enhanced error logging
                console.error('Detailed error:', error);
                alert('Error: ' + error.message);
                
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> There was an error sending your message. Please try again.';
                errorMsg.style.color = '#e74c3c';
                errorMsg.style.textAlign = 'center';
                errorMsg.style.marginTop = '15px';
                errorMsg.style.fontSize = '1rem';
                errorMsg.style.opacity = '0';
                errorMsg.style.transition = 'opacity 0.5s ease';
                
                this.appendChild(errorMsg);
                
                // Fade in error message
                setTimeout(() => {
                    errorMsg.style.opacity = '1';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 100);
                
                // Remove error message after delay
                setTimeout(() => {
                    errorMsg.style.opacity = '0';
                    setTimeout(() => {
                        errorMsg.remove();
                    }, 500);
                }, 5000);
            });
        });
    }

    // Create floating elements for love letter section
    function createFloatingLoveElements() {
        const container = document.querySelector('.floating-elements');
        if (!container) return;
        
        const elementCount = 10;
        const elements = ['❤', '🌹', '💕', '✨'];
        
        for (let i = 0; i < elementCount; i++) {
            const element = document.createElement('div');
            element.className = 'floating-love-element';
            
            // Randomly select element type
            const elementType = elements[Math.floor(Math.random() * elements.length)];
            element.textContent = elementType;
            
            // Set random position and animation properties
            const size = Math.random() * 15 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 3;
            const delay = Math.random() * 5;
            
            element.style.fontSize = `${size}px`;
            element.style.left = `${left}%`;
            element.style.animationDuration = `${duration}s`;
            element.style.animationDelay = `${delay}s`;
            
            container.appendChild(element);
        }
    }

    createFloatingLoveElements();

    // Add this animation to the existing CSS
    document.head.insertAdjacentHTML('beforeend', `
    <style>
    .floating-love-element {
        position: absolute;
        bottom: -20px;
        color: #ff9999;
        opacity: 0;
        animation: float-up 5s ease-in-out forwards infinite;
        pointer-events: none;
    }

    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100%) rotate(15deg);
            opacity: 0;
        }
    }
    </style>
    `);

    // Initialize scroll reveal
    initScrollReveal();

    // Initialize mouse follower
    initMouseFollower();

    // Add gallery petals
    createGalleryPetals();

    // Reduce particle count on mobile devices to improve performance
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 15 : 30; // Half the particles on mobile
    
    // When creating particles in your existing particle generation code
    // Use this variable to determine how many particles to create
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        const headerContent = document.querySelector('.header-content');
        const windowWidth = window.innerWidth;
        
        // Adjust header content based on screen size
        if (windowWidth <= 380) {
            // Extremely small screens - further optimizations if needed
        }
    });
});

function createPetal() {
    const petalContainer = document.querySelector('.petal-container');
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Randomize petal properties
    const size = Math.random() * 15 + 10; // Size between 10-25px
    const startPositionX = Math.random() * window.innerWidth;
    const duration = Math.random() * 10 + 8; // Animation duration between 8-18s
    const rotation = Math.random() * 360; // Random initial rotation
    
    // Set petal styles
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${startPositionX}px`;
    petal.style.top = `-${size}px`;
    petal.style.transform = `rotate(${rotation}deg)`;
    petal.style.animationDuration = `${duration}s`;
    
    // 50% chance of being a heart or a petal
    if (Math.random() > 0.5) {
        petal.style.borderRadius = '50% 0 50% 0';
        petal.style.backgroundColor = '#ff9999';
    } else {
        petal.innerHTML = '❤️';
        petal.style.display = 'flex';
        petal.style.justifyContent = 'center';
        petal.style.alignItems = 'center';
        petal.style.fontSize = `${size}px`;
        petal.style.color = '#ff4040';
        petal.style.backgroundColor = 'transparent';
    }
    
    // Add petal to container
    petalContainer.appendChild(petal);
    
    // Remove petal after animation completes
    setTimeout(() => {
        petal.remove();
    }, duration * 1000);
}

function handleScroll() {
    const scrollingRose = document.getElementById('scrollingRose');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Show the rose when scrolled down 50% of the screen
    if (scrollPosition > windowHeight * 0.5) {
        const scale = Math.min(1, (scrollPosition - windowHeight * 0.5) / 200);
        scrollingRose.style.transform = `scale(${scale})`;
        scrollingRose.style.opacity = scale;
        
        // Add rotation based on scroll position
        const rotation = Math.min(10, (scrollPosition - windowHeight * 0.5) / 100);
        scrollingRose.style.transform += ` rotate(${rotation}deg)`;
    } else {
        scrollingRose.style.transform = 'scale(0.2)';
        scrollingRose.style.opacity = '0';
    }
}

function addBackgroundShine() {
    const shine = document.createElement('div');
    shine.classList.add('background-shine');
    document.body.appendChild(shine);
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shine.style.left = `${x * 100}%`;
        shine.style.top = `${y * 100}%`;
    });
}

function createLightParticles() {
    const container = document.getElementById('lightParticles');
    const particleCount = 30;
    
    if (!container) return;
    
    // Clear any existing particles
    container.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize particle properties
        const size = Math.random() * 4 + 2; // Size between 2-6px
        const posX = Math.random() * 100; // Random X position
        const posY = Math.random() * 100; // Random Y position
        const delay = Math.random() * 15; // Random delay
        const duration = Math.random() * 10 + 10; // Animation duration between 10-20s
        
        // Set particle styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add particle to container
        container.appendChild(particle);
    }
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.about-content, .gallery-item, .message.love-letter');
    
    const revealOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
        revealOnScroll.observe(element);
    });
}

function initMouseFollower() {
    // Create main follower element
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    
    // Create inner container for animation
    const followerInner = document.createElement('div');
    followerInner.className = 'mouse-follower-inner';
    
    // Create the actual content (heart, rose, etc.)
    const followerContent = document.createElement('div');
    followerContent.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff9999" />
                <stop offset="100%" stop-color="#ff4040" />
            </linearGradient>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                fill="url(#heartGradient)" filter="url(#glow)" />
        </svg>
    `;
    
    // Assemble the follower
    followerInner.appendChild(followerContent);
    follower.appendChild(followerInner);
    document.body.appendChild(follower);
    
    // Create array to store trail elements
    const trails = [];
    const maxTrails = 5;
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Update mouse position on move
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail element occasionally
        if (Math.random() > 0.8) {
            createTrail(mouseX, mouseY);
        }
    });
    
    // Create a trail element
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-follower-trail';
        
        // Set initial position
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        
        // Add to DOM
        document.body.appendChild(trail);
        
        // Add to array
        trails.push(trail);
        
        // Remove oldest trail if we have too many
        if (trails.length > maxTrails) {
            const oldestTrail = trails.shift();
            oldestTrail.remove();
        }
        
        // Animate and remove after animation
        trail.style.animation = 'trail-fade 1.5s forwards';
        setTimeout(() => {
            trail.remove();
            const index = trails.indexOf(trail);
            if (index > -1) {
                trails.splice(index, 1);
            }
        }, 1500);
    }
    
    // Animation loop for smooth following
    function updateFollower() {
        // Calculate distance between current follower position and mouse
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        // Move follower a percentage of the distance (easing)
        followerX += dx * 0.2;
        followerY += dy * 0.2;
        
        // Update follower position
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        // Continue animation loop
        requestAnimationFrame(updateFollower);
    }
    
    // Start animation loop
    updateFollower();
    
    // Change symbol occasionally
    setInterval(() => {
        const newSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        followerContent.innerHTML = newSymbol;
        
        // Add a little pop animation
        followerInner.style.animation = 'none';
        void followerInner.offsetWidth; // Trigger reflow
        followerInner.style.animation = 'follower-pulse 2s infinite ease-in-out';
    }, 5000);
    
    // Hide follower when mouse leaves window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            follower.style.opacity = '0';
        }
    });
    
    // Show follower when mouse enters window
    document.addEventListener('mouseover', () => {
        follower.style.opacity = '1';
    });
}

function createGalleryPetals() {
    const gallery = document.querySelector('.gallery');
    
    // Add petals container if not exists
    let petalsContainer = document.querySelector('.gallery-petals');
    if (!petalsContainer) {
        petalsContainer = document.createElement('div');
        petalsContainer.className = 'gallery-petals';
        gallery.appendChild(petalsContainer);
    }
    
    // Create and add petals periodically
    function addPetal() {
        const petal = document.createElement('div');
        petal.className = 'gallery-petal';
        
        // Randomize petal properties
        const isHeart = Math.random() > 0.5;
        const size = Math.random() * 10 + 10; // 10px to 20px
        const left = Math.random() * 100; // Random horizontal position
        const duration = Math.random() * 3 + 3; // 3s to 6s duration
        
        // Set petal styles
        petal.style.left = `${left}%`;
        petal.style.fontSize = `${size}px`;
        petal.style.animationDuration = `${duration}s`;
        
        // Set content based on type
        if (isHeart) {
            petal.innerHTML = '❤';
            petal.style.color = '#ff9999';
        } else {
            petal.innerHTML = '🌹';
        }
        
        // Add to container and remove after animation
        petalsContainer.appendChild(petal);
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }
    
    // Initial petals
    for (let i = 0; i < 5; i++) {
        setTimeout(addPetal, i * 500);
    }
    
    // Continue adding petals
    setInterval(addPetal, 1500);
} 