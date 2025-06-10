// DOM Elements
const navbar = document.getElementById("navbar")
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")
const themeToggle = document.getElementById("theme-toggle")
const contactForm = document.getElementById("contact-form")

// Navigation functionality
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.98)"
    }
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.95)"
    }
  }
})

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.documentElement.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update icon
  const icon = themeToggle.querySelector("i")
  if (newTheme === "dark") {
    icon.className = "fas fa-sun"
  } else {
    icon.className = "fas fa-moon"
  }
})

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light"
document.documentElement.setAttribute("data-theme", savedTheme)
if (savedTheme === "dark") {
  themeToggle.querySelector("i").className = "fas fa-sun"
}

// Typing animation
const typingText = document.querySelector(".typing-text")
const texts = [
  "IT Infrastructure",
  "Networking",
  "Front-end Developer",
  "IT Support",
  "Coffee Lover",
]

let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeWriter() {
  const currentText = texts[textIndex]

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    typeSpeed = 500
  }

  setTimeout(typeWriter, typeSpeed)
}

// Start typing animation
typeWriter()

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const targetStr = counter.getAttribute("data-target").replace(",", ".");
    const target = parseFloat(targetStr);
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Number.isInteger(current)
          ? Math.floor(current)
          : current.toFixed(2);
        setTimeout(updateCounter, 20);
      } else {
        // Final output
        counter.textContent = Number.isInteger(target)
          ? target
          : target.toFixed(2);
      }
    };

    updateCounter();
  });
}


// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-fill")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")

      // Trigger specific animations
      if (entry.target.classList.contains("about-stats")) {
        animateCounters()
      }

      if (entry.target.classList.contains("skills-category")) {
        animateSkillBars()
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(".timeline-item, .certificate-item, .education-item, .about-stats, .skills-category")
  .forEach((el) => {
    observer.observe(el)
  })

// Experience tabs functionality
const tabButtons = document.querySelectorAll(".tab-button")
const tabContents = document.querySelectorAll(".tab-content")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab")

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked button and corresponding content
    button.classList.add("active")
    document.getElementById(targetTab).classList.add("active")
  })
})

// Contact form handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Thank you for your message! I will get back to you soon.")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate hero elements
  setTimeout(() => {
    document.querySelector(".hero-title").classList.add("fade-in-up")
  }, 300)

  setTimeout(() => {
    document.querySelector(".hero-subtitle").classList.add("fade-in-up")
  }, 600)

  setTimeout(() => {
    document.querySelector(".hero-description").classList.add("fade-in-up")
  }, 900)

  setTimeout(() => {
    document.querySelector(".hero-buttons").classList.add("fade-in-up")
  }, 1200)
})

// Floating elements animation
document.querySelectorAll(".floating-element").forEach((element, index) => {
  element.style.animationDelay = `${index * 0.5}s`
})

// Add hover effects to timeline items
document.querySelectorAll(".timeline-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "translateX(10px)"
  })

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateX(0)"
  })
})

// Scroll to top functionality
const scrollToTopBtn = document.createElement("button")
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
scrollToTopBtn.className = "scroll-to-top"
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-medium);
`

document.body.appendChild(scrollToTopBtn)

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = "1"
    scrollToTopBtn.style.visibility = "visible"
  } else {
    scrollToTopBtn.style.opacity = "0"
    scrollToTopBtn.style.visibility = "hidden"
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Add ripple effect to buttons
document.querySelectorAll(".btn, .tab-button, .social-link").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

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
        `

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple animation
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Your scroll handling code here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// WhatsApp Integration
const whatsappNumber = "6282238182586" // Your WhatsApp number with country code

// WhatsApp quick message functionality
document.getElementById("send-whatsapp").addEventListener("click", () => {
  const message = document.getElementById("whatsapp-message").value.trim()

  if (!message) {
    alert("Please enter a message before sending to WhatsApp")
    return
  }

  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  window.open(whatsappUrl, "_blank")

  // Clear the message after sending
  document.getElementById("whatsapp-message").value = ""
})

// Send contact form to WhatsApp
document.getElementById("send-to-whatsapp").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const subject = document.getElementById("subject").value.trim()
  const message = document.getElementById("message").value.trim()

  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields before sending to WhatsApp")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Format message for WhatsApp
  const whatsappMessage = `Hello Afdinal! 👋

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}

---
Sent from your portfolio website`

  const encodedMessage = encodeURIComponent(whatsappMessage)
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  window.open(whatsappUrl, "_blank")
})

// Create floating WhatsApp button
const createWhatsAppFloat = () => {
  const whatsappFloat = document.createElement("a")
  whatsappFloat.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Afdinal! I'm interested in discussing opportunities with you.")}`
  whatsappFloat.target = "_blank"
  whatsappFloat.className = "whatsapp-float"
  whatsappFloat.innerHTML = '<i class="fab fa-whatsapp"></i>'
  whatsappFloat.title = "Chat with me on WhatsApp"

  document.body.appendChild(whatsappFloat)

  // Add click tracking
  whatsappFloat.addEventListener("click", () => {
    console.log("WhatsApp floating button clicked")
  })
}

// Initialize floating WhatsApp button
createWhatsAppFloat()

// Enhanced contact form with WhatsApp option
const originalContactFormHandler = contactForm.addEventListener
contactForm.removeEventListener("submit", originalContactFormHandler)

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address")
    return
  }

  // Show options for sending
  const sendOption = confirm("Choose how to send your message:\n\nOK = Send via Email\nCancel = Send via WhatsApp")

  if (sendOption) {
    // Send via Email (original functionality)
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  } else {
    // Send via WhatsApp
    const whatsappMessage = `Hello Afdinal! 👋

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}

---
Sent from your portfolio website`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
    contactForm.reset()
  }
})

// Add WhatsApp status indicator
const addWhatsAppStatus = () => {
  const whatsappItems = document.querySelectorAll(".whatsapp-link, .whatsapp-btn")

  whatsappItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      // You could add online status checking here if needed
      item.title = "Click to chat on WhatsApp - Usually responds within an hour"
    })
  })
}

// Initialize WhatsApp status
addWhatsAppStatus()

// Add smooth scroll to contact section when WhatsApp buttons are clicked
document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    // Add a small delay to show the action
    setTimeout(() => {
      console.log("Redirecting to WhatsApp...")
    }, 100)
  })
})

console.log("Portfolio website loaded successfully! 🚀")
