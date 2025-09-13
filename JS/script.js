document.addEventListener('DOMContentLoaded', function () {
    const sliderImages = document.querySelectorAll('.slider-image');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;
    let autoSlideInterval;

    // Crear los puntos indicadores
    sliderImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const sliderDots = document.querySelectorAll('.slider-dot');

    function showSlide(index) {
        // Asegurarse de que el índice esté dentro de los límites
        if (index >= sliderImages.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = sliderImages.length - 1;
        } else {
            currentIndex = index;
        }

        // Ocultar todas las imágenes y desactivar todos los puntos
        sliderImages.forEach(img => img.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));

        // Mostrar la imagen actual y activar el punto correspondiente
        sliderImages[currentIndex].classList.add('active');
        sliderDots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners para los botones de navegación
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide(); // Reinicia el auto-slide
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide(); // Reinicia el auto-slide
        });
    }

    // Iniciar el carrusel y el auto-slide
    showSlide(currentIndex);
    startAutoSlide();

    // Detener el auto-slide al interactuar con el mouse (opcional)
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', startAutoSlide);
    }
});