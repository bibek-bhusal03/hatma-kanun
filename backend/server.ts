import { initAuth, RouteGenerator, TConfig } from "@baijanstack/express-auth";
import express from "express";
import { EmailNotificationService } from "./src/auth/notifier";

const app = express();

const routeGenerator = new RouteGenerator(
  app,
  EmailNotificationService,
  authConfig
);
