/* 
  ====================================
  UTILS - Utility Functions
  ====================================
*/

/**
 * DOM Query Helpers
 */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Add Class to Elements
 */
function addClass(el, className) {
    if (el) {
        if (typeof className === 'string') {
            el.classList.add(className);
        } else if (Array.isArray(className)) {
            el.classList.add(...className);
        }
    }
}

/**
 * Remove Class from Elements
 */
function removeClass(el, className) {
    if (el) {
        if (typeof className === 'string') {
            el.classList.remove(className);
        } else if (Array.isArray(className)) {
            el.classList.remove(...className);
        }
    }
}

/**
 * Toggle Class
 */
function toggleClass(el, className) {
    if (el) {
        el.classList.toggle(className);
    }
}

/**
 * Has Class Check
 */
function hasClass(el, className) {
    return el && el.classList.contains(className);
}

/**
 * Set Element Content
 */
function setContent(el, content) {
    if (el) {
        el.innerHTML = content;
    }
}

/**
 * Get Element Content
 */
function getContent(el) {
    return el ? el.innerHTML : '';
}

/**
 * Set Element Text
 */
function setText(el, text) {
    if (el) {
        el.textContent = text;
    }
}

/**
 * Add Event Listener
 */
function on(el, event, callback) {
    if (el) {
        if (Array.isArray(el)) {
            el.forEach(e => e.addEventListener(event, callback));
        } else {
            el.addEventListener(event, callback);
        }
    }
}

/**
 * Remove Event Listener
 */
function off(el, event, callback) {
    if (el) {
        if (Array.isArray(el)) {
            el.forEach(e => e.removeEventListener(event, callback));
        } else {
            el.removeEventListener(event, callback);
        }
    }
}

/**
 * Show Element
 */
function show(el) {
    if (el) {
        removeClass(el, 'hidden');
        addClass(el, 'visible');
    }
}

/**
 * Hide Element
 */
function hide(el) {
    if (el) {
        removeClass(el, 'visible');
        addClass(el, 'hidden');
    }
}

/**
 * Debounce Function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle Function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Fetch Data with Error Handling
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
        return null;
    }
}

/**
 * Format Date
 */
function formatDate(dateString, locale = 'tr-TR') {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    } catch (error) {
        return dateString;
    }
}

/**
 * Slugify String
 */
function slugify(str) {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/**
 * Capitalize String
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate String
 */
function truncate(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
}

/**
 * Calculate Reading Time (Turkish)
 */
function calculateReadingTime(text, wordsPerMinute = 200) {
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} dakikalık okuma`;
}

/**
 * Scroll to Element
 */
function scrollTo(element, behavior = 'smooth') {
    if (element) {
        element.scrollIntoView({ behavior });
    }
}

/**
 * Scroll to Top
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Check if Element is in Viewport
 */
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add Animation Class and Remove After Animation
 */
function animate(el, animationClass, duration = 300) {
    return new Promise((resolve) => {
        addClass(el, animationClass);
        setTimeout(() => {
            removeClass(el, animationClass);
            resolve();
        }, duration);
    });
}

/**
 * Get Query Parameter
 */
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Convert Object to Query String
 */
function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
}

/**
 * Check if Device is Mobile
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Check if Device is Touch
 */
function isTouchDevice() {
    return (
        (typeof window !== 'undefined' &&
            'ontouchstart' in window) ||
        (typeof navigator !== 'undefined' &&
            navigator.maxTouchPoints > 0)
    );
}

/**
 * Local Storage Helpers
 */
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to set localStorage:', error);
        }
    },
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Failed to get localStorage:', error);
            return null;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
        }
    },
    clear: () => {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
        }
    }
};

/**
 * Log with Color (Debug Mode)
 */
function log(message, color = 'color: #00A86B') {
    if (CONFIG.debug) {
        console.log(`%c[${new Date().toLocaleTimeString()}] ${message}`, color);
    }
}

/**
 * Error Log with Color
 */
function logError(message) {
    console.error(`%c[ERROR] ${message}`, 'color: #FF6B6B; font-weight: bold');
}
