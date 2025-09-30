import { Router } from "express";
import { query } from "../database/connect_db.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const events = await query("SELECT * FROM events");
    res.json(events.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;