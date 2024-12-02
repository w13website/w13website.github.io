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

    const form = document.getElementById('get-in-touch-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const firstName = form.querySelector('input[name="firstName"]').value;
            const lastName = form.querySelector('input[name="lastName"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const phone = form.querySelector('input[name="phone"]').value;
            const projectType = form.querySelector('select[name="projectType"]').value;
            const message = form.querySelector('textarea[name="message"]').value;

            // Basic validation
            if (!firstName || !lastName || !email || !phone || !message) {
                notyf.error('Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                notyf.error('Please enter a valid email address');
                return;
            }

            // Phone validation (basic Australian format)
            const phoneRegex = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
            if (!phoneRegex.test(phone)) {
                notyf.error('Please enter a valid Australian phone number');
                return;
            }

            try {
                await emailjs.send(
                    "YOUR_SERVICE_ID", // You'll get this from EmailJS dashboard
                    "YOUR_TEMPLATE_ID", // You'll get this from EmailJS dashboard
                    {
                        firstName,
                        lastName,
                        email,
                        phone,
                        projectType,
                        message,
                        to_email: "admin@w13projects.com.au"
                    }
                );

                notyf.success('Thank you for your message. We will get back to you soon!');
                form.reset();
            } catch (error) {
                notyf.error('Failed to send message. Please try again.');
                console.error('Error:', error);
            }
        });
    }
}); 