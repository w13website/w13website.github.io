document.addEventListener('DOMContentLoaded', function() {
    // Get all slides
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Function to show the next slide
    function showNextSlide() {
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate the next slide index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Show the next slide
        slides[currentSlide].classList.add('active');
    }
    
    // Set the interval to change slides every 5 seconds
    setInterval(showNextSlide, 5000);
}); 