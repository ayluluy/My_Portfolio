/* 
  ====================================
  PROJECTS - Project Management & Display
  ====================================
*/

class ProjectManager {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.selectedCategory = 'all';
        
        this.init();
    }
    
    /**
     * Initialize Project Manager
     */
    init() {
        this.setupEventListeners();
        log('Project Manager initialized');
    }
    
    /**
     * Setup Event Listeners
     */
    setupEventListeners() {
        const filterButtons = $$('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = btn.getAttribute('data-filter');
                this.filterByCategory(filter);
                
                // Update active button
                filterButtons.forEach(b => removeClass(b, 'active'));
                addClass(btn, 'active');
            });
        });
    }
    
    /**
     * Load Projects from JSON
     */
    async loadProjects() {
        log('Loading projects...');
        this.projects = await fetchData(CONFIG.api.projects);
        
        if (this.projects) {
            this.filteredProjects = [...this.projects];
            log(`Loaded ${this.projects.length} projects`);
            this.renderProjects();
            return true;
        } else {
            logError('Failed to load projects');
            return false;
        }
    }
    
    /**
     * Filter Projects by Category
     */
    filterByCategory(category) {
        this.selectedCategory = category;
        
        if (category === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.category === category
            );
        }
        
        this.renderProjects();
    }
    
    /**
     * Render Projects Grid
     */
    renderProjects() {
        const container = $('#projectsGrid');
        if (!container) return;
        
        if (this.filteredProjects.length === 0) {
            container.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">Henüz proje yok.</p>';
            return;
        }
        
        container.innerHTML = this.filteredProjects.map(project => 
            this.createProjectCard(project)
        ).join('');
        
        // Add stagger animation
        addClass(container, 'stagger-children');
    }
    
    /**
     * Create Project Card HTML
     */
    createProjectCard(project) {
        const techTags = project.technologies
            .map(tech => `<span class="tag">${tech}</span>`)
            .join('');
        
        const categoryLabel = project.category === 'academic' ? 'Akademik' : 'Kişisel';
        
        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">${project.image}</div>
                <div class="project-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <h3 style="margin: 0;">${project.title}</h3>
                        <span class="badge ${project.category === 'academic' ? 'badge-blue' : ''}">${categoryLabel}</span>
                    </div>
                    <p>${project.excerpt}</p>
                    <div class="project-tags">
                        ${techTags}
                    </div>
                    <a href="${project.link}" target="_blank" class="btn btn-small">İncele</a>
                </div>
            </div>
        `;
    }
    
    /**
     * Get Project by ID
     */
    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
    
    /**
     * Get Featured Projects
     */
    getFeaturedProjects() {
        return this.projects.filter(project => project.featured);
    }
    
    /**
     * Get Projects by Category
     */
    getProjectsByCategory(category) {
        return this.projects.filter(project => project.category === category);
    }
}

// Initialize Project Manager globally
const projectManager = new ProjectManager();
