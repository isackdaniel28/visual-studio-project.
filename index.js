// ==========================================
// 1. Book Button Logic (Card Selection)
// ==========================================
const bookBtns = document.querySelectorAll(".book-btn");
const eventCards = document.querySelectorAll(".event-card");

bookBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove highlight from all cards
    eventCards.forEach((card) => card.classList.remove("selected"));
    
    // Highlight selected card
    const card = this.closest(".event-card");
    card.classList.add("selected"); // Fixed missing .classList here
  });
});

// ==========================================
// 2. Register Button Logic (Newly Added)
// ==========================================
// Select elements from the DOM
const registerBtn = document.getElementById('registerBtn');
const successAlert = document.getElementById('successAlert');

// Add the click action
if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    // 1. Change button text to show it's processing
    registerBtn.textContent = 'Processing...';
    registerBtn.disabled = true;

    // 2. Simulate a brief network delay (1.5 seconds)
    setTimeout(() => {
        // 3. Update button state to finished
        registerBtn.textContent = 'Registered ✅';
        
        // 4. Reveal the success message
        if (successAlert) {
          successAlert.style.display = 'block';
        }
    }, 1500);
  });
}

// ==========================================
// 3. Navbar Navigation Logic
// ==========================================
const navLinks = document.querySelectorAll(".nav-link");
const mainSections = {
  home: () => {
    document.querySelector(".event-cards").style.display = "grid";
    document.getElementById("about").style.display = "none";
    document.getElementById("contact").style.display = "none";
  },
  events: () => {
    document.querySelector(".event-cards").style.display = "grid";
    document.getElementById("about").style.display = "none";
    document.getElementById("contact").style.display = "none";
  },
  about: () => {
    document.querySelector(".event-cards").style.display = "none";
    document.getElementById("about").style.display = "flex";
    document.getElementById("contact").style.display = "none";
  },
  contact: () => {
    document.querySelector(".event-cards").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("contact").style.display = "flex";
  },
};

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
    const section = this.className.match(/nav-(\w+)/)?.[1];
    if (mainSections[section]) mainSections[section]();
  });
});

// Default to Home
mainSections.home();

// ==========================================
// 4. Contact Form Logic
// ==========================================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    contactForm.reset();
    const success = document.getElementById("contact-success");
    if (success) {
      success.style.display = "block";
      setTimeout(() => {
        success.style.display = "none";
      }, 2500);
    }
  });
}

// ==========================================
// 5. Theme Toggle Logic
// ==========================================
const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");
  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "🌞" : "🌙";
  }
  localStorage.setItem("theme", theme);
}

if (themeToggle) {
  // Initial theme
  const saved = localStorage.getItem("theme");
  setTheme(saved ? saved : prefersDark ? "dark" : "light");
  themeToggle.onclick = function () {
    const isLight = document.body.classList.contains("light-theme");
    setTheme(isLight ? "dark" : "light");
  };
}
