document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('[class*="card-"][class*="-mobile"]');
    const dots = document.querySelectorAll('.stages-mobile__dot');
    const prevButton = document.querySelector('.stages-mobile__button.prev');
    const nextButton = document.querySelector('.stages-mobile__button.next');
    let currentIndex = 0;

    // Функция для показа карточки по индексу
    function showCard(index) {
        // Скрываем все карточки
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.pointerEvents = 'none';
        });
        
        // Убираем активный класс у всех точек
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показываем нужную карточку
        cards[index].style.opacity = '1';
        cards[index].style.pointerEvents = 'auto';
        
        // Активируем соответствующую точку
        dots[index].classList.add('active');
        
        // Обновляем текущий индекс
        currentIndex = index;
    }

    // Обработчик для кнопки "Предыдущий"
    prevButton.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = cards.length - 1;
        }
        showCard(newIndex);
    });

    // Обработчик для кнопки "Следующий"
    nextButton.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= cards.length) {
            newIndex = 0;
        }
        showCard(newIndex);
    });

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showCard(index);
        });
    });

    // Показываем первую карточку при загрузке
    showCard(0);
});
