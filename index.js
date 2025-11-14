// Event data
const eventData = {
  culture: {
    name: "Culture Gala 2025",
    date: "October 30, 2025",
    time: "7:00 PM",
    location: "Harmony Hall, 88 Unity Street",
    description: "Celebrate world cultures with music, dance, and cuisine!",
  },
  worship: {
    name: "Worship Event 2025",
    date: "November 15, 2025",
    time: "6:00 PM",
    location: "Old Auditorium, 12 Heritage Road",
    description:
      "Join us for a soulful evening of music, reflection, and community worship.",
  },
  tech: {
    name: "Tech Expo 2025",
    date: "December 5, 2025",
    time: "10:00 AM",
    location: "Innovation Center, 101 Future Blvd",
    description: "Explore the latest in technology, gadgets, and innovation.",
  },
};

// Book button logic (open modal)
const bookBtns = document.querySelectorAll(".book-btn");
const eventCards = document.querySelectorAll(".event-card");
const rsvpModal = document.getElementById("rsvp-modal");
const rsvpSection = document.getElementById("rsvp-section");
const rsvpEventName = document.getElementById("rsvp-event-name");
const rsvpClose = document.getElementById("rsvp-close");
let selectedEvent = null;

bookBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove highlight from all cards
    eventCards.forEach((card) => card.classList.remove("selected"));
    // Highlight selected card
    const card = this.closest(".event-card");
    card.classList.add("selected");
    // Show RSVP form for this event
    const eventKey = card.dataset.event;
    selectedEvent = eventKey;
    rsvpEventName.textContent = eventData[eventKey].name;
    rsvpSection.style.display = "block";
    rsvpModal.classList.add("active");
    document.body.style.overflow = "hidden";
    // Hide about/contact
    document.getElementById("about").style.display = "none";
    document.getElementById("contact").style.display = "none";
  });
});
if (rsvpClose) {
  rsvpClose.onclick = function () {
    rsvpModal.classList.remove("active");
    rsvpSection.style.display = "none";
    document.body.style.overflow = "";
    eventCards.forEach((card) => card.classList.remove("selected"));
  };
}
rsvpModal.addEventListener("click", function (e) {
  if (e.target === rsvpModal) {
    rsvpModal.classList.remove("active");
    rsvpSection.style.display = "none";
    document.body.style.overflow = "";
    eventCards.forEach((card) => card.classList.remove("selected"));
  }
});

// RSVP form logic
const form = document.getElementById("rsvp-form");
const message = document.getElementById("rsvp-message");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const attending = form.attending.value;
    if (!name || !attending) return;
    let text = "";
    if (attending === "yes") {
      text = `Thank you, <b>${name}</b>! Your RSVP for <b>${
        eventData[selectedEvent]?.name || ""
      }</b> is confirmed.`;
    } else {
      text = `Thank you for letting us know, <b>${name}</b>. Sorry you can't make it to <b>${
        eventData[selectedEvent]?.name || ""
      }</b>.`;
    }
    message.innerHTML = text;
    message.style.display = "block";
    form.reset();
    setTimeout(() => {
      rsvpModal.classList.remove("active");
      rsvpSection.style.display = "none";
      document.body.style.overflow = "";
      eventCards.forEach((card) => card.classList.remove("selected"));
      message.style.display = "none";
    }, 2000);
  });
}

// Navbar navigation logic
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

// Contact form logic
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

// Theme toggle logic
const themeToggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
function setTheme(theme) {
  document.body.classList.toggle("light-theme", theme === "light");
  themeToggle.textContent = theme === "light" ? "🌞" : "🌙";
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
