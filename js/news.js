document.addEventListener("DOMContentLoaded", function() {
    renderNews();
    
    // Проверяем, есть ли ID новости в URL, чтобы сразу её открыть
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    if (newsId) {
        // Открываем модалку с небольшой задержкой для плавности
        setTimeout(() => window.openNews(parseInt(newsId)), 200);
    }

    const closeNewsModalBtn = document.getElementById('closeNewsModalBtn');
    if (closeNewsModalBtn) {
        closeNewsModalBtn.addEventListener('click', window.closeNews);
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(event) {
        const newsReadModal = document.getElementById('newsReadModal');
        if (event.target == newsReadModal) { window.closeNews(); }
    });

    // Закрытие окна по кнопке Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            const newsReadModal = document.getElementById('newsReadModal');
            if (newsReadModal && newsReadModal.style.display === "block") {
                window.closeNews();
            }
        }
    });
});

// Глобальная функция открытия новости (вызывается из HTML)
window.openNews = function(id) {
    const newsReadModal = document.getElementById('newsReadModal');
    const ocImage = document.getElementById('ocImage');
    const ocDate = document.getElementById('ocDate');
    const ocTitle = document.getElementById('ocTitle');
    const ocContent = document.getElementById('ocContent');
    
    const burgerMenuBtn = document.getElementById('burgerMenu');
    const mobileNavMenu = document.querySelector('nav');

    if (typeof newsData !== 'undefined') {
        const newsItem = newsData.find(item => item.id === id);
        if(newsItem) {
            // Подстановка префикса img/, если его нет в данных
            let imagePath = newsItem.image || '';
            if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('img/')) {
                imagePath = 'img/' + imagePath;
            }
            if(ocImage) ocImage.src = imagePath;
            if(ocDate) ocDate.textContent = newsItem.date;
            if(ocTitle) ocTitle.textContent = newsItem.title;
            if(ocContent) ocContent.innerHTML = newsItem.content;
        }
    }
    
    if (newsReadModal) {
        newsReadModal.style.display = 'block';
        newsReadModal.querySelector('.news-read-body').scrollTop = 0;
    }
    document.body.style.overflow = 'hidden';
    
    // Закрываем бургер-меню, если оно было открыто
    if(burgerMenuBtn) burgerMenuBtn.classList.remove('active');
    if(mobileNavMenu) mobileNavMenu.classList.remove('active');
}

// Глобальная функция закрытия новости
window.closeNews = function() {
    const newsReadModal = document.getElementById('newsReadModal');
    if (newsReadModal) newsReadModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Функция рендера списка новостей из файла news-data.js
function renderNews() {
    try {
        const container = document.getElementById('dynamicNewsContainer');
        if (!container) return;

        let dataToRender = [];
        
        if (typeof newsData !== 'undefined' && Array.isArray(newsData) && newsData.length > 0) {
            dataToRender = newsData;
        } else {
            console.warn("Файл news-data.js не загружен. Показываю демо-блок.");
            dataToRender = [{
                id: 1, date: "Ошибка", title: "Нет доступа к базе новостей",
                excerpt: "Файл news-data.js не найден. Убедитесь, что он находится в папке js/ или подключен правильно.",
                image: "https://via.placeholder.com/800x600/e0e0e0/666?text=Нет+файла"
            }];
        }

        let htmlString = '<div class="news-list-container">';

        dataToRender.forEach((news) => {
            const safeImg = `onerror="this.src='https://via.placeholder.com/800x600/eee/999?text=Фото'"`;
            
            // Защита: добавляем путь img/, если он не прописан в базе данных (news-data.js)
            let imagePath = news.image || '';
            if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('img/')) {
                imagePath = 'img/' + imagePath;
            }
            
            htmlString += `
                <div class="news-item">
                    <div class="news-text-wrapper">
                        <div class="news-date">${news.date || ''}</div>
                        <h2 class="news-title">${news.title || ''}</h2>
                        <p class="news-excerpt">${news.excerpt || ''}</p>
                        <button class="btn-read" onclick="window.openNews(${news.id || 0})">Читать далее</button>
                    </div>
                    <div class="news-image-wrapper" onclick="window.openNews(${news.id || 0})">
                        <img src="${imagePath}" alt="Новость" loading="lazy" ${safeImg}>
                    </div>
                </div>
            `;
        });

        htmlString += '</div>';
        container.innerHTML = htmlString;

    } catch (error) {
        console.error("Критическая ошибка отрисовки:", error);
        const container = document.getElementById('dynamicNewsContainer');
        if(container) container.innerHTML = 
            "<div style='text-align:center; padding: 50px; background: white; border-radius: 20px; color: red;'>" +
            "<h2>Произошла ошибка при загрузке. Проверьте консоль браузера (F12).</h2></div>";
    }
}