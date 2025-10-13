window.addEventListener('load', async () => {
    await Clerk.load();
    const userBtnMobile = document.getElementById('clerk-user-button-mobile');
    const userBtn = document.getElementById('clerk-user-button');
    Clerk.mountUserButton(userBtn);
    Clerk.mountUserButton(userBtnMobile);
});