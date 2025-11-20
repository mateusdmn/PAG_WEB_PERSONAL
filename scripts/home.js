document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // --- 1. VARIÁVEIS DE CONFIGURAÇÃO (ATUALIZE AQUI!) ---
    // ----------------------------------------------------------------------
    
    // Substitua pelo seu número de WhatsApp (código do país + DDD + número)
    const whatsappNumber = '5561981253656'; 
    // Substitua pelo seu nome de usuário exato no Instagram
    const instagramUsername = 'neto_dmn'; 
    
    // Mensagens personalizadas para cada tipo de CTA
    const baseMessage = 'Olá! Vi o site e gostaria de saber mais sobre os planos de Personal Trainer.';
    const faleAgoraMessage = 'Olá! Quero falar com você agora sobre os planos!';

    // ----------------------------------------------------------------------
    // --- 2. GESTÃO DE LINKS/CTAs (WhatsApp e Instagram) ---
    // ----------------------------------------------------------------------

    const getWhatsappLink = (message) => {
        // Usa o formato wa.me para garantir compatibilidade
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    };

    // Atualiza todos os botões de WhatsApp
    document.querySelectorAll('.cta-whatsapp').forEach(button => {
        let message;
        
        // Define mensagens específicas
        if (button.id === 'main-cta') {
            message = 'Olá, gostaria de saber mais sobre a consultoria e o programa de transformação corporal!';
        } else if (button.classList.contains('btn-fale-agora') || button.classList.contains('btn-fale-agora-green')) {
            message = faleAgoraMessage;
        } else {
            message = baseMessage;
        }

        button.href = getWhatsappLink(message);
        button.target = '_blank';
    });
    
    // Atualiza todos os links do Instagram
    document.querySelectorAll('.btn-instagram-header, .footer .social-links a:first-child').forEach(link => {
        // GARANTIA: Define o link baseado na variável JS
        link.href = `https://instagram.com/${instagramUsername}`;
        link.target = '_blank';
    });

    // ----------------------------------------------------------------------
    // --- 3. SCROLL SUAVE E UNIFORMIDADE (Smooth Scrolling) ---
    // ----------------------------------------------------------------------

    // Altura do header para ser descontada no scroll (OFFSET)
    const header = document.getElementById('header');
    // Adicione a classe 'scrolled' ao header para que a altura seja a correta (80px)
    const headerHeight = 80; 

    document.querySelectorAll('.main-nav a[href^="#"], .logo[href^="#"], .btn-read-more[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement && targetId !== '#privacy-policy') {
                // Calcula a posição de rolagem subtraindo a altura do header fixo
                const targetPosition = targetElement.offsetTop - headerHeight; 

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' 
                });
            }
        });
    });

    // --- 4. FUNCIONALIDADE EXTRA: HEADER DINÂMICO (Para dar um visual moderno) ---
    // Adiciona uma sombra ao header após rolar 100px
    const toggleHeaderClass = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', toggleHeaderClass);
    toggleHeaderClass();
});