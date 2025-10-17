import express from "express";
import clerkWebhookRouter from "./webhooks/clerkWebhook.js";
import homepageRouter from "./routes/home.js";
import redirector from "./routes/loader.js";
import adminRouter from "./routes/admin.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { initPool} from "./database/connect_db.js";
import dotenv from "dotenv";
import { requireAdmin } from "./server_auth/route_auth.js";
import adminApiRouter from "./routes/admin_api.js";
import regEventRouter from "./routes/booking.js";
//import paymentRouter from "./routes/paymentRT.js"

dotenv.config();
await initPool();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(clerkWebhookRouter); // oh dear the positiong matters

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", redirector);
app.use("/home", homepageRouter);

app.use("/admin", ClerkExpressRequireAuth(), requireAdmin, adminRouter);
app.use("/admin/api/events", ClerkExpressRequireAuth(), requireAdmin, adminApiRouter);

app.use("/register-event", ClerkExpressRequireAuth(), regEventRouter);

//app.use("/create-order", ClerkExpressRequireAuth(), paymentRouter)

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// app.use("/api", eventsRoutes);

//console.log(events_list.rows);
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));