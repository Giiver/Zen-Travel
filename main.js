// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Sticky Header on Scroll
const header = document.querySelector('.sticky-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (question && answer && icon) {
            question.addEventListener('click', () => {
                const isOpen = !answer.classList.contains('hidden');
                
                faqItems.forEach(otherItem => {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('.faq-icon').classList.remove('rotate-180');
                });
                
                if (!isOpen) {
                    answer.classList.remove('hidden');
                    icon.classList.add('rotate-180');
                }
            });
        }
    });
}

// Testimonials Auto Scroll
function initTestimonialsScroll() {
    const track = document.getElementById('testimonials-track');
    if (!track) return;
    
    let scrollAmount = 0;
    const scrollSpeed = 1;
    
    function autoScroll() {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= track.scrollWidth / 2) {
            scrollAmount = 0;
        }
        track.scrollLeft = scrollAmount;
    }
    
    let scrollInterval = setInterval(autoScroll, 50);
    
    track.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        scrollInterval = setInterval(autoScroll, 50);
    });
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Load Additional Sections
fetch('all-sections.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('additional-sections').innerHTML = html;
        
        // Initialize Lucide icons for dynamically loaded content
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Initialize after content is loaded
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => observer.observe(el));
        
        initFAQ();
        
        // Re-bind smooth scroll for new anchor links
        document.querySelectorAll('#additional-sections a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    })
    .catch(error => {
        console.error('Error loading sections:', error);
    });

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
});
