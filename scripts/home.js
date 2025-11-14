document.addEventListener('DOMContentLoaded', () => {
    // --- 1. VARIÁVEIS DE CONFIGURAÇÃO ---
    // SUBSTITUA PELO SEU NÚMERO E INSTAGRAM
    const whatsappNumber = '5511999999999'; 
    const instagramUsername = '[seu_instagram]'; 
    
    // Mensagens personalizadas para cada tipo de CTA
    const baseMessage = 'Olá! Vi o site e gostaria de saber mais sobre os planos de Personal Trainer.';
    const avaliacaoMessage = 'Olá! Quero agendar minha AVALIAÇÃO GRATUITA!';
    const faleAgoraMessage = 'Olá! Quero falar com você agora sobre os planos!';

    // --- 2. GESTÃO DE LINKS/CTAs (WhatsApp e Instagram) ---

    const getWhatsappLink = (message) => {
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

    document.querySelectorAll('.cta-whatsapp').forEach(button => {
        let message;
        
        if (button.id === 'main-cta' || button.id === 'final-cta') {
            message = baseMessage;
        } else if (button.classList.contains('btn-primary-cta')) {
            message = avaliacaoMessage;
        } else if (button.classList.contains('btn-fale-agora') || button.classList.contains('btn-fale-agora-green')) {
            message = faleAgoraMessage;
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

    // --- 3. FUNCIONALIDADE MODERNA 1: SCROLL SUAVE (Smooth Scrolling) ---
    document.querySelectorAll('.main-nav a[href^="#"], .logo[href^="#"], .btn-read-more[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Ignorar scroll para links que não são seções (ex: Política de Privacidade)
            if (targetId && document.querySelector(targetId) && targetId.length > 1) {
                 document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 4. FUNCIONALIDADE MODERNA 2: HEADER DINÂMICO ---
    const header = document.getElementById('header');
    
    const toggleHeaderClass = () => {
        const scrollThreshold = 100; 

        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', toggleHeaderClass);
    toggleHeaderClass();
});