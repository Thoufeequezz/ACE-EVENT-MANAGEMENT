import ejs from "ejs";
import fs from "fs";
import path from "path";

export async function renderAndSaveEJSToHTML(ejsPath, data, fileName) {
  try {
    // Define output path inside email_templates/
    const outputDir = path.join(process.cwd(), "email_templates");
    const outputPath = path.join(outputDir, fileName);

    // Render the EJS template with provided data
    const html = await ejs.renderFile(ejsPath, data, { async: true });

    // Ensure the email_templates directory exists
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    // Write rendered HTML to file
    fs.writeFileSync(outputPath, html, "utf-8");
    return outputPath;
  } catch (err) {
    console.error("❌ Error rendering EJS to HTML:", err);
    throw err;
  }
}
