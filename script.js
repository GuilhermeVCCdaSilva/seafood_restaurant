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
  
 // Check if it's a touch device
 const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;

 if (isTouchDevice) {
   // Add Intersection Observer for touch devices
   const observerOptions = {
     root: null, // Use the viewport as the root
     threshold: 0.5, // When at least 50% of the target is in view
   };

   const observer = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         handleMouseEnter();
       } else {
         handleMouseLeave();
       }
     });
   }, observerOptions);

   observer.observe(item);
 }
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