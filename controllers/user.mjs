import USER from "../models/user.mjs";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../services/auth.mjs";

export async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await USER.create({
    name: name,
    email: email,
    password: password,
  });
  return res.redirect("/");
}

export async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await USER.findOne({ email, password });
  if (!user)
    return res.render("login", {
      err: "invalid username or password",
    });
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}
