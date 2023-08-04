document.getElementById("toggleHeaderBtn").addEventListener("click", function() {
  var header = document.querySelector('header');
  header.style.display = header.style.display === 'flex' ? 'none' : 'flex';
});


// Parallax effect on scroll
function handleParallax() {
  const parallax = document.querySelector("#home");
  const scrollPosition = window.pageYOffset;

  // Mobile devices
  if (window.innerWidth < 768) {
    parallax.style.transform = "";
  } else {
    // Adjust parallax effect based on scroll position
    const blurValue = (scrollPosition * 0.01).toFixed(1); // Calculate the blur value based on scroll position
    parallax.style.backgroundPosition = `center bottom -${scrollPosition * 0.7}px`;
    parallax.style.filter = `blur(${blurValue}px)`; // Apply the blur effect
  }
}

window.addEventListener("scroll", handleParallax);
window.addEventListener("resize", handleParallax);
handleParallax(); // Call the function initially

// Get all menu items
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

// Function to check if the user is on a mobile device
const isMobileDevice = () => {
  return window.innerWidth < 768;
};

// Function to check if the page is visible
const isPageVisible = () => {
  return !document.hidden;
};

// Function to handle touch start and touch end events for mobile devices
const handleTouchEvents = (item, touchStart) => {
  if (isPageVisible()) {
    if (touchStart) {
      handleMouseEnter(item);
    } else {
      handleMouseLeave(item);
    }
  }
};

// Intersection Observer callback function
const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    const item = entry.target;
    if (entry.isIntersecting) {
      if (isMobileDevice()) {
        item.addEventListener('touchstart', () => handleTouchEvents(item, true));
        item.addEventListener('touchend', () => handleTouchEvents(item, false));
      } else {
        item.addEventListener('mouseenter', () => handleMouseEnter(item));
        item.addEventListener('mouseleave', () => handleMouseLeave(item));
      }
    } else {
      item.removeEventListener('mouseenter', () => handleMouseEnter(item));
      item.removeEventListener('mouseleave', () => handleMouseLeave(item));
      item.removeEventListener('touchstart', () => handleTouchEvents(item, true));
      item.removeEventListener('touchend', () => handleTouchEvents(item, false));
    }
  });
};

// Options for Intersection Observer
const options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No offset from the viewport edge
  threshold: 0.5, // Trigger when at least 50% of the element is visible
};

// Create a new Intersection Observer
const observer = new IntersectionObserver(handleIntersection, options);

// Loop through each menu item and observe it
menuItems.forEach(item => {
  item.isRotated = false;
  observer.observe(item);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const target = document.querySelector(event.target.getAttribute('href'));

    // Scroll to the target element
    target.scrollIntoView({ behavior: 'smooth' });
  });
});