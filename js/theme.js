/* 
  ====================================
  THEME - Dark / Light Mode Manager
  ====================================
*/

class ThemeManager {
    constructor() {
        this.theme = this._getSaved() || this._getSystemPref();
        this._apply(this.theme);
        this._buildToggle();
        document.addEventListener('portfolio:lang-changed', () => this._apply(this.theme));
    }

    /** Read saved preference */
    _getSaved() {
        return localStorage.getItem('portfolio-theme');
    }

    /** Read OS preference */
    _getSystemPref() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    /** Apply theme to <html> data attribute */
    _apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        localStorage.setItem('portfolio-theme', theme);

        // Update toggle icon if it exists
        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.setAttribute('aria-label', this._getToggleLabel(theme));
            btn.innerHTML = theme === 'dark'
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        }
    }

    _getToggleLabel(theme) {
        const isEnglish = localStorage.getItem('portfolio-lang') === 'en';
        if (isEnglish) {
            return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        }
        return theme === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç';
    }

    /** Build the toggle button and inject into navbar */
    _buildToggle() {
        let btn = document.getElementById('themeToggle');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'themeToggle';
            btn.className = 'theme-toggle-btn';
            btn.title = 'Tema değiştir';

            // Insert before hamburger or at end of navbar-container
            const container = document.querySelector('.navbar-container');
            const hamburger = document.getElementById('hamburger');
            if (container) {
                container.insertBefore(btn, hamburger || null);
            }
        }

        btn.addEventListener('click', () => this.toggle());

        // Apply initial icon
        this._apply(this.theme);
    }

    toggle() {
        this._apply(this.theme === 'dark' ? 'light' : 'dark');
    }
}

// Init globally
const themeManager = new ThemeManager();
