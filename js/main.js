/*
=================================
TABLA DE CONTENIDOS - MAIN.JS
=================================
1. INICIALIZACIÓN Y CONFIGURACIÓN
2. LOADER Y ANIMACIONES DE ENTRADA
3. CURSOR PERSONALIZADO
4. NAVEGACIÓN Y MENÚ
5. ANIMACIONES HERO
6. ANIMACIONES DE SECCIONES
7. GALERÍA Y FILTROS
8. REPRODUCTOR DE VIDEOS
9. BURBUJAS INTERACTIVAS (CONTACTO)
10. UTILIDADES Y HELPERS
=================================
*/

/* 
=================================
1. INICIALIZACIÓN Y CONFIGURACIÓN
=================================
*/

// Velocidad global para animaciones - ajustar este valor para hacer todas las animaciones más rápidas
const ANIMATION_SPEED = 0.7; // Menor valor = más rápido (1 = velocidad normal)

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Animación del hero inmediatamente
    animateHero();
    
    // Iniciar loader
    initLoader();
    
    // Configurar cursor personalizado
    setupCustomCursor();
    
    // Configurar navegación
    setupNavigation();
    
    // Configurar filtros de galería 
    setupGalleryFilters();
    
    // Configurar reproductor de video
    setupVideoPlayer();
    
    // Configurar cambio de tamaño para las burbujas interactivas
    window.addEventListener('load', createInteractiveBubbles);
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createInteractiveBubbles, 300);
    });
});

/* 
=================================
2. LOADER Y ANIMACIONES DE ENTRADA
=================================
*/

// Inicializar y configurar el loader
function initLoader() {
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.6 * ANIMATION_SPEED, // Más rápido
            onComplete: () => {
                loader.style.display = 'none';
                initAnimations();
            }
        });
    }, 1500); // Reducido de 2000ms a 1500ms para una carga más rápida
}

/* 
=================================
3. CURSOR PERSONALIZADO
=================================
*/

// Configurar el cursor personalizado
function setupCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Mover cursor con el mouse
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });
    
    // Efectos hover para links y elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .filter-btn, .project-item, .gallery-item, .video-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2,
                duration: 0.2 * ANIMATION_SPEED
            });
            
            gsap.to(cursorFollower, {
                scale: 1.5,
                duration: 0.2 * ANIMATION_SPEED
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.2 * ANIMATION_SPEED
            });
            
            gsap.to(cursorFollower, {
                scale: 1,
                duration: 0.2 * ANIMATION_SPEED
            });
        });
    });
}

/* 
=================================
4. NAVEGACIÓN Y MENÚ
=================================
*/

// Configurar navegación y menú hamburguesa
function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const fullscreenMenu = document.querySelector('.fullscreen-menu');
    const menuItems = document.querySelectorAll('.menu-item');
    const mainNav = document.querySelector('.main-nav');
    
    if (!menuToggle || !hamburger || !fullscreenMenu) return;
    
    // Toggle menú al hacer clic
    menuToggle.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        
        if (fullscreenMenu.classList.contains('active')) {
            // Animar entrada de elementos del menú
            gsap.fromTo(menuItems, {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                stagger: 0.07 * ANIMATION_SPEED,
                duration: 0.5 * ANIMATION_SPEED,
                ease: "power3.out"
            });
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            fullscreenMenu.classList.remove('active');
        });
    });
    
    // Cambiar estilo de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
}

/* 
=================================
5. ANIMACIONES HERO
=================================
*/

