class NavManager {
    constructor() {
        this.cartCountElements = document.querySelectorAll('.cart-count');
        this.initializeNavigation();
    }

    initializeNavigation() {
        // Initialize cart count on page load
        this.updateCartCount();

        // Listen for storage events (when cart is updated in another tab)
        window.addEventListener('storage', (e) => {
            if (e.key === 'cart') {
                this.updateCartCount();
            }
        });

        // Add custom event listener for cart updates
        window.addEventListener('cartUpdated', () => {
            this.updateCartCount();
        });
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update all cart count elements on the page
        this.cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }
}

// Initialize nav manager after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navManager = new NavManager();
}); 