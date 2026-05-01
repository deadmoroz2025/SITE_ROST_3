class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="top-bar">
            <div>Типография полного цикла в Нижнем Новгороде</div>
            <div>
                <a href="tel:88007006099">8 (800) 700-60-99</a>
                <a href="mailto:rost@rost.nnov.ru">rost@rost.nnov.ru</a>
            </div>
        </div>

        <header data-aos="fade-down" data-aos-duration="800">
            <a href="index.html" class="logo-container">
                <img src="img/logo.webp" alt="Логотип ПрессРост" class="logo-image" onerror="this.style.display='none'">
            </a>
            
            <div style="display: flex; align-items: center;">
                <a href="tel:88007006099" class="mobile-phone">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
                <div class="burger-menu" id="burgerMenu">
                    <span></span><span></span><span></span>
                </div>
            </div>

            <nav>
                <div class="dropdown" id="aboutDropdown">
                    <a href="firm.html" class="dropbtn" id="aboutBtn">О нас <span class="arrow">▼</span></a>
                    <div class="dropdown-content" id="aboutDropdownContent">
                        <a href="firm.html">О компании</a>
                        <a href="news.html">Новости</a>
                        <a href="vacancies.html">Вакансии</a>
                        <a href="contacts.html">Контакты</a>
                        <a href="index.html#faq">FAQ</a>
                    </div>
                </div>
                
                <a href="index.html#products">Продукция</a>
                <a href="index.html#technologies">Технологии</a>
                <a href="chestny-znak.html">Маркировка</a>
                
                <div class="dropdown" id="infoDropdown">
                    <a href="infocentr.html" class="dropbtn" id="infoBtn">Инфоцентр <span class="arrow">▼</span></a>
                    <div class="dropdown-content" id="infoDropdownContent">
                        <a href="infocentr.html#sout">СОУТ</a>
                        <a href="infocentr.html#polezno">Полезное</a>
                    </div>
                </div>
                
                <button class="btn btn-order trigger-modal" id="headerOrderBtn">Заказать расчет</button>
            </nav>
        </header>
        `;

        this.initMobileMenu();
    }

    initMobileMenu() {
        const aboutBtn = this.querySelector('#aboutBtn');
        const aboutDropdownContent = this.querySelector('#aboutDropdownContent');
        const aboutDropdown = this.querySelector('#aboutDropdown');

        const infoBtn = this.querySelector('#infoBtn');
        const infoDropdownContent = this.querySelector('#infoDropdownContent');
        const infoDropdown = this.querySelector('#infoDropdown');

        // Открытие меню "О нас"
        if(aboutBtn) {
            aboutBtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 1200) {
                    e.preventDefault(); 
                    aboutDropdownContent.classList.toggle('show');
                    if(aboutDropdown) aboutDropdown.classList.toggle('active');
                }
            });
        }

        // Открытие меню "Инфоцентр" (Защита от серого экрана на мобильных!)
        if(infoBtn) {
            infoBtn.addEventListener('click', function(e) {
                if (window.innerWidth <= 1200) {
                    e.preventDefault(); 
                    infoDropdownContent.classList.toggle('show');
                    if(infoDropdown) infoDropdown.classList.toggle('active');
                }
            });
        }

        // Логика бургер-кнопки
        const burgerMenuBtn = this.querySelector('#burgerMenu');
        const mobileNavMenu = this.querySelector('nav');
        const mobileNavLinks = this.querySelectorAll('nav > a:not(.dropbtn), nav button, .dropdown-content a');

        if(burgerMenuBtn) {
            burgerMenuBtn.addEventListener('click', () => {
                burgerMenuBtn.classList.toggle('active');
                mobileNavMenu.classList.toggle('active');
                document.body.style.overflow = mobileNavMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
        }

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(burgerMenuBtn) burgerMenuBtn.classList.remove('active');
                if(mobileNavMenu) mobileNavMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                if (window.innerWidth <= 1200) {
                    if (aboutDropdownContent) aboutDropdownContent.classList.remove('show');
                    if (aboutDropdown) aboutDropdown.classList.remove('active');
                    if (infoDropdownContent) infoDropdownContent.classList.remove('show');
                    if (infoDropdown) infoDropdown.classList.remove('active');
                }
            });
        });
    }
}
customElements.define('site-header', SiteHeader);