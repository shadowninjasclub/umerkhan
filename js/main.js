// Initialize Supabase client
const supabaseUrl = 'https://prmprovhlzsfidoyuvqr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybXByb3ZobHpzZmlkb3l1dnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTgyMTMsImV4cCI6MjA2ODk5NDIxM30.ksMtB1fIDAgSEChFJz4aIedjsw1-Z5h42aZ-BYXM03s';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    // Activate hero animations immediately
    const heroElements = document.querySelectorAll('.animate-hero');
    heroElements.forEach(el => {
        el.classList.add('active');
    });
    
    // Form submission with Supabase integration
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            // Web3Forms will handle the form submission, but we'll also store in Supabase
            try {
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Store in Supabase
                const { data, error } = await supabase
                    .from('contacts')
                    .insert([
                        { 
                            name: name, 
                            email: email, 
                            subject: subject, 
                            message: message,
                            created_at: new Date()
                        }
                    ]);
                
                if (error) {
                    console.error('Error storing contact in Supabase:', error);
                } else {
                    console.log('Contact stored in Supabase:', data);
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    }
    
    /* Custom Cursor */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    if (cursorDot && cursorOutline) {
        const moveCursor = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        };
        
        window.addEventListener('mousemove', moveCursor);
        
        // Add cursor effects on hover
        const cursorEffects = () => {
            const hoverables = document.querySelectorAll('a, button, .btn, input, textarea, .portfolio-item, .service-card');
            
            hoverables.forEach(hoverable => {
                hoverable.addEventListener('mouseenter', () => {
                    cursorDot.classList.add('cursor-hover');
                    cursorOutline.classList.add('cursor-hover');
                });
                
                hoverable.addEventListener('mouseleave', () => {
                    cursorDot.classList.remove('cursor-hover');
                    cursorOutline.classList.remove('cursor-hover');
                });
            });
        };
        
        cursorEffects();
    }
    
    /* Mobile Navigation */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    /* Scroll Animations */
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Run once to show elements that are already in view on page load
    handleScrollAnimation();
    
    /* Portfolio Filtering */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    /* Video Modal */
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const videoModal = document.querySelector('.video-modal');
    const videoClose = document.querySelector('.video-close');
    const videoFrame = document.querySelector('.video-frame');
    
    if (videoTriggers.length > 0 && videoModal && videoClose && videoFrame) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const videoSrc = trigger.getAttribute('data-video');
                videoFrame.setAttribute('src', videoSrc);
                videoModal.classList.add('active');
            });
        });
        
        videoClose.addEventListener('click', () => {
            videoModal.classList.remove('active');
            videoFrame.setAttribute('src', '');
        });
        
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                videoFrame.setAttribute('src', '');
            }
        });
    }
    
    /* Newsletter Subscription with Supabase */
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const statusMessage = document.createElement('div');
            statusMessage.className = 'newsletter-status';
            
            if (!emailInput.value) {
                statusMessage.textContent = 'Please enter your email address';
                statusMessage.className += ' error';
                newsletterForm.appendChild(statusMessage);
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
                return;
            }
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            try {
                // Insert email into Supabase table
                const { data, error } = await supabase
                    .from('newsletter_subscribers')
                    .insert([{ email: emailInput.value }]);
                
                if (error) throw error;
                
                // Success message
                emailInput.value = '';
                statusMessage.textContent = 'Thank you for subscribing!';
                statusMessage.className += ' success';
                newsletterForm.appendChild(statusMessage);
                
            } catch (error) {
                console.error('Error:', error);
                statusMessage.textContent = 'Something went wrong. Please try again.';
                statusMessage.className += ' error';
                newsletterForm.appendChild(statusMessage);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Subscribe';
                
                // Remove status message after 3 seconds
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            }
        });
    }
    
    /* Contact Form - Using Web3Forms */
    // Web3Forms handles the form submission now
    
    /* Track Page Views with Supabase */
    const trackPageView = async () => {
        try {
            const { data, error } = await supabase
                .from('page_views')
                .insert([
                    { 
                        page: window.location.pathname,
                        referrer: document.referrer || 'direct',
                        user_agent: navigator.userAgent
                    }
                ]);
            
            if (error) console.error('Error tracking page view:', error);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    // Track page view on load
    trackPageView();
}); 