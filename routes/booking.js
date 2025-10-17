import { Router } from "express";
import { query } from "../database/connect_db.js";

const router = Router();

// POST /register-event
router.post('/', async (req, res) => {
  const realUserId = req.auth.userId;
  const { eventId, dummyUserId } = req.body;

  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  // Detect tampering
  if (dummyUserId && dummyUserId !== realUserId) {
    return res.status(403).json({ error: "User ID Tampering suspected." });
  }

  try {
    await query(
      "database/API_calls/add_booking.sql",
      {
        userid: realUserId,
        eventid: Number(eventId),
        bookingstatus: 'Confirmed',
        noofparticipants: 1,
        reservationdate: new Date()
      },
      { autoCommit: true }
    );

    return res.json({ message: "Registration successful!" });

  } catch (err) {
    // Check for your custom Oracle error code (e.g., 20001)
    if (err.errorNum === 20001) {
      return res.status(400).json({ error: "You are already registered for this event." });
    }

    console.error("Database error:", err);
    return res.status(500).json({ error: "Something went wrong. Try again later." });
  }
});

export default router;
