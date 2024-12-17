class Carousel {
  constructor(element) {
    this.carousel = element;
    this.slides = Array.from(this.carousel.querySelectorAll('.carousel-slide'));
    this.totalSlides = this.slides.length;
    this.currentSlide = 0;
    
    this.createControls();
    this.updateSlides();
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    // Кнопка "Назад"
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button prev';
    prevButton.innerHTML = '←';
    prevButton.addEventListener('click', () => this.prevSlide());

    // Точки индикации
    const dots = document.createElement('div');
    dots.className = 'carousel-dots';
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('active');
      dots.appendChild(dot);
    }

    // Кнопка "Вперед"
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button next';
    nextButton.innerHTML = '→';
    nextButton.addEventListener('click', () => this.nextSlide());

    controls.appendChild(prevButton);
    controls.appendChild(dots);
    controls.appendChild(nextButton);
    
    this.carousel.appendChild(controls);
    this.dots = Array.from(dots.children);
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.style.display = 'block';
      } else {
        slide.style.display = 'none';
      }
    });

    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlides();
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlides();
    }
  }
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', () => {
  const carouselElement = document.querySelector('.stages-carousel');
  if (carouselElement) {
    new Carousel(carouselElement);
  }
});
