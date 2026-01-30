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
    
    // Start loading screen
    initLoadingScreen();
});