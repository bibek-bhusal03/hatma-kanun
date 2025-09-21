import express from "express";
import { createAuth } from "./src/auth";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./env";
import dotenv from "dotenv";
import { connectDB } from "./src/models/db";
import categoryRoutes from "./src/routes/categoryRoutes";
import awarenessPostRoutes from "./src/routes/awarenessPostRoutes";
import projectRoutes from "./src/routes/projectRoutes";
import rtiRequestRoutes from "./src/routes/rtiRequestRoutes";
import sifarisRoutes from "./src/routes/sifarisRoute";
import applicationRoutes from "./src/routes/applicationRoutes";
import userRoutes from "./src/routes/userRoutes";
import chatRoutes from "./src/routes/chatRoutes";

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
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/pdfs", express.static("pdfs"));

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});
