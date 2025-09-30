import express from "express";
import { Webhook } from "svix";
import {query} from "../database/connect_db.js"
import { send_mail } from "../database/brevo_email/send_mail.js";
const router = express.Router();

router.post("/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) =>{
        try{
            const clerkWebhook = new Webhook(process.env.CLERK_SIGNING_SECRET);
            const evt = clerkWebhook.verify(req.body, req.headers);
            console.log("Clerk event received:", evt.type);
            const data = evt.data;
            if(evt.type === "user.created"){
                
                const email = data.email_addresses?.[0]?.email_address;

                await query("./database/API_calls/add_user.sql", {
                    fn:data.first_name,
                    fl:data.last_name,
                    email:email,
                    phone:8139824398,
                    role:"member",
                    institution:"KMEA",
                    id:data.id,
                    }, { autoCommit: true });

                send_mail({recipient_email : email, htmlContent_path : "./email_templates/welcome.html"});
            }
            else if(evt.type === "user.deleted"){
                await query("./database/API_calls/delete_user.sql",
                    {id:data.id},
                    {autoCommit: true});
            }
            else if(evt.type === "user.updated"){
                try{
                    const id = data.id;
                    const role = data.private_metadata["role"];
                    await query(`UPDATE users SET role =: role WHERE UserID =: id`,{role: role, id: id},{autoCommit: true});
                    console.log("role updated for ",id);
                }catch(err){
                    console.log("Error updating role", id);
                }
            }
            res.status(200).send("OK");
        }
        catch (err) {
            console.error("Webhook error:", err);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
});

export default router;
