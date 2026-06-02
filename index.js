// ====================== REGISTER BUTTON ======================
const registerBtn = document.getElementById('registerBtn');
const successAlert = document.getElementById('successAlert');

if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    registerBtn.textContent = 'Processing...';
    registerBtn.disabled = true;

    setTimeout(() => {
      registerBtn.textContent = 'Registered ✅';
      if (successAlert) {
        successAlert.style.display = 'enable';
      }
    }, 1500);
  });
}

// ====================== BOOK BUTTONS ======================
document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".event-card").forEach(card => 
      card.classList.remove("selected"));
    this.closest(".event-card").classList.add("selected");
  });
});

// ====================== NAVIGATION ======================
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");

    const target = this.getAttribute("href").substring(1);

    document.getElementById("events").style.display = 
      (target === "events" || target === "home") ? "grid" : "none";
    
    document.getElementById("about").style.display = 
      target === "about" ? "enable" : "none";
    
    document.getElementById("contact").style.display = 
      target === "contact" ? "enable" : "none";
  });
});

// ====================== CONTACT FORM ======================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    contactForm.reset();
    const success = document.getElementById("contact-success");
    if (success) success.style.display = "enable";
  });
}

// Default view
document.getElementById("events").style.display = "grid";
