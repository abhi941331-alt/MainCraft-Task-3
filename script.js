const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-links a");
const navCheck = document.getElementById("nav-check");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.getElementById("contactForm");
const formStatus = document.querySelector(".form-status");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message")
};

const errors = {
  name: document.getElementById("nameError"),
  email: document.getElementById("emailError"),
  message: document.getElementById("messageError")
};

function updateNavbar() {
  nav.classList.toggle("scrolled", window.scrollY > 50);

  let currentSection = "home";
  document.querySelectorAll("main section").forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

function setThemeLabel() {
  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark", document.body.classList.contains("dark-mode"));
  setThemeLabel();
}

function showError(fieldName, message) {
  fields[fieldName].classList.add("error");
  errors[fieldName].textContent = message;
}

function clearError(fieldName) {
  fields[fieldName].classList.remove("error");
  errors[fieldName].textContent = "";
}

function validateContactForm() {
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  Object.keys(fields).forEach(clearError);
  formStatus.textContent = "";

  if (!fields.name.value.trim()) {
    showError("name", "Please enter your name.");
    isValid = false;
  }

  if (!fields.email.value.trim()) {
    showError("email", "Please enter your email.");
    isValid = false;
  } else if (!emailPattern.test(fields.email.value.trim())) {
    showError("email", "Please enter a valid email.");
    isValid = false;
  }

  if (!fields.message.value.trim()) {
    showError("message", "Please write a message.");
    isValid = false;
  }

  return isValid;
}

window.addEventListener("scroll", updateNavbar);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navCheck.checked = false;
  });
});

themeToggle.addEventListener("click", toggleDarkMode);

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validateContactForm()) {
    return;
  }

  formStatus.textContent = "Form submitted successfully!";
  contactForm.reset();
});

Object.keys(fields).forEach((fieldName) => {
  fields[fieldName].addEventListener("input", () => clearError(fieldName));
});

if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark-mode");
}

setThemeLabel();
updateNavbar();