// Animación del hero con efectos de entrada y salida
function animateHero() {
    // Configurar animaciones para .hero-title-line
    gsap.fromTo('.hero-title-line', {
        y: 70,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.15 * ANIMATION_SPEED,
        duration: 0.7 * ANIMATION_SPEED,
        ease: "power3.out"
    });

    // Configurar animaciones para .hero-subtitle
    gsap.fromTo('.hero-subtitle', {
        y: 20,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.7 * ANIMATION_SPEED,
        delay: 0.5 * ANIMATION_SPEED,
        ease: "power3.out"
    });

    // Configurar animaciones basadas en scroll para el hero
    gsap.fromTo('.hero-title-line', {
        y: 0,
        opacity: 1
    }, {
        y: -30,
        opacity: 0,
        stagger: 0.08 * ANIMATION_SPEED,
        duration: 0.6 * ANIMATION_SPEED,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.fromTo('.hero-subtitle', {
        y: 0,
        opacity: 1
    }, {
        y: -20,
        opacity: 0,
        duration: 0.6 * ANIMATION_SPEED,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

/* 
=================================
6. ANIMACIONES DE SECCIONES
=================================
*/

// Inicializar animaciones basadas en scroll para todas las secciones
function initAnimations() {
    // Configuración común para las animaciones de scroll
    const scrollConfig = {
        start: 'top 80%',          // Comienza antes en la pantalla
        end: 'bottom 30%',         // Termina más arriba
        toggleActions: 'play reverse play reverse',
    };
    
    // Animación más rápida y con más desplazamiento para efectos más notables
    
    // About section
    gsap.fromTo('.about-text', {
        x: -60,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.7 * ANIMATION_SPEED,
        scrollTrigger: {
            ...scrollConfig,
            trigger: '.about'
        }
    });

    gsap.fromTo('.about-image', {
        x: 60,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.7 * ANIMATION_SPEED,
        scrollTrigger: {
            ...scrollConfig,
            trigger: '.about'
        }
    });

    // Projects section
    gsap.fromTo('.project-item', {
        y: 60,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.15 * ANIMATION_SPEED,
        duration: 0.6 * ANIMATION_SPEED,
        scrollTrigger: {
            ...scrollConfig,
            trigger: '.projects'
        }
    });

    // Web Projects section
    if (document.querySelector('.webprojects')) {
        gsap.fromTo('.webproject-item', {
            y: 60,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.15 * ANIMATION_SPEED,
            duration: 0.6 * ANIMATION_SPEED,
            scrollTrigger: {
                ...scrollConfig,
                trigger: '.webprojects'
            }
        });
    }

    // Animación para los botones de filtro de la galería
    gsap.fromTo('.filter-btn', {
        y: 20,
        opacity: 0,
        scale: 0.8
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.07 * ANIMATION_SPEED,
        duration: 0.4 * ANIMATION_SPEED,
        scrollTrigger: {
            trigger: '.gallery-filter',
            start: 'top 85%',
            end: 'bottom -50%',
            toggleActions: 'play none none reverse'
        }
    });

    // Gallery section
    gsap.fromTo('.gallery-item', {
        scale: 0.8,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        stagger: 0.07 * ANIMATION_SPEED,
        duration: 0.5 * ANIMATION_SPEED,
        scrollTrigger: {
            ...scrollConfig,
            trigger: '.gallery'
        }
    });

    // Videos section
    gsap.fromTo('.video-item', {
        y: 60,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        stagger: 0.15 * ANIMATION_SPEED,
        duration: 0.6 * ANIMATION_SPEED,
        scrollTrigger: {
            ...scrollConfig,
            trigger: '.videos'
        }
    });

    // Contact section
    if (document.querySelector('.contact-info-wrapper')) {
        gsap.fromTo('.contact-info-wrapper', {
            y: 60,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.7 * ANIMATION_SPEED,
            scrollTrigger: {
                ...scrollConfig,
                trigger: '.contact'
            }
        });
    }

    // Animar los métodos de contacto en secuencia
    gsap.fromTo('.contact-method', {
        x: -40,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        stagger: 0.15 * ANIMATION_SPEED,
        duration: 0.6 * ANIMATION_SPEED,
        scrollTrigger: {
            ...scrollConfig,
            trigger: '.contact-methods'
        }
    });

    // LinkedIn section
    if (document.querySelector('.linkedin-section')) {
        gsap.fromTo('.linkedin-section', {
            opacity: 0
        }, {
            opacity: 1,
            duration: 0.7 * ANIMATION_SPEED,
            scrollTrigger: {
                trigger: '.linkedin-section',
                start: 'top 80%',
                end: 'bottom 10%',
                toggleActions: 'play reverse play reverse'
            }
        });

        gsap.fromTo('.linkedin-text', {
            x: -60,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.6 * ANIMATION_SPEED,
            scrollTrigger: {
                ...scrollConfig,
                trigger: '.linkedin-section'
            }
        });

        gsap.fromTo('.linkedin-button', {
            x: 60,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.6 * ANIMATION_SPEED,
            delay: 0.1 * ANIMATION_SPEED,
            scrollTrigger: {
                ...scrollConfig,
                trigger: '.linkedin-section'
            }
        });
    }

    // Animación para encabezados de sección
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.6 * ANIMATION_SPEED,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                end: 'center 20%',
                toggleActions: 'play reverse play reverse'
            }
        });
    });

    // Animación para elementos con atributo data-animate
    gsap.utils.toArray('[data-animate]').forEach(element => {
        const animateProps = JSON.parse(element.getAttribute('data-animate-props') || '{}');
        const fromProps = {
            y: 40,
            opacity: 0,
            ...animateProps.from
        };
        const toProps = {
            y: 0,
            opacity: 1,
            duration: 0.6 * ANIMATION_SPEED,
            ...animateProps.to,
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                end: 'bottom 30%',
                toggleActions: 'play reverse play reverse'
            }
        };
        
        gsap.fromTo(element, fromProps, toProps);
    });

    // Animación especial para textos con revelación por letras
    gsap.utils.toArray('.reveal-text').forEach(text => {
        // Dividir el texto en caracteres
        let chars = text.textContent.split('');
        text.textContent = '';
        
        // Crear spans para cada carácter
        chars.forEach(char => {
            let span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            text.appendChild(span);
        });
        
        // Animar cada carácter
        gsap.fromTo(text.children, {
            y: 30,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            stagger: 0.02 * ANIMATION_SPEED,
            duration: 0.4 * ANIMATION_SPEED,
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                end: 'bottom 30%',
                toggleActions: 'play reverse play reverse'
            }
        });
    });
}

