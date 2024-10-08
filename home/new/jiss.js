
document.addEventListener('DOMContentLoaded', () => {
    const vinylRecord = document.querySelector('.vinyl-record');
    const vinylArtworks = document.querySelectorAll('.vinyl-artwork');
    const menuItems = document.querySelectorAll('.menu-item');
    const albumInfo = document.getElementById('album-info');
    let rotation = 0;
    let isSpinning = false;
    let spinTimeout;

    // Variables for drag functionality
    let isDragging = false;
    let startAngle = 0;
    let currentRotation = 0;
    let lastRotation = 0;
    let momentum = 0;
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

    function updateAlbumInfo(index) {
        const albumKey = `album${index + 1}`;
        const album = albums[albumKey];
        albumInfo.textContent = `Now Playing: ${album.artist} - ${album.name}`;
    }

    // All your existing functions here...

    // Update the menu item event listeners
    menuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            if (isDragging) return;
            clearTimeout(spinTimeout);
            isSpinning = true;
            
            rotation += 180;
            vinylRecord.style.transition = 'transform 0.5s ease';
            vinylRecord.style.transform = `rotate(${rotation}deg)`;
            
            vinylArtworks.forEach(artwork => artwork.classList.remove('active'));
            vinylArtworks[index].classList.add('active');
            
            updateAlbumInfo(index);
            
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                }
            });
        });

        // Keep your existing mouseleave listener
    });

    // Initial setup
    vinylArtworks[0].classList.add('active');
    updateAlbumInfo(0);
});