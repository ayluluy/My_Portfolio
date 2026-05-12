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
    btn.type = 'button';
    btn.innerHTML = '↑';
    btn.title = 'Yukarıya Git';
    btn.setAttribute('aria-label', 'Sayfanın en üstüne dön');
    btn.style.cssText = `
        position:fixed; bottom:30px; right:30px;
        background:var(--primary-green); color:var(--bg-dark);
        border:none; border-radius:50%; width:44px; height:44px;
        font-size:20px; font-weight:bold; cursor:pointer;
        display:none; z-index:10000; box-shadow:var(--shadow-lg);
        transition:all 0.3s ease; pointer-events:auto;
    `;
    const goToTop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const home = document.getElementById('home');
        if (home) {
            home.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        document.documentElement.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' });
        document.body.scrollTo?.({ top: 0, left: 0, behavior: 'smooth' });
    };
    btn.addEventListener('click', goToTop);
    btn.addEventListener('pointerup', goToTop);
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
   10. ETKİNLİKLER — DETAY MODAL
────────────────────────────────── */
function setupEventDetails() {
    const eventCards = document.querySelectorAll('[data-event-id]');
    if (!eventCards.length) return;

    const eventDetails = {
        'firat-hsd': {
            title: 'Fırat Üniversitesi HSD — Başkan Yardımcısı',
            period: '2024+',
            summary: 'Kulüp koordinasyonu, etkinlik/sponsorluk süreçleri ve kurumlar arası iletişim yönetimi.',
            media: [
                './assets/images/1.jpg',
                './assets/images/2.jpg',
                './assets/images/3.jpg',
                './assets/images/4.jpg',
                './assets/images/5.jpg',
                './assets/images/6.jpeg'
            ],
            notesTitle: 'Fırat Üniversitesi HSD (Huawei Student Developers) – Başkan Yardımcısı / Etkinlik & Sponsorluk Komitesi',
            notes: [
                'Kulüp yönetiminde başkan yardımcısı olarak ekip koordinasyonu, etkinlik planlama ve temsil süreçlerini yürüttüm.',
                '100+ katılımcılı birçok etkinlikte moderasyon, sunum ve panel yönetimi görevlerini üstlendim.',
                'Huawei, Turkcell, Türk Telekom, Dias Technology ve Doğuş Technology gibi firmalarla iletişim kurarak konuşmacı koordinasyonu, program akışı ve sahne yönetimini organize ettim.',
                'Sponsorluk yazışmaları, resmi iletişim, içerik hazırlığı ve paydaş ilişkileri süreçlerinde aktif görev aldım.'
            ]
        },
        'desa-it-staj': {
            title: 'Desa Deri — IT Stajyeri',
            period: 'Staj',
            summary: 'Ağ/sunucu sistemlerinde teknik destek, yazılım kurulumu ve veri entegrasyonu süreçleri.',
            media: ['./assets/images/desa.jpg'],
            notesTitle: 'Desa Deri — Zorunlu IT Stajı',
            notes: [
                'DESA DERİ\'de bir aylık zorunlu IT stajımı başarıyla tamamladım!',
                'Bu süreçte, IT ekibinin dinamik bir üyesi olarak hem teknik becerilerimi geliştirdim hem de kurumsal çalışma ortamını yakından deneyimleme fırsatı buldum. 🪄'
            ],
            bulletIntro: 'Bu staj süresince,',
            bullets: [
                'IT altyapısındaki uç cihazlar, ağ donanımları ve çevre birimlerinin donanım teşhis, bakım ve onarım süreçlerinde aktif rol aldım.',
                'Sunucu odasında rack-mounted sistemler, switch, router ve patch panel yapılandırmalarını yerinde inceleme imkanı buldum.',
                'Kullanıcı bilgisayarlarına yazılım kurulumları gerçekleştirmenin yanı sıra, Excel üzerinde veri entegrasyonu yaparak iş süreçlerine katkıda bulundum.',
                'Kurum içi teknik arızalarda problem tanılama ve çözüm üretme becerilerimi geliştirdim ve alanında yetkin mühendislerle yaptığım görüşmelerle sistem, ağ ve donanım teknolojileri üzerine değerli bilgiler edindim.'
            ]
        },
        'tubitak-2209a-arastirma': {
            title: 'TÜBİTAK 2209-A Araştırma Projesi',
            period: 'Araştırma',
            summary: 'Türk işaret dili jestlerini tanıyan yapay zeka modelinde veri hazırlama ve modelleme çalışmaları.',
            media: ['./assets/images/tubitak.png'],
            notesTitle: 'TÜBİTAK 2209-A — Türk İşaret Dili Destekli Görüntü İşleme',
            notes: [
                'TÜBİTAK 2209-A kapsamında yürüttüğümüz projede, Türk İşaret Dili jestlerini tanıyan yapay zeka tabanlı bir görüntü işleme modeli üzerinde çalıştım.',
                'Bu süreçte hem akademik araştırma disiplinini deneyimledim hem de veri odaklı bir yapay zeka projesinde uçtan uca katkı sunma fırsatı buldum.'
            ],
            bulletIntro: 'Proje süresince,',
            bullets: [
                'Jest görüntüleri için veri toplama, etiketleme ve ön işleme adımlarında aktif rol alarak modelin eğitimine uygun, tutarlı bir veri seti oluşturulmasına katkıda bulundum.',
                'OpenCV ve Python ekosistemi ile görüntü iyileştirme, özellik çıkarma ve deney düzenleri kurarak model performansını izlenebilir biçimde test ettim.',
                'Sınıflandırma ve modelleme aşamasında farklı mimari ve hiperparametre denemeleriyle doğruluk ve genelleme hedeflerini dengelemeye yönelik iteratif geliştirme yaptım.',
                'Araştırma ekibiyle düzenli değerlendirmelerle literatür ve proje hedefleri doğrultusunda sonuçları yorumlayarak bilimsel raporlama ve sunum kültürünü pekiştirdim.'
            ]
        },
        'sosyal-etki-gonulluluk': {
            title: 'Gönüllülük ve Gençlik Projeleri',
            period: 'Sosyal Etki',
            summary: 'İpek Yolu Afet Gönüllüleri, KA154 Erasmus+ ve T3 Vakfı kapsamında aktif katılım.',
            media: [
                {
                    src: './assets/images/ald.jpg',
                    caption: 'İpek Yolu Afet Gönüllüleri ve sivil toplum iş birlikleri kapsamında dernek ortamında yürütülen gönüllü çalışmalardan bir kare; afet bilinci ve dayanışma temalı etkinliklerde aktif görev aldığım anları yansıtıyor.'
                },
                {
                    src: './assets/images/ald_dernek1.jpg',
                    caption: 'Afet eğitimi ve farkındalık oturumlarının yapıldığı sahalardan; katılımcılarla birlikte planlama ve sahada koordinasyon deneyimimi pekiştirdiğim bir görüntü.'
                },
                {
                    src: './assets/images/erasmus.png',
                    caption: 'KA154 Erasmus+ Gençlik Çalışmaları kapsamında uluslararası gençlik buluşmalarından; kültürlerarası iletişim ve proje odaklı iş birliği pratiği kazandığım bir an.'
                },
                {
                    src: './assets/images/erasmus1.png',
                    caption: 'Erasmus+ programı çerçevesinde grup çalışmaları, atölyeler ve paylaşım oturumlarının yapıldığı etkinlik alanından; takım içi sorumluluk ve sunum becerilerimi geliştirdiğim süreçlere dair bir görüntü.'
                },
                {
                    src: './assets/images/erasmus2.png',
                    caption: 'Uluslararası katılımcılarla proje çıktılarını ve deneyimleri değerlendirdiğimiz ağ kurma / kapanış aşamasından bir kare; gençlik çalışmalarının çok dilli ve çok kültürlü yönünü özetliyor.'
                },
                {
                    src: './assets/images/kulup_sponsorluk.png',
                    caption: 'Üniversite kulübü kapsamında sponsor ve paydaş kurumlarla yürütülen iletişim, programa dahil etme ve iş birliği görünürlüğünün öne çıktığı bir etkinlik ortamından kare; sahne ve akışın paydaş beklentileriyle uyumlu ilerlemesine katkı verdiğim dönemden.'
                },
                {
                    src: './assets/images/stand.png',
                    caption: 'Kulüp veya kurumsal temsilde hazırlanan bilgilendirme stantlarından; ziyaretçilerle etkileşim, tanıtım ve içerik paylaşımı süreçlerini yürüttüğüm stant deneyimimi gösteriyor.'
                },
                {
                    src: './assets/images/stant1.png',
                    caption: 'Farkındalık ve tanıtım odağında ikinci bir stant kurulumu veya alan düzenlemesinden; görünürlüğü artırmak için iletişim noktalarını organize ettiğim bir görüntü.'
                },
                {
                    src: './assets/images/yesilay_afad_kamp.jpg',
                    caption: 'Yeşilay ve AFAD iş birliğiyle düzenlenen kampta afet bilinci, ilk yardım ve bağımlılıkla mücadele başlıklarında teorik ve uygulamalı oturumlara katıldığım eğitim sürecinden bir kare.'
                },
                {
                    src: './assets/images/yesilay_afad_kampı.jpg',
                    caption: 'Kamptaki takım çalışması ve saha uygulamalarında risk farkındalığını pekiştiren modüllerden biri; gönüllü disiplini ve kurumsal eğitmen yönlendirmesiyle ilerlediğimiz bir an.'
                },
                {
                    src: './assets/images/yesilay_stant.png',
                    caption: 'Yeşilay çatısı altında yürütülen bilgilendirme stant etkinliğinde ziyaretçilerle birebir görüşerek mesajlaşma ve kayıt süreçlerinde destek verdiğim çalışmalardan biri.'
                }
            ],
            notesTitle: 'Gönüllülük ve gençlik alanında iz bırakan çalışmalar',
            notes: [
                'İpek Yolu Afet Gönüllüleri, KA154 Erasmus+ ve T3 Vakfı gibi yapılar altında hem sahada hem salonda gönüllülük yaptım; ekip çalışması, iletişim ve sorumluluk alanlarında kendimi sürekli geliştirdim.',
                'Bu deneyimler, teknik projelerimin ötesinde toplumsal fayda üretme ve paydaşlarla güven ilişkisi kurma becerimi güçlendirdi.'
            ],
            bulletIntro: 'Öne çıkan başlıklar:',
            bullets: [
                'Afet bilinci ve gönüllü koordinasyonu odaklı saha etkinliklerinde aktif rol aldım.',
                'Erasmus+ kapsamında uluslararası gençlik buluşmalarında takım çalışması ve kültürlerarası iletişim pratiği edindim.',
                'Kulüp yönetimi ve sponsorluk süreçlerinde stant, tanıtım ve kurumsal temsil deneyimi kazandım.',
                'Yeşilay ve AFAD iş birlikleriyle yürütülen eğitim ve farkındalık çalışmalarına katılarak sağlıklı yaşam ve risk yönetimi mesajlarını yaygınlaştırmaya katkı sağladım.'
            ]
        }
    };

    const eventDetailsEn = {
        'firat-hsd': {
            title: 'Firat University HSD — Vice President',
            period: '2024+',
            summary: 'Managed club coordination, event/sponsorship operations, and institutional communication.',
            notesTitle: 'Firat University HSD (Huawei Student Developers) — Vice President / Events & Sponsorship Committee',
            notes: [
                'As vice president, I worked on team coordination, event planning, and representation processes.',
                'I took roles in moderation, presentation, and panel flow for events with 100+ participants.',
                'I coordinated speaker communication, program flow, and stage management with companies such as Huawei, Turkcell, Turk Telekom, Dias Technology, and Dogus Technology.',
                'I actively contributed to sponsorship communication, official correspondence, content preparation, and stakeholder relations.'
            ]
        },
        'desa-it-staj': {
            title: 'Desa Deri — IT Intern',
            period: 'Internship',
            summary: 'Supported network/server systems, software setup, and data integration processes.',
            notesTitle: 'Desa Deri — Mandatory IT Internship',
            notes: [
                'I successfully completed my one-month mandatory IT internship at DESA DERI.',
                'During this period, I improved my technical skills as a member of the IT team and experienced a corporate working environment closely.'
            ],
            bulletIntro: 'During this internship,',
            bullets: [
                'I supported hardware diagnosis, maintenance, and repair processes for endpoint devices, network equipment, and peripherals.',
                'I observed rack-mounted systems, switches, routers, and patch panel structures in the server room.',
                'I installed software on user computers and contributed to business processes through Excel-based data integration.',
                'I improved my troubleshooting skills and learned valuable details about systems, networking, and hardware from experienced engineers.'
            ]
        },
        'tubitak-2209a-arastirma': {
            title: 'TUBITAK 2209-A Research Project',
            period: 'Research',
            summary: 'Worked on data preparation and modeling for an AI model recognizing Turkish Sign Language gestures.',
            notesTitle: 'TUBITAK 2209-A — Turkish Sign Language Supported Computer Vision',
            notes: [
                'Within TUBITAK 2209-A, I worked on an AI-based computer vision model that recognizes Turkish Sign Language gestures.',
                'This process helped me experience academic research discipline and contribute end-to-end to a data-focused AI project.'
            ],
            bulletIntro: 'Throughout the project,',
            bullets: [
                'I contributed to data collection, labeling, and preprocessing for gesture images to build a consistent training set.',
                'I used OpenCV and Python for image enhancement, feature extraction, and measurable experiment setups.',
                'I iterated on model architecture and hyperparameters to balance accuracy and generalization.',
                'I interpreted outcomes with the research team and strengthened scientific reporting and presentation practices.'
            ]
        },
        'sosyal-etki-gonulluluk': {
            title: 'Volunteering & Youth Projects',
            period: 'Social Impact',
            summary: 'Active participation in Ipek Yolu Disaster Volunteers, KA154 Erasmus+, and T3 Foundation initiatives.',
            notesTitle: 'Meaningful work in volunteering and youth projects',
            notes: [
                'I volunteered both in the field and in events under organizations such as Ipek Yolu Disaster Volunteers, KA154 Erasmus+, and the T3 Foundation.',
                'These experiences strengthened my ability to create social impact beyond technical projects and build trust with stakeholders.'
            ],
            bulletIntro: 'Highlights:',
            bullets: [
                'I actively participated in field activities focused on disaster awareness and volunteer coordination.',
                'Through Erasmus+, I gained teamwork and intercultural communication experience in international youth meetings.',
                'I built experience in club management, sponsorship processes, stands, promotion, and institutional representation.',
                'I contributed to awareness and education efforts through collaborations with Yesilay and AFAD.'
            ],
            captions: [
                'A moment from volunteer work with Ipek Yolu Disaster Volunteers and civil society partners, reflecting my active role in disaster awareness and solidarity-focused events.',
                'A field setting for disaster education and awareness sessions where I strengthened planning and coordination experience with participants.',
                'An international youth meeting under KA154 Erasmus+, where I gained intercultural communication and project-based collaboration experience.',
                'A workshop and group work setting within Erasmus+ where I improved responsibility sharing and presentation skills.',
                'A networking and closing moment with international participants, reflecting the multilingual and multicultural side of youth work.',
                'An event environment involving university club sponsorship and stakeholder communication, where I contributed to stage flow and partner visibility.',
                'An information stand experience focused on visitor interaction, promotion, and content sharing.',
                'A second stand setup focused on awareness and visibility through organized communication points.',
                'A training moment from a Yesilay and AFAD camp covering disaster awareness, first aid, and addiction prevention.',
                'A camp activity where teamwork and risk awareness were strengthened through volunteer discipline and trainer guidance.',
                'A Yesilay information stand where I supported one-to-one visitor communication and awareness work.'
            ]
        }
    };

    const openEventModal = (eventId) => {
        const isEnglish = window.i18n?.getLanguage?.() === 'en';
        const baseDetail = eventDetails[eventId];
        const translatedDetail = isEnglish ? eventDetailsEn[eventId] : null;
        const detail = translatedDetail ? { ...baseDetail, ...translatedDetail } : baseDetail;
        if (!detail) return;

        const existing = document.getElementById('eventDetailModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'eventDetailModal';
        modal.className = `event-modal-overlay event-modal-${eventId}`;
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', isEnglish ? `${detail.title} details` : `${detail.title} detayları`);

        const noteItems = (detail.notes || []).map((item) => `<p>${item}</p>`).join('');
        const bulletBlock = Array.isArray(detail.bullets) && detail.bullets.length
            ? `<p class="event-info-bullet-intro">${detail.bulletIntro || ''}</p><ul class="event-info-bullets">${detail.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`
            : '';
        const rawMedia = detail.media || [];
        const normalizedMedia = rawMedia.map((item) => {
            if (typeof item === 'string') return { src: item, caption: '' };
            return { src: item.src, caption: item.caption || '' };
        });
        if (isEnglish && Array.isArray(detail.captions)) {
            normalizedMedia.forEach((item, index) => {
                item.caption = detail.captions[index] || item.caption;
            });
        }
        const hasSlideCaptions = normalizedMedia.some((m) => m.caption);
        const firstCaption = normalizedMedia[0]?.caption || '';
        const multiSlide = normalizedMedia.length > 1;
        const navButtons = multiSlide ? `
                <button type="button" class="event-slideshow-nav event-slideshow-prev" aria-label="${isEnglish ? 'Previous image' : 'Önceki görsel'}"><span aria-hidden="true">‹</span></button>
                <button type="button" class="event-slideshow-nav event-slideshow-next" aria-label="${isEnglish ? 'Next image' : 'Sonraki görsel'}"><span aria-hidden="true">›</span></button>
            ` : '';
        const mediaSlides = normalizedMedia.map((item, index) => `
            <div class="event-slide" data-slide-index="${index}" aria-hidden="${index === 0 ? 'false' : 'true'}">
                <img src="${item.src}" alt="${detail.title} ${isEnglish ? 'image' : 'görsel'} ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">
            </div>
        `).join('');
        const slideCaptionHtml = hasSlideCaptions
            ? `<div class="event-slideshow-caption" aria-live="polite"><p class="event-slide-caption-text">${firstCaption}</p></div>`
            : '';

        modal.innerHTML = `
            <div class="event-modal-box">
                <button class="event-modal-close" id="eventModalCloseBtn" aria-label="${isEnglish ? 'Close' : 'Kapat'}">✕</button>
                <div class="event-modal-header">
                    <span class="event-modal-period">${detail.period}</span>
                    <h3>${detail.title}</h3>
                    <p>${detail.summary}</p>
                </div>

                <div class="event-media-stream event-media-slideshow${multiSlide ? '' : ' is-single'}" aria-label="${isEnglish ? 'Event image slideshow' : 'Etkinlik görsel sunumu'}" aria-live="polite">
                    <div class="event-slideshow-viewport">
                        <div class="event-slideshow-track">
                            ${mediaSlides}
                        </div>
                        ${navButtons}
                    </div>
                </div>
                ${slideCaptionHtml}

                <div class="event-info-flow">
                    <h4>${detail.notesTitle || (isEnglish ? 'Information Flow' : 'Bilgi Akışı')}</h4>
                    <div class="event-info-text">${noteItems}${bulletBlock}</div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => modal.classList.add('is-open'));

        const viewport = modal.querySelector('.event-slideshow-viewport');
        const track = modal.querySelector('.event-slideshow-track');
        const slides = modal.querySelectorAll('.event-slide');
        const captionEl = modal.querySelector('.event-slide-caption-text');
        let slideIndex = 0;
        let autoplayTimer = null;
        let slideshowCleanup = null;

        const clearAutoplay = () => {
            if (autoplayTimer) {
                clearTimeout(autoplayTimer);
                autoplayTimer = null;
            }
        };

        const layoutTrack = () => {
            if (!viewport || !track || !slides.length) return;
            const w = viewport.offsetWidth;
            if (w < 1) return;
            slides.forEach((s) => { s.style.width = `${w}px`; });
            track.style.transform = `translate3d(-${slideIndex * w}px,0,0)`;
        };

        if (multiSlide) {
            const SLIDE_MS = 3000;
            const scheduleAutoplay = () => {
                clearAutoplay();
                autoplayTimer = setTimeout(() => {
                    goTo(slideIndex + 1);
                }, SLIDE_MS);
            };
            const goTo = (i) => {
                slideIndex = ((i % slides.length) + slides.length) % slides.length;
                slides.forEach((el, idx) => {
                    el.setAttribute('aria-hidden', idx === slideIndex ? 'false' : 'true');
                });
                if (captionEl) captionEl.textContent = normalizedMedia[slideIndex]?.caption || '';
                layoutTrack();
                scheduleAutoplay();
            };
            const onResize = () => { layoutTrack(); };
            window.addEventListener('resize', onResize);
            slideshowCleanup = () => {
                clearAutoplay();
                window.removeEventListener('resize', onResize);
            };
            modal.querySelector('.event-slideshow-prev')?.addEventListener('click', (e) => {
                e.stopPropagation();
                goTo(slideIndex - 1);
            });
            modal.querySelector('.event-slideshow-next')?.addEventListener('click', (e) => {
                e.stopPropagation();
                goTo(slideIndex + 1);
            });
            requestAnimationFrame(() => {
                layoutTrack();
                if (captionEl) captionEl.textContent = normalizedMedia[slideIndex]?.caption || '';
                scheduleAutoplay();
            });
        } else if (captionEl && normalizedMedia[0]) {
            captionEl.textContent = normalizedMedia[0].caption || '';
            requestAnimationFrame(() => layoutTrack());
        } else {
            requestAnimationFrame(() => layoutTrack());
        }

        const closeImageLightbox = () => {
            const lightbox = document.getElementById('eventImageLightbox');
            if (!lightbox) return false;
            lightbox.classList.remove('is-open');
            lightbox.addEventListener('transitionend', () => lightbox.remove(), { once: true });
            return true;
        };

        const openImageLightbox = (src, alt, captionText = '') => {
            closeImageLightbox();
            const lightbox = document.createElement('div');
            lightbox.id = 'eventImageLightbox';
            lightbox.className = 'event-image-lightbox';
            const cap = captionText
                ? `<p class="event-lightbox-caption">${captionText}</p>`
                : '';
            lightbox.innerHTML = `
                <button class="event-image-lightbox-close" aria-label="${isEnglish ? 'Close image' : 'Görseli kapat'}">✕</button>
                <div class="event-lightbox-inner">
                    <img src="${src}" alt="${alt}">
                    ${cap}
                </div>
            `;
            document.body.appendChild(lightbox);
            requestAnimationFrame(() => lightbox.classList.add('is-open'));
            lightbox.querySelector('.event-image-lightbox-close')?.addEventListener('click', closeImageLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeImageLightbox();
            });
        };

        const close = () => {
            slideshowCleanup?.();
            closeImageLightbox();
            modal.classList.remove('is-open');
            modal.addEventListener('transitionend', () => {
                modal.remove();
                document.body.style.overflow = '';
            }, { once: true });
        };

        document.getElementById('eventModalCloseBtn')?.addEventListener('click', close);
        modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
        modal.querySelectorAll('.event-slide img').forEach((img) => {
            const slide = img.closest('.event-slide');
            const idx = Number(slide?.getAttribute('data-slide-index') ?? '0');
            img.addEventListener('click', () => openImageLightbox(
                img.src,
                img.alt,
                normalizedMedia[idx]?.caption || ''
            ));
        });
        document.addEventListener('keydown', function escClose(e) {
            if (e.key === 'Escape') {
                const lightboxWasClosed = closeImageLightbox();
                if (!lightboxWasClosed) {
                    close();
                    document.removeEventListener('keydown', escClose);
                }
            }
        });
    };

    eventCards.forEach((card) => {
        card.addEventListener('click', () => openEventModal(card.getAttribute('data-event-id')));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openEventModal(card.getAttribute('data-event-id'));
            }
        });
    });
}

function setupCvMenu() {
    const menu = document.getElementById('cvMenu');
    const toggle = document.getElementById('cvMenuToggle');
    if (!menu || !toggle) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !menu.classList.contains('open');
        menu.classList.toggle('open', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target)) {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ──────────────────────────────────
   11. PROJELER — FİLTRE
────────────────────────────────── */
function setupProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            if (window.projectManager) {
                window.projectManager.filterByCategory(filter);
            }
        });
    });
}

/* ──────────────────────────────────
   12. HAMBURGER MENÜ
────────────────────────────────── */
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const topNav = document.querySelector('.top-nav');
    if (!hamburger || !topNav) return;

    const closeMenu = () => {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    };

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.contains('active');
        if (isOpen) closeMenu();
        else openMenu();
    });

    topNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('menu-open')) return;
        if (e.target.closest('.top-nav') || e.target.closest('#hamburger')) return;
        closeMenu();
    });

}

/* ──────────────────────────────────
   13. CUSTOM CURSOR
────────────────────────────────── */
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor || isTouchDevice()) return;

    const show = () => cursor.classList.add('is-active');
    const hide = () => cursor.classList.remove('is-active');
    let lastTrailTime = 0;
    let lastX = 0;
    let lastY = 0;

    const createTrail = (x, y) => {
        const trail = document.createElement('span');
        trail.className = 'cursor-trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        document.body.appendChild(trail);
        trail.addEventListener('animationend', () => trail.remove(), { once: true });
    };

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        const now = Date.now();
        const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (now - lastTrailTime > 22 && distance > 8) {
            createTrail(e.clientX, e.clientY);
            lastTrailTime = now;
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    document.addEventListener('mouseenter', show);
    document.addEventListener('mouseleave', hide);
}

/* ──────────────────────────────────
   14. HERO LOTTIE
────────────────────────────────── */
function setupHeroLottie() {
    const container = document.getElementById('heroLottie');
    if (!container || !window.lottie) return;

    try {
        window.lottie.loadAnimation({
            container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/lottie/hero.json'
        });

        container.closest('.anim-frame')?.classList.add('has-lottie');
    } catch (error) {
        console.warn('Lottie animation failed to load:', error);
    }
}

/* ──────────────────────────────────
   15. ÖNERİLER FİLTRESİ
────────────────────────────────── */
function setupRecommendations() {
    const filterBtns = document.querySelectorAll('.rec-filter-btn');
    const cards = document.querySelectorAll('.rec-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.recFilter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.recType === filter) {
                    card.classList.remove('rec-hidden');
                } else {
                    card.classList.add('rec-hidden');
                }
            });
        });
    });
}

/* ──────────────────────────────────
   16. KİTAPLAR/ÖNERİLER CAROUSEL
────────────────────────────────── */
function setupRecommendationsCarousel() {
    const storySteps = document.querySelectorAll('[data-recommendations-id]');
    const detailPage = document.getElementById('recommendations-detail');
    const backBtn = document.getElementById('backToRecommendations');
    const title = document.getElementById('recommendationsDetailTitle');
    
    if (!storySteps.length || !detailPage || !backBtn) return;

    const getRecommendationTitle = (id) => {
        const titles = window.i18n?.t?.('recommendationsDetailTitles') || {
            books: 'Kitaplar',
            documentaries: 'Belgeseller & Animasyonlar',
            animations: 'Animasyonlar',
            'documentary-films': 'Belgeseller',
            movies: 'Filmler',
            default: 'Öneriler'
        };
        return titles[id] || titles.default;
    };

    let currentIndex = 0;
    let visibleCards = [];
    let modal = null;
    let activeRecommendationId = null;

    const openDetail = (recommendationId) => {
        const content = document.getElementById('recommendationsContent');
        const items = Array.from(content?.querySelectorAll('[data-rec-group]') || []);
        const cards = Array.from(content?.querySelectorAll('.recommendation-card') || []);
        const categoryChoices = Array.from(content?.querySelectorAll('.recommendation-category-choice') || []);
        const isCategoryChoice = categoryChoices.some(choice => choice.dataset.recGroup === recommendationId);
        visibleCards = isCategoryChoice ? [] : cards.filter(card => card.dataset.recGroup === recommendationId);
        if (!isCategoryChoice && !visibleCards.length) return;

        items.forEach(item => {
            item.classList.toggle('recommendation-hidden', item.dataset.recGroup !== recommendationId);
        });

        currentIndex = 0;
        activeRecommendationId = recommendationId;
        if (title) title.textContent = getRecommendationTitle(recommendationId);
        openRecommendationsModal();
        if (isCategoryChoice) {
            updateCategoryChoice();
        } else {
            updateCarousel();
        }
    };

    const closeDetail = () => {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.addEventListener('transitionend', () => {
            detailPage.classList.add('hidden');
            document.body.appendChild(detailPage);
            modal?.remove();
            modal = null;
            document.body.style.overflow = '';
        }, { once: true });
    };

    const openRecommendationsModal = () => {
        const existing = document.getElementById('recommendationsDetailModal');
        if (existing) existing.remove();

        modal = document.createElement('div');
        modal.id = 'recommendationsDetailModal';
        modal.className = 'event-modal-overlay recommendations-modal-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', window.i18n?.getLanguage?.() === 'en'
            ? `${title?.textContent || 'Recommendations'} details`
            : `${title?.textContent || 'Öneriler'} detayları`);
        modal.innerHTML = `
            <div class="event-modal-box recommendations-modal-box">
                <button class="event-modal-close recommendations-modal-close" id="recommendationsModalCloseBtn" aria-label="${window.i18n?.getLanguage?.() === 'en' ? 'Close' : 'Kapat'}">✕</button>
            </div>
        `;

        const box = modal.querySelector('.recommendations-modal-box');
        detailPage.classList.remove('hidden');
        box.appendChild(detailPage);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => modal.classList.add('is-open'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeDetail();
        });
        modal.querySelector('#recommendationsModalCloseBtn')?.addEventListener('click', closeDetail);
    };

    const updateCarousel = () => {
        const content = document.getElementById('recommendationsContent');
        const counter = document.getElementById('recommendationsCounter');
        const controls = document.querySelector('#recommendationsCarousel .carousel-controls');
        const totalCards = visibleCards.length;
        if (!content || !totalCards) return;

        controls?.classList.remove('recommendation-hidden');
        content.style.transform = 'translateX(0)';
        visibleCards.forEach((card, index) => {
            card.classList.toggle('recommendation-hidden', index !== currentIndex);
        });
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${totalCards}`;
            const activeCard = visibleCards[currentIndex];
            const visual = activeCard?.querySelector('.recommendation-visual');
            const info = activeCard?.querySelector('.recommendation-info');
            if (visual && info) {
                activeCard.insertBefore(counter, info);
            }
        }
        updateBackButton();
    };

    const updateCategoryChoice = () => {
        const controls = document.querySelector('#recommendationsCarousel .carousel-controls');
        controls?.classList.add('recommendation-hidden');
        updateBackButton();
    };

    const updateBackButton = () => {
        if (activeRecommendationId === 'animations') {
            backBtn.textContent = window.i18n?.t?.('recBackDocumentaries') || '← Belgesellere Göz At';
            backBtn.dataset.targetRecommendation = 'documentary-films';
        } else if (activeRecommendationId === 'documentary-films') {
            backBtn.textContent = window.i18n?.t?.('recBackAnimations') || '← Animasyonlara Göz At';
            backBtn.dataset.targetRecommendation = 'animations';
        } else {
            backBtn.textContent = window.i18n?.t?.('recBackDefault') || '← Önerilere Dön';
            delete backBtn.dataset.targetRecommendation;
        }
    };

    const showNext = () => {
        if (!visibleCards.length) return;
        currentIndex = (currentIndex + 1) % visibleCards.length;
        updateCarousel();
    };

    const showPrev = () => {
        if (!visibleCards.length) return;
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        updateCarousel();
    };

    const prevBtn = document.getElementById('recommendationsPrev');
    const nextBtn = document.getElementById('recommendationsNext');

    prevBtn?.addEventListener('click', showPrev);
    nextBtn?.addEventListener('click', showNext);

    document.addEventListener('keydown', (e) => {
        if (modal?.classList.contains('is-open')) {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') closeDetail();
        }
    });

    storySteps.forEach((step) => {
        step.addEventListener('click', () => {
            openDetail(step.getAttribute('data-recommendations-id'));
        });
        step.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDetail(step.getAttribute('data-recommendations-id'));
            }
        });
    });

    document.querySelectorAll('[data-rec-filter]').forEach((button) => {
        button.addEventListener('click', () => {
            openDetail(button.getAttribute('data-rec-filter'));
        });
    });

    backBtn.addEventListener('click', () => {
        const targetRecommendation = backBtn.dataset.targetRecommendation;
        if (targetRecommendation) {
            openDetail(targetRecommendation);
            return;
        }
        closeDetail();
    });
}

/* ──────────────────────────────────
   17. DİNAMİK AMBIENT TEMA
────────────────────────────────── */
function setupDynamicAmbientTheme() {
    const body = document.body;
    if (!body) return;
    const toneClasses = ['ambient-morning', 'ambient-day', 'ambient-evening', 'ambient-night'];

    const applyTone = (tone) => {
        toneClasses.forEach((className) => body.classList.remove(className));
        body.classList.add(tone);
    };

    const fromHour = (hour) => {
        if (hour >= 6 && hour < 11) return 'ambient-morning';
        if (hour >= 11 && hour < 17) return 'ambient-day';
        if (hour >= 17 && hour < 21) return 'ambient-evening';
        return 'ambient-night';
    };

    const now = new Date();
    applyTone(fromHour(now.getHours()));
}

/* ──────────────────────────────────
   17. VERİ YÜKLEMESİ
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
    setupEventDetails();
    setupProjectFilter();
    setupHamburgerMenu();
    setupCustomCursor();
    setupHeroLottie();
    setupRecommendations();
    setupRecommendationsCarousel();
    setupDynamicAmbientTheme();
    setupCvMenu();
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
