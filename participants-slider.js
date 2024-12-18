/**
 * Инициализация слайдера участников при загрузке DOM
 * Включает автоматическое переключение и ручную навигацию
 */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем основные элементы слайдера
  const container = document.querySelector('.participants-container');
  const participants = document.querySelectorAll('.participant');
  const prevButton = document.querySelector('.participants-button-slider .prev');
  const nextButton = document.querySelector('.participants-button-slider .next');
  const counter = document.querySelector('.current-slide');
  let currentIndex = 0;
  let autoSlideInterval; // Интервал для автоматического переключения

  /**
   * Обновляет положение слайдера и счетчик
   * Плавно прокручивает к текущему слайду
   */
  function updateSlider() {
    // Прокручиваем контейнер к текущему слайду с плавной анимацией
    container.scrollTo({
      left: participants[currentIndex].offsetLeft,
      behavior: 'smooth',
    });

    // Обновляем номер текущего слайда (нумерация начинается с 1)
    counter.textContent = currentIndex + 1;
  }

  /**
   * Переключает на следующий слайд
   * Зацикливает переключение при достижении последнего слайда
   */
  function nextSlide() {
    currentIndex = (currentIndex + 1) % participants.length;
    updateSlider();
  }

  /**
   * Переключает на предыдущий слайд
   * Зацикливает переключение при достижении первого слайда
   */
  function prevSlide() {
    currentIndex = (currentIndex - 1 + participants.length) % participants.length;
    updateSlider();
  }

  /**
   * Запускает автоматическое переключение слайдов
   * Предварительно очищает существующий интервал
   */
  function startAutoSlide() {
    stopAutoSlide(); // Очищаем предыдущий интервал, если он был
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  /**
   * Останавливает автоматическое переключение слайдов
   */
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  // Обработчик клика по кнопке "Предыдущий"
  prevButton.addEventListener('click', () => {
    stopAutoSlide(); // Останавливаем автопереключение при ручном управлении
    prevSlide();
    startAutoSlide(); // Возобновляем автопереключение
  });

  // Обработчик клика по кнопке "Следующий"
  nextButton.addEventListener('click', () => {
    stopAutoSlide(); // Останавливаем автопереключение при ручном управлении
    nextSlide();
    startAutoSlide(); // Возобновляем автопереключение
  });

  // Останавливаем автопереключение при касании на мобильных устройствах
  container.addEventListener('touchstart', stopAutoSlide);

  // Возобновляем автопереключение при окончании касания
  container.addEventListener('touchend', () => {
    // Небольшая задержка перед возобновлением, чтобы пользователь мог завершить взаимодействие
    setTimeout(startAutoSlide, 1000);
  });

  // Останавливаем автопереключение при наведении мыши (для десктопов)
  container.addEventListener('mouseenter', stopAutoSlide);

  // Возобновляем автопереключение при уходе мыши (для десктопов)
  container.addEventListener('mouseleave', startAutoSlide);

  // Инициализация слайдера и запуск автопереключения
  updateSlider();
  startAutoSlide();
});
