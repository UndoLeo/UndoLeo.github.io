// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Update theme icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Animated element that follows the cursor
const visualElement = document.querySelector('.visual-element');
let mouseX = 0;
let mouseY = 0;
let elementX = 0;
let elementY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateElement() {
    // Smooth follow effect
    const dx = mouseX - elementX;
    const dy = mouseY - elementY;
    elementX += dx * 0.1;
    elementY += dy * 0.1;

    visualElement.style.transform = `translate(${elementX}px, ${elementY}px)`;
    requestAnimationFrame(animateElement);
}

animateElement();

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('hero__title')) {
                startTypingEffect(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in-up, .hero__title').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation
const createMobileNav = () => {
    const nav = document.querySelector('.nav__menu');
    const mobileNavButton = document.createElement('button');
    mobileNavButton.classList.add('nav__mobile-toggle');
    mobileNavButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('.nav__content').appendChild(mobileNavButton);
    
    mobileNavButton.addEventListener('click', () => {
        nav.classList.toggle('nav__menu--active');
        mobileNavButton.classList.toggle('nav__mobile-toggle--active');
    });
};

// Create mobile navigation if screen width is small
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Infrastructure diagram interactions
const diagramNodes = document.querySelectorAll('.diagram-node');
diagramNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        node.classList.add('diagram-node--active');
    });
    
    node.addEventListener('mouseleave', () => {
        node.classList.remove('diagram-node--active');
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Typing effect for hero title
function startTypingEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

// Mobile navigation
const mobileNavToggle = document.querySelector('.nav__mobile-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav__close');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });
}

if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
}

// Add tooltip functionality
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const tooltip = element.getAttribute('data-tooltip');
        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'tooltip';
        tooltipElement.textContent = tooltip;
        document.body.appendChild(tooltipElement);
        
        const rect = element.getBoundingClientRect();
        tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
        tooltipElement.style.left = rect.left + (rect.width - tooltipElement.offsetWidth) / 2 + 'px';
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Chapter navigation
const navButtons = document.querySelectorAll('.nav-btn');
const chapters = document.querySelectorAll('.chapter-slide');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.getAttribute('data-section');
        
        // Update active button
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show target section
        chapters.forEach(chapter => {
            chapter.classList.remove('active');
            if (chapter.id === targetSection) {
                chapter.classList.add('active');
                chapter.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Glossary functionality
const glossary = document.querySelector('.glossary');
const glossaryToggle = document.querySelector('.glossary-toggle');
const glossaryContent = document.querySelector('.glossary-content');
const termItems = document.querySelectorAll('.term-item');

// Toggle glossary visibility
glossaryToggle.addEventListener('click', () => {
    glossary.classList.toggle('active');
});

// Close glossary when clicking outside
document.addEventListener('click', (e) => {
    if (!glossary.contains(e.target)) {
        glossary.classList.remove('active');
    }
});

// Update visible terms based on current section
function updateVisibleTerms() {
    const currentSection = document.querySelector('.chapter-slide.active');
    if (!currentSection) return;

    const sectionId = currentSection.id;
    termItems.forEach(term => {
        if (term.getAttribute('data-section') === sectionId) {
            term.style.display = 'block';
        } else {
            term.style.display = 'none';
        }
    });
}

// Update terms when changing sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.chapter-slide').forEach(slide => {
                slide.classList.remove('active');
            });
            entry.target.classList.add('active');
            updateVisibleTerms();
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.chapter-slide').forEach(slide => {
    sectionObserver.observe(slide);
});

// Highlight table rows on hover
const tableRows = document.querySelectorAll('.infrastructure-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
        row.style.transform = 'scale(1.02)';
        row.style.transition = 'transform 0.3s ease';
    });
    
    row.addEventListener('mouseleave', () => {
        row.style.transform = 'scale(1)';
    });
});

// Copy code blocks
document.querySelectorAll('pre code').forEach(block => {
    block.addEventListener('click', () => {
        const text = block.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const originalText = block.textContent;
            block.textContent = 'Скопировано!';
            setTimeout(() => {
                block.textContent = originalText;
            }, 2000);
        });
    });
}); 