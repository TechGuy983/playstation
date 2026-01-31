// PlayStation Universe JavaScript - CLEAN VERSION
document.addEventListener('DOMContentLoaded', function() {
    
    // Simple Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.getElementById('progressBar');
        const loadingText = document.getElementById('loadingText');
        
        if (!loadingScreen) {
            initMainContent();
            return;
        }
        
        let progress = 0;
        
        // Simple progress animation
        const progressInterval = setInterval(() => {
            progress += Math.random() * 20 + 10;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                if (progressBar) progressBar.style.width = '100%';
                if (loadingText) loadingText.textContent = 'Ready!';
                
                // Hide loading screen
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        if (loadingScreen.parentNode) {
                            loadingScreen.remove();
                        }
                        initMainContent();
                    }, 500);
                }, 300);
            } else {
                if (progressBar) progressBar.style.width = progress + '%';
            }
        }, 150);
        
        // Click to skip
        loadingScreen.addEventListener('click', () => {
            clearInterval(progressInterval);
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
                initMainContent();
            }, 500);
        });
        
        // Auto-remove after 3 seconds max
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                clearInterval(progressInterval);
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                    initMainContent();
                }, 500);
            }
        }, 3000);
    }
    
    // Initialize main content
    function initMainContent() {
        // Make sure main content is visible
        const main = document.querySelector('main');
        if (main) {
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }
        
        // Initialize other features safely
        try { createSlideshow(); } catch (e) { console.log('Slideshow error:', e); }
        try { initPlayStationLogo(); } catch (e) { console.log('Logo error:', e); }
        try { initVideoEnhancements(); } catch (e) { console.log('Video error:', e); }
        try { initResponsiveFeatures(); } catch (e) { console.log('Responsive error:', e); }
        try { initPlayStationAudio(); } catch (e) { console.log('Audio error:', e); }
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
    }

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
    
    // Video thumbnail and loading enhancements
    function initVideoEnhancements() {
        const videoContainers = document.querySelectorAll('.video-container');
        
        videoContainers.forEach(container => {
            const iframe = container.querySelector('iframe');
            if (iframe) {
                // Add loading state
                container.classList.add('loading');
                
                // Handle iframe load
                iframe.addEventListener('load', () => {
                    container.classList.remove('loading');
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
    }

    // PlayStation Startup Sound System
    function initPlayStationAudio() {
        let typedText = '';
        let typingTimer;
        let currentVideoPlayer = null;
        
        // Create visible video player for PlayStation startup sound
        function createVideoPlayer() {
            // Remove any existing video player
            if (currentVideoPlayer) {
                currentVideoPlayer.remove();
                currentVideoPlayer = null;
            }
            
            // Create video player container
            const playerContainer = document.createElement('div');
            playerContainer.className = 'playstation-video-player';
            playerContainer.innerHTML = `
                <div class="video-player-content">
                    <div class="video-header">
                        <span class="video-title">🎮 PlayStation Startup Sound</span>
                        <button class="video-close" onclick="this.closest('.playstation-video-player').remove()">✕</button>
                    </div>
                    <iframe 
                        width="400" 
                        height="225" 
                        src="https://www.youtube.com/embed/FAgQsof5fwg?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1&start=0&end=10" 
                        title="PlayStation Startup Sound" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                    <div class="video-info">
                        <small>Playing authentic PlayStation startup sound</small>
                    </div>
                </div>
            `;
            
            // Add to body
            document.body.appendChild(playerContainer);
            currentVideoPlayer = playerContainer;
            
            // Auto-remove after 15 seconds
            setTimeout(() => {
                if (playerContainer && playerContainer.parentNode) {
                    playerContainer.classList.add('fade-out');
                    setTimeout(() => {
                        playerContainer.remove();
                        if (currentVideoPlayer === playerContainer) {
                            currentVideoPlayer = null;
                        }
                    }, 500);
                }
            }, 15000);
            
            return playerContainer;
        }
        
        // Play PlayStation startup sound with visible video
        function playPlayStationStartup() {
            try {
                createVideoPlayer();
                showPlayStationEffect();
            } catch (e) {
                console.log('Error playing PlayStation video:', e);
            }
        }
        
        // Visual effect when sound plays
        function showPlayStationEffect() {
            const effect = document.createElement('div');
            effect.className = 'playstation-audio-effect';
            effect.innerHTML = `
                <div class="audio-wave">
                    <div class="ps-logo-effect">PlayStation</div>
                    <div class="audio-symbols">
                        <span class="audio-symbol triangle">▲</span>
                        <span class="audio-symbol square">■</span>
                        <span class="audio-symbol circle">●</span>
                        <span class="audio-symbol x">✕</span>
                    </div>
                    <div class="audio-text">🎵 Playing startup video...</div>
                </div>
            `;
            
            document.body.appendChild(effect);
            
            // Remove effect after animation
            setTimeout(() => {
                if (effect.parentNode) {
                    effect.remove();
                }
            }, 4000);
        }
        
        // Detect trigger words
        function handleKeyPress(event) {
            const key = event.key.toLowerCase();
            
            // Add to typed text
            if (key.length === 1 && /[a-z]/.test(key)) {
                typedText += key;
                
                // Keep only last 30 characters to prevent memory issues
                if (typedText.length > 30) {
                    typedText = typedText.slice(-30);
                }
                
                // Check for trigger words
                const triggerWords = ['playstation', 'ps5', 'ps4', 'sony'];
                const foundTrigger = triggerWords.find(word => typedText.includes(word));
                
                if (foundTrigger) {
                    playPlayStationStartup();
                    typedText = ''; // Reset after playing
                    
                    // Show notification
                    showTypingNotification(foundTrigger);
                }
                
                // Clear typed text after 3 seconds of no typing
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    typedText = '';
                }, 3000);
            }
        }
        
        // Show notification when trigger word is typed
        function showTypingNotification(triggerWord = 'playstation') {
            const notification = document.createElement('div');
            notification.className = 'typing-notification';
            
            const messages = {
                'playstation': '🎮 PlayStation video playing!',
                'ps5': '🎮 PS5 detected - playing video!',
                'ps4': '🎮 PS4 detected - playing video!',
                'sony': '🎮 Sony detected - playing video!'
            };
            
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-text">${messages[triggerWord] || '🎮 PlayStation detected!'}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 500);
            }, 3000);
        }
        
        // Add event listeners
        document.addEventListener('keydown', handleKeyPress);
        
        // Add to PlayStation logo clicks for manual trigger
        setTimeout(() => {
            const psLogos = document.querySelectorAll('.ps-logo, .loading-logo');
            psLogos.forEach(logo => {
                logo.addEventListener('click', (e) => {
                    e.preventDefault();
                    playPlayStationStartup();
                    showTypingNotification('playstation');
                });
            });
        }, 1000);
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            if (currentVideoPlayer) {
                currentVideoPlayer.remove();
            }
        });
        
        // Expose function globally for testing
        window.testPlayStationAudio = playPlayStationStartup;
    }
    
    // Initialize PlayStation click effects
    initPlayStationClickEffects();
    
    // Initialize interactive features
    initInteractiveFeatures();
    
    // Initialize secret message system
    initSecretMessageSystem();
    
    // Start loading screen
    initLoadingScreen();
    
    // PlayStation Click Effects System
    function initPlayStationClickEffects() {
        // Add click listeners to all cards and images
        const clickableElements = document.querySelectorAll('.game-card, .feature-card, .innovation-card, .stat-card, .spotlight-card, .benefit-card, .tier-card, .perk-card, .gallery-item, .hero-img');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', function(e) {
                // Prevent default if it's a link
                if (this.tagName === 'A') {
                    e.preventDefault();
                }
                
                // Add PlayStation click effects
                addPlayStationClickEffect(this, e);
            });
        });
        
        // Also add to images specifically
        const images = document.querySelectorAll('.game-card img, .perk-card img, .gallery-item img, .hero-img');
        images.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent double effects
                addPlayStationClickEffect(this.closest('.game-card, .perk-card, .gallery-item') || this, e);
            });
        });
    }
    
    function addPlayStationClickEffect(element, event) {
        // Add clicked class for color pulse effect
        const cardType = getCardType(element);
        element.classList.add('clicked');
        
        // Remove clicked class after animation
        setTimeout(() => {
            element.classList.remove('clicked');
        }, 600);
        
        // Create ripple effect
        createRippleEffect(element, event);
        
        // Create floating PlayStation symbols
        createFloatingSymbols(element);
        
        // Play click sound effect (visual feedback)
        createClickSoundEffect();
        
        // Add running symbols effect
        createRunningSymbols(element);
    }
    
    function getCardType(element) {
        if (element.classList.contains('game-card')) return 'game';
        if (element.classList.contains('feature-card')) return 'feature';
        if (element.classList.contains('innovation-card')) return 'innovation';
        if (element.classList.contains('stat-card')) return 'stat';
        if (element.classList.contains('spotlight-card')) return 'spotlight';
        if (element.classList.contains('benefit-card')) return 'benefit';
        if (element.classList.contains('tier-card')) return 'tier';
        if (element.classList.contains('perk-card')) return 'perk';
        if (element.classList.contains('gallery-item')) return 'gallery';
        return 'default';
    }
    
    function createRippleEffect(element, event) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.className = 'card-ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }
    
    function createFloatingSymbols(element) {
        const symbols = ['▲', '■', '●', '✕'];
        const colors = ['#00ff00', '#ff69b4', '#ff0000', '#0080ff'];
        
        symbols.forEach((symbol, index) => {
            setTimeout(() => {
                const floatingSymbol = document.createElement('div');
                floatingSymbol.className = 'floating-ps-symbol';
                floatingSymbol.textContent = symbol;
                floatingSymbol.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                    font-weight: bold;
                    color: ${colors[index]};
                    text-shadow: 0 0 10px ${colors[index]};
                    pointer-events: none;
                    z-index: 1000;
                    animation: floatUp 2s ease-out forwards;
                `;
                
                element.appendChild(floatingSymbol);
                
                // Remove after animation
                setTimeout(() => {
                    if (floatingSymbol.parentNode) {
                        floatingSymbol.remove();
                    }
                }, 2000);
            }, index * 100);
        });
    }
    
    function createClickSoundEffect() {
        // Create visual sound effect
        const soundEffect = document.createElement('div');
        soundEffect.className = 'click-sound-effect';
        soundEffect.innerHTML = `
            <div class="sound-wave">
                <span class="sound-text">🎵</span>
                <div class="sound-rings">
                    <div class="sound-ring"></div>
                    <div class="sound-ring"></div>
                    <div class="sound-ring"></div>
                </div>
            </div>
        `;
        soundEffect.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
            animation: soundEffectAppear 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(soundEffect);
        
        // Remove after animation
        setTimeout(() => {
            if (soundEffect.parentNode) {
                soundEffect.remove();
            }
        }, 1500);
    }
    
    function createRunningSymbols(element) {
        // Create running symbols container
        const runningContainer = document.createElement('div');
        runningContainer.className = 'card-ps-symbols running';
        runningContainer.innerHTML = `
            <div class="card-ps-symbol triangle">▲</div>
            <div class="card-ps-symbol square">■</div>
            <div class="card-ps-symbol circle">●</div>
            <div class="card-ps-symbol x">✕</div>
        `;
        
        element.appendChild(runningContainer);
        
        // Remove after animation completes
        setTimeout(() => {
            if (runningContainer.parentNode) {
                runningContainer.remove();
            }
        }, 2000);
    }
    
    // Interactive Features System
    function initInteractiveFeatures() {
        // Initialize only the most elegant features
        initKonamiCode();
        initSubtleMouseEffects();
        initSmoothScrollAnimations();
        initCleanGameMode();
        initSecretEasterEgg();
    }
    
    // Konami Code Easter Egg (keep this - it's classic)
    function initKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let userInput = [];
        
        document.addEventListener('keydown', (e) => {
            userInput.push(e.code);
            
            if (userInput.length > 10) {
                userInput = userInput.slice(-10);
            }
            
            if (userInput.join(',') === konamiCode.join(',')) {
                activateKonamiMode();
                userInput = [];
            }
        });
    }
    
    function activateKonamiMode() {
        // Elegant celebration - less overwhelming
        const celebration = document.createElement('div');
        celebration.className = 'konami-celebration';
        celebration.innerHTML = `
            <div class="konami-content">
                <div class="konami-title">🎮 KONAMI CODE ACTIVATED</div>
                <div class="konami-symbols">
                    <span class="konami-symbol triangle">▲</span>
                    <span class="konami-symbol square">■</span>
                    <span class="konami-symbol circle">●</span>
                    <span class="konami-symbol x">✕</span>
                </div>
                <div class="konami-message">PlayStation Master Unlocked!</div>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Subtle page enhancement
        document.body.classList.add('konami-mode');
        
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.remove();
            }
            document.body.classList.remove('konami-mode');
        }, 3000);
        
        // Trigger PlayStation sound
        if (window.testPlayStationAudio) {
            window.testPlayStationAudio();
        }
    }
    
    // Subtle Mouse Effects - much cleaner
    function initSubtleMouseEffects() {
        let lastTrail = 0;
        
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            // Only create trail occasionally to avoid clutter
            if (now - lastTrail > 500 && Math.random() < 0.1) {
                createSubtleTrail(e.clientX, e.clientY);
                lastTrail = now;
            }
        });
    }
    
    function createSubtleTrail(x, y) {
        const symbols = ['▲', '■', '●', '✕'];
        const colors = ['#00ff00', '#ff69b4', '#ff0000', '#0080ff'];
        const randomIndex = Math.floor(Math.random() * symbols.length);
        
        const trail = document.createElement('div');
        trail.className = 'subtle-trail';
        trail.textContent = symbols[randomIndex];
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            color: ${colors[randomIndex]};
            font-size: 10px;
            font-weight: bold;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.6;
            text-shadow: 0 0 3px ${colors[randomIndex]};
            animation: subtleTrailFade 2s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 2000);
    }
    
    // Smooth Scroll Animations - refined
    function initSmoothScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);
        
        // Only observe main content elements
        const elementsToObserve = document.querySelectorAll('.game-card, .feature-card, .section-title');
        elementsToObserve.forEach(el => observer.observe(el));
    }
    
    // Clean Game Mode - subtle enhancement
    function initCleanGameMode() {
        // Create minimal toggle button
        const gameModeBtn = document.createElement('div');
        gameModeBtn.className = 'clean-game-toggle';
        gameModeBtn.innerHTML = `<span class="toggle-icon">🎮</span>`;
        gameModeBtn.title = 'Toggle Game Mode';
        
        document.body.appendChild(gameModeBtn);
        
        let gameMode = false;
        
        gameModeBtn.addEventListener('click', () => {
            gameMode = !gameMode;
            
            if (gameMode) {
                document.body.classList.add('enhanced-mode');
                gameModeBtn.classList.add('active');
                showCleanNotification('Enhanced Mode ON');
            } else {
                document.body.classList.remove('enhanced-mode');
                gameModeBtn.classList.remove('active');
                showCleanNotification('Enhanced Mode OFF');
            }
        });
    }
    
    function showCleanNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'clean-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 2000);
    }
    
    // One Secret Easter Egg - triple click logo
    function initSecretEasterEgg() {
        const psLogos = document.querySelectorAll('.ps-logo');
        psLogos.forEach(logo => {
            let clickCount = 0;
            let clickTimer;
            
            logo.addEventListener('click', () => {
                clickCount++;
                
                if (clickCount === 1) {
                    clickTimer = setTimeout(() => {
                        clickCount = 0;
                    }, 800);
                } else if (clickCount === 3) {
                    clearTimeout(clickTimer);
                    clickCount = 0;
                    activateSecretMode();
                }
            });
        });
    }
    
    function activateSecretMode() {
        // Elegant secret effect
        const secret = document.createElement('div');
        secret.className = 'secret-unlock';
        secret.innerHTML = `
            <div class="secret-content">
                <div class="secret-title">🔓 Secret Unlocked</div>
                <div class="secret-symbols">
                    <span style="color: #00ff00;">▲</span>
                    <span style="color: #ff69b4;">■</span>
                    <span style="color: #ff0000;">●</span>
                    <span style="color: #0080ff;">✕</span>
                </div>
                <div class="secret-text">PlayStation Fan Detected!</div>
            </div>
        `;
        
        document.body.appendChild(secret);
        
        // Brief page enhancement
        document.body.classList.add('secret-mode');
        
        setTimeout(() => {
            secret.classList.add('fade-out');
            setTimeout(() => {
                if (secret.parentNode) {
                    secret.remove();
                }
                document.body.classList.remove('secret-mode');
            }, 300);
        }, 2500);
    }
    
    // Secret Message System
    function initSecretMessageSystem() {
        let messageShown = false;
        let typedText = '';
        let typingTimer;
        
        // Show secret message every 2 minutes
        setInterval(() => {
            if (!messageShown) {
                showSecretMessage();
                messageShown = true;
                
                // Reset flag after message disappears
                setTimeout(() => {
                    messageShown = false;
                }, 5000);
            }
        }, 120000); // 2 minutes
        
        // Show first message after 30 seconds for testing
        setTimeout(() => {
            if (!messageShown) {
                showSecretMessage();
                messageShown = true;
                setTimeout(() => {
                    messageShown = false;
                }, 5000);
            }
        }, 30000);
        
        // Listen for typing
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
                typedText += e.key.toLowerCase();
                
                // Keep only last 10 characters
                if (typedText.length > 10) {
                    typedText = typedText.slice(-10);
                }
                
                // Check for "test"
                if (typedText.includes('test')) {
                    activateSecretQuiz();
                    typedText = '';
                }
                
                // Clear typed text after 3 seconds of no typing
                clearTimeout(typingTimer);
                typingTimer = setTimeout(() => {
                    typedText = '';
                }, 3000);
            }
        });
    }
    
    function showSecretMessage() {
        const secretMsg = document.createElement('div');
        secretMsg.className = 'secret-popup-message';
        secretMsg.innerHTML = `
            <div class="secret-popup-content">
                <div class="secret-popup-icon">🔐</div>
                <div class="secret-popup-text">Secret Access Available</div>
                <div class="secret-popup-instruction">Type "test" to unlock hidden content</div>
                <div class="secret-popup-timer">
                    <div class="timer-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(secretMsg);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            secretMsg.classList.add('fade-out');
            setTimeout(() => {
                if (secretMsg.parentNode) {
                    secretMsg.remove();
                }
            }, 500);
        }, 5000);
    }
    
    function activateSecretQuiz() {
        // Show activation message
        const activation = document.createElement('div');
        activation.className = 'quiz-activation';
        activation.innerHTML = `
            <div class="activation-content">
                <div class="activation-icon">🎮</div>
                <div class="activation-title">Secret Quiz Unlocked!</div>
                <div class="activation-text">Redirecting to PlayStation Challenge...</div>
            </div>
        `;
        
        document.body.appendChild(activation);
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'ps-quiz.html';
        }, 2000);
    }
});