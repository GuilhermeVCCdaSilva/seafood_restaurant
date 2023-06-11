// Parallax effect on scroll
window.addEventListener("scroll", function() {
  const parallax = document.querySelector("#home");
  let scrollPosition = window.pageYOffset;

  parallax.style.backgroundPosition = `center bottom -${scrollPosition * 0.7}px`;
});

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

  // Add event listeners for touch events
  item.addEventListener('touchstart', handleMouseEnter);
  item.addEventListener('touchend', handleMouseLeave);
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
