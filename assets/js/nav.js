class NavManager {
    constructor() {
        this.cartCountElements = document.querySelectorAll('.cart-count');
        this.adminLink = document.getElementById('admin-link');
        this.adminLinkMobile = document.getElementById('admin-link-mobile');
        this.initializeNavigation();
        this.checkAdminStatus();
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

        // Add click handlers for admin links
        this.setupAdminLinks();
    }

    setupAdminLinks() {
        const handleAdminClick = async (e) => {
            e.preventDefault();
            const adminToken = sessionStorage.getItem('adminToken');
            
            if (!adminToken) {
                // Not logged in, redirect to admin login
                window.location.href = 'admin.html';
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`
                    }
                });

                if (response.ok) {
                    // Authorized, redirect to dashboard
                    window.location.href = 'admin-dashboard.html';
                } else {
                    // Token invalid or unauthorized
                    sessionStorage.removeItem('adminToken');
                    window.location.href = 'admin.html';
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
                // If API is not accessible, still try to redirect to admin login
                window.location.href = 'admin.html';
            }
        };

        // Add click handlers to both desktop and mobile admin links
        if (this.adminLink) {
            this.adminLink.addEventListener('click', handleAdminClick);
        }
        if (this.adminLinkMobile) {
            this.adminLinkMobile.addEventListener('click', handleAdminClick);
        }
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Update all cart count elements on the page
        this.cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }

    async checkAdminStatus() {
        try {
            const adminToken = sessionStorage.getItem('adminToken');
            if (adminToken) {
                const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`
                    }
                });

                if (response.ok) {
                    this.showAdminAuthenticated();
                } else {
                    this.showAdminUnauthenticated();
                }
            } else {
                this.showAdminUnauthenticated();
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
            this.showAdminUnauthenticated();
        }
    }

    showAdminAuthenticated() {
        if (this.adminLink) {
            this.adminLink.classList.add('authenticated');
            this.adminLink.title = 'Access Admin Dashboard';
            this.adminLink.href = 'admin-dashboard.html';
        }
        if (this.adminLinkMobile) {
            this.adminLinkMobile.classList.add('authenticated');
            this.adminLinkMobile.title = 'Access Admin Dashboard';
            this.adminLinkMobile.href = 'admin-dashboard.html';
        }
    }

    showAdminUnauthenticated() {
        if (this.adminLink) {
            this.adminLink.classList.remove('authenticated');
            this.adminLink.title = 'Admin Login Required';
            this.adminLink.href = 'admin.html';
        }
        if (this.adminLinkMobile) {
            this.adminLinkMobile.classList.remove('authenticated');
            this.adminLinkMobile.title = 'Admin Login Required';
            this.adminLinkMobile.href = 'admin.html';
        }
    }
}

// Initialize nav manager after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navManager = new NavManager();
}); 