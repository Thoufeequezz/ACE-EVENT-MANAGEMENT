import { query } from "../connect_db.js";
import { sendNewsletter } from "./email_serv.js";
import fs from "fs";

/***
* @param {String} htmlContent_path
* @param {String} recipient_email
*/
export async function send_mail({recipient_email = "to_all", htmlContent_path}) {
        
        const htmlContent = fs.readFileSync(htmlContent_path, "utf-8");

    if (recipient_email === "to_all"){
        try {
            const recipientsResult = await query(`SELECT email AS EMAIL FROM users`);

            if (!recipientsResult || !recipientsResult.rows || recipientsResult.rows.length === 0) {
            console.error("No emails found in the database.");
            return;
            }

            const rows = recipientsResult.rows;
            console.log("Rows from DB:", rows);

            const recipients = rows.map(r => r.EMAIL).filter(Boolean); 
            console.log("Recipients for Brevo:", recipients);

            if (recipients.length === 0) {
            console.error("No valid emails to send.");
            return;
            }

            const subject = "NEW EVENT ALERT! @ACE KMEA";

            const res = await sendNewsletter(recipients, subject, htmlContent);
            console.log("Emails sent successfully(newsletter)!", res);
        } catch (err) {
            console.error("Error sending emails:", err);
        }
    }
    else{
        try {
            const subject = "Welcome to ACE KMEA!";
            const res = await sendNewsletter([recipient_email], subject, htmlContent);
            console.log("Emails sent successfully (induvidual)!", res);
        } catch (err) {
            console.error("Error sending emails:", err);
        }
    }

}

