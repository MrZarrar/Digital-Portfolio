let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active')
};

document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault(); // Prevent the default anchor behavior

    const content = button.previousElementSibling; // Select the element before the button
    if (content.style.display === 'none' || !content.style.display) {
      content.style.display = 'block'; // Show the hidden content
      button.textContent = 'Read Less'; // Update button text
    } else {
      content.style.display = 'none'; // Hide the content again
      button.textContent = 'Read More'; // Reset button text
    }
  });
});

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    };
  });

  let header = document.querySelector('header');

  header.classList.toggle('sticky', window.scrollY > 100);


  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

};


/* scroll reveal */
ScrollReveal({
  /* reset: true, */
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', {origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', {origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', {origin: 'right'});


/* Typed JS */
const typed  = new Typed('.multiple-text', {
  strings: ['Student', 'Future Software Engineer'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
})


// Mobile hover fix for social media icons
document.querySelectorAll('.social-media a').forEach(icon => {
  let tapped = false;

  icon.addEventListener('touchstart', (event) => {
    if (!tapped) {
      // First tap - trigger the hover effect
      event.preventDefault(); // Prevent the link from being followed
      icon.classList.add('hover-active'); // Add a class to show hover styles
      tapped = true;
      setTimeout(() => tapped = false, 500); // Reset after 500ms
    } else {
      // Second tap - follow the link
      tapped = false; // Reset immediately
      window.location.href = icon.href;
    }
  });
});
