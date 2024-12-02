document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init("-Cvd5ZUltFxv8R-S3");

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

    const form = document.getElementById('index-contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const name = form.querySelector('[name="name"]').value;
            const email = form.querySelector('[name="email"]').value;
            const message = form.querySelector('[name="message"]').value;

            // Basic validation
            if (!name || !email || !message) {
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
                    "service_w9cwwxe",  // Your service ID
                    "template_txmd4o8", // Your contact form template ID
                    {
                        name,
                        email,
                        message,
                        subject: "Contact Form Submission from Homepage", // To differentiate
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
}); 