document.addEventListener('DOMContentLoaded', () => {
    const btnForLoop = document.getElementById('btn-forloop');
    const btnForEach = document.getElementById('btn-foreach');

    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const contentBody = document.getElementById('content-body');
    const closeBtn = document.querySelector('.close-btn');

    const tplForLoop = document.getElementById('data-forloop');
    const tplForEach = document.getElementById('data-foreach');

    function openModal(templateId) {
        const template = templateId === 'forloop' ? tplForLoop : tplForEach;
        const clone = template.content.cloneNode(true);

        contentBody.innerHTML = '';
        contentBody.appendChild(clone);

        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    btnForLoop.addEventListener('click', () => openModal('forloop'));
    btnForEach.addEventListener('click', () => openModal('foreach'));

    closeBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
