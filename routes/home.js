// routes/homepage.js
import { Router } from "express";
import { query } from "../database/connect_db.js";

const router = Router();

// Optional auth: detects logged-in users
router.get("/", async (req, res) => {
    const events_list = await query(`SELECT * FROM Events`);
    // Render homepage for guests
    res.render("home", {
      title: "ACE Event Management",
      clerkKey: process.env.CLERK_PUBLISHABLE_KEY,
      logoPath: "/acelogo.png",
      navItems: [
        { text: "Home", href: "javascript:void(0)",id:"Home", func:"exhibit('home')" },
        { text: "Events", href: "javascript:void(0)",id: "Events", func:"exhibit('events')" },
        { text: "About", href: "javascript:void(0)",id:"About", func:"exhibit('about')" },
        { text: "Contact", href: "javascript:void(0)",id:"Contact", func:"exhibit('contact')" },
        { text: "Search", icon: `<svg class="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 2a8 8 0 105.293 14.293l4.414 4.414a1 1 0 001.414-1.414l-4.414-4.414A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>`, href: "javascript:void(0)",id:"Search", func:"toggle_search_bar()" }
      ],
      heroSlides: [
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1600",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600",
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600",
      ],
      heroTitle: "Unforgettable Events by ACE",
      heroSubtitle: "Workshops, Concerts, Festivals & more – all in one place.",
      heroBtn1: "Explore Events",
      heroBtn2: "Learn More",
      events: events_list.rows,
      aboutText:
        "We are ACE (Association of CSE), dedicated to bringing together students, professionals, and communities through engaging events, workshops, and cultural programs.",
    });
});

export default router;
