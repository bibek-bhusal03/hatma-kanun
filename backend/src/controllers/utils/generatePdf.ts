import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import puppeteer from "puppeteer";
import { env } from "../../../env"; // adjust as needed

export const generateSifarisPDF = async (application: any) => {
  // Generate QR code (points to verify endpoint)
  const uniqueUrl = `${env.FRONTEND_URL}/sifarish/application/${application._id}`;
  const qrDataUrl = await QRCode.toDataURL(uniqueUrl);

  // Build HTML template
  const htmlTemplate = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { text-align: center; }
          .section { margin: 20px 0; }
          .qr { text-align: right; margin-top: 40px; }
          .qr img { width: 120px; height: 120px; }
        </style>
      </head>
      <body>
        <h1>Education Certificate Sifaris</h1>
        <div class="section"><strong>Applicant Name:</strong> ${application.applicantName}</div>
        <div class="section"><strong>Citizenship No:</strong> ${application.citizenshipNo}</div>
        <div class="section"><strong>Purpose:</strong> ${application.purposeReason}</div>
        <div class="qr">
          <img src="${qrDataUrl}" alt="QR Code"/>
        </div>
      </body>
    </html>
  `;

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: "shell", // latest Puppeteer syntax
  });
  const page = await browser.newPage();

  // Set HTML content
  await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });

  // Save PDF to disk
  const outputDir = path.join(__dirname, "../../generated_pdfs");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const filePath = path.join(outputDir, `${application._id}.pdf`);
  await page.pdf({ path: filePath, format: "A4" });

  await browser.close();

  return { filePath, qrCodeUrl: qrDataUrl, uniqueUrl };
};
