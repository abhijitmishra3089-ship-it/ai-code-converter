import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const safeUser = user => ({ id: user._id, name: user.name, email: user.email, createdAt: user.createdAt });
function setTokenCookie(res, user) {
  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  res.cookie("token", token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, path: "/"
  });
}
export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) return res.status(400).json({ message: "Name, email, and password are required." });
    if (name.trim().length < 2) return res.status(400).json({ message: "Name must contain at least 2 characters." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: "Enter a valid email address." });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
    if (password.length > 72) return res.status(400).json({ message: "Password must be 72 characters or fewer." });
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: "An account with this email already exists." });
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashed });
    setTokenCookie(res, user);
    res.status(201).json({ message: "Account created successfully.", user: safeUser(user) });
  } catch (err) { if (err.code === 11000) return res.status(409).json({ message: "An account with this email already exists." }); next(err); }
}
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });
    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Incorrect email or password." });
    setTokenCookie(res, user);
    res.json({ message: "Signed in successfully.", user: safeUser(user) });
  } catch (err) { next(err); }
}
export function logout(req, res) {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", path: "/" });
  res.json({ message: "Signed out successfully." });
}
export function me(req, res) { res.json({ user: safeUser(req.user) }); }
export async function updateProfile(req, res, next) {
  try {
    const name = req.body.name?.trim();
    if (!name || name.length < 2 || name.length > 80) return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
    req.user.name = name; await req.user.save();
    res.json({ message: "Profile updated.", user: safeUser(req.user) });
  } catch (err) { next(err); }
}