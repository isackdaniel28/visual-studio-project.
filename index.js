// Global Variables
let currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

// DOM Elements
const authModal = document.getElementById('auth-modal');
const successModal = document.getElementById('success-modal');
const loginBtn = document.getElementById('login-btn');
const authLink = document.getElementById('auth-link');
const rsvpBtn = document.getElementById('rsvp-btn');
const eventsList = document.getElementById('events-list');
const authRequired = document.getElementById('auth-required');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const verificationSection = document.getElementById('verification-section');
const verifyBtn = document.getElementById('verify-btn');
const loginError = document.getElementById('login-error');
const regError = document.getElementById('reg-error');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const closes = document.querySelectorAll('.close');
const contactForm = document.getElementById('contact-form');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    attachEventListeners();
    checkMobileNav();
});

// Update UI based on auth status
function updateAuthUI() {
    if (currentUser) {
        authLink.innerHTML = `<a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout (${currentUser.name})</a>`;
        authRequired.style.display = 'none';
        loadEvents(); // Show events after login
    } else {
        authLink.innerHTML = `<a href="#" id="login-btn"><i class="fas fa-sign-in-alt"></i> Login</a>`;
        authRequired.style.display = 'block';
    }
}

// Attach Event Listeners
function attachEventListeners() {
    // Open Modal
    loginBtn?.addEventListener('click', openModal);
    document.getElementById('logout-btn')?.addEventListener('click', logout);

    // Tab Switching
    tabBtns.forEach(btn => btn.addEventListener('click', switchTab));

    // Forms
    loginForm?.addEventListener('submit', handleLogin);
    registerForm?.addEventListener('submit', handleRegister);
    verifyBtn?.addEventListener('submit', handleVerify); // Wait, addEventListener
    verifyBtn?.addEventListener('click', handleVerify);

    // Social Logins (Simulated)
    document.querySelector('.google')?.addEventListener('click', () => socialLogin('google'));
    document.querySelector('.github')?.addEventListener('click', () => socialLogin('github'));

    // Contact Form
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Ujumbe umetumwa! Asante.');
        contactForm.reset();
    });

    // Closes
    closes.forEach(close => close.addEventListener('click', closeModal));

    // RSVP (Requires Auth)
    rsvpBtn?.addEventListener('click', () => {
        if (!currentUser) {
            openModal();
            return;
        }
        showSuccess('RSVP yako imefanikiwa! Tutaonana kwenye tukio.');
    });
}

// Open Modal
function openModal(e) {
    e?.preventDefault();
    authModal.style.display = 'block';
}

// Close Modal
function closeModal() {
    authModal.style.display = 'none';
    successModal.style.display = 'none';
    clearErrors();
}

// Switch Tabs
function switchTab(e) {
    const tab = e.target.dataset.tab;
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    e.target.classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simple validation
    if (!email || !password) {
        showError('login', 'Tafadhali jaza maelezo yote.');
        return;
    }

    // Simulate check (use real backend if possible)
    const user = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
    if (user[email] && user[email].password === password) {
        currentUser = user[email];
        localStorage.setItem('user', JSON.stringify(currentUser));
        closeModal();
        updateAuthUI();
        showSuccess('Umeingia kikamilifu!');
    } else {
        showError('login', 'Email au nywila si sahihi.');
    }
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !password || password.length < 6) {
        showError('reg', 'Tafadhali jaza maelezo sahihi. Nywila lazima iwe na herufi 6+.');
        return;
    }

    // Check if exists
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
    if (users[email]) {
        showError('reg', 'Email hii tayari imesajiliwa.');
        return;
    }

    // Simulate email send
    users[email] = { name, password, verified: false };
    localStorage.setItem('users', JSON.stringify(users));
    showError('reg', ''); // Clear
    registerForm.style.display = 'none';
    verificationSection.style.display = 'block';
    showSuccess('Code imetumwa kwa email yako. Thibitisha sasa.', false); // No auto close
}

// Handle Verify
function handleVerify() {
    const code = document.getElementById('verify-code').value;
    if (code.length !== 6) {
        alert('Code lazima iwe na tarakimu 6.');
        return;
    }

    // Simulate verification (real: check backend)
    const users = JSON.parse(localStorage.getItem('users'));
    const email = document.getElementById('reg-email').value;
    users[email].verified = true;
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = users[email];
    localStorage.setItem('user', JSON.stringify(currentUser));
    closeModal();
    updateAuthUI();
    showSuccess('Umesajiliwa na kuthibitishwa! Karibu.');
}

// Social Login (Simulated - Real: Use OAuth)
function socialLogin(provider) {
    // Simulate success
    currentUser = { name: `User from ${provider}`, email: `user@${provider}.com`, verified: true };
    localStorage.setItem('user', JSON.stringify(currentUser));
    closeModal();
    updateAuthUI();
    showSuccess(`Umeingia kupitia ${provider}!`);
}

// Logout
function logout(e) {
    e?.preventDefault();
    localStorage.removeItem('user');
    currentUser = null;
    updateAuthUI();
}

// Show Error
function showError(type, msg) {
    const el = type === 'login' ? loginError : regError;
    el.textContent = msg;
}

// Clear Errors
function clearErrors() {
    loginError.textContent = '';
    regError.textContent = '';
}

// Show Success Modal
function showSuccess(msg, autoClose = true) {
    document.getElementById('success-msg').textContent = msg;
    successModal.style.display = 'block';
    if (autoClose) setTimeout(closeModal, 3000);
}

// Load Events (After Auth)
function loadEvents() {
    eventsList.innerHTML = `
        <div class="event-card">
            <h3>Ibada ya Jumapili</h3>
            <p>Tarehe: 20 Novemba 2025 | Mahali: Bugema University</p>
            <button onclick="rsvpEvent('ibada')">RSVP</button>
        </div>
        <!-- Ongeza matukio mengine -->
    `;
}

// RSVP Event (Example)
function rsvpEvent(eventId) {
    if (currentUser) {
        showSuccess(`RSVP yako kwa ${eventId} imefanikiwa!`);
    }
}

// Mobile Nav
function checkMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}
