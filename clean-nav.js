// Clean Logo-Only Navigation with Hamburger
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const clickableLogo = document.querySelector('.clickable-logo');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const psLogo = document.querySelector('.ps-logo');
    const psSymbols = document.querySelector('.ps-symbols');
    
    let isExpanded = false;
    let logoAnimationComplete = false;
    
    // Debug logging
    console.log('Clean-nav.js - Elements found:', {
        navbar: !!navbar,
        hamburger: !!hamburger,
        navMenu: !!navMenu,
        navOverlay: !!navOverlay,
        psLogo: !!psLogo,
        psSymbols: !!psSymbols
    });
    
    // Ensure menu starts in correct state
    if (navMenu) {
        navMenu.classList.add('nav-hidden');
        navMenu.classList.remove('nav-visible');
    }
    
    // Initialize PlayStation logo animation
    function initPlayStationLogo() {
        if (psLogo && psSymbols) {
            psLogo.classList.add('typing');
            
            setTimeout(() => {
                psLogo.classList.remove('typing');
                psSymbols.classList.add('show');
                logoAnimationComplete = true;
                console.log('Logo animation complete');
            }, 1800);
        } else {
            // If no logo animation, allow immediate interaction
            logoAnimationComplete = true;
        }
    }
    
    // Toggle navigation
    function toggleNavigation() {
        if (!logoAnimationComplete) return;
        
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Expand navigation
            navbar.classList.add('expanded');
            navMenu.classList.remove('nav-hidden', 'hidden');
            navMenu.classList.add('nav-visible');
            hamburger.classList.add('active');
            if (navOverlay) navOverlay.classList.add('active');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Add stagger animation to nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    link.style.transition = 'all 0.3s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, index * 100);
            });
        } else {
            // Collapse navigation
            navbar.classList.remove('expanded');
            navMenu.classList.remove('nav-visible');
            navMenu.classList.add('nav-hidden');
            hamburger.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }
        
        console.log('Navigation toggled:', isExpanded ? 'opened' : 'closed');
    }
    
    // Click handler for logo
    if (clickableLogo) {
        clickableLogo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleNavigation();
        });
    }
    
    // Click handler for hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked, logoAnimationComplete:', logoAnimationComplete);
            
            // Allow hamburger to work even if logo animation isn't complete
            if (!logoAnimationComplete) {
                logoAnimationComplete = true;
            }
            
            toggleNavigation();
        });
    } else {
        console.warn('Hamburger element not found');
    }
    
    // Click handler for overlay
    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            console.log('Overlay clicked');
            if (isExpanded) {
                toggleNavigation();
            }
        });
    }
    
    // Close navigation when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked');
            // Don't close immediately, let the navigation happen
            setTimeout(() => {
                if (isExpanded) {
                    toggleNavigation();
                }
            }, 100);
        });
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', function(e) {
        if (isExpanded && navbar && !navbar.contains(e.target)) {
            console.log('Clicked outside navbar');
            toggleNavigation();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isExpanded) {
            console.log('Escape key pressed');
            toggleNavigation();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Desktop behavior
            if (isExpanded) {
                navbar.classList.add('expanded');
                navMenu.classList.add('nav-visible');
                navMenu.classList.remove('nav-hidden');
            }
            if (navOverlay) navOverlay.classList.remove('active');
        } else {
            // Mobile behavior
            if (isExpanded && navOverlay) {
                navOverlay.classList.add('active');
            }
        }
    });
    
    // Initialize logo animation
    initPlayStationLogo();
    
    // Add scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    console.log('Clean navigation with hamburger initialized');
});