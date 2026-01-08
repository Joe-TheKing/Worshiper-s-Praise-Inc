document.addEventListener('DOMContentLoaded', function () {

    // Page Load Animation
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.display = 'none';
            document.body.classList.add('fade-in');
        });
    }

    // Page Transitions
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Check if it's a valid, non-anchor link
            if (href && href !== '#' && !href.startsWith('mailto:') && !href.startsWith('tel:') && this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Corresponds to animation duration
            }
        });
    });

    // Scroll Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Countdown Timer Function
    function startCountdown(elementId, eventDateString) {
        const countdownElement = document.getElementById(elementId);
        if (countdownElement) {
            const eventDate = new Date(eventDateString).getTime();

            const countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = eventDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

                if (distance < 0) {
                    clearInterval(countdownInterval);
                    countdownElement.innerHTML = 'Event has passed';
                }
            }, 1000);
        }
    }

    // Call countdown for index.html
    startCountdown('countdown', '2025-12-25T18:00:00'); // Assuming this is the event date for index.html

    // Call countdown for events.html
    startCountdown('event-countdown', '2025-12-25T18:00:00'); // Using the same date for now

    // Accordion functionality for Basis of Faith section
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;

            accordionItem.classList.toggle('active');
            header.classList.toggle('active');

            if (accordionItem.classList.contains('active')) {
                accordionContent.style.display = 'block';
            } else {
                accordionContent.style.display = 'none';
            }
        });
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');

            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Form Validation & Feedback
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000); // Notification stays for 3 seconds
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]');
            const email = contactForm.querySelector('input[type="email"]');
            const message = contactForm.querySelector('textarea');
            let isValid = true;

            if (name.value.trim() === '') {
                showNotification('Please enter your name.', 'error');
                isValid = false;
            }

            if (email.value.trim() === '' || !/\S+@\S+\.\S+/.test(email.value)) {
                showNotification('Please enter a valid email address.', 'error');
                isValid = false;
            }

            if (message.value.trim() === '') {
                showNotification('Please enter your message.', 'error');
                isValid = false;
            }

            if (isValid) {
                showNotification('Thank you for your message!', 'success');
                contactForm.reset();
            }
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]');
            if (email.value.trim() === '' || !/\S+@\S+\.\S+/.test(email.value)) {
                showNotification('Please enter a valid email address.', 'error');
            } else {
                showNotification('Thanks for subscribing!', 'success');
                newsletterForm.reset();
            }
        });
    }

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = searchForm.querySelector('input[type="search"]');
            if (searchInput.value.trim() === '') {
                e.preventDefault();
                alert('Please enter a search term.');
            }
        });
    }

    // Subtle Parallax for Hero Images
    const heroParallaxWrappers = document.querySelectorAll('.hero-parallax-wrapper');
    if (heroParallaxWrappers.length > 0) {
        function parallaxScroll() {
            const scrollPosition = window.scrollY;
            heroParallaxWrappers.forEach(wrapper => {
                // Adjust the division factor to control the parallax speed.
                // A larger number means slower parallax movement.
                wrapper.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            });
        }

        // Initial call to set position
        parallaxScroll();

        // Listen for scroll events
        window.addEventListener('scroll', parallaxScroll);
    }

    // Hero Section Fade Out on Scroll
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        function heroFadeOut() {
            const scrollPosition = window.scrollY;
            const fadeStart = 0; // Start fading immediately
            const fadeEnd = 300; // End fading after 300px scroll (adjust as needed)
            let opacity = 1;

            if (scrollPosition <= fadeStart) {
                opacity = 1;
            } else if (scrollPosition >= fadeEnd) {
                opacity = 0;
            } else {
                opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
            }
            heroSection.style.opacity = opacity;
        }

        // Initial call to set opacity
        heroFadeOut();

        // Listen for scroll events
        window.addEventListener('scroll', heroFadeOut);
    }

    // Minimalist Line Audio Player Functionality (v2 - Bug Fix)
    const audioPlayer = document.getElementById('audio-player');
    const playSnippetButtons = document.querySelectorAll('.btn-play-snippet');
    
    let active = {
        button: null,
        line: null
    };

    function resetActiveSong() {
        if (active.line) {
            active.line.remove();
        }
        if (active.button) {
            const icon = active.button.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
        active.button = null;
        active.line = null;
    }

    playSnippetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const audioSrc = button.getAttribute('data-audio-src');
            const card = button.closest('.album-card');

            if (active.button === button) {
                // Clicked the same button, just toggle play/pause
                if (audioPlayer.paused) {
                    audioPlayer.play();
                } else {
                    audioPlayer.pause();
                }
            } else {
                // Clicked a new button, so reset the old one
                resetActiveSong();

                // Set up the new song
                audioPlayer.src = audioSrc;
                audioPlayer.play();

                // Create new UI
                const line = document.createElement('div');
                line.className = 'progress-line';
                card.appendChild(line);

                // Update state
                active.button = button;
                active.line = line;
            }
        });
    });

    audioPlayer.addEventListener('play', () => {
        if (active.button) {
            const icon = active.button.querySelector('i');
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    });

    audioPlayer.addEventListener('pause', () => {
        if (active.button) {
            const icon = active.button.querySelector('i');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });

    audioPlayer.addEventListener('ended', () => {
        resetActiveSong();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        if (active.line && audioPlayer.duration) {
            const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            active.line.style.width = `${progressPercent}%`;
        }
    });

    // Music Quiz Functionality
    const quizQuestions = [
        {
            question: "Which instrument is often called the 'king of instruments'?",
            options: ["Guitar", "Piano", "Drums", "Organ"],
            answer: "Organ"
        },
        {
            question: "What is the term for a sudden, loud accent on a note or chord?",
            options: ["Legato", "Staccato", "Sforzando", "Pizzicato"],
            answer: "Sforzando"
        },
        {
            question: "How many lines are there in a musical staff?",
            options: ["3", "4", "5", "6"],
            answer: "5"
        }
    ];

    const quizQuestionElement = document.getElementById('quiz-question');
    const quizOptionsElement = document.getElementById('quiz-options');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizResultElement = document.getElementById('quiz-result');

    let currentQuestionIndex = 0;
    let score = 0;

    function displayQuestion() {
        if (!quizQuestionElement || !quizOptionsElement || !nextQuestionBtn || !quizResultElement) return;

        const currentQuestion = quizQuestions[currentQuestionIndex];
        quizQuestionElement.textContent = currentQuestion.question;
        quizOptionsElement.innerHTML = ''; // Clear previous options
        quizResultElement.textContent = ''; // Clear previous result

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('quiz-option', 'btn', 'btn-secondary'); // Add btn classes for styling
            button.addEventListener('click', () => selectAnswer(option));
            quizOptionsElement.appendChild(button);
        });

        nextQuestionBtn.style.display = 'none'; // Hide next button until answer is selected
    }

    function selectAnswer(selectedOption) {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const quizOptions = document.querySelectorAll('.quiz-option');

        quizOptions.forEach(optionBtn => {
            optionBtn.disabled = true; // Disable all options after selection
            if (optionBtn.textContent === currentQuestion.answer) {
                optionBtn.classList.add('correct-answer');
            } else if (optionBtn.textContent === selectedOption) {
                optionBtn.classList.add('wrong-answer');
            }
        });

        if (selectedOption === currentQuestion.answer) {
            score++;
            quizResultElement.textContent = 'Correct!';
            quizResultElement.style.color = 'green';
        } else {
            quizResultElement.textContent = `Wrong! The correct answer was: ${currentQuestion.answer}`;
            quizResultElement.style.color = 'red';
        }

        nextQuestionBtn.style.display = 'block'; // Show next button
    }

    function showResults() {
        if (!quizQuestionElement || !quizOptionsElement || !nextQuestionBtn || !quizResultElement) return;

        quizQuestionElement.textContent = `Quiz Complete! You scored ${score} out of ${quizQuestions.length}.`;
        quizOptionsElement.innerHTML = '';
        nextQuestionBtn.style.display = 'none';
        quizResultElement.textContent = ''; // Clear previous result text
    }

    if (nextQuestionBtn) { // Only initialize if quiz elements exist
        nextQuestionBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                displayQuestion();
            } else {
                showResults();
            }
        });

        // Initial display of the first question if quiz elements are present
        displayQuestion();
    }

    // Fading Scroller for Story Section
    const storyItems = document.querySelectorAll('.timeline-item');
    if (storyItems.length > 0) {
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all items
                    storyItems.forEach(item => item.classList.remove('is-active'));
                    // Add active class to the intersecting item
                    entry.target.classList.add('is-active');
                }
            });
        }, {
            rootMargin: '-50% 0px -50% 0px', // Trigger when item is in the vertical center
            threshold: 0
        });

        storyItems.forEach(item => {
            storyObserver.observe(item);
        });
    }

    // Testimonial Slider
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        const slider = sliderContainer.querySelector('.testimonial-slider');
        const slides = slider.querySelectorAll('.testimonial');
        const prevBtn = sliderContainer.querySelector('.prev-btn');
        const nextBtn = sliderContainer.querySelector('.next-btn');
        let currentIndex = 0;

        function goToSlide(index) {
            slider.style.transform = `translateX(-${index * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            goToSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(currentIndex);
        });
    }

    
});

