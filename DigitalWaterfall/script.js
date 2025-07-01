document.addEventListener('DOMContentLoaded', () => {
    const soundButton = document.getElementById('toggle-sound');
    const soundButtonIcon = soundButton.querySelector('i');
    const animationButton = document.getElementById('toggle-animation');
    const animationButtonIcon = animationButton.querySelector('i');
    const waterfallSound = document.getElementById('waterfall-sound');
    const butterfly = document.getElementById('butterfly');

    let isPaused = false;
    let masterTimeline;

    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        console.log("Bootstrap Tooltips inicializados.");
    }

    function initParticles() {
        tsParticles.load("particles-js", {
            particles: {
                number: {
                    value: 200,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "top",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
        console.log("tsParticles (névoa) inicializado.");
    }

    function initAnimations() {
        masterTimeline = gsap.timeline({ repeat: -1, yoyo: true });

        masterTimeline
            .to(butterfly, {
                duration: 5,
                x: "-30vw",
                y: "-20vh",
                rotation: -20,
                ease: "power1.inOut"
            })
            .to(butterfly, {
                duration: 4,
                x: "10vw",
                y: "15vh",
                rotation: 10,
                ease: "power1.inOut"
            })
            .to(butterfly, {
                duration: 6,
                x: "-10vw",
                y: "-10vh",
                rotation: 0,
                ease: "power1.inOut"
            });

        console.log("GSAP (animações) inicializadas.");
        return masterTimeline;
    }

    function setupControls() {
        soundButton.addEventListener('click', () => {
            if (waterfallSound.paused) {
                waterfallSound.play();
                soundButtonIcon.classList.remove('fa-volume-mute');
                soundButtonIcon.classList.add('fa-volume-high');
            } else {
                waterfallSound.pause();
                soundButtonIcon.classList.remove('fa-volume-high');
                soundButtonIcon.classList.add('fa-volume-mute');
            }
        });

        animationButton.addEventListener('click', () => {
            isPaused = !isPaused;

            if (isPaused) {
                masterTimeline.pause();
                document.body.classList.add('animation-paused');
                animationButtonIcon.classList.remove('fa-pause');
                animationButtonIcon.classList.add('fa-play');
            } else {
                masterTimeline.resume();
                document.body.classList.remove('animation-paused');
                animationButtonIcon.classList.remove('fa-play');
                animationButtonIcon.classList.add('fa-pause');
            }
        });
        console.log("Controles de cena configurados.");
    }

    initTooltips();
    initParticles();
    masterTimeline = initAnimations();
    setupControls();

    console.log("Cena da cachoeira carregada com sucesso!");
});

