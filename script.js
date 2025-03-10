document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const hamburger = document.getElementById("hamburger");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const body = document.body;

  // Add scrolling effect for the nav bar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Toggle the 'scrolled' class when hamburger is clicked
  hamburger.addEventListener('click', function() {
    nav.classList.remove('scrolled'); // Remove 'scrolled' class on click
  });

  // Hamburger menu toggle
  hamburger.addEventListener("click", (event) => {
    event.stopPropagation();
    hamburger.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
    body.classList.toggle("no-scroll"); // Prevent scrolling when menu is active
  });

  // Close hamburger menu when clicking on the close button
  const closeMenu = document.querySelector('.hamburger-active'); // Assuming this is the class for the close button
  if (closeMenu) {
    closeMenu.addEventListener('click', function() {
      nav.classList.add('scrolled'); // Add 'scrolled' when closing the menu
      hamburger.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      body.classList.remove("no-scroll"); // Allow scrolling when menu is closed
    });
  }

  // Close hamburger menu when clicking outside the hamburger or the menu
  document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      hamburger.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      body.classList.remove("no-scroll"); // Allow scrolling when menu is closed
    }
  });

  // Close hamburger menu when clicking on the background of the menu
  hamburgerMenu.addEventListener("click", (event) => {
    if (event.target === hamburgerMenu) {
      hamburger.classList.remove("active");
      hamburgerMenu.classList.remove("active");
      body.classList.remove("no-scroll"); // Allow scrolling when menu is closed
    }
  });

  // Prevent closing the menu when clicking inside the hamburger button
  hamburgerMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Clear all input fields in the contact form after form submission and redirection
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission
      const submitButton = form.querySelector("button[type='submit']");
      submitButton.disabled = true; // Disable the submit button
      submitButton.textContent = "Submitting..."; // Change button text to indicate loading

      const formData = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            window.location.href = 'thank-you.html'; // Redirect to a thank you page
            form.reset(); // Resets all fields to their initial state
          } else {
            alert("There was an error submitting the form");
            submitButton.disabled = false; // Re-enable the submit button
            submitButton.textContent = "Submit"; // Reset button text
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert("There was an error submitting the form");
          submitButton.disabled = false; // Re-enable the submit button
          submitButton.textContent = "Submit"; // Reset button text
        });
    });
  }

  // Initialize slider
  showSlide(0); // Start with the first slide

  // Event listeners for service links
  document.querySelectorAll('.service-card a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      localStorage.setItem('scrollTarget', targetId);
      window.location.href = 'services.html';
    });
  });

  // Scroll to the target section if specified
  const scrollTarget = localStorage.getItem('scrollTarget');
  if (scrollTarget) {
    const targetElement = document.querySelector(scrollTarget);
    if (targetElement) {
      const elementRect = targetElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = elementRect.height;
      const offset = window.scrollY + elementRect.top - (viewportHeight / 2) + (elementHeight / 2);
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
    localStorage.removeItem('scrollTarget');
  }

  // Highlight active section
  const sections = document.querySelectorAll('.service-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    observer.observe(section);
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".description", 
    { opacity: 0, y: 50 }, 
    { 
      scrollTrigger: {
        trigger: ".description",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
      onComplete: function() {
        gsap.set(".description", { clearProps: "all" });
      }
    }
  );

  gsap.fromTo(".floating-img-container", 
    { opacity: 0, y: 50 }, 
    { 
      scrollTrigger: {
        trigger: ".floating-img-container",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
      onComplete: function() {
        gsap.set(".floating-img-container", { clearProps: "all" });
      }
    }
  );

  gsap.fromTo(".service", 
    { opacity: 0, y: 50 }, 
    { 
      scrollTrigger: {
        trigger: ".service",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      onComplete: function() {
        gsap.set(".service", { clearProps: "all" });
      }
    }
  );

  gsap.fromTo(".footer-section", 
    { opacity: 0, y: 50 }, 
    { 
      scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      onComplete: function() {
        gsap.set(".footer-section", { clearProps: "all" });
      }
    }
  );

  gsap.fromTo(".bkng-container", 
    { opacity: 0, y: 50 }, 
    { 
      scrollTrigger: {
        trigger: ".bkng-container",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: function() {
        gsap.set(".bkng-container", { clearProps: "all" });
      }
    }
  );

  // Page load animation for header elements
  gsap.fromTo("header .title", 
    { opacity: 0, y: -50 }, 
    { 
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }
  );

  gsap.fromTo("header .description", 
    { opacity: 0, y: -50 }, 
    { 
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
      ease: "power2.out"
    }
  );

  // Simple fade-in animation for services section, loading first row then second row
  const serviceCards = gsap.utils.toArray(".service-card");
  const firstRow = serviceCards.slice(0, 2);
  const secondRow = serviceCards.slice(2);

  firstRow.forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0 }, 
      { 
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true // Ensure the animation only happens once
        },
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: function() {
          gsap.set(card, { clearProps: "all" });
        }
      }
    );
  });

  secondRow.forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0 }, 
      { 
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true // Ensure the animation only happens once
        },
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: function() {
          gsap.set(card, { clearProps: "all" });
        }
      }
    );
  });
});

let currentSlideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");

  // Loop index if out of bounds
  if (index >= slides.length) currentSlideIndex = 0;
  else if (index < 0) currentSlideIndex = slides.length - 1;
  else currentSlideIndex = index;

  // Hide all slides and deactivate all dots
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.display = "none"; // Ensure the slide is hidden
  });
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Show the current slide and activate the corresponding dot
  slides[currentSlideIndex].classList.add("active");
  slides[currentSlideIndex].style.display = "flex"; // Ensure the slide is visible
  dots[currentSlideIndex].classList.add("active");
}

function prevSlide() {
  showSlide(currentSlideIndex - 1);
}

function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

function currentSlide(index) {
  showSlide(index);
}

// Function to scroll to a specific section and center it in the viewport
function scrollToSection(sectionId) {
  const targetElement = document.querySelector(sectionId);
  if (targetElement) {
    const elementRect = targetElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementHeight = elementRect.height;
    const offset = window.scrollY + elementRect.top - (viewportHeight / 2) + (elementHeight / 2);
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
}