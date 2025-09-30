import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Redirecting...</title>
      <script
        async
        crossorigin="anonymous"
        data-clerk-publishable-key="${process.env.CLERK_PUBLISHABLE_KEY}"
        src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@5/dist/clerk.browser.js"
      ></script>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #111827;
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
        .loader {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 8px solid;
          border-color: #3b82f6 transparent #9333ea transparent;
          animation: spin 1.2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loader-text {
          margin-top: 20px;
          color: #e5e7eb;
          font-size: 1.2rem;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div style="text-align:center;">
        <div class="loader"></div>
        <div class="loader-text">Redirecting...</div>
      </div>
      <script type="text/javascript">
        window.addEventListener("load", async () => {
          await Clerk.load();
          if (Clerk.user) {
            window.location.href = "/admin"; // redirect logged-in user
          } else {
            window.location.href = "/home";
          }
        });
      </script>
    </body>
    </html>
  `);
});

export default router;
