// routes/admin.js
import { Router } from "express";
import { query } from "../database/connect_db.js";

const router = Router();

router.get("/", async (req, res) => {
  // TODO: Add real auth check 
  const events_list = await query(`SELECT * FROM Events`);
  //const users = await query(`SELECT * FROM users `);
  //const registrations = await query(`SELECT * FROM events `);
  const totalEventsResult = await query(`SELECT COUNT(*) AS TOTAL_COUNT FROM events`);
  const totalRegResult = await query(`SELECT COUNT(*) AS TOTAL_PAY FROM payments`);
  const totalUsersResult = await query(`SELECT COUNT(*) AS TOTAL_USERS FROM users`);

  const totalEvents = totalEventsResult.rows?.[0]?.TOTAL_COUNT || 0;
  const totalReg    = totalRegResult.rows?.[0]?.TOTAL_PAY   || 0;
  const totalUsers   = totalUsersResult.rows?.[0]?.TOTAL_USERS  || 0;

  res.render("admin/admin_index", {
      title: "ACE Event Management",
      clerkKey: process.env.CLERK_PUBLISHABLE_KEY,
      logoPath: "/acelogo.png",
      navItems: [
        { text: "Home", href: "javascript:void(0)", id: "Home", func:"closeDashboard('home')"},
        { text: "Events", href: "javascript:void(0)",id: "Events", func:"closeDashboard('events')"},
        { text: "About", href: "javascript:void(0)",id: "About", func:"closeDashboard('about')"},
        { text: "Contact", href: "javascript:void(0)",id: "Contact", func:"closeDashboard('contact')"},
        { text: "Dashboard", href:"javascript:void(0)", id: "DashboardLink", func: "openDashboard('dashboardDiv')"}
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
      // dashboard items
      totalEvents:totalEvents,
      totalReg:totalReg,
      totalUsers:totalUsers
    });
  
});

export default router;
