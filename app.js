// Modern Portfolio JavaScript - Optimized

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initNavigation();
    initTypingAnimation();
    initScrollAnimations();
    initCounterAnimations();
    initSkillProgressBars();
    initSkillTabs();
    initContactForm();
    initProjectModals();
    initResumeDownload();
    initHeroButtons();

    console.log('🚀 Modern Portfolio loaded successfully!');

    // Theme Toggle Functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector('.theme-toggle__icon');

        // Check for saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // Show feedback
            showNotification(`Switched to ${newTheme} mode`, 'info');

            // Add ripple effect
            createRipple(this, e);
        });

        function updateThemeIcon(theme) {
            if (themeIcon) {
                themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        }
    }

    // Enhanced Navigation
    function initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav__link');
        const header = document.getElementById('header');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header background on scroll
        function updateHeader() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateHeader);

        // Active navigation link highlighting
        function highlightActiveSection() {
            const sections = document.querySelectorAll('section');
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
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightActiveSection);
    }

    // Typing Animation
    function initTypingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const texts = [
            'Senior Data Engineer',
            'Big Data Specialist', 
            'Cloud Solutions Architect',
            'ETL Pipeline Expert',
            'Analytics Engineer'
        ];

        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[currentTextIndex];

            if (isDeleting) {
                typingText.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typingText.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.timeline-item, .project-card, .contact-card, .skill-item');
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Counter Animations
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

        function animateCounter(element) {
            const target = parseInt(element.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('K') ? '' : '');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        }
    }

    // Skill Progress Bars
    function initSkillProgressBars() {
        const skillBars = document.querySelectorAll('.skill-bar[data-progress]');

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.width = progress + '%';
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Skill Tabs
    function initSkillTabs() {
        const skillTabs = document.querySelectorAll('.skill-tab');
        const skillCategories = document.querySelectorAll('.skill-category');

        skillTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetCategory = this.dataset.tab;

                // Update active tab
                skillTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Show target category
                skillCategories.forEach(category => {
                    category.classList.remove('active');
                    if (category.dataset.category === targetCategory) {
                        category.classList.add('active');
                    }
                });

                // Re-trigger progress bar animations
                setTimeout(() => {
                    const activeBars = document.querySelectorAll('.skill-category.active .skill-bar');
                    activeBars.forEach(bar => {
                        const progress = bar.dataset.progress;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = progress + '%';
                        }, 100);
                    });
                }, 100);
            });
        });
    }

    // Contact Form
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!validateForm(data)) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        function validateForm(data) {
            const required = ['name', 'email', 'subject', 'message'];

            for (let field of required) {
                if (!data[field] || data[field].trim() === '') {
                    showNotification(`Please fill in the ${field} field.`, 'error');
                    return false;
                }
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return false;
            }

            return true;
        }
    }

    // Project Modals
    function initProjectModals() {
        const projectCards = document.querySelectorAll('.project-card');
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        const modalClose = document.querySelector('.modal-close');

        if (!modal) return;

        // Project data
        const projectData = {
            'notification-engine': {
                title: 'Real-time Notification Engine',
                fullDescription: `
                    <h3>Project Overview</h3>
                    <p>Developed a highly scalable, enterprise-grade push notification system capable of processing over 100,000 notifications per minute with 99.9% reliability. This system serves millions of users across multiple platforms and channels.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Real-time message processing with sub-second latency</li>
                        <li>Multi-channel delivery (Push, SMS, Email, WhatsApp)</li>
                        <li>Auto-scaling infrastructure based on load</li>
                        <li>Advanced analytics and delivery tracking</li>
                        <li>Fault-tolerant architecture with automatic failover</li>
                    </ul>

                    <h3>Technical Implementation</h3>
                    <ul>
                        <li><strong>Backend:</strong> Python, Apache Spark, Ray.io</li>
                        <li><strong>Cloud:</strong> AWS (EC2, SQS, SNS, Lambda)</li>
                        <li><strong>Database:</strong> Redis for caching, MongoDB for persistence</li>
                        <li><strong>Monitoring:</strong> CloudWatch, Grafana</li>
                    </ul>

                    <h3>Business Impact</h3>
                    <ul>
                        <li>4x improvement in message delivery rate</li>
                        <li>60% reduction in infrastructure costs</li>
                        <li>Improved user engagement by 35%</li>
                        <li>Zero downtime deployment capability</li>
                    </ul>
                `,
                technologies: ['Python', 'Apache Spark', 'Ray.io', 'AWS', 'Redis', 'MongoDB'],
                metrics: {
                    'Messages/Min': '100K+',
                    'Uptime': '99.9%',
                    'Latency': '<100ms',
                    'Cost Reduction': '60%'
                }
            },
            'analytics-platform': {
                title: 'Journey Analytics Platform',
                fullDescription: `
                    <h3>Project Overview</h3>
                    <p>Built a comprehensive user journey tracking and analytics platform that processes behavioral data for over 10 million users in real-time, providing actionable insights for product teams and marketing campaigns.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Real-time event processing and analytics</li>
                        <li>Customer journey mapping and visualization</li>
                        <li>Predictive analytics and machine learning integration</li>
                        <li>Custom dashboard creation and reporting</li>
                        <li>A/B testing framework integration</li>
                    </ul>

                    <h3>Technical Implementation</h3>
                    <ul>
                        <li><strong>Processing:</strong> Scala, Apache Spark, Theta Sketches</li>
                        <li><strong>Streaming:</strong> Apache Kafka, Kafka Streams</li>
                        <li><strong>Storage:</strong> Apache Druid, ClickHouse</li>
                        <li><strong>Visualization:</strong> Apache Superset, Custom React dashboards</li>
                    </ul>

                    <h3>Business Impact</h3>
                    <ul>
                        <li>40% reduction in data processing time</li>
                        <li>Real-time insights for 10M+ users</li>
                        <li>25% improvement in conversion rates</li>
                        <li>Data-driven decision making for 50+ teams</li>
                    </ul>
                `,
                technologies: ['Scala', 'Apache Spark', 'Theta Sketches', 'Kafka', 'Druid', 'React'],
                metrics: {
                    'Users Tracked': '10M+',
                    'Events/Hour': '50M+',
                    'Processing Time': '-40%',
                    'Conversion Lift': '25%'
                }
            },
            'security-framework': {
                title: 'Data Security Framework',
                fullDescription: `
                    <h3>Project Overview</h3>
                    <p>Designed and implemented a comprehensive data security framework ensuring 100% compliance with GDPR, CCPA, and other data privacy regulations while maintaining high performance across all platform services.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Automatic PII detection and classification</li>
                        <li>Role-based access control (RBAC)</li>
                        <li>Data encryption at rest and in transit</li>
                        <li>Comprehensive audit logging</li>
                        <li>Data anonymization and pseudonymization</li>
                    </ul>

                    <h3>Technical Implementation</h3>
                    <ul>
                        <li><strong>Encryption:</strong> AWS KMS, AES-256 encryption</li>
                        <li><strong>Backend:</strong> Python, Java, Spring Security</li>
                        <li><strong>Access Control:</strong> OAuth 2.0, JWT tokens</li>
                        <li><strong>Monitoring:</strong> AWS CloudTrail, ELK Stack</li>
                    </ul>

                    <h3>Compliance & Security</h3>
                    <ul>
                        <li>100% GDPR and CCPA compliance</li>
                        <li>Zero security breaches since implementation</li>
                        <li>SOC 2 Type II certification achieved</li>
                        <li>Regular security audits and penetration testing</li>
                    </ul>
                `,
                technologies: ['Python', 'Java', 'AWS KMS', 'Docker', 'OAuth 2.0', 'ELK Stack'],
                metrics: {
                    'Compliance': '100%',
                    'Security Breaches': '0',
                    'Data Protected': 'TB+',
                    'Audit Score': 'A+'
                }
            },
            'event-pipeline': {
                title: 'Event Processing Pipeline',
                fullDescription: `
                    <h3>Project Overview</h3>
                    <p>Architected a high-throughput event processing pipeline capable of handling over 1 million events per hour with machine learning integration for real-time behavioral analytics and recommendations.</p>

                    <h3>Key Features</h3>
                    <ul>
                        <li>Stream processing with Apache Spark Structured Streaming</li>
                        <li>Real-time ML model inference and predictions</li>
                        <li>Auto-scaling based on event volume</li>
                        <li>Dead letter queue handling and retry mechanisms</li>
                        <li>Multi-tenant architecture with resource isolation</li>
                    </ul>

                    <h3>Technical Implementation</h3>
                    <ul>
                        <li><strong>Processing:</strong> Scala, Apache Spark Structured Streaming</li>
                        <li><strong>Orchestration:</strong> Kubernetes, Apache Airflow</li>
                        <li><strong>ML Platform:</strong> MLflow, Apache Spark MLlib</li>
                        <li><strong>Storage:</strong> Apache Kafka, Apache Cassandra</li>
                    </ul>

                    <h3>Performance Metrics</h3>
                    <ul>
                        <li>1M+ events processed per hour</li>
                        <li>99.9% system uptime achieved</li>
                        <li>Sub-second processing latency</li>
                        <li>Automatic scaling from 1-100 nodes</li>
                    </ul>
                `,
                technologies: ['Scala', 'Apache Spark', 'Kubernetes', 'MLflow', 'Cassandra', 'Airflow'],
                metrics: {
                    'Events/Hour': '1M+',
                    'Uptime': '99.9%',
                    'Latency': '<1s',
                    'Auto-scaling': '1-100 nodes'
                }
            }
        };

        // Open modal
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectKey = this.dataset.project;
                const project = projectData[projectKey];

                if (project) {
                    modalBody.innerHTML = `
                        <h2>${project.title}</h2>
                        ${project.fullDescription}
                        <div class="modal-metrics">
                            <h3>Key Metrics</h3>
                            <div class="metrics-grid">
                                ${Object.entries(project.metrics).map(([key, value]) => `
                                    <div class="metric-item">
                                        <span class="metric-value">${value}</span>
                                        <span class="metric-label">${key}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="modal-tech">
                            <h3>Technologies Used</h3>
                            <div class="tech-tags">
                                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    `;

                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Resume Download
    function initResumeDownload() {
        const downloadBtn = document.getElementById('download-resume');
        if (!downloadBtn) return;

        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Create resume download (you can replace this with actual file URL)
            const resumeUrl = '#'; // Replace with actual resume URL

            showNotification('Resume download will be available once hosted!', 'info');

            // Uncomment when you have actual resume file
            // const link = document.createElement('a');
            // link.href = resumeUrl;
            // link.download = 'Bhemeswararao_Ankireddy_Resume.pdf';
            // link.click();
        });
    }

    // Hero Buttons
    function initHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero__buttons .btn');

        heroButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                createRipple(this, { clientX: this.offsetWidth / 2, clientY: this.offsetHeight / 2 });
            });
        });
    }

    // Utility Functions
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (event.clientX - rect.left) - size / 2;
        const y = (event.clientY - rect.top) - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        element.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    function showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        if (!notification) return;

        const notificationText = notification.querySelector('.notification-text');
        const notificationClose = notification.querySelector('.notification-close');

        notificationText.textContent = message;
        notification.className = `notification ${type} show`;

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);

        // Manual close
        notificationClose.addEventListener('click', () => {
            notification.classList.remove('show');
        });
    }

    // Smooth scroll polyfill for older browsers
    function smoothScrollTo(target, duration = 1000) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Performance optimization: Lazy load images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Initialize lazy loading
    initLazyLoading();
});
