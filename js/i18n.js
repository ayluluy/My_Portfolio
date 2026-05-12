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
            recommendations: 'Öneriler',
            eventsNav: 'Etkinlikler',
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
            skillChips: ['SQL', 'C#', 'Python', 'OpenCV', 'MS Office', 'Canva', 'Süreç Planlama', 'Problem Çözme', 'Sunum ve Moderasyon'],
            projectFilters: ['Tümü', 'Akademik', 'Kişisel'],
            recommendationsHeading: 'Kitap, Belgesel & Film Önerileri',
            recommendationSteps: [
                ['📚 Kitaplar', 'İlham Verici ve Gelişim Kitapları', 'Kişisel gelişim, teknoloji ve inovasyon hakkında okuduğum ve tavsiye ettiğim kitaplar.'],
                ['🎬 Belgeseller & Animasyonlar', 'Belgeseller & Animasyonlar', 'Hayal gücünü, insan hikayelerini ve dünyaya farklı bakış açılarını bir araya getiren seçkiler.'],
                ['🎭 Filmler', 'Düşündüren Filmler', 'Hikaye anlatımı, karakter gelişimi ve yaratıcı sinematografi açısından özel bulduğum filmler.']
            ],
            recommendationsDetailTitles: {
                books: 'Kitaplar',
                documentaries: 'Belgeseller & Animasyonlar',
                animations: 'Animasyonlar',
                'documentary-films': 'Belgeseller',
                movies: 'Filmler',
                default: 'Öneriler'
            },
            recommendationCards: [
                ['Kitap Önerisi', 'Bu kitap bana farklı düşünme biçimlerini, üretkenliği ve kendimi geliştirme isteğini hatırlatıyor. Okurken altını çizdiğim fikirler bana ilham verdi.'],
                ['Gelişim Kitabı', 'Kendi yolumu çizerken daha disiplinli, meraklı ve cesur olmam gerektiğini hissettiren bir öneri. Özellikle motivasyon aradığım dönemlerde iyi geliyor.'],
                ['İlham Veren Okuma', 'Bana yeni bakış açıları kazandıran, düşüncelerimi toparlamama yardımcı olan bir öneri. Sayfaları arasında kendime küçük notlar çıkarmayı seviyorum.'],
                ['Megamind', 'Kötü olmayı seçen bir karakterin aslında kim olmak istediğini keşfetmesini eğlenceli ve zeki bir dille anlatıyor.'],
                ['Ejderhanı Nasıl Eğitirsin', 'Önyargıları aşmanın, dostluğun ve cesaretin bazen savaşmak yerine anlamaya çalışmakla başladığını hatırlatıyor.'],
                ['Neşeli Ayaklar', 'Kendi sesini bulma, farklılıklarını kabullenme ve kalabalığın içinde kendin olabilme üzerine sıcacık bir hikaye.'],
                ['Soul', 'Hayattaki amacımızı ararken küçük anların değerini fark ettiren, müzikle ve duyguyla dolu zarif bir animasyon.'],
                ['VOL-İ', 'Tüketimle kirlenmiş bir dünyada sevginin, merakın ve küçük bir umut ışığının neleri değiştirebileceğini gösteriyor.'],
                ['Yukarı Bak', 'Kaybetmek, hayal kurmak ve yeniden yola çıkmak üzerine; hem komik hem de kalbe dokunan unutulmaz bir yolculuk.'],
                ['Humpback Whales', 'Nesli tükenme tehlikesinden dönen kambur balinaların göçünü ve okyanustaki büyüleyici yaşamlarını etkileyici görüntülerle anlatıyor.'],
                ['My Octopus Teacher', 'Bir dalgıcın ahtapotla kurduğu beklenmedik bağ üzerinden doğaya sabırla bakmanın ne kadar dönüştürücü olduğunu gösteriyor.'],
                ['Buy Now! The Shopping Conspiracy', 'Modern tüketim alışkanlıklarının perde arkasını sorgulatan, alışverişe ve ihtiyaç kavramına yeniden bakmayı sağlayan çarpıcı bir belgesel.'],
                ['Düşündüren Film', 'Hikayesi bittikten sonra bile zihnimde dönmeye devam eden filmleri seviyorum. Karakterlerin iç dünyası bana çok şey düşündürüyor.'],
                ['Görsel Anlatım', 'Sadece konusu değil, renkleri, sahneleri ve müziğiyle de atmosfer kuran filmler bana tasarım açısından da ilham veriyor.']
            ],
            recommendationCategoryCards: [
                ['Animasyonlar', 'Renkli hikayeler, güçlü duygular ve yaratıcı dünyalar.'],
                ['Belgeseller', 'Gerçek hikayeler, keşifler ve düşündüren anlatılar.']
            ],
            recBackDefault: '← Önerilere Dön',
            recBackDocumentaries: '← Belgesellere Göz At',
            recBackAnimations: '← Animasyonlara Göz At',
            carouselPrev: 'Önceki kart',
            carouselNext: 'Sonraki kart',
            readPost: 'Yazıya Git',
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
            eventDates: ['2024+', 'Staj', 'Araştırma', 'Sosyal Etki'],
            eventAriaLabels: [
                'Fırat Üniversitesi HSD etkinlik detayını aç',
                'Desa Deri IT stajı detayını aç',
                'TÜBİTAK 2209-A araştırma projesi detayını aç',
                'Gönüllülük ve gençlik projeleri detayını aç'
            ],
            recommendationAriaLabels: ['Kitaplar detayını aç', 'Belgeseller ve animasyonlar detayını aç', 'Filmler detayını aç'],
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
            recommendations: 'Recommendations',
            eventsNav: 'Events',
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
            skillChips: ['SQL', 'C#', 'Python', 'OpenCV', 'MS Office', 'Canva', 'Process Planning', 'Problem Solving', 'Presentation & Moderation'],
            projectFilters: ['All', 'Academic', 'Personal'],
            recommendationsHeading: 'Book, Documentary & Movie Recommendations',
            recommendationSteps: [
                ['📚 Books', 'Inspiring Personal Growth Books', 'Books I have read and recommend about personal growth, technology, and innovation.'],
                ['🎬 Documentaries & Animations', 'Documentaries & Animations', 'A selection that brings together imagination, human stories, and fresh perspectives.'],
                ['🎭 Movies', 'Thought-Provoking Movies', 'Films I value for storytelling, character development, and creative cinematography.']
            ],
            recommendationsDetailTitles: {
                books: 'Books',
                documentaries: 'Documentaries & Animations',
                animations: 'Animations',
                'documentary-films': 'Documentaries',
                movies: 'Movies',
                default: 'Recommendations'
            },
            recommendationCards: [
                ['Book Recommendation', 'This book reminds me of different ways of thinking, productivity, and the desire to improve myself. The ideas I underlined while reading inspired me.'],
                ['Personal Growth Book', 'A recommendation that reminds me to be more disciplined, curious, and brave while shaping my own path. It helps especially when I need motivation.'],
                ['Inspiring Read', 'A recommendation that gave me new perspectives and helped me organize my thoughts. I enjoy taking small notes between its pages.'],
                ['Megamind', 'It tells the story of a character who chooses to be bad but discovers who he truly wants to become in a fun and clever way.'],
                ['How to Train Your Dragon', 'It reminds us that overcoming prejudice, friendship, and courage sometimes start with understanding instead of fighting.'],
                ['Happy Feet', 'A warm story about finding your own voice, accepting your differences, and being yourself within a crowd.'],
                ['Soul', 'An elegant animation full of music and emotion that shows the value of small moments while we search for our purpose.'],
                ['WALL-E', 'It shows how love, curiosity, and a small spark of hope can change a world polluted by consumption.'],
                ['Up', 'An unforgettable journey about loss, dreams, and starting again; both funny and deeply touching.'],
                ['Humpback Whales', 'It presents the migration and fascinating ocean life of humpback whales that returned from the edge of extinction.'],
                ['My Octopus Teacher', 'Through an unexpected bond between a diver and an octopus, it shows how transformative it can be to observe nature patiently.'],
                ['Buy Now! The Shopping Conspiracy', 'A striking documentary that questions the background of modern consumption habits and makes us rethink shopping and need.'],
                ['Thought-Provoking Film', 'I love films whose stories keep turning in my mind after they end. The inner worlds of the characters make me think deeply.'],
                ['Visual Storytelling', 'Films that build atmosphere not only with story but also with colors, scenes, and music inspire me from a design perspective too.']
            ],
            recommendationCategoryCards: [
                ['Animations', 'Colorful stories, powerful emotions, and creative worlds.'],
                ['Documentaries', 'Real stories, discoveries, and thought-provoking narratives.']
            ],
            recBackDefault: '← Back to Recommendations',
            recBackDocumentaries: '← Browse Documentaries',
            recBackAnimations: '← Browse Animations',
            carouselPrev: 'Previous card',
            carouselNext: 'Next card',
            readPost: 'Read Article',
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
            eventDates: ['2024+', 'Internship', 'Research', 'Social Impact'],
            eventAriaLabels: [
                'Open Firat University HSD event details',
                'Open Desa Deri IT internship details',
                'Open TUBITAK 2209-A research project details',
                'Open volunteering and youth projects details'
            ],
            recommendationAriaLabels: ['Open book details', 'Open documentaries and animations details', 'Open movie details'],
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
        setText('.top-nav a[href="#recommendations"]', dict[lang].recommendations);
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
        setText('#recommendations-title', dict[lang].recommendationsHeading);
        setText('#story-cv-title', dict[lang].storyCvHeading);
        setText('#story-cv-intro', dict[lang].storyCvIntro);
        setText('#blog-title', dict[lang].blogHeading);
        setText('#mediumInfoBox', dict[lang].mediumInfoBox);
        setText('#contact-title', dict[lang].contactHeading);
        setText('.skills-heading', dict[lang].techSkills);
        setAttr('.skills-chip-grid', 'aria-label', dict[lang].skillsAria);
        setTextAll('.skill-chip', dict[lang].skillChips);
        setTextAll('.about-bio', [dict[lang].aboutBio1, dict[lang].aboutBio2]);
        setTextAll('.meta-label', [dict[lang].metaDepartment, dict[lang].metaClass]);
        setTextAll('.meta-val', [dict[lang].metaDepartmentValue, dict[lang].metaClassValue]);

        setTextAll('.timeline-content h3', dict[lang].events.map(e => e[0]));
        setTextAll('.timeline-content p', dict[lang].events.map(e => e[1]));
        setTextAll('.timeline-date', dict[lang].eventDates);
        document.querySelectorAll('[data-event-id]').forEach((el, idx) => {
            if (dict[lang].eventAriaLabels[idx]) {
                el.setAttribute('aria-label', dict[lang].eventAriaLabels[idx]);
            }
        });
        setTextAll('.filter-btn', dict[lang].projectFilters);

        const recommendationSteps = document.querySelectorAll('.recommendations-container .story-step');
        recommendationSteps.forEach((step, idx) => {
            const values = dict[lang].recommendationSteps[idx];
            if (!values) return;
            const year = step.querySelector('.story-year');
            const heading = step.querySelector('h3');
            const text = step.querySelector('p');
            if (year) year.textContent = values[0];
            if (heading) heading.textContent = values[1];
            if (text) text.textContent = values[2];
            if (dict[lang].recommendationAriaLabels[idx]) {
                step.setAttribute('aria-label', dict[lang].recommendationAriaLabels[idx]);
            }
        });

        setText('#recommendationsDetailTitle', dict[lang].recommendationsDetailTitles.default);
        setTextAll('.recommendation-card .recommendation-info h3', dict[lang].recommendationCards.map(item => item[0]));
        setTextAll('.recommendation-card .recommendation-description', dict[lang].recommendationCards.map(item => item[1]));
        setTextAll('.recommendation-category-card strong', dict[lang].recommendationCategoryCards.map(item => item[0]));
        setTextAll('.recommendation-category-card small', dict[lang].recommendationCategoryCards.map(item => item[1]));
        setText('#backToRecommendations', dict[lang].recBackDefault);
        setAttr('#recommendationsPrev', 'aria-label', dict[lang].carouselPrev);
        setAttr('#recommendationsNext', 'aria-label', dict[lang].carouselNext);
        setAttr('#blogPrev', 'aria-label', dict[lang].carouselPrev);
        setAttr('#blogNext', 'aria-label', dict[lang].carouselNext);

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
        setTextAll('.footer-inner .footer-links:nth-of-type(2) a', [
            dict[lang].home,
            dict[lang].about,
            dict[lang].projects,
            dict[lang].eventsNav,
            dict[lang].recommendations,
            dict[lang].blog,
            dict[lang].contact
        ]);
        setHTML('.footer-tagline', dict[lang].footerTagline);
        setHTML('.footer-made', dict[lang].footerMade);
        setHTML('.footer-bottom p:first-child', dict[lang].footerRights);

        setAttr('.side-dot[href="#home"]', 'title', dict[lang].home);
        setAttr('.side-dot[href="#about"]', 'title', dict[lang].about);
        setAttr('.side-dot[href="#projects"]', 'title', dict[lang].projects);
        setAttr('.side-dot[href="#events"]', 'title', dict[lang].eventsNav);
        setAttr('.side-dot[href="#recommendations"]', 'title', dict[lang].recommendations);
        setAttr('.side-dot[href="#blog"]', 'title', dict[lang].blog);
        setAttr('.side-dot[href="#contact"]', 'title', dict[lang].contact);
        setAttr('.top-brand', 'aria-label', lang === 'tr' ? 'Ana sayfaya git' : 'Go to homepage');
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
