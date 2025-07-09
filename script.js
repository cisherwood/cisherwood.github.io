// SUP3RCUTE SCENECORE JAVASCRIPT

// Sound effects (placeholder - replace with actual audio files)
const sounds = {
    click: new Audio('data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQ4AAAA='), // placeholder
    hover: new Audio('data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQ4AAAA='), // placeholder
    heart: new Audio('data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQ4AAAA=')  // placeholder
};

// Music Player Variables
let currentTrack = 0;
let isPlaying = false;
let audioPlayer;
let tracks = [
    // Add your track names here
    'your-track-1.mp3',
    'your-track-2.mp3',
    'your-track-3.mp3'
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMusicPlayer();
    initMouseTrail();
    initSoundEffects();
    initFloatingElements();
    initProductFilters();
    initAnimations();
    updateVisitorCounter();
    initBlinkEffect();
});

// Early 2000s blink effect for browsers that don't support it
function initBlinkEffect() {
    const blinkElements = document.querySelectorAll('blink');
    blinkElements.forEach(element => {
        setInterval(() => {
            element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
    });
}

// Music Player Functions
function initMusicPlayer() {
    audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const progressBar = document.querySelector('.progress-fill');
    const trackName = document.querySelector('.track-name');
    
    if (!audioPlayer) return;
    
    // Play/Pause functionality
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audioPlayer.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            audioPlayer.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
        playSound('click');
    });
    
    // Previous track
    prevBtn.addEventListener('click', function() {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        updateTrack();
        playSound('click');
    });
    
    // Next track
    nextBtn.addEventListener('click', function() {
        currentTrack = (currentTrack + 1) % tracks.length;
        updateTrack();
        playSound('click');
    });
    
    // Volume toggle
    let isMuted = false;
    volumeBtn.addEventListener('click', function() {
        if (isMuted) {
            audioPlayer.volume = 1;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            isMuted = false;
        } else {
            audioPlayer.volume = 0;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMuted = true;
        }
        playSound('click');
    });
    
    // Progress bar update
    audioPlayer.addEventListener('timeupdate', function() {
        if (audioPlayer.duration) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    });
    
    // Auto-play next track
    audioPlayer.addEventListener('ended', function() {
        currentTrack = (currentTrack + 1) % tracks.length;
        updateTrack();
        if (isPlaying) {
            audioPlayer.play();
        }
    });
    
    // Update track info
    function updateTrack() {
        trackName.textContent = `n0w playing: ${tracks[currentTrack]}`;
        // Update audio source here when you add actual files
        // audioPlayer.src = `audio/${tracks[currentTrack]}`;
    }
    
    // Initialize first track
    updateTrack();
}

// Mouse Trail Effect
function initMouseTrail() {
    const hearts = ['💕', '💖', '💗', '💓', '💝'];
    let heartIndex = 0;
    
    document.addEventListener('mousemove', function(e) {
        // Create heart element
        const heart = document.createElement('div');
        heart.className = 'mouse-trail';
        heart.textContent = hearts[heartIndex];
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        
        document.body.appendChild(heart);
        
        // Cycle through hearts
        heartIndex = (heartIndex + 1) % hearts.length;
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    });
}

// Sound Effects
function playSound(soundType) {
    if (sounds[soundType]) {
        sounds[soundType].currentTime = 0;
        sounds[soundType].play().catch(e => {
            // Handle autoplay restrictions
            console.log('Sound play prevented:', e);
        });
    }
}

function initSoundEffects() {
    // Add click sounds to buttons
    document.querySelectorAll('.btn, .btn-scene, .btn-player, .btn-filter').forEach(button => {
        button.addEventListener('click', () => playSound('click'));
    });
    
    // Add hover sounds to interactive elements
    document.querySelectorAll('.product-card, .nav-link, .value-card').forEach(element => {
        element.addEventListener('mouseenter', () => playSound('hover'));
    });
    
    // Heart sound for special elements
    document.querySelectorAll('.floating-heart, .brand-hearts').forEach(element => {
        element.addEventListener('click', () => playSound('heart'));
    });
}

