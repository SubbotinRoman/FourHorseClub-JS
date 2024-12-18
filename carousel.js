/**
 * Класс для создания и управления каруселью изображений
 * Поддерживает автоматическое переключение, ручную навигацию и точки-индикаторы
 */
class Carousel {
  /**
   * Создает экземпляр карусели
   * @param {HTMLElement} element - DOM элемент, содержащий карусель
   */
  constructor(element) {
    this.carousel = element;
    // Получаем все слайды и преобразуем их в массив для удобства работы
    this.slides = Array.from(this.carousel.querySelectorAll('.carousel-slide'));
    this.totalSlides = this.slides.length;
    this.currentSlide = 0; // Индекс текущего слайда

    this.createControls(); // Создаем элементы управления
    this.updateSlides(); // Отображаем начальное состояние
    this.autoPlay(); // Запускаем автоматическое переключение
  }

  /**
   * Создает и добавляет элементы управления каруселью:
   * - Кнопки навигации (вперед/назад)
   * - Точки-индикаторы текущего слайда
   */
  createControls() {
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    // Создаем кнопку "Назад"
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button prev';
    prevButton.innerHTML = '←';
    prevButton.addEventListener('click', () => this.prevSlide());

    // Создаем контейнер для точек-индикаторов
    const dots = document.createElement('div');
    dots.className = 'carousel-dots';

    // Создаем точки-индикаторы для каждого слайда
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      if (i === 0) dot.classList.add('active'); // Активируем первую точку
      dots.appendChild(dot);
    }

    // Создаем кнопку "Вперед"
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button next';
    nextButton.innerHTML = '→';
    nextButton.addEventListener('click', () => this.nextSlide());

    // Добавляем все элементы управления в контейнер
    controls.appendChild(prevButton);
    controls.appendChild(dots);
    controls.appendChild(nextButton);

    // Добавляем контейнер с элементами управления в карусель
    this.carousel.appendChild(controls);
    this.dots = Array.from(dots.children); // Сохраняем ссылки на точки-индикаторы
  }

  /**
   * Обновляет отображение слайдов и точек-индикаторов
   * в соответствии с текущим индексом слайда
   */
  updateSlides() {
    // Обновляем видимость слайдов
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.style.display = 'block'; // Показываем текущий слайд
      } else {
        slide.style.display = 'none'; // Скрываем остальные слайды
      }
    });

    // Обновляем состояние точек-индикаторов
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('active'); // Активируем точку текущего слайда
      } else {
        dot.classList.remove('active'); // Деактивируем остальные точки
      }
    });
  }

  /**
   * Переключает на следующий слайд, если он существует
   */
  nextSlide() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
      this.updateSlides();
    }
  }

  /**
   * Переключает на предыдущий слайд, если он существует
   */
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlides();
    }
  }

  /**
   * Запускает автоматическое переключение слайдов
   * каждые 4 секунды
   */
  autoPlay() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
}

// Инициализация карусели после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const carouselElement = document.querySelector('.stages-carousel');
  if (carouselElement) {
    new Carousel(carouselElement); // Создаем экземпляр карусели
  }
});
