// --- JavaScript 功能 ---

// 1. 打字機效果 (Hero Section)
const typewriterText = "一位軟體工程師";
const typewriterElement = document.querySelector('.typewriter-effect');
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = typewriterText.substring(0, charIndex);
    typewriterElement.textContent = `我是 ${currentText}`;

    if (!isDeleting && charIndex < typewriterText.length) {
        charIndex++;
        setTimeout(typeWriter, 100);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeWriter, 50);
    } else if (!isDeleting && charIndex === typewriterText.length) {
        setTimeout(() => isDeleting = true, 2000);
        setTimeout(typeWriter, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setTimeout(typeWriter, 500);
    }
}

// 初始設定
typewriterElement.textContent = `你好 我是 Hau Wen`;
setTimeout(typeWriter, 1500);

//選單下拉
const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
});


// 2. 滾動時元素淡入動畫
const sections = document.querySelectorAll('section:not(#hero)');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// 4. 平滑滾動到錨點
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// 5. 聯絡表單提交
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('訊息已送出，感謝您的聯繫！');
        contactForm.reset();
    });
}

// 6. Hero區塊初始可見
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
});
