class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer data-aos="fade-up">
            <div class="footer-contacts">
                <div class="footer-contact-group">
                    <h3 class="footer-logo">Типография <span>РОСТ</span></h3>
                    <div class="footer-contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        603032, г. Нижний Новгород, ул. Памирская, 11, лит. В
                    </div>
                    <div class="footer-contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        Наш офис работает с 08:30 до 17:00 по будням
                    </div>
                    <div class="footer-contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Производство: 24/7
                    </div>
                </div>
                
                <div class="footer-contact-group">
                    <h3>Телефоны</h3>
                    <div class="footer-contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <div>
                            <a href="tel:+78312205031">+7 (831) 220-50-31</a><br>
                            <a href="tel:+78312205033">+7 (831) 220-50-33</a><br>
                            <a href="tel:+78312205035">+7 (831) 220-50-35</a>
                        </div>
                    </div>
                    <div class="footer-contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        <a href="tel:88007006099">8 (800) 700-60-99</a> <span style="font-size: 14px; margin-left: 10px; opacity: 0.8;">(бесплатно из РФ)</span>
                    </div>
                </div>

                <div class="footer-contact-group">
                    <h3>Электронная почта</h3>
                    <div class="footer-contact-item">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        <a href="mailto:rost@rost.nnov.ru">rost@rost.nnov.ru</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 ООО «Типография РОСТ». Все права защищены. ИНН 5257109496</p>
            </div>
        </footer>

        <!-- Стандартное модальное окно заявки -->
        <div id="orderModal" class="modal">
            <div class="order-modal-content">
                <span class="close-btn" id="closeOrderModal">&times;</span>
                <div id="orderFormContainer">
                    <h2 style="margin-bottom: 25px; font-weight: 800; font-size: 32px; text-align: center;">Заявка на расчет</h2>
                    <form id="calculationForm">
                        <div class="form-group"><label><span>*</span>Контактное лицо:</label><input type="text" placeholder="Иван Иванов" required></div>
                        <div class="form-group"><label><span>*</span>Телефон:</label><input type="tel" placeholder="+7 (___) ___-__-__" required></div>
                        <div class="form-group"><label>E-mail:</label><input type="email" placeholder="example@mail.ru"></div>
                        
                        <div class="captcha-placeholder">
                            <div class="captcha-left"><div class="captcha-box" onclick="this.style.background='#2d8a4e'; this.innerHTML='✓'; this.style.color='white'; this.style.textAlign='center'; this.style.lineHeight='24px';"></div><div class="captcha-text">Я не робот</div></div>
                            <div class="captcha-right" style="text-align: center;"><img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" width="30" alt="reCAPTCHA" loading="lazy"><div style="font-size: 10px; color: #555; font-weight: bold; line-height: 1;">reCAPTCHA</div></div>
                        </div>
                        <button type="submit" class="btn submit-btn">Отправить заявку</button>
                    </form>
                </div>
                <div id="successMessage" class="success-msg">
                    <div style="font-size: 60px; margin-bottom: 15px;">✅</div>
                    <h2>Спасибо за заявку!</h2>
                    <p style="color: var(--text-muted); margin-top: 10px;">Наш менеджер свяжется с вами в ближайшее время.</p>
                    <button class="btn" id="closeSuccess" style="margin-top: 25px; padding: 12px 35px;">Закрыть</button>
                </div>
            </div>
        </div>
        `;
    }
}
customElements.define('site-footer', SiteFooter);