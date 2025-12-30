// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj7Da...",
  authDomain: "reckonhackathon.firebaseapp.com",
  projectId: "reckonhackathon",
  storageBucket: "reckonhackathon.firebasestorage.app",
  messagingSenderId: "417918535837",
  appId: "1:417918535837:web:23fd1f00d622d88658ec74",
  measurementId: "G-GE0BYZZ3SR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore Database
const storage = getStorage(app); // Firebase Storage

// Function to handle admin login
export async function loginAdmin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Get the ID token
        const token = await user.getIdToken();
        
        // Store the token in sessionStorage
        sessionStorage.setItem('adminToken', token);
        
        try {
            // Try to verify with backend
            const response = await fetch('http://localhost:8000/api/admin/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                window.location.href = 'admin-dashboard.html';
            } else {
                throw new Error('Unauthorized access');
            }
        } catch (apiError) {
            console.error('API Error:', apiError);
            // If API is not accessible, check email and proceed
            if (email === 'admin@fitindia.com') {
                // Fallback: proceed to dashboard if email matches
                window.location.href = 'admin-dashboard.html';
            } else {
                throw new Error('Unauthorized access');
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Function to check admin status
export async function checkAdminStatus() {
    const token = sessionStorage.getItem('adminToken');
    if (!token) return false;

    try {
        const response = await fetch('http://localhost:8000/api/admin/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.ok;
    } catch (error) {
        console.error('Admin status check failed:', error);
        // Fallback: check if admin token exists
        return !!sessionStorage.getItem('adminToken');
    }
}

export { auth, db, storage };
