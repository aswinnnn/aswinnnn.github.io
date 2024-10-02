document.addEventListener('DOMContentLoaded', () => {
    const vinylRecord = document.querySelector('.vinyl-record');
    const menuItems = document.querySelectorAll('.menu-item');
    const mainTitle = document.querySelector('.glitch');
    let rotation = 0;

    // Device orientation effect
    window.addEventListener('deviceorientation', (event) => {
        if (event.gamma && event.beta) {
            const tiltX = Math.min(Math.max(event.gamma, -15), 15); // Limit tilt to -15 to 15 degrees
            const tiltY = Math.min(Math.max(event.beta, -15), 15);
            
            vinylRecord.style.transform = `rotate(${rotation}deg) translate(${tiltX}px, ${tiltY}px)`;
            
            // Subtle parallax effect on menu items
            menuItems.forEach((item, index) => {
                const factor = (index + 1) * 0.5;
                item.style.transform = `translate(${tiltX * factor}px, ${tiltY * factor}px)`;
            });
        }
    });

    // Menu item hover effects
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Rotate vinyl record
            rotation += 45;
            vinylRecord.style.transform = `rotate(${rotation}deg)`;
            
            // Add glitch effect to other menu items
            menuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.5';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            // Reset other menu items
            menuItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'scale(1)';
            });
        });

        item.addEventListener('click', () => {
            // Click animation
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Glitch effect on main title
    function triggerGlitch() {
        mainTitle.classList.add('glitch-trigger');
        setTimeout(() => {
            mainTitle.classList.remove('glitch-trigger');
        }, 200);
    }

    // Trigger glitch effect randomly
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance to trigger
            triggerGlitch();
        }
    }, 2000);

    // Initial rotation of vinyl record
    vinylRecord.style.transform = 'rotate(0deg)';
});