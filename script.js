// PlayStation Universe JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Loading Screen Functionality
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.getElementById('progressBar');
        const loadingText = document.getElementById('loadingText');
        const particlesContainer = document.getElementById('loadingParticles');
        
        if (!loadingScreen) return;
        
        // Create floating particles
        function createParticles() {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                
                // Add different particle types
                const particleType = Math.floor(Math.random() * 4);
                switch(particleType) {
                    case 0:
                        particle.classList.add('particle-triangle');
                        particle.innerHTML = '▲';
                        break;
                    case 1:
                        particle.classList.add('particle-square');
                        particle.innerHTML = '■';
                        break;
                    case 2:
                        particle.classList.add('particle-circle');
                        particle.innerHTML = '●';
                        break;
                    case 3:
                        particle.classList.add('particle-x');
                        particle.innerHTML = '✕';
                        break;
                }
                
                particlesContainer.appendChild(particle);
            }
        }
        
        createParticles();
        
        // Add sound effect simulation
        function playLoadingSound() {
            // Create audio context for sound effects (visual feedback)
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            function createBeep(frequency, duration, volume = 0.1) {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            }
            
            // PlayStation startup sound simulation
            setTimeout(() => createBeep(440, 0.2), 500);
            setTimeout(() => createBeep(554, 0.2), 700);
            setTimeout(() => createBeep(659, 0.3), 900);
        }
        
        // Try to play sound (user interaction required for audio)
        try {
            playLoadingSound();
        } catch (e) {
            console.log('Audio context requires user interaction');
        }
        
        // Enhanced loading messages with more detail
        const loadingMessages = [
            'Initializing PlayStation Universe...',
            'Loading game assets and textures...',
            'Connecting to PlayStation Network...',
            'Preparing exclusive content library...',
            'Optimizing graphics and performance...',
            'Synchronizing user preferences...',
            'Finalizing system components...',
            'Welcome to PlayStation Universe!'
        ];
        
        // Add loading tips
        const loadingTips = [
            'Did you know? PlayStation has sold over 500 million consoles worldwide!',
            'Tip: Use the PlayStation symbols to navigate - they\'re not just decorative!',
            'Fun fact: The PlayStation controller\'s symbols have meanings - Triangle represents viewpoint, Square represents documents, Circle means "yes" and X means "no".',
            'PlayStation VR2 features eye tracking and haptic feedback in the headset!',
            'The PS5\'s SSD can load 5GB of data in just one second!',
            'PlayStation Studios has created some of the most awarded games in history!'
        ];
        
        let messageIndex = 0;
        let progress = 0;
        let tipIndex = 0;
        
        // Add tip display
        const tipElement = document.createElement('div');
        tipElement.className = 'loading-tip';
        tipElement.textContent = loadingTips[0];
        loadingScreen.appendChild(tipElement);
        
        // Rotate tips during loading
        const tipInterval = setInterval(() => {
            tipIndex = (tipIndex + 1) % loadingTips.length;
            tipElement.style.opacity = '0';
            setTimeout(() => {
                tipElement.textContent = loadingTips[tipIndex];
                tipElement.style.opacity = '1';
            }, 300);
        }, 3000);
        
        // Simulate loading progress
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                clearInterval(tipInterval);
                
                // Final message
                loadingText.textContent = loadingMessages[loadingMessages.length - 1];
                
                // Add completion effects
                addCompletionEffects();
                
                // Hide loading screen after completion
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    
                    // Remove from DOM after fade out
                    setTimeout(() => {
                        loadingScreen.remove();
                        // Initialize other components after loading
                        initializeMainContent();
                    }, 800);
                }, 1000);
            } else {
                // Update progress bar
                progressBar.style.width = progress + '%';
                
                // Update loading message
                const newMessageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
                if (newMessageIndex !== messageIndex && newMessageIndex < loadingMessages.length - 1) {
                    messageIndex = newMessageIndex;
                    loadingText.style.opacity = '0';
                    setTimeout(() => {
                        loadingText.textContent = loadingMessages[messageIndex];
                        loadingText.style.opacity = '1';
                    }, 200);
                }
                
                // Add progress milestone effects
                if (progress >= 25 && !loadingScreen.classList.contains('milestone-25')) {
                    loadingScreen.classList.add('milestone-25');
                    createProgressBurst();
                }
                if (progress >= 50 && !loadingScreen.classList.contains('milestone-50')) {
                    loadingScreen.classList.add('milestone-50');
                    createProgressBurst();
                }
                if (progress >= 75 && !loadingScreen.classList.contains('milestone-75')) {
                    loadingScreen.classList.add('milestone-75');
                    createProgressBurst();
                }
            }
        }, 200 + Math.random() * 300);
        
        // Add completion effects
        function addCompletionEffects() {
            // Make symbols spin faster
            const symbols = loadingScreen.querySelectorAll('.loading-symbol');
            symbols.forEach((symbol, index) => {
                setTimeout(() => {
                    symbol.style.animation = 'symbolComplete 0.8s ease-out forwards';
                }, index * 100);
            });
            
            // Progress bar completion glow
            progressBar.style.boxShadow = '0 0 30px rgba(0, 212, 255, 1)';
            
            // Logo final glow
            const logo = loadingScreen.querySelector('.loading-logo');
            logo.style.animation = 'logoComplete 1s ease-out forwards';
        }
        
        // Create progress milestone burst effect
        function createProgressBurst() {
            for (let i = 0; i < 10; i++) {
                const burst = document.createElement('div');
                burst.className = 'progress-burst';
                burst.style.left = '50%';
                burst.style.top = '60%';
                burst.style.transform = `translate(-50%, -50%) rotate(${i * 36}deg)`;
                loadingScreen.appendChild(burst);
                
                setTimeout(() => {
                    burst.remove();
                }, 1000);
            }
        }
        
        // Add click to skip (for development/testing)
        loadingScreen.addEventListener('click', () => {
            clearInterval(loadingInterval);
            clearInterval(tipInterval);
            progress = 100;
            progressBar.style.width = '100%';
            loadingText.textContent = 'Loading complete!';
            
            // Add skip effects
            addCompletionEffects();
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.remove();
                    initializeMainContent();
                }, 800);
            }, 500);
        });
        
        // Add hover effects to symbols
        const symbols = loadingScreen.querySelectorAll('.loading-symbol');
        symbols.forEach(symbol => {
            symbol.addEventListener('mouseenter', () => {
                symbol.style.transform = 'scale(1.2) rotate(10deg)';
                symbol.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.6)';
            });
            
            symbol.addEventListener('mouseleave', () => {
                symbol.style.transform = '';
                symbol.style.boxShadow = '';
            });
            
            symbol.addEventListener('click', (e) => {
                e.stopPropagation();
                // Individual symbol click effect
                symbol.style.animation = 'symbolComplete 0.5s ease-out';
                setTimeout(() => {
                    symbol.style.animation = '';
                }, 500);
            });
        });
        
        // Add keyboard skip functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
                loadingScreen.click();
            }
        });
    }
    
    // Initialize main content after loading screen
    function initializeMainContent() {
        // Start slideshow
        createSlideshow();
        
        // Initialize all other features
        initPlayStationLogo();
        initVideoEnhancements();
        initResponsiveFeatures();
        
        // Add entrance animations to main content
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                mainContent.style.transition = 'all 0.8s ease-out';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }
    
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
    
    // Don't create slideshow immediately - wait for loading screen to complete
    // createSlideshow(); // Moved to initializeMainContent()

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
    
    // Initialize logo effect - moved to initializeMainContent()
    // initPlayStationLogo(); // Moved to after loading screen
    
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

    // Initialize responsive features - moved to initializeMainContent()
    // initResponsiveFeatures(); // Moved to after loading screen

    // Video thumbnail and loading enhancements
    function initVideoEnhancements() {
        const videoContainers = document.querySelectorAll('.video-container');
        
        videoContainers.forEach(container => {
            const iframe = container.querySelector('iframe');
            if (iframe) {
                // Add loading state
                container.classList.add('loading');
                
                // Create a placeholder for better thumbnail display
                const placeholder = document.createElement('div');
                placeholder.className = 'video-placeholder';
                placeholder.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #0a0a0a 0%, #1e1e1e 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                    transition: opacity 0.3s ease;
                `;
                
                // Add PlayStation logo to placeholder
                const logoPlaceholder = document.createElement('div');
                logoPlaceholder.innerHTML = `
                    <div style="color: #00d4ff; font-size: 2rem; font-family: 'Orbitron', monospace; text-shadow: 0 0 15px #00d4ff;">
                        PlayStation
                    </div>
                    <div style="color: rgba(255,255,255,0.6); font-size: 0.9rem; margin-top: 0.5rem;">
                        Loading video...
                    </div>
                `;
                placeholder.appendChild(logoPlaceholder);
                container.appendChild(placeholder);
                
                // Handle iframe load
                iframe.addEventListener('load', () => {
                    container.classList.remove('loading');
                    placeholder.style.opacity = '0';
                    setTimeout(() => {
                        if (placeholder.parentNode) {
                            placeholder.remove();
                        }
                    }, 300);
                });
                
                // Optimize YouTube thumbnail loading
                if (iframe.src.includes('youtube.com') || iframe.src.includes('youtu.be')) {
                    // Add parameters for better thumbnail quality
                    const url = new URL(iframe.src);
                    url.searchParams.set('modestbranding', '1');
                    url.searchParams.set('rel', '0');
                    url.searchParams.set('showinfo', '0');
                    iframe.src = url.toString();
                }
                
                // Add click enhancement for better interaction
                container.addEventListener('click', function(e) {
                    // Add a subtle click effect
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                });
                
                // Improve hover interaction
                container.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                });
                
                container.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            }
        });
    }
    
    // Initialize video enhancements - moved to initializeMainContent()
    // initVideoEnhancements(); // Moved to after loading screen

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts after orientation change - handled by clean-nav.js
            // Re-initialize video enhancements for proper aspect ratio
            initVideoEnhancements();
        }, 100);
    });