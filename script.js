// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.boxShadow = 'none';
    }
});

// Add animation on scroll for features
const animateOnScroll = (elements) => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
        observer.observe(element);
    });
};

// Initialize animations and modal functionality
document.addEventListener('DOMContentLoaded', () => {
    // Apply animations
    animateOnScroll(document.querySelectorAll('.feature'));
    animateOnScroll(document.querySelectorAll('.vision-card, .mission-card'));

    // Modal elements
    const modal = document.getElementById('jobModal');
    const openModalBtn = document.getElementById('openJobModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const jobForm = document.getElementById('jobApplicationForm');
    const fileInput = document.getElementById('resume');
    const fileInputText = document.querySelector('.file-input-text');
    const fileName = document.getElementById('file-name');

    // Open modal
    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        jobForm.reset();
        fileName.textContent = '';
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameValidation = document.getElementById('name-validation');
    const emailValidation = document.getElementById('email-validation');
    const messageValidation = document.getElementById('message-validation');
    const fileValidation = document.getElementById('file-validation');

    // Validate name
    nameInput.addEventListener('input', () => {
        const name = nameInput.value.trim();
        const nameRegex = /^[A-Za-z\s]{3,50}$/;

        if (name === '') {
            nameValidation.textContent = 'Name is required';
            nameValidation.className = 'validation-message error';
        } else if (!nameRegex.test(name)) {
            nameValidation.textContent = 'Name should be 3-50 characters long and contain only letters and spaces';
            nameValidation.className = 'validation-message error';
        } else {
            nameValidation.textContent = 'Valid name';
            nameValidation.className = 'validation-message success';
        }
    });

    // Validate email
    emailInput.addEventListener('input', () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email === '') {
            emailValidation.textContent = 'Email is required';
            emailValidation.className = 'validation-message error';
        } else if (!emailRegex.test(email)) {
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.className = 'validation-message error';
        } else {
            emailValidation.textContent = 'Valid email address';
            emailValidation.className = 'validation-message success';
        }
    });

    // Validate message
    messageInput.addEventListener('input', () => {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageValidation.textContent = 'Please tell us why you want to join us';
            messageValidation.className = 'validation-message error';
        } else if (message.length < 50) {
            messageValidation.textContent = 'Please provide a more detailed message (at least 50 characters)';
            messageValidation.className = 'validation-message error';
        } else {
            messageValidation.textContent = 'Great! Thank you for sharing';
            messageValidation.className = 'validation-message success';
        }
    });

    // Handle file selection with validation
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const allowedTypes = ['.doc', '.docx'];
        const maxSize = 50 * 1024; // 50KB

        if (file) {
            const extension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(extension)) {
                fileValidation.textContent = 'Please upload a DOC or DOCX file';
                fileValidation.className = 'validation-message error';
                fileInput.value = '';
                fileName.textContent = '';
                fileInputText.textContent = 'Choose Resume File';
                fileInputText.style.backgroundColor = '';
                return;
            }

            if (file.size > maxSize) {
                fileValidation.textContent = 'File size must be less than 50KB. Please compress your file or choose a smaller one.';
                fileValidation.className = 'validation-message error';
                fileInput.value = '';
                fileName.textContent = '';
                fileInputText.textContent = 'Choose Resume File';
                fileInputText.style.backgroundColor = '';
                return;
            }

            // Valid file
            const maxLength = 30;
            let displayName = file.name;
            if (displayName.length > maxLength) {
                const extension = displayName.split('.').pop();
                displayName = displayName.substring(0, maxLength - extension.length - 3) + '...' + extension;
            }
            fileName.textContent = displayName;
            fileInputText.textContent = 'File Selected';
            fileInputText.style.backgroundColor = '#28a745';
            fileValidation.textContent = 'Valid file selected';
            fileValidation.className = 'validation-message success';
        } else {
            fileName.textContent = '';
            fileInputText.textContent = 'Choose Resume File';
            fileInputText.style.backgroundColor = '';
            fileValidation.textContent = 'Resume is required';
            fileValidation.className = 'validation-message error';
        }
    });

    // Handle form submission with validation
    jobForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Check all required fields
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        const file = fileInput.files[0];
        const nameRegex = /^[A-Za-z\s]{3,50}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let isValid = true;

        // Validate name
        if (!name || !nameRegex.test(name)) {
            nameValidation.textContent = name ? 'Invalid name format' : 'Name is required';
            nameValidation.className = 'validation-message error';
            isValid = false;
        }

        // Validate email
        if (!email || !emailRegex.test(email)) {
            emailValidation.textContent = email ? 'Invalid email format' : 'Email is required';
            emailValidation.className = 'validation-message error';
            isValid = false;
        }

        // Validate message
        if (!message || message.length < 50) {
            messageValidation.textContent = message ? 'Message too short' : 'Message is required';
            messageValidation.className = 'validation-message error';
            isValid = false;
        }

        // Validate file
        if (!file) {
            fileValidation.textContent = 'Resume is required';
            fileValidation.className = 'validation-message error';
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            // Convert file to base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            
            reader.onload = function() {
                const fileData = reader.result.split(',')[1]; // Get base64 data

                // Prepare template parameters
                const templateParams = {
                    to_email: 'narendra@maratech.in',
                    from_name: name,
                    from_email: email,
                    message: message,
                    resume: fileData,
                    resume_name: file.name
                };

                console.log('Attempting to send email...');

                // Send email using EmailJS
                emailjs.send('service_mxkarrh', 'template_dzz6rgb', templateParams)
                    .then(function(response) {
                        console.log('Email sent successfully:', response);
                        alert('Thank you for your application! We will get back to you soon.');
                        closeModal();
                    })
                    .catch(function(error) {
                        console.error('Email error:', error);
                        let errorMessage = 'Sorry, there was an error sending your application: ';
                        
                        if (error.message.includes('file size')) {
                            errorMessage += 'The resume file is too large. Please use a file smaller than 50KB.';
                        } else if (error.message.includes('network')) {
                            errorMessage += 'Please check your internet connection and try again.';
                        } else {
                            errorMessage += 'Please try again later or contact support if the issue persists.';
                        }
                        
                        alert(errorMessage);
                    });
            };

            reader.onerror = function() {
                console.error('Error reading file');
                alert('Error processing your resume. Please try again.');
            };
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error processing your application. Please try again later.');
        }
    });
});

// Add parallax effect to vision-mission section
window.addEventListener('scroll', () => {
    const visionMission = document.querySelector('.vision-mission');
    if (visionMission) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.15;
        visionMission.style.backgroundPosition = `center ${rate}px`;
    }
});
