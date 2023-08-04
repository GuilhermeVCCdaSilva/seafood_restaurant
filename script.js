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

// Loop through each menu item
menuItems.forEach(item => {
  let isRotated = false;

  const handleMouseEnter = () => {
    const paragraph = item.querySelector('p');
    const header = item.querySelector('h3');
    paragraph.classList.add('active');
    header.classList.add('active');

    if (!isRotated) {
      item.style.transform = "rotateY(180deg)"; // Add rotation
      isRotated = true;
    }
  };

  const handleMouseLeave = () => {
    const paragraph = item.querySelector('p');
    const header = item.querySelector('h3');
    paragraph.classList.remove('active');
    header.classList.remove('active');

    if (isRotated) {
      item.style.transform = ""; // Reset rotation
      isRotated = false;
    }
  };

  // Add event listeners for mouse events
  item.addEventListener('mouseenter', handleMouseEnter);
  item.addEventListener('mouseleave', handleMouseLeave);
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
  const observerMobile = new IntersectionObserver(options);
  menuItems.forEach((item) => {
    item.isRotated = false;
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
  header.style.display = header.style.display === 'flex' ? 'none' : 'flex';
});
