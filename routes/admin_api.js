// routes/adminEvents.js
import { Router } from "express";
import { query } from "../database/connect_db.js";
import multer from 'multer';
import path from 'path';
import { create_event } from '../database/events/db_events.js';

const router = Router();

/////////////////////////////////
//GET EVENTS
/////////////////////////////////

// GET all events (optional: admin-only if you want)
router.get("/", async (req, res) => {
  try {
    const events = await query("SELECT * FROM events");
    res.json(events.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/////////////////////////////////
//DELETE EVENT
/////////////////////////////////

// DELETE an event by ID (admin-only)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await query("DELETE FROM EVENTS WHERE EVENTID = :id", [id],{autoCommit : true});
    res.status(200).send("Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/////////////////////////////////
//Upload new events
/////////////////////////////////

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/event_images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// POST endpoint to handle event upload
router.post('/upload-event', upload.single('image'), async (req, res) => {
  //console.log('Form fields:', req.body);

  const e_form  = req.body;
  let image = "event_images/default.png";
  if(!(req.file == undefined)){
    image = req.file.path.replace("public\\", "").replace(/\\/g, "/");
  };

  // dbPath will be: "event_images/1759254468964.jpg"

  const userID = req.auth?.userId;
  create_event(
    userID, 
    e_form["title"], 
    e_form["fee"], 
    e_form["description"], 
    999, 
    new Date(e_form["startDate"]),
    new Date(e_form["endDate"]),
    "Active",
    e_form["type"],
    "General",
    e_form["venue"],
    image
  );
  
  //console.log('File info:', req.file);     

  res.json({
    success: true,
    message: 'Event uploaded',
    filePath: image
  });
});

export default router;