/* 
=================================
7. GALERÍA Y FILTROS
=================================
*/

// Configurar el filtrado y reordenamiento de la galería
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterBtns.length || !galleryGrid || !galleryItems.length) return;
    
    filterBtns.forEach(btn => {
        // Evento para activar el filtro
        btn.addEventListener('click', () => {
            // Eliminar la clase active de todos los botones
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.removeAttribute('style');
            });
            
            // Añadir la clase active solo al botón clickeado
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                // Mostrar todos los elementos
                galleryItems.forEach(item => {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3 * ANIMATION_SPEED,
                        ease: "power2.out"
                    });
                });
                
                // Restaurar orden original
                const originalOrder = Array.from(galleryItems).map(item => item);
                originalOrder.forEach(item => galleryGrid.appendChild(item));
                
            } else {
                // Filtrar y reordenar elementos
                const matchingItems = [];
                const nonMatchingItems = [];
                
                galleryItems.forEach(item => {
                    if (item.getAttribute('data-category') === filterValue) {
                        matchingItems.push(item);
                        gsap.to(item, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.3 * ANIMATION_SPEED,
                            ease: "power2.out"
                        });
                    } else {
                        nonMatchingItems.push(item);
                        gsap.to(item, {
                            scale: 0.8,
                            opacity: 0.2,
                            duration: 0.3 * ANIMATION_SPEED,
                            ease: "power2.out"
                        });
                    }
                });
                
                // Reordenar elementos - primero los que coinciden, luego los que no
                gsap.to(galleryGrid, { 
                    opacity: 0, 
                    duration: 0.2 * ANIMATION_SPEED, 
                    onComplete: () => {
                        // Reordenar
                        [...matchingItems, ...nonMatchingItems].forEach(item => galleryGrid.appendChild(item));
                        
                        // Mostrar de nuevo
                        gsap.to(galleryGrid, { 
                            opacity: 1, 
                            duration: 0.2 * ANIMATION_SPEED 
                        });
                    }
                });
            }
        });
    });
}

