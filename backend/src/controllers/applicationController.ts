import { Request, Response } from "express";
import { Application } from "../models/Application";
import { generateSifarisPDF } from "./utils/generatePdf";

export const createApplication = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];

    const application = new Application({
      ...req.body,
      documents: files
        ? files.map((f) => ({
            fileName: f.originalname,
            filePath: f.path,
          }))
        : [],
    });

    await application.save();

    if (application.sifarisType?.toString() == "68ce8943465713e684385dc2") {
      const { filePath, uniqueUrl } = await generateSifarisPDF(application);
      return res.status(201).json({
        message: "Application created & PDF generated",
        application,
        pdfPath: filePath,
        verifyUrl: uniqueUrl,
      });
    }
    res.status(201).json({ message: "Application created", application });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all applications
export const getApplications = async (req: Request, res: Response) => {
  try {
    const { status, userId } = req.query;
    const query: any = {};
    if (status) query.status = status;
    if (userId) query.userId = userId;

    const applications = await Application.find(query)
      .populate("userId")
      .populate("sifarisType")
      .sort({ submittedDate: -1 });

    res.json(applications);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get single application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("userId")
      .populate("sifarisType");

    if (application) res.json(application);
    else res.status(404).json({ message: "Application not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update an application (full update)
export const updateApplication = async (req: Request, res: Response) => {
  try {
    const updatedApp = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("userId")
      .populate("sifarisType");

    if (updatedApp) res.json(updatedApp);
    else res.status(404).json({ message: "Application not found" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Update application status only
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { status, remarks } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, processedDate: new Date(), remarks },
      { new: true }
    )
      .populate("userId")
      .populate("sifarisType");

    if (application) res.json(application);
    else res.status(404).json({ message: "Application not found" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (application) res.json({ message: "Application deleted" });
    else res.status(404).json({ message: "Application not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const verifySifaris = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Sifaris not found" });
    }

    res.json({ valid: true, application });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
