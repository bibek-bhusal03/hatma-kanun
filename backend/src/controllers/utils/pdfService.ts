import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export const generatePdf = async (
  htmlContent: string,
  fileName: string
): Promise<{ pdfPath: string; pdfUrl: string }> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfDir = path.join(process.cwd(), "public", "pdfs");
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });

  const pdfPath = path.join(pdfDir, fileName);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();

  return {
    pdfPath,
    pdfUrl: `/pdfs/${fileName}`,
  };
};
