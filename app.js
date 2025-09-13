window.addEventListener('load', async () => {
  // Wait for Clerk to be ready
  await Clerk.load();

  if (Clerk.user) {
    // User is signed in
    document.getElementById('username').textContent = Clerk.user.firstName || Clerk.user.username;
    document.getElementById('content').style.display = 'block';

    // Mount user button (profile menu / sign out)
    Clerk.mountUserButton(document.getElementById('user-button'));
  } else {
    // User is signed out, show Sign In form
    Clerk.mountSignIn(document.getElementById('sign-in'), {
      afterSignInUrl: window.location.href
    });
  }
});
