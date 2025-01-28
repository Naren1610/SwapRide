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
        const allowedTypes = ['.pdf', '.doc', '.docx'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file) {
            const extension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(extension)) {
                fileValidation.textContent = 'Please upload a PDF, DOC, or DOCX file';
                fileValidation.className = 'validation-message error';
                fileInput.value = '';
                fileName.textContent = '';
                fileInputText.textContent = 'Choose Resume File';
                fileInputText.style.backgroundColor = '';
                return;
            }

            if (file.size > maxSize) {
                fileValidation.textContent = 'File size should be less than 5MB';
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
            fileInputText.textContent = 'File Selected ';
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
    jobForm.addEventListener('submit', (e) => {
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

        // Create email content with proper encoding
        const subject = encodeURIComponent(`Job Application from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        // Open email client
        window.location.href = `mailto:Sales@maratech.in?subject=${subject}&body=${body}`;

        // Show success message
        alert('Thank you for your application! Please complete sending the email with your resume attached.');

        // Close modal and reset form
        closeModal();
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
