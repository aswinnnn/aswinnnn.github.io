// Enhanced Parallax Cards Script with Gyro Support

console.log("Script started");

// Constants for parallax effect
const MAX_ROTATION = 10; // Maximum rotation in degrees
const MAX_IMAGE_MOVE = 8; // Maximum image movement in pixels

// Helper function to map a value from one range to another
function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

// Variable to store the currently active card
let activeCard = null;

// Function to handle mouse movement for desktop
function handleMouseMove(e) {
  if (!activeCard) return;

  const { clientX, clientY } = e;
  const rect = activeCard.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2;
  const cardCenterY = rect.top + rect.height / 2;

  // Calculate distance from mouse to card center
  const distanceX = clientX - cardCenterX;
  const distanceY = clientY - cardCenterY;

  applyParallaxEffect(distanceX, distanceY, rect.width, rect.height);
}

// Function to handle device orientation for mobile
function handleOrientation(e) {
  if (!activeCard) return;

  const { beta, gamma } = e;
  if (beta === null || gamma === null) return;

  const rect = activeCard.getBoundingClientRect();
  
  // Map gyro values to our coordinate system
  const distanceX = mapRange(gamma, -90, 90, -rect.width / 2, rect.width / 2);
  const distanceY = mapRange(beta, -90, 90, -rect.height / 2, rect.height / 2);

  applyParallaxEffect(distanceX, distanceY, rect.width, rect.height);
}

// Function to apply parallax effect
function applyParallaxEffect(distanceX, distanceY, width, height) {
  // Calculate rotation based on distance
  const rotateY = mapRange(distanceX, -width/2, width/2, -MAX_ROTATION, MAX_ROTATION);
  const rotateX = mapRange(distanceY, -height/2, height/2, MAX_ROTATION, -MAX_ROTATION);

  // Calculate image movement (inverse of rotation for parallax effect)
  const moveX = mapRange(distanceX, -width/2, width/2, MAX_IMAGE_MOVE, -MAX_IMAGE_MOVE);
  const moveY = mapRange(distanceY, -height/2, height/2, -MAX_IMAGE_MOVE, MAX_IMAGE_MOVE);

  // Apply smooth transition to card
  activeCard.style.transition = 'transform 0.2s ease-out';
  activeCard.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateZ(0)
  `;

  // Apply parallax effect to background image
  activeCard.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
}

// Function to handle card activation
function handleCardActivate(e) {
  activeCard = e.target;
}

// Function to handle card deactivation
function handleCardDeactivate(e) {
  if (activeCard === e.target) {
    activeCard.style.transition = 'transform 0.5s ease-out, background-position 0.5s ease-out';
    activeCard.style.transform = 'none';
    activeCard.style.backgroundPosition = '50% 50%';
    activeCard = null;
  }
}

// Function to load images
function loadCardImages() {
  console.log("Loading card images");
  const cards = document.querySelectorAll('.card');
  console.log("Number of cards found:", cards.length);

  cards.forEach((card, index) => {
    const imageUrl = card.getAttribute('data-image');
    console.log(`Card ${index} image URL:`, imageUrl);

    if (imageUrl) {
      const img = new Image();
      img.onload = function() {
        card.style.backgroundImage = `url(${imageUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        console.log(`Set background image for card ${index}`);
      };
      img.onerror = function() {
        console.error(`Failed to load image for card ${index}`);
      };
      img.src = imageUrl;
    } else {
      console.log(`No data-image attribute found for card ${index}`);
    }
  });
}

// Function to initialize parallax effect
function initParallax() {
  console.log("Initializing parallax effect");
  const cards = document.querySelectorAll('.card');

  if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
    console.log("Using device orientation");
    window.addEventListener('deviceorientation', handleOrientation);
    cards.forEach(card => {
      card.addEventListener('touchstart', handleCardActivate);
      card.addEventListener('touchend', handleCardDeactivate);
    });
  } else {
    console.log("Using mouse movement");
    document.addEventListener('mousemove', handleMouseMove);
    cards.forEach(card => {
      card.addEventListener('mouseenter', handleCardActivate);
      card.addEventListener('mouseleave', handleCardDeactivate);
    });
  }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM content loaded");
  loadCardImages();
  initParallax();
});

// Log any errors
window.onerror = function(message, source, lineno, colno, error) {
  console.error("An error occurred:", message, "at", source, ":", lineno, ":", colno, error);
};