window.addEventListener('load', async () => {
    await Clerk.load();
    const userBtnMobile = document.getElementById('clerk-user-button-mobile');
    const userBtn = document.getElementById('clerk-user-button');
    Clerk.mountUserButton(userBtn);
    Clerk.mountUserButton(userBtnMobile);

    window.userId = Clerk.user.id;
    const userInfoDiv = document.getElementById("userInfo");
    const userIdSpan = document.getElementById("userId");
    userIdSpan.textContent = window.userId; 
    userInfoDiv.classList.remove("hidden");
});