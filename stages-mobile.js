/**
 * Инициализация мобильной версии слайдера этапов
 * Управляет отображением карточек этапов на мобильных устройствах
 * с помощью кнопок навигации и точек-индикаторов
 */
document.addEventListener('DOMContentLoaded', () => {
  // Получаем все необходимые элементы интерфейса
  const cards = document.querySelectorAll('[class*="card-"][class*="-mobile"]'); // Карточки этапов
  const dots = document.querySelectorAll('.stages-mobile__dot'); // Точки-индикаторы
  const prevButton = document.querySelector('.stages-mobile__button.prev'); // Кнопка "Назад"
  const nextButton = document.querySelector('.stages-mobile__button.next'); // Кнопка "Вперед"
  let currentIndex = 0; // Индекс текущей отображаемой карточки

  /**
   * Отображает карточку с указанным индексом
   * @param {number} index - Индекс карточки для отображения
   */
  function showCard(index) {
    // Скрываем все карточки и делаем их недоступными для взаимодействия
    cards.forEach((card) => {
      card.style.opacity = '0'; // Делаем карточку прозрачной
      card.style.pointerEvents = 'none'; // Отключаем события мыши
      card.style.visibility = 'hidden'; // Скрываем карточку
    });

    // Сбрасываем активное состояние у всех точек-индикаторов
    dots.forEach((dot) => dot.classList.remove('active'));

    // Показываем выбранную карточку и делаем её доступной для взаимодействия
    cards[index].style.opacity = '1'; // Делаем карточку видимой
    cards[index].style.pointerEvents = 'auto'; // Включаем события мыши
    cards[index].style.visibility = 'visible'; // Показываем карточку

    // Активируем соответствующую точку-индикатор
    dots[index].classList.add('active');

    // Сохраняем текущий индекс
    currentIndex = index;
  }

  /**
   * Обработчик клика по кнопке "Предыдущий"
   * При достижении первой карточки переходит к последней
   */
  prevButton.addEventListener('click', () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = cards.length - 1; // Переход к последней карточке
    }
    showCard(newIndex);
  });

  /**
   * Обработчик клика по кнопке "Следующий"
   * При достижении последней карточки переходит к первой
   */
  nextButton.addEventListener('click', () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= cards.length) {
      newIndex = 0; // Переход к первой карточке
    }
    showCard(newIndex);
  });

  /**
   * Добавляем обработчики кликов по точкам-индикаторам
   * Позволяет переключаться на любую карточку напрямую
   */
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showCard(index);
    });
  });

  // Инициализация: показываем первую карточку при загрузке страницы
  showCard(0);
});
