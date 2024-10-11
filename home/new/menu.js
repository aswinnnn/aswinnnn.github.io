document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const menuItems = document.querySelectorAll('.menu-item');
    let currentContent = null;
    const mainContentContainer = document.createElement('div');
    mainContentContainer.classList.add('main-content-container');
    container.appendChild(mainContentContainer);

    // Sample content for each menu item
    const menuContent = {
        PROJECTS: {
            title: 'Projects',
            content: `
                <div class="projects-grid">
                    <div class="project-card">
                        <h3>Project 1</h3>
                        <p>Description of project 1</p>
                    </div>
                    <div class="project-card">
                        <h3>Project 2</h3>
                        <p>Description of project 2</p>
                    </div>
                </div>
            `
        },
        ABOUT: {
            title: 'About Me',
            content: `
                <div class="about-content">
                    <h3>Hello, I'm Aswin</h3>
                    <p>This is where you can put your about me content...</p>
                </div>
            `
        },
        BLOG: {
            title: 'Blog',
            content: `
                <div class="blog-list">
                    <article class="blog-preview">
                        <h3>Blog Post Title</h3>
                        <p>Preview of blog post...</p>
                    </article>
                </div>
            `
        },
        CONTACT: {
            title: 'Contact',
            content: `
                <div class="contact-form">
                    <h3>Get in Touch</h3>
                    <p>Contact information or form could go here...</p>
                </div>
            `
        }
    };

    function createContentContainer() {
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');
        return contentContainer;
    }

    function createCloseButton(contentContainer) {
        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '×';
        closeButton.addEventListener('click', () => {
            container.classList.remove('menu-shifted');
            setTimeout(() => {
                if (contentContainer.parentNode) {
                    contentContainer.parentNode.removeChild(contentContainer);
                }
            }, 500);
            currentContent = null;
        });
        return closeButton;
    }

    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            const menuType = item.getAttribute('data-text');
            
            // If content is already showing, remove it first
            if (currentContent) {
                container.classList.remove('menu-shifted');
                setTimeout(() => {
                    if (currentContent.parentNode) {
                        currentContent.parentNode.removeChild(currentContent);
                    }
                }, 500);
            }

            // Create new content container
            const contentContainer = createContentContainer();
            const content = menuContent[menuType];
            
            contentContainer.innerHTML = `
                <div class="page-content">
                    <h2>${content.title}</h2>
                    ${content.content}
                </div>
            `;
            
            const closeButton = createCloseButton(contentContainer);
            contentContainer.appendChild(closeButton);
            
            // Add new content and trigger animation
            setTimeout(() => {
                mainContentContainer.appendChild(contentContainer);
                requestAnimationFrame(() => {
                    container.classList.add('menu-shifted');
                });
            }, currentContent ? 500 : 0);
            
            currentContent = contentContainer;
        });
    });
});