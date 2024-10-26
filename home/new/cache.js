document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const cache = {
        html: {},
        css: {},
        js: {},
        dependencies: {} // Track resource dependencies for each page
    };

    // Preload pages and resources on hover
    menuItems.forEach(item => {
        const url = item.getAttribute('href');

        item.addEventListener('mouseover', () => {
            if (!cache.html[url]) {
                prefetchResources(url);
            }
        });

        // Handle click and pushState
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const pageUrl = item.getAttribute('href');

            if (isFullyCached(pageUrl)) {
                history.pushState({ url: pageUrl }, '', pageUrl);
                displayContent(pageUrl);
            } else {
                prefetchResources(pageUrl, true);
            }
        });
    });

    // Check if all resources for a page are cached
    function isFullyCached(url) {
        return cache.html[url] &&
            (!cache.dependencies[url]?.css || cache.dependencies[url].css.every(cssUrl => cache.css[cssUrl])) &&
            (!cache.dependencies[url]?.js || cache.dependencies[url].js.every(jsUrl => cache.js[jsUrl]));
    }

    // Fetch and cache all page resources
    async function prefetchResources(url, shouldDisplay = false) {
        try {
            // Fetch and parse HTML
            const htmlResponse = await fetch(url);
            const htmlContent = await htmlResponse.text();
            cache.html[url] = htmlContent;

            // Parse HTML to find resources
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            // Initialize dependency tracking
            cache.dependencies[url] = {
                css: [],
                js: []
            };

            // Fetch CSS
            const cssLinks = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
            const cssPromises = cssLinks.map(async link => {
                const cssUrl = link.getAttribute('href');
                cache.dependencies[url].css.push(cssUrl);

                if (!cache.css[cssUrl]) {
                    try {
                        const cssResponse = await fetch(cssUrl);
                        cache.css[cssUrl] = await cssResponse.text();
                    } catch (err) {
                        console.error(`Error fetching CSS ${cssUrl}:`, err);
                    }
                }
            });

            // Fetch JavaScript
            const scripts = Array.from(doc.querySelectorAll('script[src]'));
            const jsPromises = scripts.map(async script => {
                const jsUrl = script.getAttribute('src');
                cache.dependencies[url].js.push(jsUrl);

                if (!cache.js[jsUrl]) {
                    try {
                        const jsResponse = await fetch(jsUrl);
                        cache.js[jsUrl] = await jsResponse.text();
                    } catch (err) {
                        console.error(`Error fetching JavaScript ${jsUrl}:`, err);
                    }
                }
            });

            // Wait for all resources to be fetched
            await Promise.all([...cssPromises, ...jsPromises]);

            if (shouldDisplay) {
                history.pushState({ url }, '', url);
                displayContent(url);
            }
        } catch (err) {
            console.error(`Error prefetching resources for ${url}:`, err);
        }
    }

    // Handle popstate for back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state?.url) {
            if (isFullyCached(event.state.url)) {
                displayContent(event.state.url);
            } else {
                prefetchResources(event.state.url, true);
            }
        }
    });

    // Display cached content
    function displayContent(url) {
        const mainContent = document.querySelector(':root');
        if (!mainContent) {
            console.error('Main content container not found!');
            return;
        }

        // Update HTML content
        mainContent.innerHTML = cache.html[url];

        // Inject cached CSS
        cache.dependencies[url]?.css?.forEach(cssUrl => {
            injectCSS(cache.css[cssUrl], cssUrl);
        });

        // Inject cached JavaScript
        cache.dependencies[url]?.js?.forEach(jsUrl => {
            injectJS(cache.js[jsUrl], jsUrl);
        });

        // Initialize any new page-specific JavaScript
        executeScripts();
    }

    // Inject CSS with source URL tracking
    function injectCSS(cssContent, sourceUrl) {
        let styleTag = document.querySelector(`style[data-source="${sourceUrl}"]`);
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.setAttribute('data-source', sourceUrl);
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = cssContent;
    }

    // Inject JavaScript with source URL tracking
    function injectJS(jsContent, sourceUrl) {
        let scriptTag = document.querySelector(`script[data-source="${sourceUrl}"]`);
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.setAttribute('data-source', sourceUrl);
            scriptTag.textContent = jsContent;
            document.body.appendChild(scriptTag);
        }
    }

    // Execute scripts in the correct order after content update
    function executeScripts() {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src) {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                document.body.appendChild(newScript);
            } else {
                eval(script.innerHTML);
            }
        });
    }

    // Detect if homepage and handle accordingly
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        window.location.reload();
    }
});