import { loginAdmin } from './firebase-config.js';

class AdminAuth {
    constructor() {
        this.form = document.getElementById('admin-login-form');
        this.errorDisplay = document.getElementById('error-message');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLogin();
        });
    }

    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            this.showLoading();
            this.hideError();

            // Validate email
            if (email !== 'admin@fitindia.com') {
                throw new Error('Invalid admin email address');
            }

            await loginAdmin(email, password);
            
            // If login is successful, redirect will happen in loginAdmin function
        } catch (error) {
            console.error('Login failed:', error);
            this.showError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            this.hideLoading();
        }
    }

    showError(message) {
        this.errorDisplay.textContent = message;
        this.errorDisplay.classList.remove('hidden');
    }

    hideError() {
        this.errorDisplay.textContent = '';
        this.errorDisplay.classList.add('hidden');
    }

    showLoading() {
        this.loadingIndicator.classList.remove('hidden');
        this.form.querySelector('button[type="submit"]').disabled = true;
    }

    hideLoading() {
        this.loadingIndicator.classList.add('hidden');
        this.form.querySelector('button[type="submit"]').disabled = false;
    }
}

// Initialize admin authentication
document.addEventListener('DOMContentLoaded', () => {
    new AdminAuth();
}); 