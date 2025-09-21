import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import puppeteer from "puppeteer";
import { env } from "../../../env";

export const generateSifarisPDF = async (application: any) => {
  const uniqueUrl = `${env.BACKEND_URL}/pdfs/${application._id}.pdf`;
  const qrDataUrl = await QRCode.toDataURL(uniqueUrl);

  const signaturePath = path.join(__dirname, "proxy-image.png");
  let signatureDataUrl = "proxy-image.png";

  if (fs.existsSync(signaturePath)) {
    const signatureBuffer = fs.readFileSync(signaturePath);

    const mimeType = signaturePath.endsWith(".png")
      ? "image/png"
      : "image/jpeg";

    signatureDataUrl = `data:${mimeType};base64,${signatureBuffer.toString(
      "base64"
    )}`;
  }

  const htmlTemplate = `
    <html>
      <head>
        <style>
          body { font-family: "Times New Roman", serif; padding: 60px; line-height: 1.6; }
          h1 { text-align: center; text-decoration: underline; font-size: 22px; }
          .meta { margin-top: 20px; font-size: 14px; }
          .section { margin: 15px 0; font-size: 16px; }
          .qr { text-align: right; margin-top: 40px; }
          .qr img { width: 120px; height: 120px; }
          .footer { margin-top: 60px; font-size: 14px; }
          .signature { margin-top: 30px; }
          .signature img { width: 180px; height: auto; }
        </style>
      </head>
      <body>
        <h1>Referral Letter for Scholarship</h1>

        <div class="meta">
          <div><strong>Ref No:</strong> ${application._id}</div>
          <div><strong>Date:</strong> ${new Date(
            application.submittedDate
          ).toLocaleDateString()}</div>
        </div>

        <div class="section">
          To,<br/>
          The Concerned Authority,<br/>
          Scholarship Selection Committee,<br/>
          Municipality Office
        </div>

        <div class="section">
          This is to certify that <strong>${
            application.applicantName
          }</strong>, 
          son/daughter of <strong>${application.fatherMotherName}</strong>, 
          holding citizenship number <strong>${
            application.citizenshipNo
          }</strong>, 
          and residing at Ward <strong>${application.address?.ward}</strong>, 
          ${
            application.address?.streetLocality
          }, is a permanent resident of this municipality.
        </div>

        <div class="section">
          The applicant has applied for a <strong>Scholarship</strong> on the grounds of 
          <em>${
            application.purposeReason
          }</em>. After reviewing the submitted documents, 
          the Municipality hereby refers and recommends the applicant for further consideration 
          under the scholarship program.
        </div>

        <div class="section">
          All the attached documents have been verified by this office and found to be valid.
        </div>

        <div class="footer">
          <strong>Authorized Signature:</strong><br/><br/>
          <div class="signature">
            ${
              signatureDataUrl
                ? `<img src="${signatureDataUrl}" alt="Signature"/>`
                : "___________________________"
            }
          </div>
          Municipality Officer
        </div>

        <div class="qr">
          <img src="${qrDataUrl}" alt="QR Code"/>
          <div style="font-size:12px;">Scan to verify: ${uniqueUrl}</div>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({ headless: "shell" });
  const page = await browser.newPage();
  await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });

  const outputDir = path.join(__dirname, "../../../pdfs");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const filePath = path.join(outputDir, `${application._id}.pdf`);
  await page.pdf({ path: filePath, format: "A4" });

  await browser.close();

  return { filePath, qrCodeUrl: qrDataUrl, uniqueUrl };
};
