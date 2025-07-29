import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';

// TODO: Replace the configuration with your Firebase project settings
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  appId: 'YOUR_APP_ID'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const feedback = document.getElementById('feedback');

// Registration
const regForm = document.getElementById('registerForm');
regForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await cred.user.sendEmailVerification();
    feedback.textContent = 'Account created. Please verify your email.';
  } catch (err) {
    feedback.textContent = err.message;
  }
});

// Login
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (cred.user.emailVerified) {
      window.location.href = 'https://safeops.carrd.co/';
    } else {
      feedback.textContent = 'Please verify your email before logging in.';
    }
  } catch (err) {
    feedback.textContent = err.message;
  }
});
