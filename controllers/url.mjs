import URL from "../models/url.mjs";
import { nanoid } from "nanoid";

export async function handleCreateUrl(req, res) {
  const { url } = req.body;
  if (!url) return res.status(200).json({ msg: "url required" });
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectUrl: url,
    visitHistory: [],
    createdBy:req.user._id,
  });
  // res.status(200).json({ mg: "success", id: shortID });
  return res.render("home", {
    id: shortID,
  });
}

export async function handleRedirectUrl(req, res) {
  const { shortId } = req.params;
  if (!shortId) return res.status(400).json({ err: "id required" });
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
}

export async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });
  res.json({
    clicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
