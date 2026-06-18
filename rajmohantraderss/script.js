/* ============================================================
   RAJMOHAN TRADERSS — script.js
   ============================================================ */

/* ── Custom Cursor ── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
});

(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
})();

/* ── Sticky Header ── */
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ── See More / See Less Toggle ── */
const seeMoreBtn  = document.getElementById('seeMoreBtn');
const productGrid = document.getElementById('productGrid');
const btnText     = document.getElementById('btnText');

seeMoreBtn.addEventListener('click', () => {
    const isExpanded = productGrid.classList.toggle('show-all');
    seeMoreBtn.classList.toggle('active');

    if (isExpanded) {
        btnText.textContent = 'See Less Products';
    } else {
        btnText.textContent = 'See More Products';
        document.getElementById('bestsellers').scrollIntoView({ behavior: 'smooth' });
    }
});

/* ── WhatsApp Enquiry Form ── */
// FIX: using the ownerWhatsAppNumber variable consistently (was hardcoded with wrong number before)
document.getElementById('whatsappForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const ownerWhatsAppNumber = '919894463861'; // +91 98944 63861

    const name    = document.getElementById('name').value.trim();
    const gender  = document.querySelector('input[name="gender"]:checked').value;
    const phone   = document.getElementById('phone').value.trim();
    const email   = document.getElementById('email').value.trim();
    const city    = document.getElementById('city').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !phone || !city || !message) {
        alert('Please fill in all required fields before submitting.');
        return;
    }

    const textMessage =
        `*NEW WEBSITE ENQUIRY — RAJMOHAN TRADERSS*%0A` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Gender:* ${encodeURIComponent(gender)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Email:* ${encodeURIComponent(email)}%0A` +
        `*City:* ${encodeURIComponent(city)}%0A` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━%0A` +
        `*Requirement:*%0A${encodeURIComponent(message)}`;

    window.open(
        `https://api.whatsapp.com/send?phone=${ownerWhatsAppNumber}&text=${textMessage}`,
        '_blank'
    );
});
