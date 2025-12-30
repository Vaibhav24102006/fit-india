// Mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when window is resized to desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // 768px is the md breakpoint in Tailwind
        mobileMenu.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const introAnimation = document.getElementById('intro-animation');
    
    // Show the animation
    introAnimation.classList.remove('opacity-0');
    introAnimation.classList.remove('pointer-events-none');
    
    // Hide the animation after 3 seconds
    setTimeout(() => {
        introAnimation.classList.add('opacity-0');
        introAnimation.classList.add('pointer-events-none');
        
        // Remove the element completely after the transition
        setTimeout(() => {
            introAnimation.remove();
        }, 1000);
    }, 3000);
});
