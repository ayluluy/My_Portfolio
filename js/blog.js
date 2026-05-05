/* 
  ====================================
  BLOG - Blog Management & Display
  ====================================
*/

class BlogManager {
    constructor() {
        this.posts = [];
        this.filteredPosts = [];
        this.currentPage = 1;
        this.itemsPerPage = CONFIG.blog.postsPerPage;
        this.searchQuery = '';
        this.selectedCategory = 'all';
        
        this.init();
    }
    
    /**
     * Initialize Blog Manager
     */
    init() {
        this.setupEventListeners();
        log('Blog Manager initialized');
    }
    
    /**
     * Setup Event Listeners
     */
    setupEventListeners() {
        const searchInput = $('#blogSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterPosts();
                this.renderBlogList();
            });
        }
    }
    
    /**
     * Load Blog Posts from JSON
     */
    async loadBlogPosts() {
        log('Loading blog posts...');
        this.posts = await fetchData(CONFIG.api.blogPosts);
        
        if (this.posts) {
            this.filteredPosts = [...this.posts];
            log(`Loaded ${this.posts.length} blog posts`);
            return true;
        } else {
            logError('Failed to load blog posts');
            return false;
        }
    }
    
    /**
     * Load and Display Blog List
     */
    async loadBlogList() {
        if (this.posts.length === 0) {
            await this.loadBlogPosts();
        }
        
        this.filterPosts();
        this.renderBlogList();
    }
    
    /**
     * Filter Blog Posts
     */
    filterPosts() {
        this.filteredPosts = this.posts.filter(post => {
            const matchesSearch = !this.searchQuery ||
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.excerpt.toLowerCase().includes(this.searchQuery) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)));
            
            const matchesCategory = this.selectedCategory === 'all' ||
                post.category.toLowerCase() === this.selectedCategory.toLowerCase();
            
            return matchesSearch && matchesCategory;
        });
        
        this.currentPage = 1;
    }
    
    /**
     * Render Blog List
     */
    renderBlogList() {
        const container = $('#blogPosts');
        if (!container) return;
        
        if (this.filteredPosts.length === 0) {
            container.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">Henüz blog yazısı yok.</p>';
            return;
        }
        
        // Get paginated posts
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedPosts = this.filteredPosts.slice(start, end);
        
        // Render posts
        container.innerHTML = paginatedPosts.map(post => this.createPostCard(post)).join('');
        
        // Add click listeners
        $$('.blog-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const post = paginatedPosts[index];
                this.showPostDetail(post);
            });
        });
    }
    
    /**
     * Create Post Card HTML
     */
    createPostCard(post) {
        const date = formatDate(post.date);
        
        return `
            <div class="blog-card">
                <div class="blog-featured">${post.featured_image || '📝'}</div>
                <div class="blog-body">
                    <div class="blog-meta">
                        <span>${date}</span>
                        <span class="reading-time">${post.reading_time} dakika</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-tags">
                        ${(post.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Show Post Detail
     */
    async showPostDetail(post) {
        const postPage = $('#blog-post');
        const contentDiv = $('#postContent');
        
        if (!postPage || !contentDiv) return;
        
        // Create post HTML
        const postHTML = this.createPostDetailHTML(post);
        contentDiv.innerHTML = postHTML;
        
        // Show page
        show(postPage);
        hide($('#blog'));
        
        // Scroll to top
        scrollToTop();
        
        // Load related posts
        this.renderRelatedPosts(post, contentDiv);
        
        log(`Showing post: ${post.title}`);
    }
    
    /**
     * Create Post Detail HTML
     */
    createPostDetailHTML(post) {
        const date = formatDate(post.date);
        
        return `
            <article>
                <h1>${post.title}</h1>
                <div class="post-meta">
                    <div class="post-meta-item">
                        <span>📅 ${date}</span>
                    </div>
                    <div class="post-meta-item">
                        <span>⏱️ ${post.reading_time} dakika</span>
                    </div>
                    <div class="post-meta-item">
                        <span>🏷️ ${post.category}</span>
                    </div>
                </div>
                
                <div class="post-content">
                    ${post.content}
                </div>
                
                <div class="post-tags">
                    ${(post.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="related-posts">
                    <h3>Benzer Yazılar</h3>
                    <div class="related-posts-grid" id="relatedPosts">
                        <!-- Related posts will be loaded here -->
                    </div>
                </div>
            </article>
        `;
    }
    
    /**
     * Render Related Posts
     */
    renderRelatedPosts(currentPost, container) {
        const relatedContainer = $('#relatedPosts');
        if (!relatedContainer) return;
        
        // Find related posts by category and tags
        const related = this.posts
            .filter(post => post.id !== currentPost.id)
            .filter(post => 
                post.category === currentPost.category ||
                (post.tags && currentPost.tags && 
                 post.tags.some(tag => currentPost.tags.includes(tag)))
            )
            .slice(0, CONFIG.blog.relatedPostsCount);
        
        if (related.length === 0) {
            relatedContainer.innerHTML = '<p>Benzer yazı bulunamadı.</p>';
            return;
        }
        
        relatedContainer.innerHTML = related.map(post => `
            <div class="blog-card" style="cursor: pointer;">
                <div class="blog-featured">${post.featured_image || '📝'}</div>
                <div class="blog-body">
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                </div>
            </div>
        `).join('');
        
        // Add click listeners to related posts
        $$('#relatedPosts .blog-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                this.showPostDetail(related[index]);
            });
        });
    }
    
    /**
     * Get Post by ID
     */
    getPostById(id) {
        return this.posts.find(post => post.id === id);
    }
    
    /**
     * Get Posts by Category
     */
    getPostsByCategory(category) {
        return this.posts.filter(post => post.category === category);
    }
}

// Initialize Blog Manager globally
const blogManager = new BlogManager();
