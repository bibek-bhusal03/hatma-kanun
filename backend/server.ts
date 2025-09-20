import express from "express";
import { createAuth } from "./src/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./env";
import dotenv from "dotenv";
import { connectDB } from "./src/models/db";
import path from "path";
import categoryRoutes from "./src/routes/categoryRoutes";
import awarenessPostRoutes from "./src/routes/awarenessPostRoutes";
import projectRoutes from "./src/routes/projectRoutes";
import rtiRequestRoutes from "./src/routes/rtiRequestRoutes";
import sifarisRoutes from "./src/routes/sifarisRoute";
import applicationRoutes from "./src/routes/applicationRoutes";

dotenv.config();

const app = express();

connectDB();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || env.WHITELISTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
createAuth(app);

app.use("/api/categories", categoryRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/awarenessPost", awarenessPostRoutes);
app.use("/api/sifaris", sifarisRoutes);
app.use("/api/rtiRequest", rtiRequestRoutes);
app.use("/api/project", projectRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/pdfs", express.static(path.join(__dirname, "..", "public", "pdfs")));

app.listen(env.PORT, (req, res) => {
  console.log(`Server listening on port ${env.PORT}`);
});
