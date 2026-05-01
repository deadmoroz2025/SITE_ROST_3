document.addEventListener("DOMContentLoaded", function() {
    
    const vacancyModal = document.getElementById("vacancyModal");
    const heroApplyBtn = document.getElementById("heroApplyBtn");
    const applyBtns = document.querySelectorAll(".apply-btn");
    
    const closeVacancyModalBtn = document.getElementById("closeVacancyModal");
    const closeSuccessBtn = document.getElementById("closeVacancySuccess");
    
    const vacancyForm = document.getElementById("vacancyForm");
    const vacancyFormContainer = document.getElementById("vacancyFormContainer");
    const successMessage = document.getElementById("vacancySuccessMessage");
    const vacancyInput = document.getElementById("vacancyInput");

    // Функция открытия модалки отклика
    const setupApplyModal = function(vacancyName) {
        vacancyInput.value = vacancyName;
        openModal();
    };

    // Привязка клика к карточкам
    applyBtns.forEach(btn => {
        btn.onclick = function() {
            setupApplyModal(this.getAttribute('data-vacancy') || '');
        }
    });

    // Привязка клика к главному баннеру
    if (heroApplyBtn) {
        heroApplyBtn.onclick = function() {
            setupApplyModal('Отклик с главного экрана');
        }
    }

    function openModal() {
        vacancyModal.style.display = "block";
        document.body.style.overflow = "hidden";
        vacancyFormContainer.style.display = "block";
        successMessage.style.display = "none";
        vacancyForm.reset();
        
        // Закрываем бургер-меню, если открыто
        const burgerMenuBtn = document.getElementById('burgerMenu');
        const mobileNavMenu = document.querySelector('nav');
        if (burgerMenuBtn) burgerMenuBtn.classList.remove('active');
        if (mobileNavMenu) mobileNavMenu.classList.remove('active');
    }

    const hideModal = () => {
        vacancyModal.style.display = "none";
        // Проверяем, не открыта ли вторая модалка, чтобы корректно вернуть скролл
        const orderModal = document.getElementById('orderModal');
        if (!orderModal || orderModal.style.display !== 'block') {
            document.body.style.overflow = "auto";
        }
    };

    if (closeVacancyModalBtn) closeVacancyModalBtn.onclick = hideModal;
    if (closeSuccessBtn) closeSuccessBtn.onclick = hideModal;

    window.addEventListener('click', function(event) {
        if (event.target == vacancyModal) hideModal();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && vacancyModal.style.display === "block") {
            hideModal();
        }
    });

    // Имитация отправки формы резюме
    if (vacancyForm) {
        vacancyForm.onsubmit = function(e) {
            e.preventDefault();
            vacancyFormContainer.style.display = "none";
            successMessage.style.display = "block";
            
            // Здесь в будущем будет реальная отправка данных в HR отдел (Fetch/AJAX)
            setTimeout(() => {
                hideModal();
            }, 3000);
        }
    }
});