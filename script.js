// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
   // --- Mobile menu (tablet & down) ---
const nav = document.getElementById('navbar');
const toggle = document.getElementById('navbarToggle');
const menu  = document.getElementById('navbarMenu');
const links = document.querySelectorAll('.navbar__menu .navbar__link');

if (toggle && nav && menu) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');          // <-- this is what CSS listens to
    toggle.classList.toggle('active');        // (optional) animate the burger
  });

  // Close drawer when a link is clicked
  links.forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.classList.remove('active');
  }));

  // Safety: if user resizes up to desktop, ensure menu is closed
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1280) {
      nav.classList.remove('is-open');
      toggle.classList.remove('active');
    }
  });
}
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolling down
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update active link based on scroll position
        updateActiveNavLink();
    });
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                navbarLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.navbar__link[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Smooth scroll for navigation links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initial active link setup
    updateActiveNavLink();
});

// Update the existing scrollToSection function to work with the navbar
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

// Helpers (keep or adapt if you already have them)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}
function clearErrors() {
  ["nameError", "emailError", "messageError"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });
}
function showStatus(msg, type) {
  const box = document.getElementById("formStatus");
  if (!box) return;
  box.textContent = msg;
  box.className = `form-status ${type || ""}`;
}

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const formData = new FormData(form);
  const name = (formData.get("name") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  let hasErrors = false;
  if (!name) { showError("nameError", "Name is required"); hasErrors = true; }
  if (!email) { showError("emailError", "Email is required"); hasErrors = true; }
  else if (!isValidEmail(email)) { showError("emailError", "Please enter a valid email"); hasErrors = true; }
  if (!message) { showError("messageError", "Message is required"); hasErrors = true; }

  if (hasErrors) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const originalHTML = submitButton.innerHTML;
  submitButton.innerHTML = "<span>Sending...</span>";
  submitButton.disabled = true;

  try {
    // IMPORTANT: this posts to the action URL in your form tag
    const res = await fetch(form.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData
    });

    if (res.ok) {
      showStatus("Thank you! Your message has been sent successfully.", "success");
      form.reset();
    } else {
      // Try to read validation details from Formspree
      let err = "Something went wrong. Please try again.";
      try {
        const data = await res.json();
        if (data && data.errors && data.errors.length) {
          err = data.errors.map(e => e.message).join(" ");
        }
      } catch(_) {}
      showStatus(err, "error");
    }
  } catch (e2) {
    showStatus("Network error. Please check your connection and try again.", "error");
  } finally {
    submitButton.innerHTML = originalHTML;
    submitButton.disabled = false;
  }
});

    // Real-time validation
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });
});

function clearErrors() {
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    const input = errorElement.previousElementSibling;
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
    input.style.borderColor = '#ef4444';
}

function clearFieldError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form-error')) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        input.style.borderColor = '';
    }
}

function validateField(input) {
    const value = input.value.trim();
    const name = input.name;
    
    switch(name) {
        case 'name':
            if (!value) {
                showError('nameError', 'Name is required');
            }
            break;
        case 'email':
            if (!value) {
                showError('emailError', 'Email is required');
            } else if (!isValidEmail(value)) {
                showError('emailError', 'Please enter a valid email');
            }
            break;
        case 'message':
            if (!value) {
                showError('messageError', 'Message is required');
            }
            break;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 5000);
}

// Add ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);