const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
function showSlide(i){slides.forEach((s,x)=>{s.classList.toggle('active', x===i);});}
setInterval(()=>{currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide);},5000);

function requireAuth(action){
if (Clerk.user) { action(); }
else { Clerk.openSignIn({ afterSignInUrl: window.location.href }); }
}

function exhibit(section){
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    const sidenav = document.getElementById('mobile-sidenav');
    sidenav.style.left = '-100%';
}


const hamburgerBtn = document.querySelector('button.md\\:hidden'); // your ☰ button
const sidenav = document.getElementById('mobile-sidenav');
const closeBtn = document.getElementById('close-sidenav');

hamburgerBtn.addEventListener('click', () => {
sidenav.style.left = '0'; // slide in
});

closeBtn.addEventListener('click', () => {
sidenav.style.left = '-100%'; // slide out
});

// Optional: close when clicking outside
window.addEventListener('click', (e) => {
if (!sidenav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
    sidenav.style.left = '-100%';
}
});
