// Initialize Firebase (same config as admin-auth.js)
const firebaseConfig = {
    // Add your Firebase config here
};

firebase.initializeApp(firebaseConfig);

// Check authentication
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = '/admin.html';
        return;
    }
    
    // Display admin email
    document.getElementById('admin-email').textContent = user.email;
    
    // Load dashboard data
    loadDashboardData();
});

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    firebase.auth().signOut();
});

async function loadDashboardData() {
    try {
        const token = await firebase.auth().currentUser.getIdToken();
        const response = await fetch('/api/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        updateDashboardStats(data);
        await loadProducts();
        await loadOrders();
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

function updateDashboardStats(data) {
    document.getElementById('total-orders').textContent = data.totalOrders;
    document.getElementById('total-products').textContent = data.totalProducts;
    document.getElementById('recent-orders-count').textContent = data.recentOrders.length;
}

async function loadProducts() {
    try {
        const token = await firebase.auth().currentUser.getIdToken();
        const response = await fetch('/api/admin/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const products = await response.json();
        const tableBody = document.getElementById('products-table-body');
        
        tableBody.innerHTML = products.map(product => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">${product.name}</td>
                <td class="px-6 py-4 whitespace-nowrap">${product.category}</td>
                <td class="px-6 py-4 whitespace-nowrap">₹${product.price}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button onclick="editProduct('${product._id}')" class="text-blue-600 hover:text-blue-900 mr-3">
                        Edit
                    </button>
                    <button onclick="deleteProduct('${product._id}')" class="text-red-600 hover:text-red-900">
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function loadOrders() {
    try {
        const token = await firebase.auth().currentUser.getIdToken();
        const response = await fetch('/api/admin/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const orders = await response.json();
        const tableBody = document.getElementById('orders-table-body');
        
        tableBody.innerHTML = orders.map(order => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">${order._id}</td>
                <td class="px-6 py-4 whitespace-nowrap">${order.customerEmail}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <select onchange="updateOrderStatus('${order._id}', this.value)" class="select-field">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">₹${order.total}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button onclick="viewOrderDetails('${order._id}')" class="text-blue-600 hover:text-blue-900">
                        View Details
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Product Modal Functions
function openProductModal(product = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('modal-title');
    
    if (product) {
        title.textContent = 'Edit Product';
        form.elements['product-name'].value = product.name;
        form.elements['product-category'].value = product.category;
        form.elements['product-price'].value = product.price;
        form.elements['product-description'].value = product.description;
        form.dataset.productId = product._id;
    } else {
        title.textContent = 'Add New Product';
        form.reset();
        delete form.dataset.productId;
    }
    
    modal.classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

// Product CRUD Operations
async function saveProduct(formData) {
    try {
        const token = await firebase.auth().currentUser.getIdToken();
        const productId = document.getElementById('product-form').dataset.productId;
        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `/api/admin/products/${productId}` : '/api/admin/products';
        
        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            closeProductModal();
            loadProducts();
        }
    } catch (error) {
        console.error('Error saving product:', error);
    }
}

async function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        const token = await firebase.auth().currentUser.getIdToken();
        const response = await fetch(`/api/admin/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            loadProducts();
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Order Management
async function updateOrderStatus(orderId, status) {
    try {
        const token = await firebase.auth().currentUser.getIdToken();
        const response = await fetch(`/api/admin/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            loadOrders();
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }
}

// Event Listeners
document.getElementById('add-product-btn').addEventListener('click', () => openProductModal());

document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: e.target.elements['product-name'].value,
        category: e.target.elements['product-category'].value,
        price: Number(e.target.elements['product-price'].value),
        description: e.target.elements['product-description'].value
    };
    await saveProduct(formData);
}); 