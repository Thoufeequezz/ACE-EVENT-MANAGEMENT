// // routes/events.js
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { create_event } from '../database/events/db_events.js';
// import { send_mail } from '../database/brevo_email/send_mail.js';

// const router = express.Router();

// // Configure storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'public/event_images/'),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// const upload = multer({ storage });

// // POST endpoint to handle event upload
// router.post('/upload-event', upload.single('image'), async (req, res) => {
//   //console.log('Form fields:', req.body);

//   const e_form  = req.body;
//   let image = "event_images/default.png";
//   if(!(req.file == undefined)){
//     image = req.file.path.replace("public\\", "").replace(/\\/g, "/");
//   };

//   // dbPath will be: "event_images/1759254468964.jpg"

//   const userID = req.auth?.userId;
//   create_event(
//     userID, 
//     e_form["title"], 
//     e_form["fee"], 
//     e_form["description"], 
//     999, 
//     new Date(e_form["startDate"]),
//     new Date(e_form["endDate"]),
//     "Active",
//     e_form["type"],
//     "General",
//     e_form["venue"],
//     image
//   );
  
//   //console.log('File info:', req.file);     

//   res.json({
//     success: true,
//     message: 'Event uploaded',
//     filePath: image
//   });
// });

// export default router;
