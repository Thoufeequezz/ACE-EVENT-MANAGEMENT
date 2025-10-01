import express from "express";
import clerkWebhookRouter from "./webhooks/clerkWebhook.js";
import homepageRouter from "./routes/home.js";
import redirector from "./routes/loader.js";
import adminRouter from "./routes/admin.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { initPool, query } from "./database/connect_db.js";
import dotenv from "dotenv";
import { requireAdmin } from "./server_auth/route_auth.js";
import adminApiRouter from "./routes/admin_api.js";
import eventsRoutes from "./routes/events.js"


dotenv.config();
await initPool();

const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", redirector);
app.use("/home", homepageRouter);

app.use("/admin", ClerkExpressRequireAuth(), requireAdmin, adminRouter);
app.use("/admin/api/events", ClerkExpressRequireAuth(), requireAdmin, adminApiRouter);
app.use(clerkWebhookRouter);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use("/api", eventsRoutes);

//console.log(events_list.rows);
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));