/* 
=================================
8. REPRODUCTOR DE VIDEOS
=================================
*/

// Configurar el reproductor de videos
function setupVideoPlayer() {
    const playButtons = document.querySelectorAll('.play-button');
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    if (!playButtons.length) return;
    
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const videoThumbnail = button.closest('.video-thumbnail');
            const videoSrc = videoThumbnail.getAttribute('data-video-src');
            
            if (videoSrc) {
                const videoElement = document.createElement('video');
                videoElement.setAttribute('controls', '');
                videoElement.setAttribute('autoplay', '');
                videoElement.setAttribute('class', 'embedded-video');
                videoElement.src = videoSrc;
                
                // Añadir overlay de carga mientras se carga el video
                const loadingOverlay = document.createElement('div');
                loadingOverlay.className = 'video-loading-overlay';
                loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
                
                videoThumbnail.innerHTML = '';
                videoThumbnail.appendChild(loadingOverlay);
                videoThumbnail.appendChild(videoElement);
                
                // Eliminar overlay cuando el video esté listo
                videoElement.addEventListener('canplay', () => {
                    if (loadingOverlay.parentNode) {
                        loadingOverlay.parentNode.removeChild(loadingOverlay);
                    }
                });
                
                // Backup para eliminar overlay en caso de demora
                setTimeout(() => {
                    if (loadingOverlay.parentNode) {
                        loadingOverlay.parentNode.removeChild(loadingOverlay);
                    }
                }, 3000);
            }
        });
    });
    
    // Método alternativo para hacer clic en toda la miniatura (opcional)
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', (e) => {
            // Evitar que se dispare cuando se hace clic directamente en el botón
            if (e.target.closest('.play-button')) return;
            
            // Simular clic en el botón de reproducción
            const playButton = thumbnail.querySelector('.play-button');
            if (playButton) {
                playButton.click();
            }
        });
    });
}

/* 
=================================
9. BURBUJAS INTERACTIVAS (CONTACTO)
=================================
*/

