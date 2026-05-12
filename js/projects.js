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
        document.addEventListener('portfolio:lang-changed', () => this.renderProjects());
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
        this.renderProjects();
    }
    
    /**
     * Render Projects Grid
     */
    renderProjects() {
        const container = $('#projectsGrid');
        if (!container) return;
        const isEnglish = window.i18n?.getLanguage?.() === 'en';
        
        const all = this.getAllProjects();
        
        const filtered = this.selectedCategory === 'all'
            ? all
            : all.filter(p => p.category === this.selectedCategory);
        
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="empty-state-card" role="status" aria-live="polite">
                    <div class="empty-state-icon">🚀</div>
                    <h3>${isEnglish ? 'Awesome projects are coming soon' : 'Çok yakında burada harika projeler olacak'}</h3>
                    <p>${isEnglish ? 'I am currently building the infrastructure and content. This section will update automatically as new projects are added.' : 'Şu an altyapı ve içerik geliştirme aşamasındayım. Yeni projeler eklendikçe bu alan otomatik güncellenecek.'}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filtered.map(project => 
            this.createProjectCard(project)
        ).join('');
        
        // Add stagger animation
        addClass(container, 'stagger-children');

        // Bind detail buttons
        container.querySelectorAll('.project-detail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-project-id');
                const project = all.find(p => p.id === id);
                if (project) this.openDetailModal(project);
            });
        });
    }
    
    /**
     * Static personal projects (no external JSON needed)
     */
    getStaticPersonalProjects() {
        const isEnglish = window.i18n?.getLanguage?.() === 'en';
        const copy = {
            tr: {
                recycleTitle: 'Sanatı Geri Dönüştür! ♻️',
                recycleExcerpt: 'Giymediğin bir kıyafeti seç, mobil uygulamama yükle ve yeniden tasarlayıp tiyatro kostümüne çevir!',
                recycleDescription: `
                        <p>Sanatı Geri Dönüştür, kullanımda olmayan kıyafetleri yapay zeka destekli bir mobil uygulama aracılığıyla tiyatro kostümüne dönüştürmeyi amaçlayan bir projedir.</p>
                        <p>Kullanıcı giymediği bir kıyafetin fotoğrafını uygulamaya yükler; yapay zeka renk, doku ve kesim analizini yaparak sahne kostümü önerileri üretir.</p>
                        <h4>Öne Çıkan Özellikler</h4>
                        <ul>
                            <li>📸 Kıyafet fotoğrafı yükleme ve AI analizi</li>
                            <li>🎭 Tiyatro kostümü önerisi üretimi</li>
                            <li>🎨 Renk & doku eşleştirme algoritması</li>
                            <li>💾 Kullanıcı koleksiyonu ve geçmiş</li>
                        </ul>
                        <h4>Kullanılan Teknolojiler</h4>
                        <ul>
                            <li><strong>Flutter & Dart</strong> — Cross-platform mobil geliştirme</li>
                            <li><strong>Firebase</strong> — Kimlik doğrulama & Firestore veritabanı</li>
                            <li><strong>ML Kit</strong> — Görüntü sınıflandırma ve analiz</li>
                            <li><strong>Material Design 3</strong> — UI bileşen sistemi</li>
                        </ul>
                    `,
                memoriusTitle: 'MemoriUs 📔',
                memoriusExcerpt: 'Sana özel günlük, planlayıcı ve anılardan oluşan bir koleksiyon!',
                memoriusDescription: `
                        <p>MemoriUs, kişisel büyüme yolculuğunu dijitalleştiren hepsi bir arada bir anı-günlük-planlayıcı uygulamasıdır.</p>
                        <p>Yazılı günlükler, ses kayıtları, fotoğraflar ve yapılacaklar listeleriyle hayatının her anını tek bir yerde saklayabilirsin.</p>
                        <h4>Öne Çıkan Özellikler</h4>
                        <ul>
                            <li>📝 Zengin metin editörüyle günlük yazımı</li>
                            <li>📅 Akıllı planlayıcı ve takvim entegrasyonu</li>
                            <li>🖼️ Fotoğraf & ses ile anı koleksiyonu</li>
                            <li>🔒 Yerel şifreli depolama (gizlilik önce)</li>
                            <li>✨ Mood takibi ve istatistik görünümü</li>
                        </ul>
                        <h4>Kullanılan Teknolojiler</h4>
                        <ul>
                            <li><strong>Flutter & Dart</strong> — Cross-platform mobil geliştirme</li>
                            <li><strong>SQLite & Hive</strong> — Yerel veritabanı ve önbellekleme</li>
                            <li><strong>Provider</strong> — State management</li>
                            <li><strong>Flutter Local Notifications</strong> — Hatırlatıcılar</li>
                        </ul>
                    `,
                tubitakTitle: 'TÜBİTAK 2209-A İşaret Dili AI',
                tubitakExcerpt: 'Türk İşaret Dili jestlerini tanıyan yapay zeka temelli görüntü işleme modeli geliştirdim.',
                tubitakDescription: `
                        <p>TÜBİTAK 2209-A kapsamında, Türk İşaret Dili jestlerini algılayıp sınıflandıran yapay zeka destekli bir görüntü işleme modeli geliştirdim.</p>
                        <p>Model; kamera girdisi üzerinden el hareketlerini analiz eder, işaretleri sınıflandırır ve sonuçları görselleştirerek yorumlanabilir bir çıktı sunar.</p>
                        <h4>Öne Çıkan Özellikler</h4>
                        <ul>
                            <li>📷 Gerçek zamanlı görüntü alma ve ön işleme</li>
                            <li>🧠 Jest sınıflandırma için AI tabanlı modelleme</li>
                            <li>📊 Sonuçların grafiklerle analizi</li>
                            <li>♿ Erişilebilir iletişim teknolojilerine katkı odaklı yapı</li>
                        </ul>
                        <h4>Kullanılan Teknolojiler</h4>
                        <ul>
                            <li><strong>Python</strong> — Model geliştirme ve veri işleme</li>
                            <li><strong>OpenCV</strong> — Görüntü alma, ön işleme ve özellik çıkarma</li>
                            <li><strong>Matplotlib</strong> — Eğitim/performans metriklerinin görselleştirilmesi</li>
                        </ul>
                    `,
                developing: 'Geliştirme aşamasında',
                completed: 'Tamamlandı'
            },
            en: {
                recycleTitle: 'Recycle Art! ♻️',
                recycleExcerpt: 'Pick a piece of clothing you no longer wear, upload it to my mobile app, and redesign it into a theater costume.',
                recycleDescription: `
                        <p>Recycle Art is a mobile app concept that aims to transform unused clothing into theater costumes with AI-supported recommendations.</p>
                        <p>The user uploads a photo of a garment; the AI analyzes color, texture, and cut to suggest stage costume ideas.</p>
                        <h4>Key Features</h4>
                        <ul>
                            <li>📸 Clothing photo upload and AI analysis</li>
                            <li>🎭 Theater costume suggestion generation</li>
                            <li>🎨 Color and texture matching logic</li>
                            <li>💾 User collection and history</li>
                        </ul>
                        <h4>Technologies Used</h4>
                        <ul>
                            <li><strong>Flutter & Dart</strong> — Cross-platform mobile development</li>
                            <li><strong>Firebase</strong> — Authentication and Firestore database</li>
                            <li><strong>ML Kit</strong> — Image classification and analysis</li>
                            <li><strong>Material Design 3</strong> — UI component system</li>
                        </ul>
                    `,
                memoriusTitle: 'MemoriUs 📔',
                memoriusExcerpt: 'A personal collection of journals, plans, and memories made just for you.',
                memoriusDescription: `
                        <p>MemoriUs is an all-in-one memory, journal, and planner app that digitizes a personal growth journey.</p>
                        <p>Written journals, voice notes, photos, and task lists help keep meaningful moments in one place.</p>
                        <h4>Key Features</h4>
                        <ul>
                            <li>📝 Journal writing with a rich text editor</li>
                            <li>📅 Smart planner and calendar integration</li>
                            <li>🖼️ Memory collection with photos and audio</li>
                            <li>🔒 Local encrypted storage with privacy first</li>
                            <li>✨ Mood tracking and statistics view</li>
                        </ul>
                        <h4>Technologies Used</h4>
                        <ul>
                            <li><strong>Flutter & Dart</strong> — Cross-platform mobile development</li>
                            <li><strong>SQLite & Hive</strong> — Local database and caching</li>
                            <li><strong>Provider</strong> — State management</li>
                            <li><strong>Flutter Local Notifications</strong> — Reminders</li>
                        </ul>
                    `,
                tubitakTitle: 'TUBITAK 2209-A Sign Language AI',
                tubitakExcerpt: 'I developed an AI-based computer vision model that recognizes Turkish Sign Language gestures.',
                tubitakDescription: `
                        <p>As part of TUBITAK 2209-A, I worked on an AI-supported computer vision model that detects and classifies Turkish Sign Language gestures.</p>
                        <p>The model analyzes hand movements from camera input, classifies signs, and presents interpretable outputs.</p>
                        <h4>Key Features</h4>
                        <ul>
                            <li>📷 Real-time image capture and preprocessing</li>
                            <li>🧠 AI-based gesture classification</li>
                            <li>📊 Metric visualization and result analysis</li>
                            <li>♿ A structure focused on accessible communication technologies</li>
                        </ul>
                        <h4>Technologies Used</h4>
                        <ul>
                            <li><strong>Python</strong> — Model development and data processing</li>
                            <li><strong>OpenCV</strong> — Image capture, preprocessing, and feature extraction</li>
                            <li><strong>Matplotlib</strong> — Training/performance metric visualization</li>
                        </ul>
                    `,
                developing: 'In development',
                completed: 'Completed'
            }
        };
        const text = isEnglish ? copy.en : copy.tr;

        return [
            {
                id: 'recycle-art',
                category: 'personal',
                title: text.recycleTitle,
                excerpt: text.recycleExcerpt,
                image: './assets/images/sanatı_geri_donustur.jpg',
                imageEmoji: '♻️',
                imageBg: 'linear-gradient(135deg, rgba(0,168,107,0.25), rgba(65,105,225,0.18))',
                technologies: ['Flutter', 'Dart', 'Firebase', 'ML Kit', 'Material Design'],
                detail: {
                    description: text.recycleDescription,
                    status: text.developing,
                    statusColor: '#f59e0b'
                }
            },
            {
                id: 'memorius',
                category: 'personal',
                title: text.memoriusTitle,
                excerpt: text.memoriusExcerpt,
                image: './assets/images/memorius.png',
                imageEmoji: '📔',
                imageBg: 'linear-gradient(135deg, rgba(197,107,255,0.25), rgba(146,72,122,0.2))',
                technologies: ['Flutter', 'Dart', 'SQLite', 'Hive', 'Provider'],
                detail: {
                    description: text.memoriusDescription,
                    status: text.developing,
                    statusColor: '#f59e0b'
                }
            },
            {
                id: 'tubitak-2209a-tid',
                category: 'academic',
                title: text.tubitakTitle,
                excerpt: text.tubitakExcerpt,
                image: './assets/images/tubitak.png',
                imageEmoji: '🤟',
                imageBg: 'linear-gradient(135deg, rgba(59,130,246,0.25), rgba(14,165,233,0.18))',
                technologies: ['Python', 'OpenCV', 'Matplotlib'],
                detail: {
                    description: text.tubitakDescription,
                    status: text.completed,
                    statusColor: '#22c55e'
                }
            }
        ];
    }

    getAllProjects() {
        return this.getStaticPersonalProjects();
    }

    /**
     * Create Project Card HTML
     */
    createProjectCard(project) {
        const isEnglish = window.i18n?.getLanguage?.() === 'en';
        const techTags = project.technologies
            .map(tech => `<span class="tag">${tech}</span>`)
            .join('');
        
        const categoryLabel = project.category === 'academic'
            ? (isEnglish ? 'Academic' : 'Akademik')
            : (isEnglish ? 'Personal' : 'Kişisel');
        const categoryClass = project.category === 'academic' ? 'badge-blue' : 'badge-personal';
        const techAria = isEnglish ? 'Used technologies' : 'Kullanılan teknolojiler';
        const detailLabel = isEnglish ? 'View Details' : 'Detay Gör';
        const detailAria = isEnglish ? `${project.title} details` : `${project.title} detaylarını gör`;

        // Image area: real img or emoji placeholder
        const imageArea = project.image
            ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
            : `<div class="project-image-emoji" style="background:${project.imageBg || 'transparent'}">
                    <span>${project.imageEmoji || '🚀'}</span>
               </div>`;
        
        return `
            <article class="project-card" data-category="${project.category}" aria-label="${project.title}">
                <div class="project-image">
                    ${imageArea}
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="badge ${categoryClass}">${categoryLabel}</span>
                    </div>
                    <div class="project-tags" aria-label="${techAria}">
                        ${techTags}
                    </div>
                    <p class="project-excerpt">${project.excerpt}</p>
                    <button
                        class="btn btn-detail project-detail-btn"
                        data-project-id="${project.id}"
                        aria-label="${detailAria}"
                    >
                        ${detailLabel} <span aria-hidden="true">→</span>
                    </button>
                </div>
            </article>
        `;
    }

    /**
     * Open detail modal
     */
    openDetailModal(project) {
        const isEnglish = window.i18n?.getLanguage?.() === 'en';
        // Remove existing modal
        const existing = document.getElementById('projectDetailModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'projectDetailModal';
        modal.className = 'project-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', isEnglish ? `${project.title} details` : `${project.title} detayları`);

        const statusBadge = project.detail?.status
            ? `<span class="project-status-badge" style="background:${project.detail.statusColor}22;color:${project.detail.statusColor};border:1px solid ${project.detail.statusColor}44">${project.detail.status}</span>`
            : '';

        const techTags = project.technologies
            .map(t => `<span class="tag">${t}</span>`)
            .join('');

        const modalHeroContent = project.image
            ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
            : `<span class="project-modal-emoji">${project.imageEmoji || '🚀'}</span>`;

        modal.innerHTML = `
            <div class="project-modal-box">
                <button class="project-modal-close" aria-label="${isEnglish ? 'Close' : 'Kapat'}" id="projectModalCloseBtn">✕</button>

                <div class="project-modal-hero" style="background:${project.imageBg || 'rgba(0,168,107,0.12)'}">
                    ${modalHeroContent}
                </div>

                <div class="project-modal-body">
                    <div class="project-modal-meta">
                        <h2 class="project-modal-title">${project.title}</h2>
                        ${statusBadge}
                    </div>
                    <div class="project-tags" style="margin-bottom:1.25rem">
                        ${techTags}
                    </div>
                    <div class="project-modal-description">
                        ${project.detail?.description || `<p>${isEnglish ? 'Details will be added soon.' : 'Detay yakında eklenecek.'}</p>`}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Animate in
        requestAnimationFrame(() => modal.classList.add('is-open'));

        // Close handlers
        const close = () => {
            modal.classList.remove('is-open');
            modal.addEventListener('transitionend', () => {
                modal.remove();
                document.body.style.overflow = '';
            }, { once: true });
        };

        document.getElementById('projectModalCloseBtn').addEventListener('click', close);
        modal.addEventListener('click', e => { if (e.target === modal) close(); });
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escClose); }
        });
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
window.projectManager = projectManager;
