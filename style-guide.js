/* Local specimens only: no network requests, storage, or business submissions. */
document.addEventListener('DOMContentLoaded', () => {
    const i18n = window.SiteI18n;
    const dialog = document.getElementById('guide-dialog');
    const galleryImage = document.getElementById('guide-gallery-image');
    const counter = document.getElementById('guide-gallery-counter');
    const previous = dialog.querySelector('[data-gallery-prev]');
    const next = dialog.querySelector('[data-gallery-next]');
    const dots = Array.from(dialog.querySelectorAll('[data-slide]'));
    const images = ['assets/arch/004/pic/01.jpg', 'assets/arch/004/pic/02.jpg'];
    let current = 0;
    let opener = null;
    let resultKey = '';

    function renderGallery() {
        galleryImage.src = images[current];
        galleryImage.alt = i18n.t('guide.galleryAlt', { current: current + 1, total: images.length });
        counter.textContent = `${String(current + 1).padStart(2, '0')} / 02`;
        previous.disabled = current === 0;
        next.disabled = current === images.length - 1;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === current);
            if (index === current) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
    }

    function changeImage(index) {
        current = Math.max(0, Math.min(images.length - 1, index));
        renderGallery();
    }

    document.querySelectorAll('[data-open-gallery]').forEach((button) => {
        button.addEventListener('click', () => {
            opener = button;
            changeImage(0);
            dialog.showModal();
            document.body.classList.add('sg-modal-open');
            dialog.querySelector('[data-close-gallery]').focus();
        });
    });
    dialog.querySelector('[data-close-gallery]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
        document.body.classList.remove('sg-modal-open');
        opener?.focus({ preventScroll: true });
    });
    dialog.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            changeImage(current + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    previous.addEventListener('click', () => changeImage(current - 1));
    next.addEventListener('click', () => changeImage(current + 1));
    dots.forEach((dot) => dot.addEventListener('click', () => changeImage(Number(dot.dataset.slide))));

    document.querySelector('[data-scroll-story]').addEventListener('click', () => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const target = document.getElementById('story-about');
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    });

    const form = document.getElementById('guide-form');
    const name = document.getElementById('guide-name');
    const error = document.getElementById('name-error');
    const result = document.getElementById('guide-result');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const valid = name.value.trim().length > 0;
        name.setAttribute('aria-invalid', String(!valid));
        error.hidden = valid;
        resultKey = valid ? 'guide.formSuccess' : 'guide.formError';
        result.textContent = i18n.t(resultKey);
        if (!valid) name.focus();
    });
    name.addEventListener('input', () => {
        name.removeAttribute('aria-invalid');
        error.hidden = true;
        resultKey = '';
        result.textContent = '';
    });
    window.addEventListener('localechange', () => {
        renderGallery();
        if (resultKey) result.textContent = i18n.t(resultKey);
    });
    renderGallery();
});
