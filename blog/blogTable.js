class BlogTable {
    constructor(tableId) {
        this.table = document.getElementById(tableId);
        this.tbody = this.table.querySelector('tbody');
        this.spinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.posts = [];
        this.currentSort = null;
        this.currentDirection = 'asc';

        this.initialize();
    }

    async initialize() {
        try {
            await this.loadPosts();
            this.setupEventListeners();
            this.hideSpinner();
        } catch (error) {
            this.showError('Failed to load blog posts. Please try again later.');
            console.error('Initialization error:', error);
        }
    }

    async loadPosts() {
        try {
            const response = await fetch('/posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.posts = await response.json();
            window.posts = this.posts;
            this.renderPosts();
        } catch (error) {
            throw new Error('Failed to load posts: ' + error.message);
        }
    }

    renderPosts() {
        this.tbody.innerHTML = '';
        for (var x in this.posts) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="number">${Number(x) + 1}</td>
                <td class="title">${this.escapeHtml(this.posts[x].title)}</td>
                <td class="date">${this.formatDate(this.posts[x].publishedAt)}</td>
            `;
            this.tbody.appendChild(row);
        };
    }

    setupEventListeners() {
        // Sorting
        this.table.querySelectorAll('th').forEach(th => {
            th.addEventListener('click', () => this.handleSort(th));
        });

        // Row clicks
        this.tbody.addEventListener('click', (e) => this.handleRowClick(e));
    }

    handleSort(th) {
        const sortBy = th.dataset.sort;
        const direction = th.dataset.direction === '↓' ? 'asc' : 'desc';
        
        // Reset all headers
        this.table.querySelectorAll('th').forEach(header => {
            header.classList.remove('active');
            header.dataset.direction = '↓';
        });
        
        // Update clicked header
        th.classList.add('active');
        th.dataset.direction = direction === 'asc' ? '↑' : '↓';
        
        // Show loading state
        this.table.classList.add('loading');
        
        // Sort posts
        setTimeout(() => {
            this.sortPosts(sortBy, direction);
            this.table.classList.remove('loading');
        }, 300);
    }

    sortPosts(sortBy, direction) {
        Array(this.posts).sort((a, b) => {
            let aValue, bValue;
            
            switch(sortBy) {
                case 'number':
                    return 0; // Maintain original order for numbers
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'date':
                    aValue = new Date(a.publishedAt);
                    bValue = new Date(b.publishedAt);
                    break;
            }
            
            if (direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        this.renderPosts();
    }

    handleRowClick(e) {
        const row = e.target.closest('tr');
        if (row) {
            row.style.transform = 'scale(0.98)';
            setTimeout(() => {
                row.style.transform = '';
            }, 150);
            
            const index = Array.from(row.parentNode.children).indexOf(row);
            const post = this.posts[index];
            
            // Navigate to post or trigger click handler
            console.log('Clicked post:', post);
            // window.location.href = `/posts/${post.id}`;
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.hideSpinner();
    }

    hideSpinner() {
        this.spinner.style.display = 'none';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize the table
document.addEventListener('DOMContentLoaded', () => {
    new BlogTable('blogTable');
});