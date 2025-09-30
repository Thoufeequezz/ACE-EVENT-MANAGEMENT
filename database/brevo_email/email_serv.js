// email_serv.js
import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Configure API key authorization
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Create an instance of the TransactionalEmailsApi
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send a newsletter to multiple recipients.
 * @param {Array<string>} recipients - List of email addresses
 * @param {string} subject - Subject of the email
 * @param {string} htmlContent - HTML content of the email
 */
export async function sendNewsletter(recipients, subject, htmlContent) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { email: 'mnmircse@gmail.com', name: 'ACE KMEA Events' };
  sendSmtpEmail.to = recipients.map(email => ({ email }));
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = htmlContent;

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Emails sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
}
