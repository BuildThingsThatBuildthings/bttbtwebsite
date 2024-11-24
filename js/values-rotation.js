document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.values-track');
    const cards = document.querySelectorAll('.value-card');
    const cardHeight = 140; // matches min-height in CSS
    const gap = 16; // matches gap in CSS
    let currentIndex = 0;

    // Set initial position to show first three cards
    track.style.transform = `translateY(0)`;

    function rotateCards() {
        currentIndex = (currentIndex + 1) % (cards.length - 2);
        
        // Calculate the translation distance
        const distance = -(currentIndex * (cardHeight + gap));
        track.style.transform = `translateY(${distance}px)`;
    }

    // Rotate cards every 3 seconds
    setInterval(rotateCards, 3000);
});
