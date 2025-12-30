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
import { auth, db, storage } from "./firebase-config.js";

const response = await fetch('/api/admin/dashboard', {
  headers: {
    'Authorization': `Bearer ${firebaseIdToken}`
  }
});

// Add your Firebase configuration to js/admin-auth.js and js/admin-dashboard.js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const ADMIN_EMAILS = [
  'your-email@example.com',
  'admin@fitindia.com'
];