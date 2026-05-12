# Eylül Yılmaz - Kişisel Portfolyo & Blogs

Hoş geldiniz! Bu, Yönetim Bilişim Sistemleri 3. sınıf öğrencisi Eylül Yılmaz'ın kişisel portföyü ve blogu.

## 🌟 Özellikler

- ✨ **Modern Tasarım**: Yeşil ve mavi gradient temada responsive web tasarımı
- 🎨 **Canvas Animasyonları**: WebGL ve Canvas teknolojileriyle oluşturulan dinamik animasyonlar
- 📝 **Blog Sistemi**: JSON tabanlı blog yazıları ve dinamik içerik yönetimi
- 📱 **Responsive**: Mobil, tablet ve masaüstü cihazlarda mükemmel görünüm
- ⚡ **Performans Optimized**: Hızlı yükleme ve smooth animasyonlar
- ♿ **Accessibility**: WCAG standartlarına uygun erişilebilir tasarım
- 🔍 **SEO Friendly**: Tüm meta etiketler ve yapılandırılmış veriler


## 📂 Proje Yapısı

```
My_Portfolio/
├── index.html              # Ana HTML dosyası
├── 404.html               # 404 hata sayfası
├── .gitignore
├── .nojekyll              # GitHub Pages Jekyll deaktif
├── README.md              # Bu dosya
├── css/
│   ├── variables.css      # Tema renkleri ve CSS değişkenleri
│   ├── reset.css          # CSS reset ve base stiller
│   ├── layout.css         # Grid, Flexbox ve layout
│   ├── components.css     # Header, nav, footer, kartlar
│   ├── pages.css          # Sayfalara özgü stiller
│   ├── animations.css     # Keyframe animasyonları
│   └── responsive.css     # Media queries
├── js/
│   ├── config.js          # Konfigürasyon ve sabitler
│   ├── utils.js           # Yardımcı fonksiyonlar
│   ├── router.js          # Hash-based routing sistemi
│   ├── blog.js            # Blog yönetimi
│   ├── animations.js      # Canvas ve scroll animasyonları
│   └── main.js            # App entry point
├── assets/
│   ├── images/            # PNG, JPG görseller
│   ├── svg/               # SVG ikons ve figürler
│   └── fonts/             # Lokal fontlar
└── blog/
    └── posts.json         # Blog yazıları (JSON)
```

## 🚀 Başlangıç

### Yerel Ortamda Çalıştırmak

1. **Dosyaları İndirin**
   ```bash
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   ```

2. **Yerel Sunucu Başlatın**
   ```bash
   # Python 3 ile
   python -m http.server 8000
   
   # veya Node.js ile
   npx http-server
   ```

3. **Tarayıcıda Açın**
   ```
   http://localhost:8000
   ```

### GitHub Pages'te Deploy Etmek

1. Repository oluşturun: `eylul-yilmaz.github.io`
2. Dosyaları push edin
3. GitHub Pages otomatik olarak deploy edecektir

## 📖 Sayfalara Genel Bakış

### 🏠 Anasayfa
- Hero section ile tanıtım
- Canvas animasyonlu arkaplan
- Hızlı erişim butonları

### 👤 Hakkımda
- Kişisel biografi
- Eğitim bilgisi
- Yetkinlikler listesi

### 🎯 Projeler
- Proje kartları
- Kategori filtresi
- Teknoloji etiketleri

### 📅 Etkinlikler
- Timeline görünümü
- Zaman çizelgesi

### 📝 Blog
- Blog yazıları listesi
- Arama ve filtreleme
- Yazı detay sayfası

### 📧 İletişim
- İletişim forması
- Sosyal medya linkler

## 🎨 Tasarım Sistemi

### Renkler
- **Primary Green**: `#00A86B`
- **Primary Blue**: `#4169E1`
- **Dark Background**: `#0f1419`

### Typography
- **Primary Font**: Poppins (başlıklar)
- **Secondary Font**: Inter (body text)

## 🔧 Teknolojiler

- **HTML5**: Semantic HTML
- **CSS3**: Variables, Grid, Flexbox, Animations
- **JavaScript**: Vanilla JS (Framework'siz)
- **Canvas**: Parçacık animasyonları
- **JSON**: Blog veri depolama

## 📱 Browser Desteği

- Chrome/Edge (Son 2 sürüm)
- Firefox (Son 2 sürüm)
- Safari (Son 2 sürüm)
- Mobile browsers

## 🔒 Gizlilik & Güvenlik

- İçeriğin tamamı statiktir
- Sunucu tarafı kod yok
- Cookie veya tracking yok (opsiyonel)

## 📊 Performans Metrikleri

- Lighthouse Score: 95+
- Page Load Time: < 2 sn
- Core Web Vitals: Passing

## 🐛 Bilinen Sorunlar & TODO

- [ ] SVG figür tasarımı ekleme
- [ ] Blog yazıları genişletme
- [ ] Proje kartlarına gerçek projeler ekleme
- [ ] Karanlık/Açık tema toggle'ı
- [ ] İletişim formu backend servisi

## 📝 Blog Yazılarını Ekleme

`blog/posts.json` dosyasını düzenleyin ve aşağıdaki yapıya uyun:

```json
{
  "id": 1,
  "title": "Başlık",
  "slug": "baslık-slug",
  "excerpt": "Özet",
  "content": "Tam HTML içeriği",
  "author": "Eylül Yılmaz",
  "date": "2026-05-01",
  "category": "Kategori",
  "tags": ["etiket1", "etiket2"],
  "featured_image": "🎨",
  "reading_time": 5
}
```

## 🔄 Güncelleme Geçmişi

### v1.0.0 (2026-05-02)
- İlk sürüm yayınlandı
- Temel sayfalar ve animasyonlar eklendi
- Blog sistemi kuruldu

## 👨‍💻 Geliştirici

**Eylül Yılmaz**
- Mail: eylul@example.com
- GitHub: [@eylul-yilmaz](https://github.com)
- LinkedIn: [eylul-yilmaz](https://linkedin.com)

## 📄 Lisans

Bu proje MIT Lisansı altında yayınlanmıştır.

## 🙏 Teşekkürler

- Google Fonts
- Comunity inspirations
- Open source community

---

**Last Updated**: May 2, 2026
