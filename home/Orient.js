// Debug flag
const DEBUG = true;

// Function to log debug messages
function debug(message) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`);
  }
}

// Check if the device supports DeviceOrientationEvent
if (window.DeviceOrientationEvent) {
  debug('DeviceOrientationEvent is supported');
  window.addEventListener('deviceorientation', handleOrientation, true);
} else {
  debug('DeviceOrientationEvent is not supported');
  simulateOrientation();
}

function handleOrientation(event) {
  const cards = document.querySelectorAll('.card1, .card2, .card3');
  
  if (cards.length === 0) {
    debug('No card elements found');
    return;
  }

  // Get the orientation angles
  const beta = event.beta;  // X-axis rotation (-180 to 180)
  const gamma = event.gamma; // Y-axis rotation (-90 to 90)

  debug(`Orientation - Beta: ${beta}, Gamma: ${gamma}`);

  // Limit the rotation to a maximum of 15 degrees
  const maxSkew = 15;
  const skewX = Math.max(-maxSkew, Math.min(maxSkew, gamma));
  const skewY = Math.max(-maxSkew, Math.min(maxSkew, beta));

  // Apply the skew transformation to all cards
  cards.forEach((card, index) => {
    const multiplier = 1 + (index * 0.2); // Increase effect for each subsequent card
    const transform = `perspective(1000px) rotateX(${-skewY * multiplier}deg) rotateY(${skewX * multiplier}deg)`;
    card.style.transform = transform;
    debug(`Applied transform to card${index + 1}: ${transform}`);
  });
}

// Fallback for desktop or unsupported devices
function simulateOrientation() {
  debug('Simulating orientation for desktop or unsupported devices');
  const cards = document.querySelectorAll('.card1, .card2, .card3, .card4');
  
  if (cards.length === 0) {
    debug('No card elements found');
    return;
  }

  document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    
    const skewX = ((clientX / innerWidth) - 0.5) * 30;
    const skewY =  ((clientY / innerHeight) - 0.5) * 30;
    
    cards.forEach((card, index) => {
      const multiplier = 1 + (index * 0.2); // Increase effect for each subsequent card
      const transform = `perspective(1000px) rotateX(${-skewY * multiplier}deg) rotateY(${skewX * multiplier}deg)`;
      card.style.transform = transform;
      debug(`Simulated transform for card${index + 1}: ${transform}`);
    });
  });
}

// Request permission for device orientation on iOS 13+
function requestPermission() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    debug('Requesting device orientation permission for iOS');
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          debug('Permission granted for accessing device orientation');
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          debug('Permission denied for accessing device orientation');
          simulateOrientation();
        }
      })
      .catch(error => {
        debug(`Error requesting permission: ${error}`);
        simulateOrientation();
      });
  } else {
    debug('Permission not required, adding event listener directly');
    window.addEventListener('deviceorientation', handleOrientation, true);
  }
}

// Initialize the script
function init() {
  debug('Initializing orientation skew script');
  const cards = document.querySelectorAll('.card1, .card2, .card3, .card4');
  if (cards.length === 0) {
    debug('No card elements found. Please ensure elements with classes "card1", "card2", and "card3" exist.');
    return;
  }
  requestPermission();
}

// Call init when the page loads
document.addEventListener('DOMContentLoaded', init);