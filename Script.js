/* =========================================================
   Utilidades de interfaz (año dinámico, reveal, scroll-spy)
   --------------------------------------------------------- */

// 1) Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2) Animación de aparición (IntersectionObserver)
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// 3) Scroll-spy ligero: resalta el .nav-link según la sección visible
const links = document.querySelectorAll('.nav-link');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = '#' + entry.target.id;
        const link = document.querySelector(`.nav-link[href="${id}"]`);
        if (entry.isIntersecting) {
            links.forEach(l => l.removeAttribute('aria-current'));
            if (link) link.setAttribute('aria-current', 'page');
        }
    });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0.05 });
sections.forEach(sec => spy.observe(sec));

// 4) Formulario de contacto (demo): simula envío en GitHub Pages
function sendMessage(e) {
    e.preventDefault();
    const form = e.currentTarget;
    form.querySelector('button').disabled = true;
    const status = document.getElementById('form-status');
    status.textContent = 'Enviando…';
    setTimeout(() => {
        status.textContent = '¡Gracias! Tu mensaje fue registrado (demo).';
        form.reset();
        form.querySelector('button').disabled = false;
    }, 900);
}
window.sendMessage = sendMessage; // expone la función al atributo onsubmit

// 5) Accesibilidad: ocultar “focus ring” cuando se navega con mouse
document.addEventListener('mousedown', () => document.body.classList.add('no-outline'));
document.addEventListener('keydown', (e) => { if (e.key === 'Tab') document.body.classList.remove('no-outline'); });

// 6) Pequeño detalle UX: al cambiar de hash, quita foco del link activo
window.addEventListener('hashchange', () => {
    const active = document.querySelector('.nav-link[aria-current="page"]');
    if (active) active.blur();
});
