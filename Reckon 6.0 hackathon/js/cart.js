class CartManager {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        this.initializeCart();
        // Wait for nav manager to be ready
        this.ensureNavManager();
    }

    ensureNavManager() {
        if (window.navManager) {
            window.navManager.updateCartCount();
        } else {
            setTimeout(() => this.ensureNavManager(), 100);
        }
    }

    initializeCart() {
        this.renderCart();
        this.updateCartSummary();
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-items');
        if (this.cartItems.length === 0) {
            cartContainer.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-gray-500">Your cart is empty</p>
                    <a href="products.html" class="btn-primary inline-block mt-4">
                        Continue Shopping
                    </a>
                </div>
            `;
            return;
        }

        cartContainer.innerHTML = this.cartItems.map(item => `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img 
                            src="${item.image}" 
                            alt="${item.name}" 
                            class="w-24 h-24 object-cover rounded-md"
                        >
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                            <p class="text-gray-600 text-sm">${item.description}</p>
                            <p class="text-green-600 font-bold mt-1">₹${item.price}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center border rounded-md">
                            <button 
                                class="px-3 py-1 hover:bg-gray-100"
                                onclick="cartManager.updateQuantity(${item.id}, -1)"
                            >-</button>
                            <span class="px-4 py-1 border-x">${item.quantity}</span>
                            <button 
                                class="px-3 py-1 hover:bg-gray-100"
                                onclick="cartManager.updateQuantity(${item.id}, 1)"
                            >+</button>
                        </div>
                        <button 
                            class="text-red-500 hover:text-red-700"
                            onclick="cartManager.removeItem(${item.id})"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateQuantity(productId, change) {
        this.cartItems = this.cartItems.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + change;
                if (newQuantity < 1) return item;
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        this.saveCart();
    }

    removeItem(productId) {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.renderCart();
        this.updateCartSummary();
        // Dispatch custom event
        window.dispatchEvent(new Event('cartUpdated'));
    }

    updateCartCount() {
        const count = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
    }

    updateCartSummary() {
        const subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = subtotal > 0 ? 99 : 0; // Free shipping over ₹999
        const total = subtotal + shipping;

        document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `₹${shipping.toFixed(2)}`;
        document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    }

    checkout() {
        if (this.cartItems.length === 0) {
            alert('Your cart is empty');
            return;
        }
        // Implement checkout logic here
        alert('Proceeding to checkout...');
    }
}

// Initialize cart manager
const cartManager = new CartManager(); 