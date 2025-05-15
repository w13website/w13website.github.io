document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("-Cvd5ZUltFxv8R-S3"); // You'll get this from EmailJS dashboard

    const notyf = new Notyf({
        duration: 3000,
        position: {
            x: 'right',
            y: 'top',
        },
        types: [
            {
                type: 'success',
                background: '#4CAF50',
            },
            {
                type: 'error',
                background: '#ff5b5b',
            }
        ]
    });

    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const subject = form.querySelector('#subject').value;
            const message = form.querySelector('#message').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                notyf.error('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                notyf.error('Please enter a valid email address');
                return;
            }

            try {
                await emailjs.send(
                    "service_w9cwwxe", // You'll get this from EmailJS dashboard
                    "template_txmd4o8", // You'll get this from EmailJS dashboard
                    {
                        name,
                        email,
                        subject,
                        message,
                        to_email: "admin@w13projects.com.au"
                    }
                );

                notyf.success('Message sent successfully! We will contact you soon.');
                form.reset();
            } catch (error) {
                notyf.error('Failed to send message. Please try again.');
                console.error('Error:', error);
            }
        });
    }

    // Add Google Maps embed - attempt to load with a slight delay to ensure DOM is ready
    setTimeout(() => {
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            const mapLocation = '419+Nelson+Rd,+Para+Hills+SA+5096';
            const mapLatLng = '-34.8367,138.6891';
            
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
                        <a href="https://www.google.com/maps/place/419+Nelson+Rd,+Para+Hills+SA+5096/@-34.8268819,138.586819,13z/data=!4m6!3m5!1s0x6ab0b46cc5dff605:0x7cb78d0b4335fda8!8m2!3d-34.807806!4d138.659646!16s%2Fg%2F11c4zvsv42?entry=tts" 
                           target="_blank" 
                           class="inline-block bg-secondary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                            <i class="fas fa-directions mr-2"></i>Get Directions
                        </a>
                    </div>
                </div>
            `;
            
            console.log('Map container updated');
        } else {
            console.error('Map container not found');
        }
    }, 500);
}); 