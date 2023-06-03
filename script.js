window.addEventListener("scroll", function() {
  const parallax = document.querySelector("#home");
  let scrollPosition = window.pageYOffset;

  parallax.style.backgroundPosition = `center bottom -${scrollPosition * 0.7}px`;
});



// Get all menu items
const menuItems = document.querySelectorAll('.menu-item');

// Loop through each menu item
menuItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const paragraph = item.querySelector('p');
    const header = item.querySelector('h3');
    paragraph.classList.add('active');
    header.classList.add('active');
    item.style.transform = "rotateY(180deg)"; // Add rotation
  });

  item.addEventListener('mouseleave', () => {
    const paragraph = item.querySelector('p');
    const header = item.querySelector('h3');
    paragraph.classList.remove('active');
    header.classList.remove('active');
    item.style.transform = ""; // Reset rotation
  });
});

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (event) => {
      event.preventDefault();

      const target = document.querySelector(event.target.getAttribute('href'));

      // Scroll to the target element
      target.scrollIntoView({ behavior: 'smooth' });

  });
});


