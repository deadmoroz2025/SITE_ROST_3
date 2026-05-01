document.addEventListener("DOMContentLoaded", function() {
    // Данные для интерактивной орбиты процессов
    const processData = [
        { id: "01", title: "Дизайн макета", desc: "Разработка и адаптация креатива под печать.", img: "img/3d-design.webp", icon: '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>' },
        { id: "02", title: "Препресс", desc: "Профессиональная предпечатная подготовка.", img: "img/3d-prepress.webp", icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>' },
        { id: "03", title: "Клише", desc: "Собственное изготовление печатных форм.", img: "img/3d-cliche.webp", icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>' },
        { id: "04", title: "Печать", desc: "Флексо и цифровая печать любой сложности.", img: "img/3d-print.webp", icon: '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>' },
        { id: "05", title: "Отделка", desc: "Тиснение, конгрев, трафаретные лаки.", img: "img/3d-finish.webp", icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>' },
        { id: "06", title: "Защита", desc: "Внедрение систем защиты от подделок.", img: "img/3d-shield.webp", icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>' },
        { id: "07", title: "ОТК", desc: "100% машинный и ручной контроль качества.", img: "img/3d-qc.webp", icon: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><polyline points="8 11 10 13 14 9"></polyline>' },
        { id: "08", title: "Упаковка", desc: "Точная перемотка и надежная упаковка рулонов.", img: "img/3d-box.webp", icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>' },
        { id: "09", title: "Хранение", desc: "Складское хранение готовой продукции.", img: "img/3d-warehouse.webp", icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>' },
        { id: "10", title: "Логистика", desc: "Быстрая доставка на склад заказчика.", img: "img/3d-truck.webp", icon: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>' }
    ];

    function initProcessCarousel() {
        const container = document.getElementById('ellipseContainer');
        const mobileContainer = document.getElementById('mobileGridContainer');
        if(!container || !mobileContainer) return;

        const titleEl = document.getElementById('activeStepTitle');
        const descEl = document.getElementById('activeStepDesc');
        const centerFallback = document.getElementById('centerFallback');
        const centerImage = document.getElementById('centerImage');
        const fallbackText = document.getElementById('fallbackText');
        const fallbackIcon = document.getElementById('fallbackIcon');

        const totalSteps = processData.length;
        const stepAngle = (2 * Math.PI) / totalSteps;
        
        let nodes = [];
        let activeStepIndex = 0; 
        let currentAngleOffset = 0;
        let targetAngleOffset = 0;
        let isAnimating = false;

        processData.forEach((step, index) => {
            // Заполнение мобильной сетки
            const mobileCard = document.createElement('div');
            mobileCard.className = 'mobile-process-card';
            mobileCard.innerHTML = `<div class="mobile-process-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${step.icon}</svg></div>
                                    <div>
                                        <div class="mobile-process-title"><span>${step.id}</span> ${step.title}</div>
                                        <div class="mobile-process-desc">${step.desc}</div>
                                    </div>`;
            mobileContainer.appendChild(mobileCard);

            // Создание узлов для десктопа
            const node = document.createElement('div');
            node.className = 'process-node';
            node.innerHTML = `<div class="process-node-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${step.icon}</svg></div>
                              <div class="process-node-title">${step.title}</div>`;
            
            node.addEventListener('click', () => {
                if(activeStepIndex === index) return;
                let diff = index - activeStepIndex;
                if (diff > totalSteps / 2) diff -= totalSteps;
                if (diff < -totalSteps / 2) diff += totalSteps;
                activeStepIndex = index;
                targetAngleOffset += diff * stepAngle; 
                updateContent();
                startAnimation();
            });

            container.appendChild(node);
            nodes.push({ element: node, index: index });
        });

        function animate() {
            currentAngleOffset += (targetAngleOffset - currentAngleOffset) * 0.04;

            nodes.forEach(nodeObj => {
                const baseAngle = Math.PI / 2 - (nodeObj.index * stepAngle);
                const angle = baseAngle + currentAngleOffset;
                
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);
                
                nodeObj.element.style.left = `${x}%`;
                nodeObj.element.style.top = `${y}%`;
            });

            if (Math.abs(targetAngleOffset - currentAngleOffset) > 0.001) {
                requestAnimationFrame(animate);
            } else {
                currentAngleOffset = targetAngleOffset;
                isAnimating = false;
            }
        }

        function startAnimation() {
            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(animate);
            }
        }

        function updateContent() {
            nodes.forEach(nodeObj => {
                if (nodeObj.index === activeStepIndex) { nodeObj.element.classList.add('active'); } 
                else { nodeObj.element.classList.remove('active'); }
            });

            const step = processData[activeStepIndex];
            
            titleEl.style.opacity = 0; descEl.style.opacity = 0;
            const artContainer = document.querySelector('.process-center-art');
            artContainer.style.opacity = 0.5; artContainer.style.transform = "translate(-50%, -50%) scale(0.95)";

            setTimeout(() => {
                titleEl.innerHTML = `<span>${step.id}</span> ${step.title}`;
                descEl.innerText = step.desc;
                titleEl.style.opacity = 1; descEl.style.opacity = 1;

                const img = new Image();
                img.src = step.img;
                img.onload = () => {
                    centerImage.src = step.img;
                    centerImage.style.display = 'block';
                    centerFallback.style.display = 'none';
                };
                img.onerror = () => {
                    centerImage.style.display = 'none';
                    centerFallback.style.display = 'flex';
                    fallbackText.innerText = step.title;
                    fallbackIcon.innerHTML = step.icon;
                };

                artContainer.style.opacity = 1; artContainer.style.transform = "translate(-50%, -50%) scale(1)";
            }, 200);
        }

        document.getElementById('nextStepBtn').addEventListener('click', () => {
            activeStepIndex = (activeStepIndex + 1) % totalSteps;
            targetAngleOffset += stepAngle; 
            updateContent(); startAnimation();
        });

        document.getElementById('prevStepBtn').addEventListener('click', () => {
            activeStepIndex = (activeStepIndex - 1 + totalSteps) % totalSteps;
            targetAngleOffset -= stepAngle; 
            updateContent(); startAnimation();
        });

        titleEl.style.transition = 'opacity 0.2s ease';
        descEl.style.transition = 'opacity 0.2s ease';

        updateContent();
        currentAngleOffset = targetAngleOffset;
        animate(); 

        // Автоматическая прокрутка орбиты
        let autoPlayInterval;
        const autoPlayDelay = 4000;

        function startAutoPlay() {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                document.getElementById('nextStepBtn').click();
            }, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        const wrapper = document.querySelector('.process-interactive-wrapper');
        if(wrapper) {
            wrapper.addEventListener('mouseenter', stopAutoPlay);
            wrapper.addEventListener('mouseleave', startAutoPlay);
        }

        startAutoPlay();
    }

    // Запуск карусели
    initProcessCarousel();

    // Обработка формы "Обсудить проект"
    const projectForm = document.getElementById("projectForm");
    const projectSuccess = document.getElementById("projectSuccess");
    if (projectForm) {
        projectForm.addEventListener("submit", function(e) {
            e.preventDefault();
            projectForm.style.display = "none";
            projectSuccess.style.display = "block";
            
            // В реальном проекте: fetch('mail.php', { method: 'POST', body: new FormData(this) })
        });
    }
});