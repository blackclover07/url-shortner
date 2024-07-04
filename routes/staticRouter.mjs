import express from "express";
import URL from "../models/url.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  if(!req.user) return res.redirect("/login");
  const allUrls = await URL.find({createdBy:req.user._id});
  res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signUp");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
