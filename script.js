document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLoadingScreen();
    initInteractiveFeatures();
    
    // Start loading screen
    showLoadingScreen();
    
    // Initialize PlayStation effects
    initPlayStationEffects();
    
    // Initialize card click effects
    initCardClickEffects();
    
    // Initialize interactive features
    function initInteractiveFeatures() {
        // Konami code easter egg
        initKonamiCode();
        
        // Mouse trail effect
        initMouseTrail();
        
        // Scroll animations
        initScrollAnimations();
        
        // Game mode toggle
        initGameModeToggle();
        
        // One Secret Easter Egg - triple click logo
        initSecretEasterEgg();
    }
    
    // Loading Screen
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.getElementById('progressBar');
        const loadingText = document.getElementById('loadingText');
        
        if (!loadingScreen) return;
        
        let progress = 0;
        const messages = [
            'Loading PlayStation Universe...',
            'Initializing PlayStation Network...',
            'Loading Game Library...',
            'Connecting to PlayStation Store...',
            'Loading Exclusive Content...',
            'Finalizing Experience...'
        ];
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            // Update loading text
            const messageIndex = Math.floor((progress / 100) * messages.length);
            if (messages[messageIndex]) {
                loadingText.textContent = messages[messageIndex];
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1000);
            }
        }, 100);
    }
    
    function showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            
            // Skip loading screen on click
            loadingScreen.addEventListener('click', () => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            });
        }
    }
    
    // PlayStation Effects
    function initPlayStationEffects() {
        // Add PlayStation startup sound on typing "playstation"
        let typedText = '';
        let typingTimer;
        
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
                typedText += e.key.toLowerCase();
                
                // Keep only last 15 characters
                if (typedText.length > 15) {
                    typedText = typedText.slice(-15);
                }
                
                // Check for "playstation"
                if (typedText.includes('playstation')) {
                    playPlayStationSound();
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
    
    function playPlayStationSound() {
        // Create YouTube video player for PlayStation startup sound
        const videoContainer = document.createElement('div');
        videoContainer.style.position = 'fixed';
        videoContainer.style.top = '50%';
        videoContainer.style.left = '50%';
        videoContainer.style.transform = 'translate(-50%, -50%)';
        videoContainer.style.zIndex = '9999';
        videoContainer.style.background = 'rgba(0, 0, 0, 0.9)';
        videoContainer.style.padding = '20px';
        videoContainer.style.borderRadius = '15px';
        videoContainer.style.border = '2px solid var(--ps-blue)';
        videoContainer.style.boxShadow = '0 0 30px rgba(0, 123, 255, 0.5)';
        
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/BOPViekdacQ?autoplay=1&start=0&end=15';
        iframe.width = '400';
        iframe.height = '225';
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        iframe.style.borderRadius = '10px';
        
        videoContainer.appendChild(iframe);
        document.body.appendChild(videoContainer);
        
        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (videoContainer.parentNode) {
                videoContainer.remove();
            }
        }, 15000);
        
        // Click to close
        videoContainer.addEventListener('click', (e) => {
            if (e.target === videoContainer) {
                videoContainer.remove();
            }
        });
    }
    
    // Card Click Effects
    function initCardClickEffects() {
        const cards = document.querySelectorAll('.game-card, .exclusive-card, .community-card, .card');
        
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                createPlayStationEffects(this, e);
            });
        });
    }
    
    function createPlayStationEffects(element, event) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create floating PlayStation symbols
        const symbols = ['▲', '■', '●', '✕'];
        const colors = ['#007bff', '#28a745', '#ffc107', '#dc3545'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const symbol = document.createElement('div');
                symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                symbol.style.position = 'fixed';
                symbol.style.left = centerX + (Math.random() - 0.5) * 200 + 'px';
                symbol.style.top = centerY + (Math.random() - 0.5) * 200 + 'px';
                symbol.style.color = colors[Math.floor(Math.random() * colors.length)];
                symbol.style.fontSize = '2rem';
                symbol.style.pointerEvents = 'none';
                symbol.style.zIndex = '9999';
                symbol.style.animation = 'floatUp 3s ease-out forwards';
                
                document.body.appendChild(symbol);
                
                setTimeout(() => {
                    if (symbol.parentNode) {
                        symbol.parentNode.removeChild(symbol);
                    }
                }, 3000);
            }, i * 100);
        }
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 123, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Konami Code Easter Egg
    function initKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateKonamiMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    function activateKonamiMode() {
        // Create PlayStation symbols rain
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const symbol = document.createElement('div');
                const symbols = ['▲', '■', '●', '✕'];
                symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                symbol.style.position = 'fixed';
                symbol.style.left = Math.random() * window.innerWidth + 'px';
                symbol.style.top = '-50px';
                symbol.style.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
                symbol.style.fontSize = '2rem';
                symbol.style.pointerEvents = 'none';
                symbol.style.zIndex = '9999';
                symbol.style.animation = 'fall 3s linear forwards';
                
                document.body.appendChild(symbol);
                
                setTimeout(() => {
                    if (symbol.parentNode) {
                        symbol.parentNode.removeChild(symbol);
                    }
                }, 3000);
            }, i * 100);
        }
    }
    
    // Mouse Trail Effect
    function initMouseTrail() {
        const trail = [];
        const trailLength = 5;
        
        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (trail.length > trailLength) {
                trail.shift();
            }
            
            // Remove old trail elements
            document.querySelectorAll('.mouse-trail').forEach(el => el.remove());
            
            // Create new trail
            trail.forEach((point, index) => {
                const trailElement = document.createElement('div');
                trailElement.className = 'mouse-trail';
                trailElement.style.position = 'fixed';
                trailElement.style.left = point.x + 'px';
                trailElement.style.top = point.y + 'px';
                trailElement.style.width = '6px';
                trailElement.style.height = '6px';
                trailElement.style.background = `rgba(0, 123, 255, ${0.8 - (index * 0.15)})`;
                trailElement.style.borderRadius = '50%';
                trailElement.style.pointerEvents = 'none';
                trailElement.style.zIndex = '9998';
                trailElement.style.transform = 'translate(-50%, -50%)';
                
                document.body.appendChild(trailElement);
                
                setTimeout(() => {
                    if (trailElement.parentNode) {
                        trailElement.parentNode.removeChild(trailElement);
                    }
                }, 300);
            });
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        document.querySelectorAll('.game-card, .exclusive-card, .community-card, .section-title').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Game Mode Toggle
    function initGameModeToggle() {
        const gameMode = document.createElement('button');
        gameMode.textContent = '🎮';
        gameMode.style.position = 'fixed';
        gameMode.style.bottom = '20px';
        gameMode.style.right = '20px';
        gameMode.style.background = 'rgba(0, 123, 255, 0.2)';
        gameMode.style.border = '2px solid var(--ps-blue)';
        gameMode.style.color = 'var(--ps-blue)';
        gameMode.style.padding = '10px';
        gameMode.style.borderRadius = '50%';
        gameMode.style.cursor = 'pointer';
        gameMode.style.fontSize = '1.2rem';
        gameMode.style.zIndex = '1000';
        gameMode.style.transition = 'all 0.3s ease';
        gameMode.style.width = '50px';
        gameMode.style.height = '50px';
        gameMode.style.display = 'flex';
        gameMode.style.alignItems = 'center';
        gameMode.style.justifyContent = 'center';
        gameMode.title = 'Toggle Game Mode';
        
        gameMode.addEventListener('click', () => {
            document.body.classList.toggle('game-mode');
            gameMode.style.background = document.body.classList.contains('game-mode') 
                ? 'var(--ps-blue)' : 'rgba(0, 123, 255, 0.2)';
            gameMode.style.color = document.body.classList.contains('game-mode') 
                ? 'white' : 'var(--ps-blue)';
        });
        
        // Add hover effect
        gameMode.addEventListener('mouseenter', () => {
            gameMode.style.transform = 'scale(1.1)';
            gameMode.style.boxShadow = '0 5px 15px rgba(0, 123, 255, 0.3)';
        });
        
        gameMode.addEventListener('mouseleave', () => {
            gameMode.style.transform = 'scale(1)';
            gameMode.style.boxShadow = 'none';
        });
        
        document.body.appendChild(gameMode);
    }
    
    // One Secret Easter Egg - triple click logo
    function initSecretEasterEgg() {
        const psLogos = document.querySelectorAll('.ps-logo');
        psLogos.forEach(logo => {
            let clickCount = 0;
            let clickTimer;
            
            logo.addEventListener('click', () => {
                clickCount++;
                
                if (clickCount === 3) {
                    activateSecretMode();
                    clickCount = 0;
                }
                
                clearTimeout(clickTimer);
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 1000);
            });
        });
    }
    
    function activateSecretMode() {
        // Elegant secret effect
        const secret = document.createElement('div');
        secret.style.position = 'fixed';
        secret.style.top = '50%';
        secret.style.left = '50%';
        secret.style.transform = 'translate(-50%, -50%)';
        secret.style.background = 'linear-gradient(45deg, #007bff, #28a745, #ffc107, #dc3545)';
        secret.style.padding = '2rem';
        secret.style.borderRadius = '15px';
        secret.style.color = 'white';
        secret.style.textAlign = 'center';
        secret.style.zIndex = '9999';
        secret.style.animation = 'pulse 2s infinite';
        secret.innerHTML = `
            <h2>🎮 Secret PlayStation Mode Activated! 🎮</h2>
            <p>You've discovered the hidden PlayStation easter egg!</p>
        `;
        
        document.body.appendChild(secret);
        
        setTimeout(() => {
            secret.remove();
        }, 3000);
    }
});