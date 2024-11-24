document.addEventListener('DOMContentLoaded', () => {
    const logoContainer = document.querySelector('.logo-container');
    const mainLogo = document.querySelector('.main-logo');
    const smallLogos = document.querySelectorAll('.small-logo');
    const companyName = document.querySelector('.company-name');
    
    // Function to handle scroll animations
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const splitPoint = windowHeight * 0.1;
        
        if (scrollPosition > splitPoint) {
            logoContainer.classList.add('scrolled');
            
            // Calculate opacity for main logo and company name
            const fadeStart = splitPoint;
            const fadeEnd = windowHeight * 0.3;
            const opacity = Math.max(0, Math.min(1, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart)));
            
            companyName.style.opacity = opacity;
            mainLogo.style.opacity = opacity;
            
            // Show small logos with a slight delay for each
            smallLogos.forEach((logo, index) => {
                setTimeout(() => {
                    logo.style.opacity = 1;
                    logo.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } else {
            logoContainer.classList.remove('scrolled');
            companyName.style.opacity = 1;
            mainLogo.style.opacity = 1;
            
            // Hide small logos
            smallLogos.forEach(logo => {
                logo.style.opacity = 0;
                logo.style.transform = 'translateY(-20px)';
            });
        }
    };

    // Check initial scroll position
    if (window.scrollY > 0) {
        // If page is already scrolled, immediately show the proper state
        logoContainer.style.transition = 'none';
        mainLogo.style.transition = 'none';
        companyName.style.transition = 'none';
        smallLogos.forEach(logo => {
            logo.style.transition = 'none';
        });

        handleScroll();

        // Re-enable transitions after initial state is set
        setTimeout(() => {
            logoContainer.style.transition = '';
            mainLogo.style.transition = '';
            companyName.style.transition = '';
            smallLogos.forEach(logo => {
                logo.style.transition = '';
            });
        }, 50);
    }
    
    // Handle scroll events
    window.addEventListener('scroll', handleScroll);

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
