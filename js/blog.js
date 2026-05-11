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
        this.autoScrollTimer = null;
        this.autoScrollDirection = 1;
        this.autoScrollInterval = 1800;
        this.singleLoopWidth = 0;
        this.cardStep = 240;
        this.resumeTimer = null;
        
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

        const prevBtn = $('#blogPrev');
        const nextBtn = $('#blogNext');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.nudgeCarousel(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nudgeCarousel(1));
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
            const title = post.title || '';
            const excerpt = post.excerpt || '';
            const category = post.category || 'medium';
            const matchesSearch = !this.searchQuery ||
                title.toLowerCase().includes(this.searchQuery) ||
                excerpt.toLowerCase().includes(this.searchQuery) ||
                (post.tags && post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery)));
            
            const matchesCategory = this.selectedCategory === 'all' ||
                category.toLowerCase() === this.selectedCategory.toLowerCase();
            
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
            this.filteredPosts = this.getFallbackPosts();
        }
        const cards = this.filteredPosts.map((post, idx) => this.createPostCard(post, idx)).join('');
        container.innerHTML = cards + cards;
        this.initializeCarousel();
        this.bindCardHoverEvents();
        
        $$('.medium-card[data-post-id]').forEach((card) => {
            card.addEventListener('click', () => {
                const postId = Number(card.dataset.postId);
                const post = this.getPostById(postId);
                if (post) this.openPostDetail(post);
            });
        });

        $$('.medium-read-link').forEach((link) => {
            link.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }
    
    /**
     * Create Post Card HTML
     */
    createPostCard(post, idx = 0) {
        const preview = (post.excerpt || '').slice(0, 95).trim();
        const postUrl = post.url || post.medium_url || 'https://medium.com/@eyllylmaz_66080';
        
        return `
            <div class="blog-card medium-card" data-post-id="${post.id}" style="--i:${idx}">
                <div class="medium-card-cover">
                    ${post.featured_image ? `<img src="${post.featured_image}" alt="${post.title} görseli">` : '✍️'}
                </div>
                <div class="medium-card-content">
                    <h3>${post.title}</h3>
                    <p>${preview}${preview.length >= 80 ? '...' : ''}</p>
                    <a class="medium-read-link" href="${postUrl}" target="_blank" rel="noopener">Yazıya Git</a>
                </div>
            </div>
        `;
    }

    getFallbackPosts() {
        return [
            {
                id: 1,
                title: 'Yapay zekanın yapamayıp insanların yapabileceği şeyler nelerdir?',
                excerpt: 'Kısa özet daha sonra eklenecek.',
                featured_image: './assets/images/medium1.png',
                url: 'https://medium.com/@eyllylmaz_66080'
            },
            {
                id: 2,
                title: 'Ülkemizdeki İmkansız (Görünen) Girişimci Olmak',
                excerpt: 'Kısa özet daha sonra eklenecek.',
                featured_image: './assets/images/medium2.png',
                url: 'https://medium.com/@eyllylmaz_66080'
            },
            {
                id: 3,
                title: 'Yapay Zekadan Ayrışan, İnsan Özgü',
                excerpt: 'Kısa özet daha sonra eklenecek.',
                featured_image: './assets/images/medium3.png',
                url: 'https://medium.com/@eyllylmaz_66080'
            }
        ];
    }

    initializeCarousel() {
        const carousel = $('#blogCarousel');
        const track = $('#blogPosts');
        if (!carousel || !track) return;

        this.singleLoopWidth = track.scrollWidth / 2;
        if (!this.singleLoopWidth) return;
        const firstCard = track.querySelector('.medium-card');
        if (firstCard) {
            const styles = window.getComputedStyle(track);
            const gap = Number.parseFloat(styles.columnGap || styles.gap || '0');
            this.cardStep = firstCard.getBoundingClientRect().width + gap;
        }

        carousel.scrollLeft = 0;
        this.updateActiveCard();
        this.startAutoScroll();
    }

    startAutoScroll() {
        const carousel = $('#blogCarousel');
        if (!carousel || this.autoScrollTimer) return;

        this.autoScrollTimer = setInterval(() => {
            this.shiftByStep(this.autoScrollDirection, true);
        }, this.autoScrollInterval);
    }

    stopAutoScroll() {
        if (!this.autoScrollTimer) return;
        clearInterval(this.autoScrollTimer);
        this.autoScrollTimer = null;
    }

    nudgeCarousel(direction) {
        this.stopAutoScroll();
        this.autoScrollDirection = direction >= 0 ? 1 : -1;
        this.shiftByStep(this.autoScrollDirection, true);

        clearTimeout(this.resumeTimer);
        this.resumeTimer = setTimeout(() => this.startAutoScroll(), 1200);
    }

    shiftByStep(direction, smooth = false) {
        const carousel = $('#blogCarousel');
        if (!carousel || !this.singleLoopWidth) return;

        const nextLeft = carousel.scrollLeft + (direction * this.cardStep);
        carousel.scrollTo({
            left: nextLeft,
            behavior: smooth ? 'smooth' : 'auto'
        });

        setTimeout(() => {
            if (carousel.scrollLeft >= this.singleLoopWidth) {
                carousel.scrollLeft -= this.singleLoopWidth;
            } else if (carousel.scrollLeft < 0) {
                carousel.scrollLeft += this.singleLoopWidth;
            }
            this.updateActiveCard();
        }, smooth ? 320 : 0);
    }

    bindCardHoverEvents() {
        $$('.medium-card').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('is-hovered');
                this.stopAutoScroll();
                this.updateActiveCard(card);
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('is-hovered');
                this.updateActiveCard();
                this.startAutoScroll();
            });
        });
    }

    updateActiveCard(forceCard = null) {
        const carousel = $('#blogCarousel');
        const cards = $$('.medium-card');
        if (!carousel || cards.length === 0) return;

        cards.forEach((card) => card.classList.remove('is-active'));

        const carouselRect = carousel.getBoundingClientRect();
        const viewCenter = carouselRect.left + (carouselRect.width / 2);
        const targetCard = forceCard || cards.reduce((closest, card) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenter - viewCenter);

            if (!closest || distance < closest.distance) {
                return { card, distance };
            }
            return closest;
        }, null)?.card;

        if (targetCard) targetCard.classList.add('is-active');
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