// Crear y animar burbujas interactivas en la sección de contacto
function createInteractiveBubbles() {
    const container = document.getElementById('interactive-bubbles');
    if (!container) return;

    // Limpiar el contenedor
    container.innerHTML = '';
    
    // Configuración
    const width = container.clientWidth;
    const height = container.clientHeight;
    const bubbleCount = 5;
    
    // Crear SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Crear definiciones y gradiente
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradientContact');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('style', 'stop-color:#ff3366;stop-opacity:1');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('style', 'stop-color:#ffcc00;stop-opacity:1');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Crear burbujas
    const bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        
        // Tamaño aleatorio
        const size = 30 + Math.random() * 120;
        
        // Posición aleatoria
        const x = size + Math.random() * (width - size * 2);
        const y = size + Math.random() * (height - size * 2);
        
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', size);
        circle.setAttribute('class', 'bubble');
        circle.setAttribute('opacity', 0.1 + Math.random() * 0.2);
        
        // Guardar propiedades originales - VELOCIDAD DE BURBUJAS RESTAURADA A VALORES ORIGINALES
        bubbles.push({
            element: circle,
            originalX: x,
            originalY: y,
            originalSize: size,
            originalOpacity: parseFloat(circle.getAttribute('opacity')),
            // Valores originales restaurados para el movimiento de las burbujas
            speedX: 1 + Math.random() * 2,         // Velocidad X original
            speedY: 1 + Math.random() * 2,         // Velocidad Y original
            phaseX: Math.random() * Math.PI * 2,   // Fase inicial X
            phaseY: Math.random() * Math.PI * 2,   // Fase inicial Y
            amplitudeX: 10 + Math.random() * 20,   // Amplitud X
            amplitudeY: 10 + Math.random() * 20,   // Amplitud Y
            sizeSpeed: 0.5 + Math.random(),        // Velocidad de cambio de tamaño original
            sizePhase: Math.random() * Math.PI * 2, // Fase inicial de tamaño
            opacitySpeed: 0.3 + Math.random() * 0.5, // Velocidad de cambio de opacidad original
            opacityPhase: Math.random() * Math.PI * 2, // Fase inicial de opacidad
            // Estado de interacción
            pushed: false,         // Indica si la burbuja está siendo empujada
            returningToFlow: false, // Indica si está retornando al flujo normal
            lastPushedX: 0,        // Última posición X cuando estaba siendo empujada
            lastPushedY: 0,        // Última posición Y cuando estaba siendo empujada
            returnProgress: 0,     // Progreso de retorno al flujo (0-1)
            returnStartTime: 0     // Tiempo en que empezó a retornar
        });
        
        svg.appendChild(circle);
    }
    
    container.appendChild(svg);
    
    // Guardar tiempo de inicio global
    const startTime = performance.now();
    
    // Función de animación sinusoidal para crear un loop perfecto
    function animateBubbles(time) {
        // Tiempo en segundos desde el inicio (para animación base)
        const t = (time - startTime) / 1000;
        
        bubbles.forEach(bubble => {
            // Calcular la posición base del flujo sinusoidal
            const flowX = bubble.originalX + Math.sin(t * bubble.speedX + bubble.phaseX) * bubble.amplitudeX;
            const flowY = bubble.originalY + Math.sin(t * bubble.speedY + bubble.phaseY) * bubble.amplitudeY;
            
            // Calcular nuevo tamaño y opacidad
            const sizeRatio = 0.85 + Math.sin(t * bubble.sizeSpeed + bubble.sizePhase) * 0.15;
            const newSize = bubble.originalSize * sizeRatio;
            
            const opacityRatio = 0.9 + Math.sin(t * bubble.opacitySpeed + bubble.opacityPhase) * 0.1;
            const newOpacity = bubble.originalOpacity * opacityRatio;
            
            // Establecer tamaño y opacidad
            bubble.element.setAttribute('r', newSize);
            bubble.element.setAttribute('opacity', newOpacity);
            
            // Determinar la posición final según el estado
            let finalX, finalY;
            
            if (bubble.pushed) {
                // Si está siendo empujada, usar la posición actual
                finalX = parseFloat(bubble.element.getAttribute('cx'));
                finalY = parseFloat(bubble.element.getAttribute('cy'));
                
                // Actualizar la última posición conocida mientras está empujada
                bubble.lastPushedX = finalX;
                bubble.lastPushedY = finalY;
            } 
            else if (bubble.returningToFlow) {
                // Calcular el tiempo transcurrido desde que empezó a retornar
                const returnElapsed = (time - bubble.returnStartTime) / 1000; // en segundos
                // Duración del retorno original: 1.0s
                const returnDuration = 1.0; 
                
                // Calcular progreso normalizado (0-1)
                bubble.returnProgress = Math.min(returnElapsed / returnDuration, 1);
                
                if (bubble.returnProgress >= 1) {
                    // Completó el retorno al flujo
                    bubble.returningToFlow = false;
                    finalX = flowX;
                    finalY = flowY;
                } else {
                    // Función easing para suavizar el movimiento (ease-out cúbico)
                    const easeProgress = 1 - Math.pow(1 - bubble.returnProgress, 3);
                    
                    // Interpolar entre la última posición empujada y la posición del flujo actual
                    finalX = bubble.lastPushedX + (flowX - bubble.lastPushedX) * easeProgress;
                    finalY = bubble.lastPushedY + (flowY - bubble.lastPushedY) * easeProgress;
                }
            } 
            else {
                // Si no está siendo afectada, seguir el flujo normal
                finalX = flowX;
                finalY = flowY;
            }
            
            // Aplicar la posición final
            bubble.element.setAttribute('cx', finalX);
            bubble.element.setAttribute('cy', finalY);
        });
        
        // Continuar la animación
        requestAnimationFrame(animateBubbles);
    }
    
    // Iniciar la animación
    requestAnimationFrame(animateBubbles);
    
    // Interacción con el ratón
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        bubbles.forEach(bubble => {
            // Obtener posición actual
            const bubbleX = parseFloat(bubble.element.getAttribute('cx'));
            const bubbleY = parseFloat(bubble.element.getAttribute('cy'));
            
            // Calcular distancia entre el ratón y la burbuja
            const dx = mouseX - bubbleX;
            const dy = mouseY - bubbleY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Radio de influencia
            const radius = 150;
            
            if (distance < radius) {
                // Calcular fuerza - más fuerte cuanto más cerca (valor original: 100)
                const force = (1 - distance / radius) * 100; 
                
                // Dirección de empuje - alejándose del ratón
                const angle = Math.atan2(dy, dx);
                const pushX = -Math.cos(angle) * force;
                const pushY = -Math.sin(angle) * force;
                
                // Marcar como empujada
                bubble.pushed = true;
                bubble.returningToFlow = false;
                
                // Posición hacia la que la burbuja se moverá (lejos del cursor)
                const targetX = bubbleX + pushX;
                const targetY = bubbleY + pushY;
                
                // Duración original de 0.3s para el empuje
                gsap.to(bubble.element, {
                    attr: { 
                        cx: targetX,
                        cy: targetY
                    },
                    duration: 0.3,
                    overwrite: "auto"
                });
            }
        });
    });
    
    // Función para iniciar el retorno al flujo
    function startReturnToFlow() {
        // Capturar tiempo actual para la animación de retorno
        const currentTime = performance.now();
        
        bubbles.forEach(bubble => {
            if (bubble.pushed) {
                // Guardar la posición exacta actual antes de comenzar el retorno
                bubble.lastPushedX = parseFloat(bubble.element.getAttribute('cx'));
                bubble.lastPushedY = parseFloat(bubble.element.getAttribute('cy'));
                
                // Cambiar estado
                bubble.pushed = false;
                bubble.returningToFlow = true;
                bubble.returnProgress = 0;
                bubble.returnStartTime = currentTime;
                
                // Detener cualquier animación GSAP activa para evitar conflictos
                gsap.killTweensOf(bubble.element);
            }
        });
    }
    
    // Cuando el ratón sale del contenedor
    container.addEventListener('mouseleave', startReturnToFlow);
    
    // También iniciar retorno cuando el mouse se detiene (valor original: 300ms)
    let mouseTimeout;
    container.addEventListener('mousemove', () => {
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(startReturnToFlow, 300);
    });
    
    // Animación de entrada con ScrollTrigger (mantenemos la velocidad mejorada solo para esta parte)
    gsap.fromTo(container, {
        opacity: 0,
        scale: 0.8
    }, {
        opacity: 1,
        scale: 1,
        duration: 0.7 * ANIMATION_SPEED,
        scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse'
        }
    });
}

/* 
=================================
10. UTILIDADES Y HELPERS
=================================
*/

// Llamar a todas las funciones de inicialización principales
function initAll() {
    setupCustomCursor();
    setupNavigation();
    setupGalleryFilters();
    setupVideoPlayer();
    animateHero();
    initAnimations();
    createInteractiveBubbles();
}
