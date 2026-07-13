document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // --- 1. CONFIGURAÇÃO (ATUALIZE AQUI!) ---
    // ----------------------------------------------------------------------
    const whatsappNumber = '5561981253656';
    const instagramUsername = 'neto_dmn';
    const baseMessage = 'Olá! Vi o site e gostaria de saber mais sobre os planos de Personal Trainer.';
    const faleAgoraMessage = 'Olá! Quero falar com você agora sobre os planos!';
    const mainCtaMessage = 'Olá, gostaria de saber mais sobre a consultoria e o programa de transformação corporal!';

    const getWhatsappLink = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // ----------------------------------------------------------------------
    // --- 2. LINKS DE WHATSAPP E INSTAGRAM ---
    // ----------------------------------------------------------------------
    document.querySelectorAll('.cta-whatsapp').forEach(button => {
        // Preserva mensagens específicas já definidas via query string no href original
        const hasCustomText = button.getAttribute('href') && button.getAttribute('href').includes('text=');
        let message;

        if (button.id === 'main-cta') {
            message = mainCtaMessage;
        } else if (button.classList.contains('btn-fale-agora') || button.classList.contains('btn-fale-agora-green')) {
            message = faleAgoraMessage;
        } else if (hasCustomText) {
            // Mantém o texto customizado já presente no HTML (ex.: CTAs de objetivos e planos)
            const url = new URL(button.getAttribute('href'), window.location.href);
            message = url.searchParams.get('text') || baseMessage;
        } else {
            message = baseMessage;
        }

        button.href = getWhatsappLink(message);
        button.target = '_blank';
    });

    document.querySelectorAll('.btn-instagram-header, .footer .social-links a:first-child').forEach(link => {
        link.href = `https://instagram.com/${instagramUsername}`;
        link.target = '_blank';
    });

    // ----------------------------------------------------------------------
    // --- 3. MENU MOBILE ---
    // ----------------------------------------------------------------------
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = navToggle.classList.toggle('open');
            mainNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ----------------------------------------------------------------------
    // --- 4. SCROLL SUAVE COM OFFSET DO HEADER ---
    // ----------------------------------------------------------------------
    const header = document.getElementById('header');
    const getHeaderHeight = () => header ? header.offsetHeight : 80;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#privacy-policy') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - getHeaderHeight();
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ----------------------------------------------------------------------
    // --- 5. HEADER DINÂMICO, BARRA DE PROGRESSO E SCROLLSPY ---
    // ----------------------------------------------------------------------
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const onScroll = () => {
        const scrollY = window.scrollY;

        // Header com sombra
        if (header) header.classList.toggle('scrolled', scrollY > 60);

        // Barra de progresso
        if (scrollProgress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            scrollProgress.style.width = `${progress}%`;
        }

        // Botão voltar ao topo
        if (backToTop) backToTop.classList.toggle('visible', scrollY > 500);

        // Scrollspy
        const offset = getHeaderHeight() + 40;
        let currentSection = sections[0];
        sections.forEach(section => {
            if (scrollY + offset >= section.offsetTop) currentSection = section;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', currentSection && link.getAttribute('href') === `#${currentSection.id}`);
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ----------------------------------------------------------------------
    // --- 6. ANIMAÇÕES DE ENTRADA (SCROLL REVEAL) ---
    // ----------------------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    // ----------------------------------------------------------------------
    // --- 7. CONTADOR ANIMADO DAS ESTATÍSTICAS DO HERO ---
    // ----------------------------------------------------------------------
    const statNums = document.querySelectorAll('.stat-num');
    const animateCount = (el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1400;
        const start = performance.now();

        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window && statNums.length) {
        const statsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNums.forEach(el => statsObserver.observe(el));
    }

    // ----------------------------------------------------------------------
    // --- 8. CARROSSEL DE DEPOIMENTOS ---
    // ----------------------------------------------------------------------
    const tsTrack = document.getElementById('tsTrack');
    const tsDotsContainer = document.getElementById('tsDots');
    if (tsTrack) {
        const cards = tsTrack.querySelectorAll('.ts-card');
        let current = 0;
        let autoplayTimer;

        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'ts-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Ver depoimento ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            tsDotsContainer.appendChild(dot);
        });
        const dots = tsDotsContainer.querySelectorAll('.ts-dot');

        function goTo(index) {
            current = (index + cards.length) % cards.length;
            tsTrack.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function startAutoplay() {
            autoplayTimer = setInterval(() => goTo(current + 1), 6000);
        }
        function resetAutoplay() {
            clearInterval(autoplayTimer);
            startAutoplay();
        }

        document.querySelector('.ts-prev')?.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
        document.querySelector('.ts-next')?.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

        startAutoplay();
    }

    // ----------------------------------------------------------------------
    // --- 9. TOGGLE MENSAL / TRIMESTRAL NOS PLANOS ---
    // ----------------------------------------------------------------------
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const priceValues = document.querySelectorAll('.price-value');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cycle = btn.dataset.cycle;

            priceValues.forEach(price => {
                price.style.opacity = '0';
                setTimeout(() => {
                    price.textContent = price.dataset[cycle] || price.textContent;
                    price.style.opacity = '1';
                }, 150);
            });
        });
    });

    // ----------------------------------------------------------------------
    // --- 10. FAQ ACCORDION ---
    // ----------------------------------------------------------------------
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    openItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            item.classList.toggle('open', !isOpen);
            question.setAttribute('aria-expanded', String(!isOpen));
            answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : null;
        });
    });
});