document.addEventListener('DOMContentLoaded', () => {
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
            
            // Get form fields
            const formData = {
                firstName: form.querySelector('input[type="text"]').value,
                lastName: form.querySelectorAll('input[type="text"]')[1].value,
                email: form.querySelector('input[type="email"]').value,
                phone: form.querySelector('input[type="tel"]').value,
                projectType: form.querySelector('select').value,
                message: form.querySelector('textarea').value
            };

            // Basic validation
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
                notyf.error('Please fill in all required fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                notyf.error('Please enter a valid email address');
                return;
            }

            // Phone validation (basic Australian format)
            const phoneRegex = /^(?:\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
            if (!phoneRegex.test(formData.phone)) {
                notyf.error('Please enter a valid Australian phone number');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/get-in-touch', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                notyf.success('Thank you for your message. We will get back to you soon!');
                form.reset();
            } catch (error) {
                notyf.error('Failed to send message. Please try again.');
                console.error('Error:', error);
            }
        });
    }
}); 