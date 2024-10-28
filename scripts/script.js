// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Form validation and submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        this.reset();
    } else {
        alert("Please fill out all fields.");
    }
});

// Scroll-to-top button functionality
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerText = "↑";
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main section');
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${id}"]`);

        if (scrollPos > top && scrollPos < top + height) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
});

// Dynamic greeting based on time of day
function dynamicGreeting() {
    const greetingEl = document.createElement('p');
    const currentHour = new Date().getHours();
    let greetingText = "Welcome!";

    if (currentHour >= 5 && currentHour < 12) {
        greetingText = "Good morning!";
    } else if (currentHour >= 12 && currentHour < 18) {
        greetingText = "Good afternoon!";
    } else {
        greetingText = "Good evening!";
    }

    greetingEl.textContent = greetingText;
    greetingEl.classList.add('greeting');
    document.querySelector('header .container').appendChild(greetingEl);
}
dynamicGreeting();

// Animate elements on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerText = "Toggle Dark Mode";
darkModeToggle.classList.add('dark-mode-toggle');
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.innerText = isDarkMode ? "Switch to Light Mode" : "Toggle Dark Mode";
});

// Countdown Timer
function createCountdownTimer(endDate, elementId) {
    const countdownEl = document.getElementById(elementId);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(intervalId);
            countdownEl.innerText = "Event has started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    const intervalId = setInterval(updateTimer, 1000);
}
const eventDate = new Date('2024-12-31T23:59:59').getTime();
createCountdownTimer(eventDate, 'countdown-timer');
