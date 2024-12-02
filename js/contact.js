document.addEventListener('DOMContentLoaded', () => {
    // Initialize Notyf
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

    // Form handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form fields
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                subject: form.querySelector('#subject').value,
                message: form.querySelector('#message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                notyf.error('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                notyf.error('Please enter a valid email address');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                notyf.success('Message sent successfully! We will contact you soon.');
                form.reset();
            } catch (error) {
                notyf.error('Failed to send message. Please try again.');
                console.error('Error:', error);
            }
        });
    }

    // Map styling can be customized through the Google Cloud Console
    // using the map-id parameter in the gmp-map element
}); 