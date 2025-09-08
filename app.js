// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Header background opacity on scroll
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', function() {
        highlightActiveSection();
        handleHeaderScroll();
        animateOnScroll();
    });

    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Add fade-in class to elements that should animate
    function initScrollAnimations() {
        const animatedElements = [
            '.about__content',
            '.experience__item',
            '.skills__category',
            '.project-card',
            '.education__item',
            '.contact__content'
        ];

        animatedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('fade-in');
            });
        });
    }

    // Notification system - moved to top for better accessibility
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Close notification">&times;</button>
            </div>
        `;

        // Add comprehensive styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            padding: 16px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transform: translateX(400px);
            transition: transform 0.3s ease-out;
            max-width: 400px;
            min-width: 300px;
            font-family: var(--font-family-base);
        `;

        // Set background color based on type
        if (type === 'success') {
            notification.style.background = '#48bb78';
        } else if (type === 'error') {
            notification.style.background = '#f56565';
        } else {
            notification.style.background = '#4299e1';
        }

        const notificationContent = notification.querySelector('.notification__content');
        notificationContent.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        `;

        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close functionality
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Contact form handling with better validation and feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            console.log('Form submitted!'); // Debug log
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const message = formData.get('message')?.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (message.length < 10) {
                showNotification('Please enter a message with at least 10 characters', 'error');
                return;
            }
            
            // Get submit button and show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Simulate form submission with success feedback
            setTimeout(() => {
                showNotification(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                
                console.log('Form submission completed successfully'); // Debug log
            }, 1500);
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Generate comprehensive resume content
    function generateResumeContent() {
        return `BHEMESWARARAO ANKIREDDY
Data Engineer
===========================================

Contact Information:
Email: bhemesh208@gmail.com
Phone: +91-9703718987
Location: Hyderabad, Telangana, India
LinkedIn: linkedin.com/in/bhemeswara-rao-ankireddy-905981155

===========================================
PROFESSIONAL SUMMARY:
===========================================
Result-oriented Data Engineer with 4+ years of experience designing and implementing scalable data pipelines and analytics solutions. Successfully transitioned from blockchain development to data engineering, bringing strong analytical thinking and problem-solving skills. Expertise in Python, Apache Spark, Scala, and cloud platforms including AWS and GCP. Passionate about turning complex data challenges into efficient, automated solutions that drive business value.

===========================================
PROFESSIONAL EXPERIENCE:
===========================================

ASSOCIATE ANALYST - DATA ENGINEERING
PurpleTalk India Pvt Ltd, Upshot.ai | Nov 2022 - Present

• Developed scalable push notification system processing 100K+ notifications/min using Python, Spark & Ray.io
• Built personalized journey engines with Ray.io enabling lifecycle-based user engagement
• Created Journey Report Computation service using Scala, Spark, and Theta Sketches
• Enhanced WhatsApp & SMS APIs using Python and Flask for platform-wide integration
• Developed KMS-Encryption utilities for secure PII data handling with AWS KMS
• Led Event-Report computation pipelines for real-time user analytics
• Supervised and mentored 3 interns in Python and Big Data technologies

TRAINEE - DATA ENGINEERING
PurpleTalk India Pvt Ltd, Upshot.ai | Aug 2021 - Oct 2022

• Built automated import/export pipelines for client data using Python, Spark, and AWS S3
• Developed campaign alert systems for proactive pipeline monitoring

INTERN - DATA ENGINEERING
PurpleTalk India Pvt Ltd, Upshot.ai | Feb 2020 - July 2021

• Automated weekly status reports using Python and Spark for client insights
• Delivered 1000+ ad hoc data analysis requests using Big Data technologies

===========================================
TECHNICAL SKILLS:
===========================================

Programming & Frameworks: 
Python, Scala, Java, JavaScript, NodeJS

Big Data Technologies: 
Apache Spark, Ray.io, Kafka, ETL Development, Data Pipeline Design

Cloud Platforms: 
AWS (EC2, S3, KMS), Google Cloud Platform (GCP)

