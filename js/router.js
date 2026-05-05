/* 
  ====================================
  ROUTER - Hash-Based Routing System
  ====================================
*/

class Router {
    constructor() {
        this.currentPage = 'home';
        this.pages = {};
        this.init();
    }
    
    /**
     * Initialize Router
     */
    init() {
        // Handle hash change
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
        
        // Add navigation link listeners
        this.setupNavigation();
        
        log('Router initialized');
    }
    
    /**
     * Setup Navigation Links
     */
    setupNavigation() {
        const navLinks = $$('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const page = link.getAttribute('data-page');
                if (page) {
                    this.navigate(page);
                    this.closeMenu();
                }
            });
        });
    }
    
    /**
     * Navigate to Page
     */
    navigate(pageName) {
        window.location.hash = `#/${pageName === 'home' ? '' : pageName}`;
    }
    
    /**
     * Handle Route Change
     */
    handleRoute() {
        const hash = window.location.hash.slice(2) || 'home';
        const pageName = hash === '' ? 'home' : hash.split('/')[0];
        
        this.showPage(pageName);
        this.updateActiveNav(pageName);
    }
    
    /**
     * Show Page
     */
    showPage(pageName) {
        // Hide all pages
        $$('.page').forEach(page => {
            hide(page);
        });
        
        // Show requested page
        const page = $(`#${pageName}`);
        if (page) {
            show(page);
            this.currentPage = pageName;
            
            // Scroll to top
            scrollToTop();
            
            // Handle page-specific logic
            this.onPageChange(pageName);

            // Dispatch custom event for decoupled listeners (e.g. skill bars)
            window.dispatchEvent(new CustomEvent('pagechange', { detail: pageName }));
            
            log(`Navigated to: ${pageName}`);
        } else {
            log(`Page not found: ${pageName}`, 'color: #FF6B6B');
            this.showPage('home');
        }
    }
    
    /**
     * Handle Page-Specific Logic
     */
    onPageChange(pageName) {
        switch (pageName) {
            case 'blog':
                if (window.blogManager) {
                    window.blogManager.loadBlogList();
                }
                break;
            case 'projects':
                if (window.projectManager) {
                    window.projectManager.renderProjects();
                }
                break;
            case 'home':
                // Canvas is now a fixed background, always running
                break;
            default:
                break;
        }
    }
    
    /**
     * Update Active Navigation Link
     */
    updateActiveNav(pageName) {
        const navLinks = $$('.nav-link');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === pageName) {
                addClass(link, 'active');
            } else {
                removeClass(link, 'active');
            }
        });
    }
    
    /**
     * Close Mobile Menu
     */
    closeMenu() {
        const hamburger = $('#hamburger');
        const navMenu = $('#navMenu');
        
        if (hamburger && navMenu) {
            removeClass(hamburger, 'active');
            removeClass(navMenu, 'active');
        }
    }
}

/**
 * Initialize Router Globally
 */
const router = new Router();

/**
 * Hamburger Menu Handler
 */
function initHamburgerMenu() {
    const hamburger = $('#hamburger');
    const navMenu = $('#navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleClass(hamburger, 'active');
            toggleClass(navMenu, 'active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar-container')) {
                removeClass(hamburger, 'active');
                removeClass(navMenu, 'active');
            }
        });
        
        // Close menu when window is resized
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                removeClass(hamburger, 'active');
                removeClass(navMenu, 'active');
            }
        });
    }
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', initHamburgerMenu);
