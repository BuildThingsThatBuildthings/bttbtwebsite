document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileLinks = document.querySelectorAll('.nav-links a');

    // Add MENU text to button
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
        MENU
    `;

    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Add a slight delay before showing the menu items
        setTimeout(() => {
            navLinks.classList.toggle('show');
        }, 50);
        
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('show');
            setTimeout(() => {
                navLinks.classList.remove('active');
            }, 300);
            document.body.style.overflow = '';
        });
    });

    // Header scroll behavior
    let lastScroll = 0;
    const scrollThreshold = 50; // Amount of scroll before header transforms
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Show full header at the top
        if (currentScroll <= 0) {
            navbar.classList.remove('scrolled', 'hidden');
            return;
        }

        // Handle scroll direction
        if (currentScroll > lastScroll) {
            // Scrolling down
            if (currentScroll > scrollThreshold) {
                navbar.classList.add('hidden');
                // Small delay before showing menu button
                setTimeout(() => {
                    navbar.classList.add('scrolled');
                }, 300);
            }
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
            if (currentScroll < scrollThreshold) {
                navbar.classList.remove('scrolled');
            }
        }

        lastScroll = currentScroll;

        // Clear the isScrolling timeout
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            // After scrolling ends, ensure menu button is visible
            navbar.classList.remove('hidden');
            if (currentScroll > scrollThreshold) {
                navbar.classList.add('scrolled');
            }
        }, 150);
    });

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
