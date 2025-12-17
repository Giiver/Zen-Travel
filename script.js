// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

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
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
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
        
        question.addEventListener('click', () => {
            const isOpen = !answer.classList.contains('hidden');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-answer').classList.add('hidden');
                otherItem.querySelector('.faq-icon').classList.remove('rotate-180');
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-180');
            }
        });
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
    
    // Auto scroll every 50ms
    let scrollInterval = setInterval(autoScroll, 50);
    
    // Pause on hover
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    initFAQ();
    initTestimonialsScroll();
});

// Load Main Content
document.getElementById('main-content').innerHTML = `
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center pt-20">
        <div class="absolute inset-0 z-0">
            <img src="assets/GZyPXNTRlMVdqZh5KbADEGeJ8.webp" alt="Destination de rêve" class="w-full h-full object-cover">
            <div class="absolute inset-0 hero-gradient"></div>
        </div>
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-4xl mx-auto text-center text-white">
                <div class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 fade-in">
                    <i class="fas fa-users text-accent"></i>
                    <span class="text-sm font-medium">750 000+ voyageurs dans 150 pays</span>
                </div>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight fade-in">
                    Voyagez jusqu'à 70% moins cher avec des tarifs privés inaccessibles au public
                </h1>
                <p class="text-xl sm:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto fade-in">
                    Accédez aux mêmes prix que les professionnels du voyage. Hôtels, vols, locations : économisez des centaines d'euros dès votre première réservation.
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
                    <a href="#tarifs-exemples" class="btn-primary text-white px-8 py-4 rounded-full font-semibold text-lg inline-block w-full sm:w-auto text-center">
                        Voir les tarifs privés
                    </a>
                    <a href="#fonctionnement" class="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg inline-block border-2 border-white hover:bg-white hover:text-secondary transition w-full sm:w-auto text-center">
                        Comment ça marche ?
                    </a>
                </div>
            </div>
        </div>
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <a href="#probleme" class="text-white animate-bounce block">
                <i class="fas fa-chevron-down text-2xl"></i>
            </a>
        </div>
    </section>

    <!-- Problem Section -->
    <section id="probleme" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
                    Pourquoi vous payez trop cher vos voyages
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition animate-on-scroll">
                    <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-tag text-red-500 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-dark mb-4 text-center">Vous payez le prix public</h3>
                    <p class="text-gray-600 text-center leading-relaxed">
                        Les sites de réservation affichent les tarifs grand public. Les vrais prix négociés restent cachés aux professionnels.
                    </p>
                </div>
                <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition animate-on-scroll">
                    <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-clock text-orange-500 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-dark mb-4 text-center">Vous perdez du temps</h3>
                    <p class="text-gray-600 text-center leading-relaxed">
                        Comparer 10 sites pour trouver les mêmes prix élevés partout. Des heures perdues pour aucune économie.
                    </p>
                </div>
                <div class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition animate-on-scroll">
                    <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i class="fas fa-exclamation-triangle text-yellow-500 text-2xl"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-dark mb-4 text-center">Vous subissez le stress</h3>
                    <p class="text-gray-600 text-center leading-relaxed">
                        Budget qui explose, imprévus, frais cachés. Organiser un voyage devient une source d'anxiété au lieu de plaisir.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Solution Section -->
    <section id="solution" class="py-20 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 max-w-3xl mx-auto">
                <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
                    La plateforme qui transforme votre façon de voyager
                </h2>
                <p class="text-xl text-gray-600">
                    Accédez aux tarifs privés réservés aux professionnels. Sans changer vos habitudes.
                </p>
            </div>
            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl animate-on-scroll">
                    <div class="flex items-start space-x-4">
                        <div class="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-eye-slash text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-dark mb-3">Des tarifs que personne d'autre ne voit</h3>
                            <p class="text-gray-700 leading-relaxed">
                                Hôtels, vols, locations, activités : accédez aux prix négociés en gros, jusqu'à 70% moins cher que Booking ou Expedia.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl animate-on-scroll">
                    <div class="flex items-start space-x-4">
                        <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-coins text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-dark mb-3">Chaque voyage finance le suivant</h3>
                            <p class="text-gray-700 leading-relaxed">
                                Gagnez des crédits voyage à chaque réservation. Plus vous voyagez, moins vous payez. Votre abonnement s'autofinance.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl animate-on-scroll">
                    <div class="flex items-start space-x-4">
                        <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-shield-alt text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-dark mb-3">Garantie 150% sur la différence</h3>
                            <p class="text-gray-700 leading-relaxed">
                                Si vous trouvez moins cher ailleurs, on vous rembourse 1,5× la différence en crédit voyage. Zéro risque.
                            </p>
                            <span class="inline-block mt-3 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                Garantie 150%
                            </span>
                        </div>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl animate-on-scroll">
                    <div class="flex items-start space-x-4">
                        <div class="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-bolt text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-dark mb-3">Réservez en 3 minutes</h3>
                            <p class="text-gray-700 leading-relaxed">
                                Hôtels, vols, voitures, croisières, activités. Une seule plateforme. Fini les comparateurs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <a href="#tarifs-exemples" class="btn-primary text-white px-8 py-4 rounded-full font-semibold text-lg inline-block">
                    Découvrir les tarifs membres
                </a>
            </div>
        </div>
    </section>
`;
