import { Request, Response } from "express";
import { RTIRequest } from "../models/RtiRequest";

// Create RTI Request
export const createRTIRequest = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fullName,
      fatherMotherName,
      citizenshipNo,
      address,
      phoneEmail,
      detailedRequest,
    } = req.body;

    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    const request = new RTIRequest({
      userId,
      fullName,
      fatherMotherName,
      citizenshipNo,
      address: parsedAddress,
      phoneEmail,
      detailedRequest,
      attachments: req.files
        ? (req.files as Express.Multer.File[]).map((file) => ({
            name: file.originalname,
            filePath: file.path,
            fileType: file.mimetype,
          }))
        : [],
    });

    const savedRequest = await request.save();
    const populatedRequest = await RTIRequest.findById(
      savedRequest._id
    ).populate("userId");

    res.status(201).json(populatedRequest);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Get all RTI Requests (admin)
export const getAllRTIRequests = async (req: Request, res: Response) => {
  try {
    const { status, userId } = req.query;
    const query: any = {};
    if (status) query.status = status;
    if (userId) query.userId = userId;

    const requests = await RTIRequest.find(query)
      .populate("userId")
      .sort({ submittedDate: -1 });

    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get user's RTI Requests
export const getUserRTIRequests = async (req: Request, res: Response) => {
  try {
    const requests = await RTIRequest.find({ userId: req.params.userId }).sort({
      submittedDate: -1,
    });
    res.json(requests);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Get single RTI Request
export const getRTIRequestById = async (req: Request, res: Response) => {
  try {
    const request = await RTIRequest.findById(req.params.id).populate("userId");
    if (request) res.json(request);
    else res.status(404).json({ message: "Request not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Update RTI Request status/response (admin)
export const updateRTIRequest = async (req: Request, res: Response) => {
  try {
    const { status, response } = req.body;
    const updatedRequest = await RTIRequest.findByIdAndUpdate(
      req.params.id,
      { status, processedDate: new Date(), response },
      { new: true }
    ).populate("userId");

    if (updatedRequest) res.json(updatedRequest);
    else res.status(404).json({ message: "Request not found" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Delete RTI Request
export const deleteRTIRequest = async (req: Request, res: Response) => {
  try {
    const deleted = await RTIRequest.findByIdAndDelete(req.params.id);
    if (deleted) res.json({ message: "Request deleted" });
    else res.status(404).json({ message: "Request not found" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
