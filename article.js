// Lenis smooth scrolling setup
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navbar functionality
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.mobile-menu a');
const navbar = document.querySelector('nav');

// Toggle mobile menu function
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    burger.classList.toggle('toggle');
}

// Close mobile menu function
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    burger.classList.remove('toggle');
}

// Event listeners for mobile menu
burger.addEventListener('click', toggleMobileMenu);
navLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnBurger = burger.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnBurger && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Smooth scrolling for anchor links using Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        lenis.scrollTo(targetId);
    });
});

// Make navbar sticky and transparent on scroll
lenis.on('scroll', ({ scroll }) => {
    if (scroll > 50) {
        navbar.classList.add('sticky', 'transparent');
    } else {
        navbar.classList.remove('sticky', 'transparent');
    }
});

// Login and account creation functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const loginDropdown = document.getElementById('loginDropdown');
    const createAccountBtn = document.getElementById('createAccountBtn');
    const createAccountOverlay = document.getElementById('createAccountOverlay');
    const closeCreateAccountBtn = document.getElementById('closeCreateAccountBtn');
    const createAccountForm = document.getElementById('createAccountForm');
    const mobileLoginBtn = document.querySelector('.mobile-only[href="#login"]');
    const mobileLoginOverlay = document.getElementById('mobileLoginOverlay');
    const closeMobileLoginBtn = document.getElementById('closeMobileLoginBtn');
    const mobileLoginForm = document.getElementById('mobileLoginForm');
    const mobileSwitchToCreateAccount = document.getElementById('mobileSwitchToCreateAccount');
    const mobileSwitchToLogin = document.getElementById('mobileSwitchToLogin');

    const isMobile = () => window.innerWidth <= 768;

    const showLoginForm = () => {
        if (isMobile()) {
            mobileLoginOverlay.style.display = 'flex';
            createAccountOverlay.style.display = 'none';
        } else {
            loginDropdown.style.display = loginDropdown.style.display === 'block' ? 'none' : 'block';
        }
    };

    const showCreateAccountForm = () => {
        createAccountOverlay.style.display = 'flex';
        mobileLoginOverlay.style.display = 'none';
        if (isMobile()) {
            loginDropdown.style.display = 'none';
        }
    };

    loginBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showLoginForm();
    });

    mobileLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    createAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showCreateAccountForm();
    });

    closeCreateAccountBtn.addEventListener('click', () => {
        createAccountOverlay.style.display = 'none';
    });

    closeMobileLoginBtn.addEventListener('click', () => {
        mobileLoginOverlay.style.display = 'none';
    });

    mobileSwitchToCreateAccount.addEventListener('click', (e) => {
        e.preventDefault();
        showCreateAccountForm();
    });

    mobileSwitchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    createAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Account creation logic to be implemented');
        createAccountOverlay.style.display = 'none';
    });

    mobileLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login logic to be implemented');
        mobileLoginOverlay.style.display = 'none';
    });

    [createAccountOverlay, mobileLoginOverlay].forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!loginDropdown.contains(e.target) && e.target !== loginBtn) {
            loginDropdown.style.display = 'none';
        }
    });
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchLink = document.getElementById('searchLink');
    const mobileSearchLink = document.getElementById('mobileSearchLink');
    const searchContainer = document.getElementById('searchContainer');
    const mobileMenu = document.querySelector('.mobile-menu');

    function toggleSearch(e) {
        e.preventDefault();
        searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
    }

    searchLink.addEventListener('click', toggleSearch);
    
    if (mobileSearchLink) {
        mobileSearchLink.addEventListener('click', function(e) {
            toggleSearch(e);
            closeMobileMenu();
        });
    }

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && e.target !== searchLink && e.target !== mobileSearchLink) {
            searchContainer.style.display = 'none';
        }
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Implement newsletter subscription logic here
        console.log('Newsletter subscription for:', email);
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Smooth scroll to top function
function scrollToTop() {
    lenis.scrollTo('top', { duration: 1.5 });
}

// Add scroll to top button functionality (if it exists in your HTML)
const scrollTopButton = document.querySelector('.scroll-top-button');
if (scrollTopButton) {
    scrollTopButton.addEventListener('click', scrollToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });
}

// GSAP ScrollTrigger setup (if you're using GSAP)
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Update ScrollTrigger to work with Lenis
    function update(time) {
        lenis.raf(time);
        ScrollTrigger.update();
    }

    gsap.ticker.add(update);

    // Add your GSAP animations here
    // For example:
    // gsap.to('.element', {
    //     scrollTrigger: {
    //         trigger: '.element',
    //         start: 'top bottom',
    //         end: 'bottom top',
    //         scrub: true
    //     },
    //     y: 100,
    //     opacity: 0
    // });
}

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            lazyImageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    lazyImageObserver.observe(img);
});

// Mobile menu animation
const burgerLines = document.querySelectorAll('.burger div');

function animateBurger() {
    burgerLines.forEach((line, index) => {
        if (mobileMenu.classList.contains('active')) {
            if (index === 0) {
                gsap.to(line, { rotation: 45, y: 8, duration: 0.3 });
            } else if (index === 1) {
                gsap.to(line, { opacity: 0, duration: 0.3 });
            } else {
                gsap.to(line, { rotation: -45, y: -8, duration: 0.3 });
            }
        } else {
            gsap.to(line, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
        }
    });
}

burger.addEventListener('click', animateBurger);

// Footer reveal animation
const footer = document.querySelector('.urban-footer');

if (footer) {
    gsap.from(footer, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: footer,
            start: 'top bottom-=100',
            end: 'bottom bottom',
            toggleActions: 'play none none reverse'
        }
    });
}

// Debounce function for performance optimization
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Resize event listener with debounce
window.addEventListener('resize', debounce(() => {
    // Add any resize-related functionality here
    // For example, re-initialize certain elements or adjust layouts
    console.log('Window resized');
}));

// Add active class to current nav item
function setActiveNavItem() {
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavItem();

// Initialize any third-party libraries or plugins here
// For example, if you're using a lightbox for images:
// if (typeof lightbox !== 'undefined') {
//     lightbox.option({
//         'resizeDuration': 200,
//         'wrapAround': true
//     });
// }

// Add any additional functionality specific to your website here

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.article-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebarToggle.textContent = sidebar.classList.contains('open') ? 'Close Sidebar' : 'Open Sidebar';
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('open');
            sidebarToggle.textContent = 'Open Sidebar';
        }
    });
});