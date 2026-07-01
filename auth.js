// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDThMga0C_4Z00olgnFb2U02HvI3hQiGsM",
    authDomain: "cowrywiseproject-level1.firebaseapp.com",
    projectId: "cowrywiseproject-level1",
    storageBucket: "cowrywiseproject-level1.firebasestorage.app",
    messagingSenderId: "494631458624",
    appId: "1:494631458624:web:7b757935ad646b1dc78ca5",
    measurementId: "G-JW3C58MBXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Save user data to localStorage
function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userEmail', userData.email);
}

// Get user data from localStorage
function getUserData() {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
}

// Check if user has completed profile
function hasCompletedProfile() {
    const userData = getUserData();
    return userData && userData.firstName && userData.lastName && userData.username && userData.phone && userData.password;
}

// Check if user has created PIN
function hasPIN() {
    return localStorage.getItem('userPin') !== null;
}

// Google Sign In for Signup
async function googleSignUpFlow() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Store Google user data
        const userData = {
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
            isGoogleAuth: true
        };
        
        saveUserData(userData);
        
        // Redirect to complete profile
        setTimeout(() => {
            window.location.href = 'complete-profile.html';
        }, 500);
    } catch (error) {
        console.error("Google Sign Up Error:", error);
        alert("Sign up failed: " + error.message);
    }
}

// Google Sign In for Login
async function googleSignInFlow() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Check if user has completed setup
        const userData = getUserData();
        
        if (userData && hasCompletedProfile() && hasPIN()) {
            // User has completed all steps, go to dashboard
            localStorage.setItem('userData', JSON.stringify({
                ...userData,
                email: user.email,
                uid: user.uid,
                isGoogleAuth: true
            }));
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        } else {
            // User needs to complete profile
            localStorage.setItem('userData', JSON.stringify({
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
                isGoogleAuth: true
            }));
            setTimeout(() => {
                window.location.href = 'complete-profile.html';
            }, 500);
        }
    } catch (error) {
        console.error("Google Sign In Error:", error);
        alert("Sign in failed: " + error.message);
    }
}

// Email/Password Login
async function emailPasswordLogin(email, password) {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        const userData = {
            email: user.email,
            uid: user.uid,
            isGoogleAuth: false
        };
        
        saveUserData(userData);
        
        // Go to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 500);
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
}

// Export functions
window.googleSignUpFlow = googleSignUpFlow;
window.googleSignInFlow = googleSignInFlow;
window.emailPasswordLogin = emailPasswordLogin;
window.getUserData = getUserData;
window.saveUserData = saveUserData;
window.hasCompletedProfile = hasCompletedProfile;
window.hasPIN = hasPIN;
