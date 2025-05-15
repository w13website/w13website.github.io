// Simple script to load the Google Map for the contact page
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map-container');
    
    if (mapContainer) {
        console.log('Map.js: Loading map...');
        
        // Direct approach with standard Google Maps embed
        mapContainer.innerHTML = `
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.267903767654!2d138.68658467670354!3d-34.83673387271594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0b6efea13a8a9%3A0x5fe0d0b0e7e486a2!2s419%20Nelson%20Rd%2C%20Para%20Hills%20SA%205096!5e0!3m2!1sen!2sau!4v1719951525849!5m2!1sen!2sau" 
                width="100%" 
                height="450" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <div class="p-6 bg-secondary/10 mt-4">
                <h3 class="font-bold text-xl mb-4 text-center">Our Location</h3>
                <div class="flex items-center justify-center space-x-2 mb-4">
                    <i class="fas fa-map-marker-alt text-secondary"></i>
                    <p class="text-gray-700">419 Nelson Road, Para Hills, SA 5096</p>
                </div>
                <div class="text-center">
                    <a href="https://www.google.com/maps/place/419+Nelson+Rd,+Para+Hills+SA+5096/@-34.8268819,138.586819,13z" 
                       target="_blank" 
                       class="inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                        <i class="fas fa-directions mr-2"></i>Get Directions
                    </a>
                </div>
            </div>
        `;
    } else {
        console.error('Map.js: Map container not found');
    }
}); 