Databases: 
MongoDB, MySQL, NoSQL, Redis

DevOps & Tools: 
Docker, Kubernetes, Linux, Git

Visualization & APIs: 
Flask, RESTful Web Services, Data Visualization

===========================================
KEY PROJECTS:
===========================================

1. REAL-TIME PUSH NOTIFICATION SYSTEM
   • Built scalable system processing 100K+ notifications per minute
   • Technologies: Python, Spark, Ray.io
   • Impact: 4x improvement in notification delivery rate

2. JOURNEY REPORT COMPUTATION SERVICE
   • Developed big data analytics using Theta Sketches and Spark
   • Reduced event processing time and generated meaningful client reports
   • Technologies: Scala, Spark, Theta Sketches

3. KMS-ENCRYPTION UTILITY TOOL
   • Created secure PII data masking/unmasking solution
   • Integrated across all platform services
   • Technologies: Python, Java, AWS KMS

4. EVENT-REPORT COMPUTATION PIPELINE
   • Built real-time analysis system for user behavioral data
   • Enables client conversion and engagement optimization
   • Technologies: Scala, Spark, Big Data Analytics

===========================================
EDUCATION:
===========================================

Bachelor of Technology in Electrical and Electronics Engineering
Jawaharlal Nehru Technological University, Kakinada (2014-2017)

Diploma in Electrical and Electronics Engineering
Bapatla Polytechnic College, Andhra Pradesh (2011-2014)

===========================================
Generated on: ${new Date().toLocaleDateString()}
===========================================`;
    }

    // Download Resume functionality with better feedback
    const downloadResumeBtn = document.getElementById('download-resume');
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('Download resume button clicked!'); // Debug log
            
            try {
                // Show immediate feedback
                const originalText = this.textContent;
                this.textContent = 'Downloading...';
                this.disabled = true;
                
                // Create resume content
                const resumeContent = generateResumeContent();
                const filename = 'Bhemeswararao_Ankireddy_Resume.txt';
                
                // Download the file
                downloadTextFile(filename, resumeContent);
                
                // Show success notification
                showNotification('Resume downloaded successfully!', 'success');
                
                // Reset button after short delay
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
                
                console.log('Resume download completed'); // Debug log
                
            } catch (error) {
                console.error('Error downloading resume:', error);
                showNotification('Error downloading resume. Please try again.', 'error');
                
                // Reset button
                this.textContent = 'Download Resume';
                this.disabled = false;
            }
        });
    }

    // Enhanced download text file function
    function downloadTextFile(filename, text) {
        try {
            const element = document.createElement('a');
            const file = new Blob([text], { type: 'text/plain' });
            
            element.href = URL.createObjectURL(file);
            element.download = filename;
            element.style.display = 'none';
            
            document.body.appendChild(element);
            element.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(element);
                URL.revokeObjectURL(element.href);
            }, 100);
            
            return true;
        } catch (error) {
            console.error('Error creating download:', error);
            return false;
        }
    }

    // View My Work button smooth scroll with feedback
    const viewWorkBtn = document.querySelector('a[href="#projects"]');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Brief visual feedback
                setTimeout(() => {
                    showNotification('Viewing projects section', 'info');
                }, 500);
            }
        });
    }

    // Initialize all functionality
    initScrollAnimations();
    animateOnScroll();

    // Initialize typing effect for better visual appeal
    function initTypingEffect() {
        const heroSubtitle = document.querySelector('.hero__subtitle');
        if (heroSubtitle) {
            const originalText = heroSubtitle.textContent;
            heroSubtitle.style.opacity = '0';
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transition = 'opacity 0.5s ease-in';
            }, 1000);
        }
    }

    // Add welcome message
    setTimeout(() => {
        showNotification('Welcome to my portfolio! Feel free to explore and get in touch.', 'info');
    }, 2000);

    initTypingEffect();

    // Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    console.log('Portfolio JavaScript loaded successfully'); // Debug log
});