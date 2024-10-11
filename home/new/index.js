document.addEventListener('DOMContentLoaded', () => {
    const vinylRecord = document.querySelector('.vinyl-record');
    const vinylArtworks = document.querySelectorAll('.vinyl-artwork');
    const menuItems = document.querySelectorAll('.menu-item');
    const albumInfo = document.querySelector('#album-info');
    let rotation = 0;
    let isSpinning = false;
    let spinTimeout;

    // Variables for drag functionality
    let isDragging = false;
    let startAngle = 5;
    let currentRotation = 0;
    let lastRotation = 0;
    let momentum = 1;
    let animationFrameId;

    
    // Album information
    const albums = {
        album1: {
            url: '/home/assets/art/bookends.avif',
            artist: 'Simon & Garfunkel',
            name: 'Bookends'
        },
        album2: {
            url: '/home/assets/art/are-you-experienced.avif',
            artist: 'Jimi Hendrix',
            name: 'Are You Experienced'
        },
        album3: {
            url: '/home/assets/art/maggot-brain.avif',
            artist: 'Funkadelic',
            name: 'Maggot Brain'
        },
        album4: {
            url: '/home/assets/art/goo.avif',
            artist: 'Sonic Youth',
            name: 'Goo'
        }
    };

    // Set up album artworks and info
    vinylArtworks.forEach((artwork, index) => {
        const albumKey = artwork.getAttribute('data-album');
        const album = albums[albumKey];
        artwork.style.backgroundImage = `url(${album.url})`;
    });

    function getAngle(event, vinyl) {
        const vinylRect = vinyl.getBoundingClientRect();
        const vinylCenterX = vinylRect.left + vinylRect.width / 2;
        const vinylCenterY = vinylRect.top + vinylRect.height / 2;
        
        let clientX, clientY;
        if (event.touches) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        
        return Math.atan2(clientY - vinylCenterY, clientX - vinylCenterX) * 180 / Math.PI;
    }

    function handleDragStart(event) {
        isDragging = true;
        startAngle = getAngle(event, vinylRecord);
        cancelAnimationFrame(animationFrameId);
        
        vinylRecord.style.transition = 'none';
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('touchmove', handleDrag, { passive: false });
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchend', handleDragEnd);
    }

    function handleDrag(event) {
        if (!isDragging) return;
        event.preventDefault();
        
        const currentAngle = getAngle(event, vinylRecord);
        const angleDiff = currentAngle - startAngle;
        
        currentRotation = lastRotation + angleDiff;
        momentum = angleDiff * 2; // Adjust this multiplier to change momentum sensitivity
        
        vinylRecord.style.transform = `rotate(${currentRotation}deg)`;
    }

    function handleDragEnd() {
        isDragging = false;
        lastRotation = currentRotation;
        
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('touchmove', handleDrag);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchend', handleDragEnd);
        
        // Apply momentum
        let speed = momentum;
        function spin() {
            if (Math.abs(speed) > 0.1) {
                currentRotation += speed;
                lastRotation = currentRotation;
                vinylRecord.style.transform = `rotate(${currentRotation}deg)`;
                speed *= 0.93; // Adjust this value to change how quickly the spin slows down
                animationFrameId = requestAnimationFrame(spin);
            }
        }
        spin();
    }

    function toggleVisbilityAlbumInfo() {
        let a = albumInfo.style.opacity;
        if (a===0) {a = 1} else {a = 0}
    }

    // Add event listeners for drag functionality
    vinylRecord.addEventListener('mousedown', handleDragStart);
    vinylRecord.addEventListener('hover', toggleVisbilityAlbumInfo);
    vinylRecord.addEventListener('touchstart', handleDragStart, { passive: false });

    // Keep existing menu item hover effects
    menuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            if (isDragging) return;
            clearTimeout(spinTimeout);
            isSpinning = true;
            
            rotation += 180;
            vinylRecord.style.transition = 'transform 0.5s ease';
            vinylRecord.style.transform = `rotate(${rotation}deg)`;
            
            vinylArtworks.forEach(artwork => {artwork.classList.remove('active'); toggleVisbilityAlbumInfo()});
            vinylArtworks[index].classList.add('active');toggleVisbilityAlbumInfo(); 
            const albumKey = vinylArtworks[index].getAttribute('data-album');
            const album = albums[albumKey];
            document.querySelector('#album-info').textContent = `${album.artist} - ${album.name}`;
            
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            if (isDragging) return;
            menuItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
            
            spinTimeout = setTimeout(() => {
                isSpinning = false;
                rotation = 0;
                vinylRecord.style.transition = 'transform 800ms ease';
                vinylRecord.style.transform = `rotate(${rotation}deg)`;
                
                setTimeout(() => {
                    vinylArtworks.forEach(artwork => artwork.classList.remove('active'));
                    vinylArtworks[0].classList.add('active');
                    albumInfo.textContent = "<3"
                }, 10000);
            }, 1000);
        });
    });

    // Initial setup
    vinylArtworks[0].classList.add('active');
});

function showdesc(given) {
    const menuItemDescs = document.querySelectorAll('.menu-item-desc');
    menuItemDescs.forEach(desc => desc.style.opacity = 0);
    
    menuItemDescs.forEach(desc => {
        if (desc.getAttribute('data-text') == given) {
            desc.style.opacity = 1
        }
    });
}