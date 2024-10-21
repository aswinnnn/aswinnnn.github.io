document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const cache = {
        html: {},
        css: {}
    };

    // Preload pages and CSS on hover
    menuItems.forEach(item => {
        const url = item.getAttribute('href');

        item.addEventListener('mouseover', () => {
            if (!cache.html[url]) {
                fetchPageAndCSS(url);
            }
        });

        // Handle click and pushState
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const pageUrl = item.getAttribute('href');

            if (cache.html[pageUrl] && cache.css[pageUrl]) {
                history.pushState({ url: pageUrl }, '', pageUrl); // Push new state
                displayContent(cache.html[pageUrl], cache.css[pageUrl]); // Display cached HTML & CSS
            } else {
                fetchPageAndCSS(pageUrl, true); // Fetch page and push state
            }
        });
    });

    // Fetch page HTML and CSS, and cache them
    function fetchPageAndCSS(url, pushState = false) {
        // Fetch HTML content
        fetch(url)
            .then(response => response.text())
            .then(htmlContent => {
                cache.html[url] = htmlContent; // Cache the HTML

                // Fetch CSS linked in the page
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlContent, 'text/html');
                const cssLinks = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));

                // Fetch all CSS files
                const cssPromises = cssLinks.map(link => {
                    const cssUrl = link.getAttribute('href');
                    return fetch(cssUrl).then(response => response.text());
                });

                // Once all CSS files are fetched
                Promise.all(cssPromises).then(cssContents => {
                    const combinedCSS = cssContents.join('\n'); // Combine all CSS files into one string
                    cache.css[url] = combinedCSS; // Cache the combined CSS

                    if (pushState) {
                        history.pushState({ url }, '', url); // Push new state
                        displayContent(htmlContent, combinedCSS); // Update page with HTML and CSS
                    }
                });
            })
            .catch(err => console.error(`Error fetching ${url}: `, err));
    }

    // Handle popstate for back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.url) {
            if (cache.html[event.state.url] && cache.css[event.state.url]) {
                displayContent(cache.html[event.state.url], cache.css[event.state.url]); // Load from cache
            } else {
                fetchPageAndCSS(event.state.url); // Fetch the content if not cached
            }
        }
    });

    // Function to update the content on the page and inject the CSS
    function displayContent(htmlContent, cssContent) {
        const mainContent = document.querySelector(':root');
        if (mainContent) {
            mainContent.innerHTML = htmlContent; // Replace content with the new one
            injectCSS(cssContent); // Inject the CSS
        } else {
            console.error('Main content container not found!');
        }

        location.replace(location.href) // lil pathetic gimmick to actually get the js running
    }

    // Inject CSS into the document
    function injectCSS(cssContent) {
        let styleTag = document.querySelector('#dynamic-css');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-css';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = cssContent; // Insert fetched CSS
    }

    // Force page reload for homepage
    function reloadHomePage() {
        window.location.reload(); // Full page refresh for homepage
    }

    // Detect if homepage is loaded and refresh
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        reloadHomePage();
    }
});
