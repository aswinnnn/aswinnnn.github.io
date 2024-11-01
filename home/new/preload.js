// Preloader utility class
class PagePreloader {
    constructor() {
        this.cache = new Map();
        this.hoverTimers = new Map();
        this.isMobile = this.checkIfMobile();
    }

    checkIfMobile() {
        return window.matchMedia('(max-width: 720px)').matches || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    async preloadPage(url) {
        // Return cached response if available
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }

        try {
            // Fetch the HTML
            const response = await fetch(url);
            const html = await response.text();

            // Create a temporary DOM to parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Get all resource URLs to preload
            const resources = [
                // CSS files
                ...Array.from(doc.querySelectorAll('link[rel="stylesheet"]')).map(link => link.href),
                // JavaScript files
                ...Array.from(doc.querySelectorAll('script[src]')).map(script => script.src),
                // Images
                ...Array.from(doc.querySelectorAll('img')).map(img => img.src),
                // Background images from style attributes
                ...Array.from(doc.querySelectorAll('[style*="background-image"]')).map(el => {
                    const match = el.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
                    return match ? match[1] : null;
                }).filter(Boolean)
            ];

            // Use Priority Hints API if available for better resource loading
            if ('loading' in HTMLImageElement.prototype) {
                resources.forEach(url => {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = url;
                    
                    // Set appropriate 'as' attribute based on resource type
                    if (url.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
                        link.as = 'image';
                    } else if (url.match(/\.css$/i)) {
                        link.as = 'style';
                    } else if (url.match(/\.js$/i)) {
                        link.as = 'script';
                    }
                    
                    // Add fetchpriority if supported
                    if ('fetchPriority' in link) {
                        link.fetchPriority = 'high';
                    }
                    
                    document.head.appendChild(link);
                });
            }

            // Preload all resources
            const preloadPromises = resources.map(url => {
                if (url.endsWith('.css')) {
                    return this.preloadCSS(url);
                } else if (url.endsWith('.js')) {
                    return this.preloadScript(url);
                } else {
                    return this.preloadImage(url);
                }
            });

            // Wait for all resources to load
            await Promise.all(preloadPromises);

            // Cache the result
            this.cache.set(url, html);
            return html;
        } catch (error) {
            console.error('Error preloading page:', error);
        }
    }

    preloadCSS(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    preloadScript(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = url;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }

    preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = url;
        });
    }

    handleMenuItemHover(menuItem) {
        if (this.isMobile) return; // Skip hover handling on mobile
        
        const url = menuItem.getAttribute('href');
        
        // Clear any existing timer for this menu item
        if (this.hoverTimers.has(menuItem)) {
            clearTimeout(this.hoverTimers.get(menuItem));
        }

        // Set new timer
        const timer = setTimeout(() => {
            this.preloadPage(url);
        }, 300);

        this.hoverTimers.set(menuItem, timer);
    }

    handleMenuItemLeave(menuItem) {
        if (this.isMobile) return; // Skip hover handling on mobile
        
        // Clear timer if mouse leaves before 300ms
        if (this.hoverTimers.has(menuItem)) {
            clearTimeout(this.hoverTimers.get(menuItem));
            this.hoverTimers.delete(menuItem);
        }
    }

    preloadAllPages() {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const url = item.getAttribute('href');
            this.preloadPage(url);
        });
    }

    init() {
        if (this.isMobile) {
            // On mobile, preload all pages immediately
            this.preloadAllPages();
        } else {
            // On desktop, use hover detection
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.addEventListener('mouseenter', () => this.handleMenuItemHover(item));
                item.addEventListener('mouseleave', () => this.handleMenuItemLeave(item));
            });
        }

        // Listen for viewport changes (e.g., device rotation)
        window.matchMedia('(max-width: 720px)').addListener((e) => {
            this.isMobile = this.checkIfMobile();
            if (this.isMobile) {
                this.preloadAllPages();
            }
        });
    }
}

// Initialize the preloader when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const preloader = new PagePreloader();
    preloader.init();
});