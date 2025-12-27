// Configuration
// Using 2026 as the target year since current date is late 2025
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

// DOM Elements
const elDays = document.getElementById('days');
const elHours = document.getElementById('hours');
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const heroImg = document.getElementById('hero-img');
const messageBox = document.querySelector('.message-box');
const messageText = document.getElementById('fun-message');
const title = document.querySelector('.title');
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

// Funny/Cute Messages
const messages = [
    "Thinking about your smile... 🥺",
    "You are my favorite notification 💓",
    "Can't wait to make more memories �",
    "You make my world sparkle ✨",
    "Counting down to hugging you 🤗",
    "2026 is going to be OUR year 🚀",
    "Just being with you is a celebration 🥂",
    "I love you more than pizza (maybe) 🍕❤️"
];

// State
let messageIndex = 0;
let fireworksActive = false;

// Multi-step Tease Logic
function nextStep(stepNumber) {
    // Attempt to play music on first interaction (browser policy requires this)
    if (stepNumber === 2) {
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio autoplay prevented, waiting for next click"));
        }
    }

    // Hide all steps
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
    });

    // Show next step
    const nextEl = document.getElementById(`step-${stepNumber}`);
    if (nextEl) {
        nextEl.classList.add('active');

        // Special Case for Loading Step (Step 6)
        if (stepNumber === 6) {
            startFakeLoading();
        }
    }
}

function startFakeLoading() {
    let progress = 0;
    const bar = document.querySelector('.loading-bar .fill');
    const text = document.getElementById('loading-text');

    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;

        if (bar) bar.style.width = `${progress}%`;
        if (text) text.innerText = `${Math.floor(progress)}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                nextStep(7);
            }, 800);
        }
    }, 100);
}

function revealSurprise() {
    // Hide Intro Container
    document.getElementById('intro-container').style.display = 'none';

    // Show Main Content
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('hidden');

    // Start Logic
    // init() is called at bottom, but maybe restart or ensure music plays if added later
}

function dodgeButton() {
    const btn = document.getElementById('btn-no');
    // Smaller range for mobile friendliness if they try to touch
    const x = (Math.random() - 0.5) * 150;
    const y = (Math.random() - 0.5) * 150;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

// Fallback for mobile/fast clickers
function handleNoClick() {
    const btn = document.getElementById('btn-no');
    btn.innerText = "Yes! 😍";
    btn.style.backgroundColor = "#ff8fa3";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.transform = "scale(1.2)";
    // Remove dodge event
    btn.onmouseover = null;

    setTimeout(() => {
        nextStep(6);
    }, 800);
}

// Initialize
function init() {
    startCountdown();
    startMessageRotation();
    createFloatingHearts();
    setupInteractions();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

// Countdown Logic
function startCountdown() {
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            celebrate();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateTimeCard(elDays, days);
        updateTimeCard(elHours, hours);
        updateTimeCard(elMinutes, minutes);
        updateTimeCard(elSeconds, seconds);
    }, 1000);
}

function updateTimeCard(element, value) {
    // Format with leading zero
    const formatted = value < 10 ? `0${value}` : value;

    // Only animate if changed
    if (element.innerText !== formatted.toString()) {
        element.innerText = formatted;
        element.parentElement.classList.remove('pop');
        void element.parentElement.offsetWidth; // trigger reflow
        element.parentElement.classList.add('pop');
    }
}

// Message Rotation
function startMessageRotation() {
    setInterval(() => {
        if (!fireworksActive) {
            messageIndex = (messageIndex + 1) % messages.length;

            // Fade out
            messageBox.style.opacity = '0';
            messageBox.style.transform = 'translateY(10px)';

            setTimeout(() => {
                messageText.innerText = messages[messageIndex];
                // Fade in
                messageBox.style.opacity = '1';
                messageBox.style.transform = 'translateY(0)';
            }, 500);
        }
    }, 5000); // Change every 5 seconds
}

// Celebration (Midnight)
function celebrate() {
    fireworksActive = true;

    // Update Text
    title.innerText = "🎆 Happy New Year! 🎆";
    title.style.color = "#FF4081";

    // Update Message
    messageText.innerText = "Happy New Year, my favorite person 💕";
    messageBox.style.backgroundColor = "rgba(255, 240, 245, 0.9)";
    messageBox.style.transform = "scale(1.1)";

    // Update Hero
    // Make hero jump faster or change (we'll just scale it up specifically here)
    heroImg.parentElement.style.animation = "floating 0.5s ease-in-out infinite";

    // Show Fireworks
    canvas.classList.add('active');
    loopFireworks();

    updateTimeCard(elDays, 0);
    updateTimeCard(elHours, 0);
    updateTimeCard(elMinutes, 0);
    updateTimeCard(elSeconds, 0);
}

// Interactions
function setupInteractions() {
    heroImg.addEventListener('click', () => {
        const reactions = ["Hehe! That tickles! 🤭", "You're cute! 🥰", "Boop! 👆", "Can't wait! 🎉"];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

        messageText.innerText = randomReaction;

        // Small bounce effect on click
        heroImg.style.transform = "scale(0.9) rotate(-5deg)";
        setTimeout(() => {
            heroImg.style.transform = "scale(1.05) rotate(0deg)";
        }, 200);
    });
}

// Background Decoration Generator
function createFloatingHearts() {
    const container = document.querySelector('.background-decorations');
    const heartSymbols = ['❤', '💖', '✨', '🌸'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Random positioning
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';

        container.appendChild(heart);
    }
}

// Simple Fireworks System
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticle(x, y) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x,
            y: y,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            radius: Math.random() * 3 + 1,
            velocity: {
                x: (Math.random() - 0.5) * 6,
                y: (Math.random() - 0.5) * 6
            },
            alpha: 1
        });
    }
}

function loopFireworks() {
    if (!fireworksActive) return;

    // Clear with trail effect
    ctx.fillStyle = 'rgba(255, 240, 245, 0.2)'; // Use bg color with low opacity for trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Randomly spawn fireworks
    if (Math.random() < 0.05) {
        createParticle(Math.random() * canvas.width, Math.random() * canvas.height / 2);
    }

    // Update and draw particles
    particles.forEach((particle, index) => {
        particle.velocity.y += 0.05; // gravity
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.alpha -= 0.01;

        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();

        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(loopFireworks);
}

// Start
init();
