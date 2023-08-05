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

// Get all menu items
const menuItems = document.querySelectorAll('.menu-item');

// Function to rotate the menu item
const rotateMenuItem = (item) => {
  const paragraph = item.querySelector('p');
  const header = item.querySelector('h3');
  paragraph.classList.add('active');
  header.classList.add('active');

  if (!item.isRotated) {
    item.style.transform = "rotateY(180deg)"; // Add rotation
    item.isRotated = true;
  }
};

// Function to reset rotation of the menu item
const resetRotation = (item) => {
  const paragraph = item.querySelector('p');
  const header = item.querySelector('h3');
  paragraph.classList.remove('active');
  header.classList.remove('active');

  if (item.isRotated) {
    item.style.transform = ""; // Reset rotation
    item.isRotated = false;
  }
};

// Loop through each menu item
menuItems.forEach(item => {
  item.isRotated = false;

  const handleMouseEnter = () => {
    if (!isMobileDevice()) {
      rotateMenuItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileDevice()) {
      resetRotation(item);
    }
  };

  // Add event listeners for mouse events
  item.addEventListener('mouseenter', handleMouseEnter);
  item.addEventListener('mouseleave', handleMouseLeave);

   // Add event listeners for touch events
   item.addEventListener('touchstart', handleMouseEnter);
   item.addEventListener('touchend', handleMouseLeave);
});

const isMobileDevice = () => {
  return window.innerWidth <= 768; // Change the width value as needed for your mobile breakpoint
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

if (isMobileDevice()) {
  const observerMobile = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const item = entry.target;
      if (entry.isIntersecting) {
        rotateMenuItem(item);
      } else {
        resetRotation(item);
      }
    });
  }, options);

  menuItems.forEach((item) => {
    observerMobile.observe(item);
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
  header.classList.toggle('visible');

  var menuButtonIcon = document.getElementById("toggleHeaderBtn").querySelector('i');

  if (header.classList.contains('visible')) {
    // Change the button icon to 'fa-times' when the header is active
    menuButtonIcon.classList.remove('fa-bars');
    menuButtonIcon.classList.add('fa-times');
  } else {
    // Change the button icon back to 'fa-bars' when the header is not active
    menuButtonIcon.classList.remove('fa-times');
    menuButtonIcon.classList.add('fa-bars');
  }
});

const filterMenuItems = (type) => {
  const menuContainers = document.querySelectorAll('.menu-container');
  menuContainers.forEach((container) => {
    if (container.getAttribute('data-type') === type) {
      container.classList.add('active');
      container.classList.add('jump-animation'); // Add jump animation class
    } else {
      container.classList.remove('active');
      container.classList.remove('jump-animation'); // Remove jump animation class from other containers
    }
  });
};

// Add event listeners for menu nav buttons
const menuNavButtons = document.querySelectorAll('.menu-nav-btn');
menuNavButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-type');
    filterMenuItems(type);
  });
});

// Initially show the "Especialidades" menu items
filterMenuItems('especialidades');


