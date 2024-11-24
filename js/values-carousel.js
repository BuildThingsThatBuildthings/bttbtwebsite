document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.values-track');
    const cards = Array.from(document.querySelectorAll('.value-card'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Clone first and last few cards for infinite scroll effect
    const cardsToClone = 3;
    const lastCards = cards.slice(-cardsToClone).map(card => card.cloneNode(true));
    const firstCards = cards.slice(0, cardsToClone).map(card => card.cloneNode(true));
    
    lastCards.forEach(card => track.insertBefore(card, track.firstChild));
    firstCards.forEach(card => track.appendChild(card));
    
    let currentIndex = cardsToClone;
    let isTransitioning = false;
    
    function updateCarousel(smooth = true) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        track.style.transition = smooth ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }
    
    function slideNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel();
        
        // Reset to start when reaching end
        if (currentIndex >= cards.length + cardsToClone) {
            setTimeout(() => {
                currentIndex = cardsToClone;
                updateCarousel(false);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    function slidePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel();
        
        // Reset to end when reaching start
        if (currentIndex < cardsToClone) {
            setTimeout(() => {
                currentIndex = cards.length + cardsToClone - 1;
                updateCarousel(false);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    // Event Listeners
    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);
    
    // Auto-advance the carousel
    let autoplayInterval = setInterval(slideNext, 4000);
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(slideNext, 4000);
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel(false);
        }, 250);
    });
    
    // Initial setup
    updateCarousel(false);
});
