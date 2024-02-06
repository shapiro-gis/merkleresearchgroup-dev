var currentSlide = 0;
var slides = document.querySelectorAll('.slide');
var prevButton = document.querySelector('.custom-prev');
var nextButton = document.querySelector('.custom-next');
var intervalId; // Variable to store the interval ID

// Function to start the automatic carousel
function startCarousel() {
  intervalId = setInterval(nextSlide, 4000); // Change image every 3 seconds
}
// Start the carousel immediately upon page load
startCarousel();

prevButton.addEventListener('click', function() {
  clearInterval(intervalId); // Clear the interval when the button is clicked
  showSlide(currentSlide - 1);
  startCarousel(); // Restart the automatic carousel
});

nextButton.addEventListener('click', function() {
  clearInterval(intervalId); // Clear the interval when the button is clicked
  showSlide(currentSlide + 1);
  startCarousel(); // Restart the automatic carousel
});

function showSlide(n) {
  slides[currentSlide].style.transform = 'translateY(100%)'; // Slide current slide up
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].style.transform = 'translateY(0)'; // Slide next slide into view
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}