document.addEventListener('DOMContentLoaded', () => {
    const vinylRecord = document.querySelector('.vinyl-record');
    const vinylArtworks = document.querySelectorAll('.vinyl-artwork');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuItemDescs = document.querySelectorAll('.menu-item-desc');
    let rotation = 0;
    let isSpinning = false;
    let spinTimeout;

    // Album artwork URLs - replace with your favorite albums
    const albums = {
        album1: '/home/assets/art/bookends.avif', // Replace with actual album URLs
        album2: '/home/assets/art/are-you-experienced.avif',
        album3: '/home/assets/art/maggot-brain.avif',
        album4: '/home/assets/art/goo.avif'
    };

    // Set up album artworks
    vinylArtworks.forEach(artwork => {
        const albumKey = artwork.getAttribute('data-album');
        artwork.style.backgroundImage = `url(${albums[albumKey]})`;
    });

    function resetVinyl() {
        isSpinning = false;
        rotation = 0;
        vinylRecord.style.transition = 'transform 800ms ease';
        vinylRecord.style.transform = `rotate(${rotation}deg)`;
        
        // Reset active artwork
        setTimeout(() => {
            vinylArtworks.forEach(artwork => artwork.classList.remove('active'));
            vinylArtworks[0].classList.add('active');
        }, 1000); // Wait for rotation to complete
    }

    // Device orientation effect
    window.addEventListener('deviceorientation', (event) => {
        if (!isSpinning && event.gamma && event.beta) {
            const tiltX = Math.min(Math.max(event.gamma, -15), 15);
            const tiltY = Math.min(Math.max(event.beta, -15), 15);
            
            // Subtle rotation based on device tilt
            const gyroRotation = (tiltX + tiltY) / 2;
            
            vinylRecord.style.transition = 'transform 0.3s ease';
            vinylRecord.style.transform = `rotate(${gyroRotation}deg)`;
            
            menuItems.forEach((item, index) => {
                const factor = (index + 1) * 0.5;
                item.style.transform = `translate(${tiltX * factor}px, ${tiltY * factor}px)`;
            });
        }
    });

    // Menu item hover effects
    menuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            clearTimeout(spinTimeout);
            isSpinning = true;
            
            // Rotate vinyl and change artwork
            rotation += 180;
            vinylRecord.style.transition = 'transform 0.5s ease';
            vinylRecord.style.transform = `rotate(${rotation}deg)`;
            
            // Hide all artworks and show the one corresponding to this menu item
            vinylArtworks.forEach(artwork => artwork.classList.remove('active'));
            vinylArtworks[index].classList.add('active');
            
            // Other menu items effect
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            menuItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
            
            // Reset vinyl after a short delay
            spinTimeout = setTimeout(resetVinyl, 1000);
        });
    });

    // Touch event handling for mobile
    menuItems.forEach((item, index) => {
        item.addEventListener('touchstart', (e) => {
            menuItemDescs.forEach(desc => desc.style.opacity = 1);
            e.preventDefault(); // Prevent default touch behavior
            clearTimeout(spinTimeout);
            isSpinning = true;
            
            rotation += 180;
            vinylRecord.style.transition = 'transform 0.5s ease';
            vinylRecord.style.transform = `rotate(${rotation}deg)`;
            
            vinylArtworks.forEach(artwork => artwork.classList.remove('active'));
            vinylArtworks[index].classList.add('active');
        });

        item.addEventListener('touchend', () => {
            spinTimeout = setTimeout(resetVinyl, 800);
        });
    });

    // Initial setup
    vinylArtworks[0].classList.add('active');
});