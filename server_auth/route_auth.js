import { clerkClient } from "@clerk/clerk-sdk-node";
import { ss_auth } from "./db_auth.js";

export async function requireAdmin(req, res, next) {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).send("Unauthenticated on route_auth");

    // Fetch Clerk user
    const user = await clerkClient.users.getUser(userId);
    const clerkRole = user?.privateMetadata?.role || null;

    // Optional: check your own database
    const dbRole = await ss_auth(userId);

    if (clerkRole === "admin" && dbRole === "admin") {
      return next(); // allowed
    } else {
      return res.redirect("/home");
      
    }
  } catch (err) {
    console.error(err);
    return res.redirect("/");
  }
}
