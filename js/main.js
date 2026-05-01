document.addEventListener("DOMContentLoaded", function() {
    // 1. Инициализация AOS (анимации при скролле)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }

    // 2. Логика мобильного меню (табы) - Аккордеон
    if (window.innerWidth <= 768) {
        const flexoBtn = document.querySelector('.mobile-accordion-btn.active'); 
        const flexoContent = document.getElementById('tab-flexo');
        
        if (flexoBtn && flexoContent) {
            flexoBtn.classList.remove('active');
            flexoContent.classList.remove('active');
            flexoContent.style.display = 'none';
        }
    }

    // 3. РЕНДЕР ГОРИЗОНТАЛЬНЫХ НОВОСТЕЙ
    const newsContainer = document.getElementById('latest-news-grid');
    if (newsContainer && typeof newsData !== 'undefined') {
        const latestPosts = newsData.slice(0, 3); 
        let html = '';
        
        latestPosts.forEach((post, index) => {
            const delay = index * 100;
            
            // Умная защита пути к картинке
            let imagePath = post.image || '';
            if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('img/')) {
                imagePath = 'img/' + imagePath;
            }

            html += `
                <a href="news.html?id=${post.id}" class="news-h-card" data-aos="fade-up" data-aos-delay="${delay}">
                    <div class="news-h-img">
                        <img src="${imagePath}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/600x400/eef2f0/2d8a4e?text=Фото'">
                    </div>
                    <div class="news-h-content">
                        <div class="news-h-date">${post.date}</div>
                        <h3 class="news-h-title">${post.title}</h3>
                        <p class="news-h-excerpt">${post.excerpt.substring(0, 85)}...</p>
                        <div class="news-h-link">
                            Читать далее <span style="font-size: 18px;">→</span>
                        </div>
                    </div>
                </a>
            `;
        });
        newsContainer.innerHTML = html;
    } else if (newsContainer) {
        newsContainer.innerHTML = '<p>Новости загружаются...</p>';
    }

    // ВНИМАНИЕ: Логика Шапки и Бургер-меню удалена (теперь она живет в header.js)

    // 4. ЛОГИКА LIGHTBOX (увеличение картинок каталога)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeImgModalBtn = document.getElementById("closeImgModal");
    
    let currentLightboxImages = [];
    let currentLightboxIndex = 0;
    let swipeDirection = 1;

    window.openLightbox = function(srcOrIndex, imagesArray = null) {
        const burgerMenuBtn = document.getElementById('burgerMenu');
        const mobileNavMenu = document.querySelector('nav');
        if(burgerMenuBtn) burgerMenuBtn.classList.remove('active');
        if(mobileNavMenu) mobileNavMenu.classList.remove('active');
        if(modal) modal.style.display = "flex"; 
        swipeDirection = 1; 
        
        if (Array.isArray(imagesArray)) {
            currentLightboxImages = imagesArray;
            currentLightboxIndex = typeof srcOrIndex === 'number' ? srcOrIndex : 0;
            const prevBtn = document.getElementById('prevImgBtn');
            const nextBtn = document.getElementById('nextImgBtn');
            if(prevBtn) prevBtn.style.display = 'block';
            if(nextBtn) nextBtn.style.display = 'block';
            updateLightboxImage();
        } else {
            currentLightboxImages = [srcOrIndex];
            currentLightboxIndex = 0;
            const prevBtn = document.getElementById('prevImgBtn');
            const nextBtn = document.getElementById('nextImgBtn');
            if(prevBtn) prevBtn.style.display = 'none';
            if(nextBtn) nextBtn.style.display = 'none';
            if(modalImg) modalImg.src = srcOrIndex;
        }
    }

    function updateLightboxImage() {
        if(modalImg) modalImg.src = currentLightboxImages[currentLightboxIndex];
    }

    function nextLightboxImg() {
        if (currentLightboxImages.length <= 1) return;
        swipeDirection = 1;
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
        updateLightboxImage();
    }

    function prevLightboxImg() {
        if (currentLightboxImages.length <= 1) return;
        swipeDirection = -1;
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
        updateLightboxImage();
    }

    if(modalImg) {
        modalImg.onerror = function() {
            if (currentLightboxImages.length > 1) {
                currentLightboxImages.splice(currentLightboxIndex, 1);
                if (swipeDirection === 1) {
                    if (currentLightboxIndex >= currentLightboxImages.length) {
                        currentLightboxIndex = 0; 
                    }
                } else {
                    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
                }
                updateLightboxImage(); 
            } else {
                if(modal) modal.style.display = "none";
            }
        };
    }

    if(document.getElementById('nextImgBtn')) document.getElementById('nextImgBtn').onclick = nextLightboxImg;
    if(document.getElementById('prevImgBtn')) document.getElementById('prevImgBtn').onclick = prevLightboxImg;

    const images = document.querySelectorAll(".zoomable");
    images.forEach(img => {
        img.onclick = function(e) {
            if (this.closest('.product-card')) return;
            openLightbox(this.src); 
        }
    });

    if(closeImgModalBtn) {
        closeImgModalBtn.onclick = function() {
            modal.style.display = "none";
            const catOverlay = document.getElementById('catalogOverlay');
            if (!catOverlay || !catOverlay.classList.contains('active')) {
                document.body.style.overflow = "auto";
            }
        }
    }

    // 5. Форма заказа (из подвала)
    const orderModal = document.getElementById("orderModal");
    const orderBtns = document.querySelectorAll(".btn-order, .overlay-order-trigger, .trigger-modal");
    const closeOrderBtn = document.getElementById("closeOrderModal");
    const calculationForm = document.getElementById("calculationForm");
    const orderFormContainer = document.getElementById("orderFormContainer");
    const successMessage = document.getElementById("successMessage");
    const closeSuccess = document.getElementById("closeSuccess");

    orderBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); 
            const burgerMenuBtn = document.getElementById('burgerMenu');
            const mobileNavMenu = document.querySelector('nav');
            if(burgerMenuBtn) burgerMenuBtn.classList.remove('active');
            if(mobileNavMenu) mobileNavMenu.classList.remove('active');
            if(orderModal) orderModal.style.display = "block";
            document.body.style.overflow = "hidden";
            if(orderFormContainer) orderFormContainer.style.display = "block";
            if(successMessage) successMessage.style.display = "none";
        });
    });

    const hideOrderModal = () => {
        if(orderModal) orderModal.style.display = "none";
        const catOverlay = document.getElementById('catalogOverlay');
        if (!catOverlay || !catOverlay.classList.contains('active')) {
            document.body.style.overflow = "auto";
        }
    };

    if(closeOrderBtn) closeOrderBtn.onclick = hideOrderModal;
    if(closeSuccess) closeSuccess.onclick = hideOrderModal;

    if(calculationForm) {
        calculationForm.onsubmit = function(e) {
            e.preventDefault();
            orderFormContainer.style.display = "none";
            successMessage.style.display = "block";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) { 
            modal.style.display = "none"; 
            const catOverlay = document.getElementById('catalogOverlay');
            if (!catOverlay || !catOverlay.classList.contains('active')) {
                document.body.style.overflow = "auto";
            }
        }
        if (event.target == orderModal) { hideOrderModal(); }
    }

    // ВНИМАНИЕ: Логика зеленого блока заявок удалена (теперь она живет в marking-block.js)

    // 6. Каталог товаров (Оверлей)
    const categoryDescriptions = {
        "Алкогольная продукция": "Типография «РОСТ» предлагает печать самоклеящихся этикеток для алкогольной продукции. Мы эксперты в этом! Огромный опыт подбора материалов, винных бумаг и клеев для бутылок сложных форм.",
        "Косметика и парфюмерия": "Предлагаем печать этикеток для сферы красоты. Уникальные лаки и отделки создают произведения искусства и надежно защищают маркировку от агрессивных жидкостей.",
        "Пищевая продукция": "Безопасность — главное требование. Применяем краски с низким уровнем миграции и материалы, выдерживающие глубокую заморозку.",
        "Автохимия": "Этикетки для масел и химии требуют особой стойкости. Сверхпрочные пленочные решения с усиленным клеем.",
        "Бытовая химия": "Яркий дизайн и надежная фиксация на таре. Этикетки устойчивы к щелочам и ПАВ.",
        "Термоусадочная этикетка": "Обеспечивает идеальное прилегание на 360°, повторяя контуры даже самой нестандартной бутылки.",
        "Самоклеящиеся этикетки": "Самое востребованное решение. Огромный выбор поверхностных материалов.",
        "Цифровая этикетка": "Идеально для стартапов, пробных партий и малых тиражей. Печать с переменными данными без затрат на формы.",
        "Честный Знак": "Надежная печать кодов Data Matrix с гарантией 100% считываемости. Строгий автоматизированный контроль.",
        "Трафаретная печать": "Премиальная отделка, насыщенные цвета и ощутимый объем краски.",
        "Цифровой трафарет и тиснение": "Эксклюзивная отделка: объемный лак и фольга без затрат на металлические клише.",
        "БОПП": "Круговая полипропиленовая этикетка (БОПП) — идеальный выбор для массового производства напитков в ПЭТ-бутылках."
    };

    const catalogOverlay = document.getElementById('catalogOverlay');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayDesc = document.getElementById('overlayDesc');
    const overlayGrid = document.getElementById('overlayGrid');
    const productCards = document.querySelectorAll('.product-card');
    const overlayBackBtn = document.getElementById('overlayBackBtn');
    const overlayCloseBtn = document.getElementById('overlayCloseBtn');
    const overlayCloseBottomBtn = document.getElementById('overlayCloseBottomBtn');

    let catalogData = [];
    if(productCards.length > 0) {
        catalogData = Array.from(productCards).map(c => ({
            cat: c.getAttribute('data-category'), 
            type: c.getAttribute('data-type'), 
            img: c.querySelector('img') ? c.querySelector('img').src : '', 
            prefix: c.getAttribute('data-prefix'),
            imagesCount: parseInt(c.getAttribute('data-images-count')) || 12
        }));
    }
    
    let currentCategoryIndex = -1; 

    window.openCategory = function(categoryName, type, prefix, imagesCount = 12) {
        const burgerMenuBtn = document.getElementById('burgerMenu');
        const mobileNavMenu = document.querySelector('nav');
        if(burgerMenuBtn) burgerMenuBtn.classList.remove('active');
        if(mobileNavMenu) mobileNavMenu.classList.remove('active');
        
        currentCategoryIndex = catalogData.findIndex(c => c.cat === categoryName);

        if(overlayTitle) overlayTitle.textContent = categoryName;
        
        if(overlayDesc) {
            let descText = categoryDescriptions[categoryName] || "Профессиональная печать этикеток высшего качества.";
            
            // Связываем категории с их отдельными посадочными страницами
            const categoryLinks = {
                "Алкогольная продукция": "alcohol-labels.html"
                // В будущем сюда можно легко добавить другие страницы:
                // "Автохимия": "autochem-labels.html"
            };
            
            // Если для категории есть ссылка, рисуем кнопку "ПОДРОБНЕЕ"
            if (categoryLinks[categoryName]) {
                descText += `<div style="margin-top: 25px;"><a href="${categoryLinks[categoryName]}" class="btn btn-outline-hero" style="padding: 12px 40px; font-size: 16px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px;">Подробнее</a></div>`;
            }
            
            overlayDesc.innerHTML = descText;
        }
        
        if(overlayGrid) overlayGrid.innerHTML = '';

        for (let i = 1; i <= imagesCount; i++) {
            const imgSrc = `img/${prefix}_${i}.webp`;
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${categoryName} пример ${i}`;
            img.loading = 'lazy'; 
            
            img.onerror = function() { item.remove(); };
            
            item.onclick = function() {
                const validImages = Array.from(overlayGrid.querySelectorAll('img')).map(imgEl => imgEl.getAttribute('src'));
                let currentIndex = validImages.indexOf(imgSrc);
                if (currentIndex === -1) currentIndex = 0;
                openLightbox(currentIndex, validImages);
            };

            const caption = document.createElement('div');
            caption.className = 'gallery-caption';
            caption.textContent = `Пример этикетки №${i}`;

            item.appendChild(img);
            item.appendChild(caption);
            if(overlayGrid) overlayGrid.appendChild(item);
        }

        renderCarousel('industryTrack', catalogData.filter(d => d.type === 'industry' && d.cat !== categoryName));
        renderCarousel('productTrack', catalogData.filter(d => d.type === 'product' && d.cat !== categoryName));

        if(catalogOverlay) {
            catalogOverlay.classList.add('active');
            catalogOverlay.scrollTop = 0;
        }
        document.body.style.overflow = 'hidden';
    }

    function renderCarousel(trackId, items) {
        const track = document.getElementById(trackId);
        if(!track) return;
        track.innerHTML = '';
        track.dataset.index = 0;
        track.style.transform = `translateX(0)`;
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.innerHTML = `<img src="${item.img}" onerror="this.closest('.carousel-card').remove();"><div class="carousel-card-info"><h4>${item.cat}</h4><span>Узнать больше →</span></div>`;
            card.onclick = () => window.openCategory(item.cat, item.type, item.prefix, item.imagesCount);
            track.appendChild(card);
        });
    }

    window.moveSlide = function(type, direction) {
        const track = document.getElementById(type + 'Track');
        if(!track) return;
        const container = track.parentElement;
        if (track.children.length === 0) return;

        let idx = parseInt(track.dataset.index || 0);
        const cardWidth = track.children[0].offsetWidth + 20; 
        const visibleCards = Math.floor(container.offsetWidth / cardWidth); 
        let maxIdx = track.children.length - visibleCards;
        if(maxIdx < 0) maxIdx = 0;

        let newIdx = idx + direction;
        if (newIdx < 0) newIdx = 0;
        if (newIdx > maxIdx) newIdx = maxIdx;

        track.dataset.index = newIdx;
        track.style.transform = `translateX(-${newIdx * cardWidth}px)`;
    }

    function closeCategory() {
        if(catalogOverlay) catalogOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }

    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const type = this.getAttribute('data-type');
            const prefix = this.getAttribute('data-prefix'); 
            const imagesCount = parseInt(this.getAttribute('data-images-count')) || 12;
            if (category && prefix) { window.openCategory(category, type, prefix, imagesCount); }
        });
    });

    if(overlayBackBtn) overlayBackBtn.onclick = closeCategory;
    if(overlayCloseBtn) overlayCloseBtn.onclick = closeCategory;
    if(overlayCloseBottomBtn) overlayCloseBottomBtn.onclick = closeCategory;

    // 7. Обработка Свайпов
    function handleSwipe(element, onSwipeLeft, onSwipeRight, ignoreClass) {
        if(!element) return;
        let touchstartX = 0;
        let touchendX = 0;
        let touchstartY = 0;
        let touchendY = 0;

        element.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
            touchstartY = e.changedTouches[0].screenY;
        }, {passive: true});

        element.addEventListener('touchend', e => {
            if (ignoreClass && e.target.closest('.' + ignoreClass)) return; 
            
            touchendX = e.changedTouches[0].screenX;
            touchendY = e.changedTouches[0].screenY;
            
            const diffX = touchendX - touchstartX;
            const diffY = touchendY - touchstartY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX < 0) onSwipeLeft(); 
                if (diffX > 0) onSwipeRight(); 
            }
        }, {passive: true});
    }

    handleSwipe(document.getElementById('imageModal'), nextLightboxImg, prevLightboxImg);

    function nextCategory() {
        if (currentCategoryIndex < 0) return;
        let nextIdx = (currentCategoryIndex + 1) % catalogData.length;
        let nextCat = catalogData[nextIdx];
        window.openCategory(nextCat.cat, nextCat.type, nextCat.prefix, nextCat.imagesCount);
    }

    function prevCategory() {
        if (currentCategoryIndex < 0) return;
        let prevIdx = (currentCategoryIndex - 1 + catalogData.length) % catalogData.length;
        let prevCat = catalogData[prevIdx];
        window.openCategory(prevCat.cat, prevCat.type, prevCat.prefix, prevCat.imagesCount);
    }

    // --- НОВАЯ ЛОГИКА: Автоматическое открытие каталога по URL ---
    const urlParamsMain = new URLSearchParams(window.location.search);
    if (urlParamsMain.get('catalog') === 'alcohol') {
        // Задержка в полсекунды нужна для того, чтобы DOM полностью загрузился и отработали стартовые анимации
        setTimeout(() => {
            if (typeof window.openCategory === 'function') {
                window.openCategory('Алкогольная продукция', 'industry', 'alcohol', 12);
            }
        }, 500);
    }
    // --- КОНЕЦ НОВОЙ ЛОГИКИ ---

    if(document.querySelector('.overlay-content')) {
        handleSwipe(document.querySelector('.overlay-content'), nextCategory, prevCategory, 'carousel-track-container');
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            if (modal && modal.style.display === "flex") { 
                modal.style.display = "none"; 
                const catOverlay = document.getElementById('catalogOverlay');
                if (!catOverlay || !catOverlay.classList.contains('active')) {
                    document.body.style.overflow = "auto";
                }
            } 
            else if (orderModal && orderModal.style.display === "block") { hideOrderModal(); }
            else if (catalogOverlay && catalogOverlay.classList.contains('active')) { closeCategory(); }
        }
        if (event.key === "ArrowRight") {
            if (modal && modal.style.display === "flex") nextLightboxImg();
        }
        if (event.key === "ArrowLeft") {
            if (modal && modal.style.display === "flex") prevLightboxImg();
        }
    });

    // 8. FAQ и ТАБЫ (Технологии)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(el => el.classList.remove('active'));
                if (!isActive) { item.classList.add('active'); }
            });
        }
    });

    window.openTechTab = function(evt, tabName) {
        let tabcontent = document.getElementById("technologies").getElementsByClassName("tab-content");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        let tablinks = document.getElementById("technologies").getElementsByClassName("tab-btn");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        
        let accordionBtns = document.getElementById("technologies").getElementsByClassName("mobile-accordion-btn");
        for(let i=0; i<accordionBtns.length; i++) { accordionBtns[i].classList.remove("active"); }

        const selectedTab = document.getElementById(tabName);
        if(selectedTab) {
            selectedTab.style.display = "block";
            setTimeout(() => { selectedTab.classList.add("active"); }, 10);
        }
        evt.currentTarget.className += " active";
    }

    window.toggleAccordion = function(tabName, el) {
        let content = document.getElementById(tabName);
        if(!content) return;
        let isActive = content.classList.contains("active");
        
        let tabcontent = document.getElementById("technologies").getElementsByClassName("tab-content");
        let accordionBtns = document.getElementById("technologies").getElementsByClassName("mobile-accordion-btn");
        
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
            if(accordionBtns[i]) accordionBtns[i].classList.remove("active");
        }

        if (!isActive) {
            content.style.display = "block";
            setTimeout(() => { content.classList.add("active"); }, 10);
            el.classList.add("active");
        }
    }

    window.openProductTab = function(evt, tabName) {
        let tabcontent = document.getElementsByClassName("product-tab-content");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        let tablinks = document.getElementsByClassName("products-tab-btn");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        const selectedTab = document.getElementById(tabName);
        if(selectedTab) {
            selectedTab.style.display = "block";
            setTimeout(() => { selectedTab.classList.add("active"); }, 10);
        }
        evt.currentTarget.className += " active";
    }

    // 9. Слайдер на главной (Hero)
    function initCustomHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const currentIndicator = document.querySelector('.slider-pagination .current');
        const totalIndicator = document.querySelector('.slider-pagination .total');
        
        let currentIndex = 0;
        let autoplayInterval;

        if(totalIndicator) totalIndicator.textContent = String(slides.length).padStart(2, '0');

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            currentIndex = index;
            if (currentIndex < 0) currentIndex = slides.length - 1;
            if (currentIndex >= slides.length) currentIndex = 0;
            
            slides[currentIndex].classList.add('active');
            if(currentIndicator) currentIndicator.textContent = String(currentIndex + 1).padStart(2, '0');
        }

        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
            prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
        }

        function startAutoplay() { autoplayInterval = setInterval(nextSlide, 4000); }
        function resetAutoplay() { clearInterval(autoplayInterval); startAutoplay(); }

        startAutoplay();
    }

    initCustomHeroSlider();
    
    // 10. Анимация логотипов (Доверие)
    const options = {
        root: null, 
        rootMargin: '0px -50% 0px -50%', 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('center-logo');
            } else {
                entry.target.classList.remove('center-logo');
            }
        });
    }, options);

    const logos = document.querySelectorAll('.logo-slide');
    if(logos.length > 0) {
        logos.forEach(logo => observer.observe(logo));
    }
});