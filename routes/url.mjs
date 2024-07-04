import express from "express";
import {
  handleCreateUrl,
  handleGetAnalytics,
  handleRedirectUrl,
} from "../controllers/url.mjs";

const router = express.Router();

router.post("/", handleCreateUrl);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
