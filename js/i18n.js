/*
  ====================================
  I18N - Turkish / English Toggle
  ====================================
*/

(function () {
    const STORAGE_KEY = 'portfolio-lang';

    const dict = {
        tr: {
            htmlLang: 'tr',
            langButton: 'EN',
            menuLabel: 'Ana menü',
            home: 'Anasayfa',
            about: 'Hakkımda',
            projects: 'Projeler',
            blog: 'Medium Yazıları',
            contact: 'İletişim',
            cvDownload: 'CV İndir',
            cvTurkish: 'Türkçe CV',
            cvEnglish: 'English CV',
            discover: 'Keşfet',
            contactBtn: 'İletişim',
            heroHint: 'İnteraktif gösterim<br>çok yakında burada',
            aboutHeading: 'Hakkımda',
            projectsHeading: 'Projeler',
            eventsHeading: 'Etkinlikler',
            storyCvHeading: 'Hikaye Modu CV',
            storyCvIntro: 'Kaydırdıkça kariyer hikayem zaman çizelgesi gibi canlanır.',
            blogHeading: 'Medium Yazıları',
            mediumInfoBox: 'Yakında yazılar burada gösterilecek',
            contactHeading: 'Seninle Konuşalım',
            techSkills: 'Teknoloji Yetkinlikleri',
            skillsAria: 'Kullanılan teknolojiler',
            blogSearch: 'Yazıları ara...',
            backToBlog: '← Tüm Yazılar',
            contactIntro: 'Kariyer, teknoloji, hobiler ya da sadece sohbet etmek için mesajını bekliyorum!',
            nameLabel: 'Adınız',
            namePlaceholder: 'Adınız Soyadınız',
            emailLabel: 'E-posta',
            emailPlaceholder: 'ornek@email.com',
            topicLabel: 'Konu',
            topicPlaceholder: 'Konu seçin...',
            messageLabel: 'Mesaj',
            messagePlaceholder: 'Merhaba Eylül, seninle ... hakkında konuşmak istiyorum.',
            submit: 'Gönder 🚀'
            ,
            heroTagline: 'Yönetim Bilişim Sistemleri Öğrencisi',
            scrollHint: 'Aşağı kaydır',
            aboutBio1: 'Finans, veri analizi ve dijital pazarlama alanlarında kendini geliştiren bir Yönetim Bilişim Sistemleri öğrencisiyim.',
            aboutBio2: 'Analitik düşünme, takım çalışması ve etkili iletişimi birleştirerek hem teknik hem sosyal fayda üreten projelerde aktif rol alıyorum.',
            metaDepartment: 'Üniversite',
            metaDepartmentValue: 'Fırat Üniversitesi — Yönetim Bilişim Sistemleri',
            metaClass: 'GANO',
            metaClassValue: '3.30 / 4.00',
            events: [
                ['Fırat Üniversitesi HSD — Başkan Yardımcısı', 'Kulüp koordinasyonu, etkinlik/sponsorluk süreçleri ve kurumlar arası iletişim yönetimi.'],
                ['Desa Deri — IT Stajyeri', 'Ağ/sunucu sistemlerinde teknik destek, yazılım kurulumu ve veri entegrasyonu süreçleri.'],
                ['TÜBİTAK 2209-A Araştırma Projesi', 'Türk işaret dili jestlerini tanıyan yapay zeka modelinde veri hazırlama ve modelleme çalışmaları.'],
                ['Gönüllülük ve Gençlik Projeleri', 'İpek Yolu Afet Gönüllüleri, KA154 Erasmus+ ve T3 Vakfı kapsamında aktif katılım.']
            ],
            contactTopicsTitle: 'Ne hakkında konuşabiliriz?',
            topicChips: ['💼 Kariyer', '💻 Teknoloji', '🎨 Tasarım', '🎯 Hobi', '📚 Eğitim', '🚀 Proje', '✍️ Yazarlık', '🌟 Eleştiri'],
            findMe: 'Bul Beni',
            topicOptions: ['Konu seçin...', '💼 Kariyer', '💻 Teknoloji', '🎨 Tasarım', '🎯 Hobi', '🌟 Eleştiri / Geribildirim', '🚀 Proje İş Birliği', '💬 Diğer'],
            footerTagline: 'Modern tasarım, interaktif animasyonlar<br>ve fark yaratan projelerle.',
            footerSections: 'Bölümler',
            footerContact: 'İletişim',
            footerMade: 'Web Tasarım projesi için yapıldı',
            footerRights: '&copy; 2026 <strong>Eylül Yılmaz</strong>. Tüm hakları saklıdır.'
        },
        en: {
            htmlLang: 'en',
            langButton: 'TR',
            menuLabel: 'Main menu',
            home: 'Home',
            about: 'About',
            projects: 'Projects',
            blog: 'Medium',
            contact: 'Contact',
            cvDownload: 'Download CV',
            cvTurkish: 'Turkish CV',
            cvEnglish: 'English CV',
            discover: 'Explore',
            contactBtn: 'Contact',
            heroHint: 'Interactive showcase<br>coming very soon',
            aboutHeading: 'About',
            projectsHeading: 'Projects',
            eventsHeading: 'Events',
            storyCvHeading: 'Story Mode CV',
            storyCvIntro: 'As you scroll, my career journey animates like a timeline.',
            blogHeading: 'Medium Articles',
            mediumInfoBox: 'New posts coming very soon',
            contactHeading: "Let's Talk",
            techSkills: 'Technology Skills',
            skillsAria: 'Used technologies',
            blogSearch: 'Search posts...',
            backToBlog: '← All Posts',
            contactIntro: 'I am looking forward to your message for career, technology, hobbies, or just a chat!',
            nameLabel: 'Your Name',
            namePlaceholder: 'Your Full Name',
            emailLabel: 'Email',
            emailPlaceholder: 'example@email.com',
            topicLabel: 'Topic',
            topicPlaceholder: 'Select a topic...',
            messageLabel: 'Message',
            messagePlaceholder: 'Hi Eylül, I would like to talk with you about ...',
            submit: 'Send 🚀',
            heroTagline: 'Management Information Systems Student',
            scrollHint: 'Scroll down',
            aboutBio1: 'I am a Management Information Systems student improving myself in finance, data analysis, and digital marketing.',
            aboutBio2: 'I actively contribute to projects that combine analytical thinking, teamwork, and effective communication for both technical and social impact.',
            metaDepartment: 'University',
            metaDepartmentValue: 'Firat University — Management Information Systems',
            metaClass: 'GPA',
            metaClassValue: '3.30 / 4.00',
            events: [
                ['Firat University HSD — Vice President', 'Led club coordination, event/sponsorship operations, and institutional communication.'],
                ['Desa Deri — IT Intern', 'Supported network/server systems, software setup, and data integration processes.'],
                ['TUBITAK 2209-A Research Project', 'Worked on data preparation and modeling for an AI model recognizing Turkish sign language gestures.'],
                ['Volunteering & Youth Projects', 'Active participation in Ipek Yolu Disaster Volunteers, KA154 Erasmus+, and T3 Foundation initiatives.']
            ],
            contactTopicsTitle: 'What can we talk about?',
            topicChips: ['💼 Career', '💻 Technology', '🎨 Design', '🎯 Hobby', '📚 Education', '🚀 Project', '✍️ Writing', '🌟 Feedback'],
            findMe: 'Find Me',
            topicOptions: ['Select a topic...', '💼 Career', '💻 Technology', '🎨 Design', '🎯 Hobby', '🌟 Feedback', '🚀 Project Collaboration', '💬 Other'],
            footerTagline: 'With modern design, interactive animations<br>and projects that make a difference.',
            footerSections: 'Sections',
            footerContact: 'Contact',
            footerMade: 'Made for Web Design project',
            footerRights: '&copy; 2026 <strong>Eylül Yılmaz</strong>. All rights reserved.'
        }
    };

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) || 'tr';
    }

    function t(key) {
        const lang = getLang();
        return (dict[lang] && dict[lang][key]) || (dict.tr && dict.tr[key]) || key;
    }

    function setText(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
    }

    function setHTML(selector, value) {
        const el = document.querySelector(selector);
        if (el) el.innerHTML = value;
    }

    function setAttr(selector, attr, value) {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
    }

    function setTextAll(selector, values) {
        const items = document.querySelectorAll(selector);
        items.forEach((el, idx) => {
            if (values[idx] !== undefined) el.textContent = values[idx];
        });
    }

    function setHTMLAll(selector, values) {
        const items = document.querySelectorAll(selector);
        items.forEach((el, idx) => {
            if (values[idx] !== undefined) el.innerHTML = values[idx];
        });
    }

    function applyLanguage(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.setAttribute('lang', dict[lang].htmlLang);

        setAttr('.top-nav', 'aria-label', dict[lang].menuLabel);
        setText('.top-nav a[href="#home"]', dict[lang].home);
        setText('.top-nav a[href="#about"]', dict[lang].about);
        setText('.top-nav a[href="#projects"]', dict[lang].projects);
        setText('.top-nav a[href="#blog"]', dict[lang].blog);
        setText('.top-nav a[href="#contact"]', dict[lang].contact);
        setText('#cvMenuToggle', dict[lang].cvDownload);
        setText('#cvOptionTr', dict[lang].cvTurkish);
        setText('#cvOptionEn', dict[lang].cvEnglish);

        setText('.hero-actions a[href="#about"]', dict[lang].discover);
        setText('.hero-actions a[href="#contact"]', dict[lang].contactBtn);
        setText('#typewriter-target', dict[lang].heroTagline);
        setHTML('.anim-hint', dict[lang].heroHint);

        setText('#about-title', dict[lang].aboutHeading);
        setText('#projects-title', dict[lang].projectsHeading);
        setText('#events-title', dict[lang].eventsHeading);
        setText('#story-cv-title', dict[lang].storyCvHeading);
        setText('#story-cv-intro', dict[lang].storyCvIntro);
        setText('#blog-title', dict[lang].blogHeading);
        setText('#mediumInfoBox', dict[lang].mediumInfoBox);
        setText('#contact-title', dict[lang].contactHeading);
        setText('.skills-heading', dict[lang].techSkills);
        setAttr('.skills-chip-grid', 'aria-label', dict[lang].skillsAria);
        setTextAll('.about-bio', [dict[lang].aboutBio1, dict[lang].aboutBio2]);
        setTextAll('.meta-label', [dict[lang].metaDepartment, dict[lang].metaClass]);
        setTextAll('.meta-val', [dict[lang].metaDepartmentValue, dict[lang].metaClassValue]);

        setTextAll('.timeline-content h3', dict[lang].events.map(e => e[0]));
        setTextAll('.timeline-content p', dict[lang].events.map(e => e[1]));

        setAttr('#blogSearch', 'placeholder', dict[lang].blogSearch);
        setText('#backToBlog', dict[lang].backToBlog);
        setText('.contact-intro', dict[lang].contactIntro);
        setText('.contact-side h3', dict[lang].contactTopicsTitle);
        setTextAll('.topic-chips .chip', dict[lang].topicChips);
        setText('.contact-side h3[style]', dict[lang].findMe);
        setText('label[for="name"]', dict[lang].nameLabel);
        setAttr('#name', 'placeholder', dict[lang].namePlaceholder);
        setText('label[for="email"]', dict[lang].emailLabel);
        setAttr('#email', 'placeholder', dict[lang].emailPlaceholder);
        setText('label[for="topic"]', dict[lang].topicLabel);
        setText('#topic option[value=""]', dict[lang].topicPlaceholder);
        setText('label[for="message"]', dict[lang].messageLabel);
        setAttr('#message', 'placeholder', dict[lang].messagePlaceholder);
        setText('#submitBtn', dict[lang].submit);
        setTextAll('#topic option', dict[lang].topicOptions);

        setText('.footer-heading', dict[lang].footerSections);
        setTextAll('.footer-heading', [dict[lang].footerSections, dict[lang].footerContact]);
        setHTML('.footer-tagline', dict[lang].footerTagline);
        setHTML('.footer-made', dict[lang].footerMade);
        setHTML('.footer-bottom p:first-child', dict[lang].footerRights);

        setAttr('.side-dot[href="#home"]', 'title', dict[lang].home);
        setAttr('.side-dot[href="#about"]', 'title', dict[lang].about);
        setAttr('.side-dot[href="#projects"]', 'title', dict[lang].projects);
        setAttr('.side-dot[href="#blog"]', 'title', dict[lang].blog);
        setAttr('.side-dot[href="#contact"]', 'title', dict[lang].contact);
        setAttr('#themeToggle', 'title', lang === 'tr' ? 'Tema değiştir' : 'Toggle theme');
        setAttr('#langToggle', 'title', lang === 'tr' ? 'Dili değiştir' : 'Change language');
        setAttr('#langToggle', 'aria-label', lang === 'tr' ? 'Dili değiştir' : 'Change language');
        setAttr('#hamburger', 'aria-label', lang === 'tr' ? 'Menüyü aç/kapat' : 'Open/close menu');

        const btn = document.getElementById('langToggle');
        if (btn) btn.textContent = dict[lang].langButton;
        document.dispatchEvent(new CustomEvent('portfolio:lang-changed', { detail: { lang } }));
    }

    function toggleLanguage() {
        applyLanguage(getLang() === 'tr' ? 'en' : 'tr');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const current = getLang();
        applyLanguage(current);

        const btn = document.getElementById('langToggle');
        if (btn) btn.addEventListener('click', toggleLanguage);
    });

    window.i18n = {
        getLanguage: getLang,
        t
    };
})();
