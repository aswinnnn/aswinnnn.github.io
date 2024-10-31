(() => {
    const loadTheme = () => {
        // Only load saved colors, don't initialize the full ThemeEngine
        const KEY = 'website_theme_colors';
        const savedColors = localStorage.getItem(KEY);
        
        if (savedColors) {
            const colors = JSON.parse(savedColors);
            Object.entries(colors).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--${key}-color`, value);
            });
        }
    };

    // Run immediately to prevent flash of default colors
    loadTheme();
})();