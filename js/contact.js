document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll get this from EmailJS dashboard

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
                    "YOUR_SERVICE_ID", // You'll get this from EmailJS dashboard
                    "YOUR_TEMPLATE_ID", // You'll get this from EmailJS dashboard
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
}); 