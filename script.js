// PlayStation Universe JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Slideshow background images
    const slideshowImages = [
        'battlefield-6-5120x2880-23496.jpg',
        'ghost-of-sparta-god-of-war-kratos-fantasy-mythological-4096x2167-6417.jpg',
        'the-last-of-us-part-ii-ellie-playstation-4-2020-games-3840x2160-1879.jpg',
        'ghost-of-yotei-game-5762x2880-19048.jpg',
        'marvels-wolverine-3840x2160-12242.jpg',
        'resident-evil-village-resident-evil-8-playstation-5-xbox-3840x2160-1488.jpg',
        'tomb-raider-legacy-3840x2160-24888.jpg',
        'battlefield-pro-5120x2880-24365.jpeg'
    ];

    // Create slideshow background
    function createSlideshow() {
        // Remove any existing slideshow first
        const existingSlideshow = document.querySelector('.slideshow-background');
        if (existingSlideshow) {
            existingSlideshow.remove();
        }

        const slideshowContainer = document.createElement('div');
        slideshowContainer.className = 'slideshow-background';
        
        slideshowImages.forEach((image, index) => {
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'PlayStation Background';
            img.style.opacity = index === 0 ? '1' : '0';
            if (index === 0) img.classList.add('active');
            slideshowContainer.appendChild(img);
        });
        
        // Insert at the very beginning of body
        document.body.insertBefore(slideshowContainer, document.body.firstChild);
        
        // Start slideshow with immediate first image
        let currentSlide = 0;
        const slideInterval = setInterval(() => {
            const images = slideshowContainer.querySelectorAll('img');
            if (images.length === 0) {
                clearInterval(slideInterval);
                return;
            }
            
            images[currentSlide].classList.remove('active');
            images[currentSlide].style.opacity = '0';
            currentSlide = (currentSlide + 1) % images.length;
            images[currentSlide].classList.add('active');
            images[currentSlide].style.opacity = '1';
        }, 4000);

        // Store interval for cleanup if needed
        slideshowContainer.slideInterval = slideInterval;
        
        console.log('Slideshow created with', slideshowImages.length, 'images');
    }

    createSlideshow();

    // Card click effects with running PlayStation symbols
    function addClickEffect(element, event) {
        // Remove any existing clicked class
        element.classList.remove('clicked');
        
        // Add clicked class
        setTimeout(() => {
            element.classList.add('clicked');
        }, 10);
        
        // Remove clicked class after animation
        setTimeout(() => {
            element.classList.remove('clicked');
        }, 600);
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('card-ripple');
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Add running PlayStation symbols
        addRunningSymbols(element);
    }

    // Create and animate running PlayStation symbols
    function addRunningSymbols(element) {
        // Remove any existing symbols
        const existingSymbols = element.querySelector('.card-ps-symbols');
        if (existingSymbols) {
            existingSymbols.remove();
        }

        // Create symbols container
        const symbolsContainer = document.createElement('div');
        symbolsContainer.className = 'card-ps-symbols';

        // Create individual symbols
        const symbols = [
            { class: 'triangle', symbol: '▲' },
            { class: 'square', symbol: '■' },
            { class: 'circle', symbol: '●' },
            { class: 'x', symbol: '✕' }
        ];

        symbols.forEach(symbolData => {
            const symbol = document.createElement('div');
            symbol.className = `card-ps-symbol ${symbolData.class}`;
            symbol.textContent = symbolData.symbol;
            symbolsContainer.appendChild(symbol);
        });

        // Add to card
        element.appendChild(symbolsContainer);

        // Start animation
        setTimeout(() => {
            symbolsContainer.classList.add('running');
        }, 50);

        // Clean up after animation
        setTimeout(() => {
            symbolsContainer.remove();
        }, 2500);
    }

    // Add click listeners to all cards
    const clickableCards = document.querySelectorAll('.game-card, .feature-card, .innovation-card, .stat-card, .spotlight-card');
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            addClickEffect(this, e);
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Animate elements on scroll - Optimized for faster response
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    if (prefersReducedMotion || isSlowDevice) {
        // Skip animations for accessibility or performance
        const animatedElements = document.querySelectorAll('.game-card, .feature-card, .stat-card, .innovation-card');
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

    const observerOptions = {
        threshold: 0.05, // Trigger earlier (was 0.1)
        rootMargin: '0px 0px 100px 0px' // Start animation 100px before element enters viewport
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay for staggered effect but much faster
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, delay);
            }
        });
    }, observerOptions);

    // Observe animated elements with staggered delays
    const animatedElements = document.querySelectorAll('.game-card, .feature-card, .stat-card, .innovation-card');
    animatedElements.forEach((el, index) => {
        // Check if element is already in viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            // Element is already visible, show immediately
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.classList.add('animated');
        } else {
            // Element needs animation
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)'; // Even more subtle
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // Faster transition
            el.dataset.delay = (index % 6) * 30; // Stagger in groups of 6, 30ms apart
            observer.observe(el);
        }
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
    // PlayStation Logo Typing Effect
    function initPlayStationLogo() {
        const logo = document.querySelector('.ps-logo');
        const symbols = document.querySelector('.ps-symbols');
        
        if (logo && symbols) {
            // Start typing animation immediately
            logo.classList.add('typing');
            
            // Show symbols smoothly after typing completes
            setTimeout(() => {
                logo.classList.remove('typing');
                symbols.classList.add('show');
            }, 1800); // Match the typing duration exactly
            
            // Add click interaction to restart animation
            logo.addEventListener('click', () => {
                // Reset everything
                symbols.classList.remove('show');
                logo.classList.add('typing');
                
                // Restart sequence
                setTimeout(() => {
                    logo.classList.remove('typing');
                    symbols.classList.add('show');
                }, 1800);
            });
        }
    }
    
    // Initialize logo effect
    initPlayStationLogo();
    
    // Add symbol click effects
    const symbols = document.querySelectorAll('.ps-symbol');
    symbols.forEach(symbol => {
        symbol.addEventListener('click', function(e) {
            e.stopPropagation();
            // Quick bounce effect
            this.style.transform = 'scale(1.4) rotate(20deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    });
    
    // Enhanced Responsive Functionality
    function initResponsiveFeatures() {
        // Viewport height fix for mobile browsers
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }

        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
        window.addEventListener('orientationchange', () => {
            setTimeout(setViewportHeight, 100);
        });

        // Touch device detection
        function isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }

        if (isTouchDevice()) {
            document.body.classList.add('touch-device');
        }

        // Responsive image loading
        function handleResponsiveImages() {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (window.innerWidth <= 480) {
                    // Load smaller images on mobile if available
                    const mobileSrc = img.dataset.mobileSrc;
                    if (mobileSrc) {
                        img.src = mobileSrc;
                    }
                }
            });
        }

        handleResponsiveImages();
        window.addEventListener('resize', handleResponsiveImages);

        // Responsive video handling
        function handleResponsiveVideos() {
            const videos = document.querySelectorAll('iframe');
            videos.forEach(video => {
                const container = video.parentElement;
                if (container && container.classList.contains('video-container')) {
                    if (window.innerWidth <= 480) {
                        video.style.height = '250px';
                    } else if (window.innerWidth <= 768) {
                        video.style.height = '350px';
                    } else {
                        video.style.height = '500px';
                    }
                }
            });
        }

        handleResponsiveVideos();
        window.addEventListener('resize', handleResponsiveVideos);

        // Responsive slideshow
        function handleResponsiveSlideshow() {
            const slideshow = document.querySelector('.slideshow-background');
            if (slideshow) {
                if (window.innerWidth <= 480) {
                    slideshow.style.opacity = '0.1';
                } else if (window.innerWidth <= 768) {
                    slideshow.style.opacity = '0.12';
                } else {
                    slideshow.style.opacity = '0.15';
                }
            }
        }

        handleResponsiveSlideshow();
        window.addEventListener('resize', handleResponsiveSlideshow);

        // Responsive card symbols
        function handleResponsiveCardSymbols() {
            const cardSymbols = document.querySelectorAll('.card-ps-symbol');
            cardSymbols.forEach(symbol => {
                if (window.innerWidth <= 480) {
                    symbol.style.width = '18px';
                    symbol.style.height = '18px';
                    symbol.style.fontSize = '12px';
                } else if (window.innerWidth <= 768) {
                    symbol.style.width = '20px';
                    symbol.style.height = '20px';
                    symbol.style.fontSize = '14px';
                } else {
                    symbol.style.width = '24px';
                    symbol.style.height = '24px';
                    symbol.style.fontSize = '16px';
                }
            });
        }

        // Performance optimization for mobile
        function optimizeForMobile() {
            if (window.innerWidth <= 768) {
                // Reduce animation complexity on mobile
                const complexAnimations = document.querySelectorAll('.slideshow-background img');
                complexAnimations.forEach(img => {
                    img.style.transition = 'opacity 1s ease-in-out';
                });

                // Disable hover effects on touch devices
                if (isTouchDevice()) {
                    const hoverElements = document.querySelectorAll('.game-card, .feature-card, .innovation-card');
                    hoverElements.forEach(el => {
                        el.classList.add('touch-optimized');
                    });
                }
            }
        }

        optimizeForMobile();
        window.addEventListener('resize', optimizeForMobile);

        // Keyboard navigation for accessibility
        function handleKeyboardNavigation() {
            const focusableElements = document.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );

            focusableElements.forEach(el => {
                el.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        if (this.classList.contains('game-card') || 
                            this.classList.contains('feature-card') ||
                            this.classList.contains('innovation-card')) {
                            e.preventDefault();
                            this.click();
                        }
                    }
                });
            });
        }

        handleKeyboardNavigation();

        // Responsive font scaling
        function handleResponsiveFonts() {
            const root = document.documentElement;
            const baseSize = 16;
            let scale = 1;

            if (window.innerWidth <= 320) {
                scale = 0.85;
            } else if (window.innerWidth <= 480) {
                scale = 0.9;
            } else if (window.innerWidth <= 768) {
                scale = 0.95;
            } else if (window.innerWidth >= 1441) {
                scale = 1.1;
            }

            root.style.fontSize = `${baseSize * scale}px`;
        }

        handleResponsiveFonts();
        window.addEventListener('resize', handleResponsiveFonts);
    }

    // Initialize responsive features
    initResponsiveFeatures();

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts after orientation change - handled by clean-nav.js
        }, 100);
    });