// routes/adminEvents.js
import { Router } from "express";
import { query } from "../database/connect_db.js";
import multer from 'multer';
import path from 'path';
import { create_event, edit_event } from '../database/events/db_events.js';
import { renderAndSaveEJSToHTML } from "../email_templates/ejsTohtml.js";
import { send_mail } from "../database/brevo_email/send_mail.js";

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

  const htmlData = {
    title: e_form["title"],
    fee: e_form["fee"],
    description: e_form["description"],
    venue: e_form["venue"],
    startDate: e_form["startDate"],
    endDate: e_form["endDate"],
    imageUrl: image,
    eventLink: "https://yourwebsite.com/events/" + encodeURIComponent(e_form["title"])
  };
  const ejsTemplatePath = "email_templates/event_mail.ejs";
  const fileName = `${Date.now()}_${e_form["title"].replace(/\s+/g, "_")}.html`;

  const htmlAbsolutePath = await renderAndSaveEJSToHTML(ejsTemplatePath,htmlData, fileName); 
  const htmlContentPath = path.relative(process.cwd(), htmlAbsolutePath).replace(/\\/g, "/"); 
  console.log(htmlContentPath);
  send_mail({recipient_email: "to_all", htmlContent_path: htmlContentPath});

  res.json({
    success: true,
    message: 'Event uploaded',
    filePath: image
  });
});

/////////////////////////////////
// EDIT EVENT
/////////////////////////////////

router.post('/edit-event/:eventId', upload.single('image'), async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const e_form = req.body;

    // Handle image (use new one if uploaded, else keep existing)
    let imagePath = e_form.currentImage || "event_images/default.png";
    if (req.file) {
      imagePath = req.file.path.replace("public\\", "").replace(/\\/g, "/");
    }

    // Call your edit_event() DB function
    await edit_event(
    Number(eventId),                  // convert EVENTID
    e_form["title"],
    Number(e_form["fee"]) || 0,       // convert fee
    e_form["description"],
    Number(e_form["noOfSeats"]) || 999, // convert seats
    new Date(e_form["startDate"]),
    new Date(e_form["endDate"]),
    e_form["eventStatus"] || "Active",
    e_form["type"],
    e_form["category"] || "General",
    e_form["venue"],
    imagePath
    );


    res.json({
      success: true,
      message: "Event updated successfully",
      updatedFilePath: imagePath
    });
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
});


export default router;
