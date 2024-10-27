// Theme navigation controller
const ThemeNavigator = {
    history: [],
    currentIndex: -1,
    maxHistory: 50,
    
    init() {
        // Create and append notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 12px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            display: none;
            transition: opacity 0.3s;
            z-index: 1000;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 15px;
            max-width: 280px;
            text-align: center;
            pointer-events: none;
        `;
        document.body.appendChild(notification);
        this.notification = notification;

        // Detect if user is on mobile
        this.isMobile = this.detectMobile();

        // Add appropriate event listeners
        if (this.isMobile) {
            // For mobile, we'll just show the instruction once
            this.showNotification('Tap the vinyl 💿 to change theme', 4000);
        } else {
            // For desktop, add keyboard controls
            document.addEventListener('keydown', this.handleKeyPress.bind(this));
            this.showNotification('Use ← → keys or ␣ for themes', 3000);
        }
        
        // Generate initial theme
        this.generateNewTheme();
        
        return this;
    },
    
    detectMobile() {
        return (
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0) ||
            (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        );
    },
    
    addToHistory(colors) {
        this.history.push(colors);
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        this.currentIndex = this.history.length - 1;
    },
    
    generateNewTheme() {
        const colors = window.ThemeEngine.cycleTheme();
        this.addToHistory(colors);
    },
    
    goToPreviousTheme() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            const prevColors = this.history[this.currentIndex];
            // Extract hue from the primary color (first color in the array)
            const hue = window.ThemeEngine.contrast.rgbToHsl(...prevColors[0]).h;
            window.ThemeEngine.apply(hue);
        } else {
            this.showNotification('Beginning of theme history ⏮️');
        }
    },
    
    showNotification(message, duration = 2000) {
        const notification = this.notification;
        notification.textContent = message;
        notification.style.display = 'block';
        notification.style.opacity = '1';
        
        clearTimeout(this.notificationTimeout);
        this.notificationTimeout = setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300);
        }, duration);
    },
    
    handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowLeft':
                this.goToPreviousTheme();
                break;
            case 'ArrowRight':
            case ' ': // Space bar
                event.preventDefault(); // Prevent page scroll on space
                this.generateNewTheme();
                break;
        }
    }
};

// Initialize when the window loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        window.ThemeNavigator = ThemeNavigator.init();
    });
}