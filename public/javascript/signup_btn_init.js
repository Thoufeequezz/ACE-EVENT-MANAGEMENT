const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
function showSlide(i){slides.forEach((s,x)=>{s.classList.toggle('active', x===i);});}
setInterval(()=>{currentSlide=(currentSlide+1)%slides.length;showSlide(currentSlide);},5000);

window.addEventListener('load', async () => {
    await Clerk.load();
    if (!Clerk.user) {
        document.getElementById('login-fallback').onclick = () =>
            Clerk.openSignIn({ afterSignInUrl: "/" });
        document.getElementById('signup-fallback').onclick = () =>
            Clerk.openSignUp({ afterSignUpUrl: "/" });
        document.getElementById('login-fallback-mobile').onclick = () =>
            Clerk.openSignIn({ afterSignInUrl: "/" });
        document.getElementById('signup-fallback-mobile').onclick = () =>
            Clerk.openSignUp({ afterSignUpUrl: "/" });        

    } else {
        window.userId = Clerk.user.id;

        document.getElementById('clerk-user-button').classList.remove('hidden');
        document.getElementById('login-fallback').style.display = 'none';
        document.getElementById('signup-fallback').style.display = 'none';
        Clerk.mountUserButton(document.getElementById('clerk-user-button'));
        
        const userBtn = document.getElementById('clerk-user-button-mobile');
        userBtn.classList.remove('hidden');
        document.getElementById('login-fallback-mobile').style.display = 'none';
        document.getElementById('signup-fallback-mobile').style.display = 'none';
        Clerk.mountUserButton(userBtn);

        const userInfoDiv = document.getElementById("userInfo");
        const userIdSpan = document.getElementById("userId");
        userIdSpan.textContent = window.userId; 
        userInfoDiv.classList.remove("hidden");
    }
});
