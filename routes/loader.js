import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Loading...</title>
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
          display: flex;
          gap: 8px;
        }
        .loader div {
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border-radius: 50%;
          animation: pulse 0.6s infinite alternate;
        }
        .loader div:nth-child(2) { animation-delay: 0.2s; }
        .loader div:nth-child(3) { animation-delay: 0.4s; }

        @keyframes pulse {
          0% { transform: scale(0.6); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .loader-text {
          margin-top: 16px;
          color: #e5e7eb;
          font-size: 1rem;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div style="text-align:center;">
        <div class="loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="loader-text">Loading...</div>
      </div>

      <script type="text/javascript">
        window.addEventListener("load", async () => {
          await Clerk.load();
          if (Clerk.user) {
            window.location.href = "/admin";
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
