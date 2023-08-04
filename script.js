// Parallax effect on scroll
function handleParallax() {
  const parallax = document.querySelector("#home");
  const scrollPosition = window.pageYOffset;

  // Mobile devices
  if (window.innerWidth < 768) {
    parallax.style.transform = "";
  } else {
    // Adjust parallax effect based on scroll position
    const blurValue = Math.round(scrollPosition * 0.01); // Calculate the blur value based on scroll position
    parallax.style.backgroundPosition = `center bottom -${scrollPosition * 0.7}px`;
    parallax.style.filter = `blur(${blurValue}px)`; // Apply the blur effect
  }
}

window.addEventListener("scroll", handleParallax);
window.addEventListener("resize", handleParallax);
handleParallax(); // Call the function initially

/// Get all menu items
const menuItems = document.querySelectorAll('.menu-item');

// Function to handle mouse enter event
const handleMouseEnter = (item) => {
  const paragraph = item.querySelector('p');
  const header = item.querySelector('h3');
  paragraph.classList.add('active');
  header.classList.add('active');

  if (!item.isRotated) {
    item.style.transform = "rotateY(180deg)"; // Add rotation
    item.isRotated = true;
  }
};

// Function to handle mouse leave event
const handleMouseLeave = (item) => {
  const paragraph = item.querySelector('p');
  const header = item.querySelector('h3');
  paragraph.classList.remove('active');
  header.classList.remove('active');

  if (item.isRotated) {
    item.style.transform = ""; // Reset rotation
    item.isRotated = false;
  }
};

// Function to handle intersection for mobile devices
const handleIntersectionMobile = (entries, observer) => {
  entries.forEach(entry => {
    const item = entry.target;
    if (entry.isIntersecting) {
      handleMouseEnter(item);
    } else {
      handleMouseLeave(item);
    }
  });
};

// Function to check if the user is on a mobile device
const isMobileDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

// Intersection Observer callback function for desktop devices
const handleIntersectionDesktop = (entries, observer) => {
  entries.forEach(entry => {
    const item = entry.target;
    if (entry.isIntersecting) {
      item.addEventListener('pointerenter', () => handleMouseEnter(item));
      item.addEventListener('pointleave', () => handleMouseLeave(item));
    } else {
      item.removeEventListener('pointerenter', () => handleMouseEnter(item));
      item.removeEventListener('pointleave', () => handleMouseLeave(item));
    }
  });
};

// Options for Intersection Observer
const options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No offset from the viewport edge
  threshold: 0.5, // Trigger when at least 50% of the element is visible
};

// Check if the user is on a mobile device and observe accordingly
if (isMobileDevice()) {
  const observerMobile = new IntersectionObserver(handleIntersectionMobile, options);
  menuItems.forEach(item => {
    item.isRotated = false;
    observerMobile.observe(item);
  });
} else {
  const observerDesktop = new IntersectionObserver(handleIntersectionDesktop, options);
  menuItems.forEach(item => {
    item.isRotated = false;
    observerDesktop.observe(item);
  });
}
// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const target = document.querySelector(event.target.getAttribute('href'));

    // Scroll to the target element
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Toggle the header visibility when clicking the mobile menu button
document.getElementById("toggleHeaderBtn").addEventListener("click", function() {
  var header = document.querySelector('header');
  header.style.display = header.style.display === 'none' ? 'flex' : 'none';
});