// Enhanced Floating Elements
function initFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) return;
    
    // Add more dynamic floating elements
    const elements = [
        { icon: '💕', color: '#FF1493' },
        { icon: '💀', color: '#FFFFFF' },
        { icon: '⭐', color: '#00FFFF' },
        { icon: '✨', color: '#8A2BE2' },
        { icon: '🖤', color: '#FF1493' },
        { icon: '💜', color: '#8A2BE2' },
        { icon: '⚡', color: '#39FF14' },
        { icon: '🌟', color: '#00FFFF' }
    ];
    
    // Create additional floating elements
    elements.forEach((element, index) => {
        const floatingEl = document.createElement('div');
        floatingEl.className = 'floating-element-dynamic';
        floatingEl.textContent = element.icon;
        floatingEl.style.color = element.color;
        floatingEl.style.position = 'absolute';
        floatingEl.style.fontSize = '1.5rem';
        floatingEl.style.left = Math.random() * 100 + '%';
        floatingEl.style.top = Math.random() * 100 + '%';
        floatingEl.style.animation = `float ${6 + Math.random() * 4}s ease-in-out infinite`;
        floatingEl.style.animationDelay = Math.random() * 5 + 's';
        floatingEl.style.pointerEvents = 'none';
        floatingEl.style.zIndex = '-1';
        
        floatingContainer.appendChild(floatingEl);
    });
}

// Product Filter Functionality
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const productCards = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Animation Enhancements
function initAnimations() {
    // Glitch effect for brand text
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.5s infinite';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.animation = 'glitch 2s infinite';
        });
    });
    
    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.bg-pattern');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.product-card, .about-card, .value-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Add your newsletter signup logic here
            console.log('Newsletter signup:', email);
            
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'subscrib3d! 💕';
            button.style.background = '#39FF14';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                this.reset();
            }, 2000);
            
            playSound('heart');
        });
    }
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .floating-element-dynamic {
        animation: float 6s ease-in-out infinite;
    }
`;
document.head.appendChild(style);

// Early 2000s Console easter egg
console.log(`
    ███████╗██╗   ██╗██████╗ ██████╗ ██████╗  ██████╗██╗   ██╗████████╗███████╗
    ██╔════╝██║   ██║██╔══██╗╚════██╗██╔══██╗██╔════╝██║   ██║╚══██╔══╝██╔════╝
    ███████╗██║   ██║██████╔╝ █████╔╝██████╔╝██║     ██║   ██║   ██║   █████╗  
    ╚════██║██║   ██║██╔═══╝  ╚═══██╗██╔══██╗██║     ██║   ██║   ██║   ██╔══╝  
    ███████║╚██████╔╝██║     ██████╔╝██║  ██║╚██████╗╚██████╔╝   ██║   ███████╗
    ╚══════╝ ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝
                                                                                 
    welcome 2 the scene, fellow emo kid 💕💀
    made with <3 for the scenecore community
    
    *** BEST VIEWED IN IE6 WITH FLASH PLAYER ***
    *** GEOCITIES FOREVER ***
`);

// Early 2000s visitor counter
function updateVisitorCounter() {
    const counter = document.getElementById('visitor-count');
    if (counter) {
        let count = localStorage.getItem('visitor-count') || '000042';
        let numCount = parseInt(count) + Math.floor(Math.random() * 3) + 1;
        let newCount = numCount.toString().padStart(6, '0');
        counter.textContent = newCount;
        localStorage.setItem('visitor-count', newCount);
    }
}

// Update visitor counter on page load
document.addEventListener('DOMContentLoaded', updateVisitorCounter);

// Create audio folder structure reminder
console.log('🎵 Music Player Setup:');
console.log('Create an "audio" folder and add your music files:');
console.log('- audio/track1.mp3');
console.log('- audio/track2.mp3');
console.log('- audio/track3.mp3');
console.log('Then update the tracks array in script.js');

// Enable music player when audio files are added
function checkAudioFiles() {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer && audioPlayer.src) {
        console.log('🎵 Music player ready!');
    } else {
        console.log('🎵 Add your audio files to enable the music player');
    }
}

// Check for audio files on load
setTimeout(checkAudioFiles, 1000);