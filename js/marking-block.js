class MarkingBlock extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <section class="section" style="padding-top: 20px;">
            <div class="marking-block" data-aos="fade-up">
                <div class="marking-text">
                    <div class="label-badge">Полезно</div>
                    <h2>Боитесь, что код не считается?</h2>
                    <p>Скачайте чек-лист "5 ошибок при печати Data Matrix, из-за которых товар не примут в магазине" и защитите себя от возвратов.</p>
                    
                    <form class="lead-form custom-lead-form">
                        <input type="email" class="lead-input" placeholder="Ваш E-mail" required>
                        <button type="submit" class="lead-btn">Получить PDF бесплатно</button>
                    </form>
                    <div class="lead-success custom-lead-success">✓ Гайд отправлен на вашу почту!</div>
                </div>
                <div class="marking-image">
                    <img src="img/datamatrix.png" alt="Иллюстрация" class="zoomable" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="img-placeholder" style="display:none; position: static; font-size: 60px; color: var(--press-green); opacity: 0.6;">🔳</div>
                </div>
            </div>
        </section>
        `;

        // Изолированная логика отправки конкретно для этой формы
        const form = this.querySelector('.custom-lead-form');
        const success = this.querySelector('.custom-lead-success');

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                form.style.display = 'none';
                if (success) success.style.display = 'block';
            });
        }
    }
}
customElements.define('marking-block', MarkingBlock);