document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const connectAccountBtn = document.getElementById('connect-account-btn');
    const giftCards = document.querySelectorAll('.gift-card');
    const giftDetailModal = document.getElementById('gift-detail-modal');
    const closeDetailBtn = document.getElementById('close-detail-btn');
    const detailActionBtn = document.getElementById('detail-action-btn');
    
    // Модальные окна
    const connectAccountModal = document.getElementById('connect-account-modal');
    const buyModal = document.getElementById('buy-modal');
    const bidModal = document.getElementById('bid-modal');
    const depositModal = document.getElementById('deposit-modal');
    const withdrawBalanceModal = document.getElementById('withdraw-balance-modal');
    const withdrawGiftModal = document.getElementById('withdraw-gift-modal');
    
    // Кнопки отмены
    const cancelConnectAccountBtn = document.getElementById('cancel-connect-account-btn');
    const cancelBuyBtn = document.getElementById('cancel-buy-btn');
    const cancelBidBtn = document.getElementById('cancel-bid-btn');
    const cancelDepositBtn = document.getElementById('cancel-deposit-btn');
    const cancelWithdrawBalanceBtn = document.getElementById('cancel-withdraw-balance-btn');
    const cancelWithdrawGiftBtn = document.getElementById('cancel-withdraw-gift-btn');
    
    // Навигация по вкладкам
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех элементов навигации
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Добавляем активный класс текущему элементу навигации
            this.classList.add('active');
            
            // Скрываем все вкладки
            tabContents.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Показываем выбранную вкладку
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Фильтры
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Кнопка подключения аккаунта
    connectAccountBtn.addEventListener('click', function() {
        connectAccountModal.style.display = 'flex';
    });
    
    // Кнопки покупки
    document.querySelectorAll('.buy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            buyModal.style.display = 'flex';
        });
    });
    
    // Кнопки ставки
    document.querySelectorAll('.bid-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            bidModal.style.display = 'flex';
        });
    });
    
    // Кнопка пополнения
    document.querySelectorAll('.deposit-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            depositModal.style.display = 'flex';
        });
    });
    
    // Кнопка вывода баланса
    document.querySelectorAll('.withdraw-balance-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            withdrawBalanceModal.style.display = 'flex';
        });
    });
    
    // Кнопки вывода подарка
    document.querySelectorAll('.withdraw-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            withdrawGiftModal.style.display = 'flex';
        });
    });
    
    // Закрытие модальных окон при клике на отмену
    cancelConnectAccountBtn.addEventListener('click', function() {
        connectAccountModal.style.display = 'none';
    });
    
    cancelBuyBtn.addEventListener('click', function() {
        buyModal.style.display = 'none';
    });
    
    cancelBidBtn.addEventListener('click', function() {
        bidModal.style.display = 'none';
    });
    
    cancelDepositBtn.addEventListener('click', function() {
        depositModal.style.display = 'none';
    });
    
    cancelWithdrawBalanceBtn.addEventListener('click', function() {
        withdrawBalanceModal.style.display = 'none';
    });
    
    cancelWithdrawGiftBtn.addEventListener('click', function() {
        withdrawGiftModal.style.display = 'none';
    });
    
    // Закрытие модального окна при клике вне его
    const modals = [connectAccountModal, buyModal, bidModal, depositModal, withdrawBalanceModal, withdrawGiftModal, giftDetailModal];
    
    modals.forEach(modal => {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Обработка клика по карточке подарка
    giftCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Проверяем, не было ли нажатия на кнопку
            if (e.target.tagName === 'BUTTON') {
                return;
            }
            
            const giftId = this.getAttribute('data-gift-id');
            const giftName = this.getAttribute('data-gift-name');
            const model = this.getAttribute('data-model');
            const symbol = this.getAttribute('data-symbol');
            const backdrop = this.getAttribute('data-backdrop');
            const price = this.getAttribute('data-price');
            const image = this.getAttribute('data-image');
            const action = this.getAttribute('data-action');
            
            // Заполняем модальное окно данными
            document.getElementById('detail-gift-image').src = image;
            document.getElementById('detail-gift-name').textContent = giftName;
            document.getElementById('detail-gift-id').textContent = `#${giftId}`;
            document.getElementById('detail-model').textContent = model;
            document.getElementById('detail-symbol').textContent = symbol;
            document.getElementById('detail-backdrop').textContent = backdrop;
            document.getElementById('detail-price').textContent = `${price} ꘜ`;
            
            // Устанавливаем текст кнопки в зависимости от действия
            let buttonText = 'Купить';
            if (action === 'bid') {
                buttonText = 'Ставка';
            } else if (action === 'withdraw') {
                buttonText = 'Вывести';
            }
            detailActionBtn.textContent = buttonText;
            
            // Показываем модальное окно
            giftDetailModal.style.display = 'flex';
        });
    });
    
    // Закрытие модального окна с деталями подарка
    closeDetailBtn.addEventListener('click', function() {
        giftDetailModal.style.display = 'none';
    });
    
    // Обработка действия (купить/ставка/вывести) в модальном окне
    detailActionBtn.addEventListener('click', function() {
        const actionText = this.textContent;
        
        if (actionText === 'Купить') {
            giftDetailModal.style.display = 'none';
            buyModal.style.display = 'flex';
        } else if (actionText === 'Ставка') {
            giftDetailModal.style.display = 'none';
            bidModal.style.display = 'flex';
        } else if (actionText === 'Вывести') {
            giftDetailModal.style.display = 'none';
            withdrawGiftModal.style.display = 'flex';
        }
    });
    
    // Функция для обновления таймеров аукционов
    function updateAuctionTimers() {
        const timers = document.querySelectorAll('.timer');
        
        timers.forEach(timer => {
            const endTime = new Date(timer.getAttribute('data-end-time')).getTime();
            const now = new Date().getTime();
            let timeLeft = endTime - now;
            
            // Если время истекло, устанавливаем случайное будущее время
            if (timeLeft <= 0) {
                // Генерируем случайное время от 1 до 7 дней в будущем
                const randomDays = Math.floor(Math.random() * 7) + 1;
                const randomHours = Math.floor(Math.random() * 24);
                const randomMinutes = Math.floor(Math.random() * 60);
                
                const newEndTime = new Date();
                newEndTime.setDate(newEndTime.getDate() + randomDays);
                newEndTime.setHours(newEndTime.getHours() + randomHours);
                newEndTime.setMinutes(newEndTime.getMinutes() + randomMinutes);
                
                // Обновляем атрибут data-end-time
                timer.setAttribute('data-end-time', newEndTime.toISOString());
                timeLeft = newEndTime.getTime() - now;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            timer.textContent = `${days}д ${hours.toString().padStart(2, '0')}ч ${minutes.toString().padStart(2, '0')}м ${seconds.toString().padStart(2, '0')}с`;
        });
    }
    
    // Обновляем таймеры каждую секунду
    updateAuctionTimers();
    setInterval(updateAuctionTimers, 1000);
});