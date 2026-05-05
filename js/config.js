/* 
  ====================================
  CONFIG - Configuration & Constants
  ====================================
*/

const CONFIG = {
    // Site Info
    site: {
        title: 'Eylül Yılmaz - Portfolyo & Blog',
        description: 'Yönetim Bilişim Sistemleri öğrencisinin portfolyo ve blog sayfası',
        author: 'Eylül Yılmaz',
        url: window.location.origin,
        year: new Date().getFullYear()
    },
    
    // API Endpoints
    api: {
        blogPosts: './blog/posts.json',
        projects: './data/projects.json'
    },
    
    // Pages
    pages: {
        home: 'home',
        about: 'about',
        projects: 'projects',
        events: 'events',
        blog: 'blog',
        blogPost: 'blog-post',
        contact: 'contact'
    },
    
    // Colors
    colors: {
        primary: '#00A86B',
        primaryBlue: '#4169E1',
        dark: '#0f1419',
        cardBg: '#1a1f28',
        textLight: '#e8e8e8',
        textMuted: '#a8a8a8'
    },
    
    // Animation Settings
    animations: {
        enabled: true,
        scrollTrigger: true,
        canvas: true
    },
    
    // Blog Settings
    blog: {
        postsPerPage: 9,
        enableSearch: true,
        enableCategories: true,
        relatedPostsCount: 3
    },
    
    // Projects Settings
    projects: {
        itemsPerPage: 9,
        enableFilter: true,
        categories: ['all', 'academic', 'personal']
    },
    
    // Debug Mode
    debug: false
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
