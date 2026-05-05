/*
  ====================================
  MAIN — Scroll-Based Single Page App
  ====================================
*/

/* ──────────────────────────────────
   1. SMOOTH SCROLL (scroll-link sınıfı)
────────────────────────────────── */
function setupSmoothScroll() {
    document.querySelectorAll('a.scroll-link, a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ──────────────────────────────────
   2. SAĞ KENAR NOKTA NAVİGASYON
────────────────────────────────── */
function setupSideNav() {
    const dots   = document.querySelectorAll('.side-dot');
    const sections = Array.from(dots).map(d =>
        document.getElementById(d.dataset.target)
    ).filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dots.forEach(d => d.classList.toggle('active', d.dataset.target === id));
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
}

/* ──────────────────────────────────
   3. BÖLÜM GİRİŞ ANİMASYONLARI (reveal)
────────────────────────────────── */
function setupReveal() {
    const targets = document.querySelectorAll('.reveal-section');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(t => observer.observe(t));
}

/* ──────────────────────────────────
   4. SKILL BAR ANİMASYONLARI
────────────────────────────────── */
function setupSkillBars() {
    const fills = document.querySelectorAll('.skill-fill:not(.animated)');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = (fill.dataset.level || 0) + '%';
                fill.classList.add('animated');
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(f => observer.observe(f));
}

/* ──────────────────────────────────
   5. SCROLL-TO-TOP BUTONU
────────────────────────────────── */
function setupScrollToTop() {
    const btn = document.createElement('button');
    btn.id = 'scrollToTopBtn';
    btn.innerHTML = '↑';
    btn.title = 'Yukarıya Git';
    btn.style.cssText = `
        position:fixed; bottom:30px; right:30px;
        background:var(--primary-green); color:var(--bg-dark);
        border:none; border-radius:50%; width:44px; height:44px;
        font-size:20px; font-weight:bold; cursor:pointer;
        display:none; z-index:500; box-shadow:var(--shadow-lg);
        transition:all 0.3s ease;
    `;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.1)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 400 ? 'block' : 'none';
    }, { passive: true });
}

/* ──────────────────────────────────
   6. İLETİŞİM FORMU
────────────────────────────────── */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = document.getElementById('name')?.value.trim();
        const email   = document.getElementById('email')?.value.trim();
        const topic   = document.getElementById('topic')?.value;
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !message) {
            showToast('Lütfen zorunlu alanları doldurun.', 'error');
            return;
        }

        const subject = `[Portfolyo] ${topic || 'Mesaj'} — ${name}`;
        const body    = `Gönderici: ${name}\nE-posta: ${email}\nKonu: ${topic || 'Belirtilmedi'}\n\n${message}`;
        window.location.href = `mailto:eylul@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setTimeout(() => {
            showToast('Mesajınız hazırlandı! E-posta istemciniz açılıyor. 🚀', 'success');
            form.reset();
        }, 600);
    });
}

/* ──────────────────────────────────
   7. TOAST BİLDİRİMİ
────────────────────────────────── */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    const color = type === 'error' ? '#FF6B6B' : '#00A86B';
    toast.style.cssText = `
        position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
        background:${color}; color:#fff; padding:14px 24px;
        border-radius:12px; font-size:14px; font-weight:600;
        z-index:9999; box-shadow:0 8px 24px rgba(0,0,0,0.3);
        animation:toastIn 0.4s ease;
    `;

    if (!document.getElementById('toast-style')) {
        const s = document.createElement('style');
        s.id = 'toast-style';
        s.textContent = `@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`;
        document.head.appendChild(s);
    }

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

/* ──────────────────────────────────
   8. BLOG — DETAY AÇMA/KAPAMA
────────────────────────────────── */
function setupBlogToggle() {
    const detail   = document.getElementById('blog-post');
    const postsList = document.getElementById('blogPosts');
    const backBtn  = document.getElementById('backToBlog');

    if (!detail || !backBtn) return;

    // Blog kartlarına tıklanınca (delegation)
    document.addEventListener('click', (e) => {
        const card = e.target.closest('[data-post-id]');
        if (!card || !card.closest('#blogPosts')) return;

        const postId = card.dataset.postId;
        if (window.blogManager) {
            window.blogManager.showPost(postId);
        }
        postsList && (postsList.style.display = 'none');
        detail.classList.remove('hidden');
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    backBtn.addEventListener('click', () => {
        detail.classList.add('hidden');
        postsList && (postsList.style.display = '');
    });
}

/* ──────────────────────────────────
   9. HERO BUTONLARI — KEŞFET VE İLETİŞİM
────────────────────────────────── */
function setupHeroButtons() {
    const discoverBtn = document.querySelector('.hero-discover-btn');
    const contactText = document.querySelector('.hero-contact-animated');

    if (discoverBtn) {
        discoverBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (contactText) {
        contactText.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

/* ──────────────────────────────────
   10. PROJELER — FİLTRE
────────────────────────────────── */
function setupProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            if (window.projectManager) {
                window.projectManager.filterProjects(filter);
            }
        });
    });
}

/* ──────────────────────────────────
   10. VERİ YÜKLEMESİ
────────────────────────────────── */
async function loadData() {
    if (window.blogManager) {
        await window.blogManager.loadBlogPosts();
        window.blogManager.loadBlogList();
    }
    if (window.projectManager) {
        await window.projectManager.loadProjects();
        window.projectManager.renderProjects();
    }
}

/* ──────────────────────────────────
   BAŞLATMA
────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupSideNav();
    setupReveal();
    setupSkillBars();
    setupScrollToTop();
    setupContactForm();
    setupBlogToggle();
    setupHeroButtons();
    setupProjectFilter();
    loadData();

    // Animasyon yöneticisi
    if (window.animationManager) {
        window.animationManager.setupMouseFollowEffect?.();
        window.animationManager.animateSVGFigures?.();
    }

    log?.('Uygulama başlatıldı ✅');
});

/* ──────────────────────────────────
   SEKME GÖRÜNÜRLÜĞÜ (canvas durdur/devam)
────────────────────────────────── */
document.addEventListener('visibilitychange', () => {
    if (!window.animationManager) return;
    if (document.hidden) {
        cancelAnimationFrame(window.animationManager.animationFrameId);
    } else {
        window.animationManager.animateCanvas?.();
    }
});

/* Global hata yakalama */
window.addEventListener('error', (e) => console.error('[Portfolyo Hata]', e.message));
window.addEventListener('unhandledrejection', (e) => console.error('[Portfolyo Promise Hata]', e.reason));
