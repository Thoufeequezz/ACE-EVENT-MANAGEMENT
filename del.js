import { create_event } from "./database/events/events.js";
import { initPool } from "./database/connect_db.js";
import dontenv from "dotenv";
dontenv.config();
await initPool();

async function testCreateEvent() {
  try {
    await create_event(
      "user_337o92vmBnZO6PCTxFuo1900XcL",                 // CREATORUSERID
      "boring class",             // TITLE
      0,                       // FEE
      "Airsoft games",      // DESCRIPTION
      50,                        // NOOFSEATS
      new Date("2025-10-01"),    // STARTDATE
      new Date("2025-10-02"),    // ENDDATE
      "OPEN",                    // EVENTSTATUS
      "Conference",              // EVENTTYPE
      "Technology",              // EVENTCATEGORY
      "Main Hall",                // VENUE
      "event_images/download.jpeg"
    );

    console.log("Event created successfully!");
  } catch (err) {
    console.error("Error creating event:", err);
  }
}

// Run the test

testCreateEvent();
