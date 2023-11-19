import User from "#models/userModel.js";
import { registerNewUserSchema } from "#validators/registerNewUserSchema.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import sendVerificationEmail from "./mailer.js";
import generateVerificationToken from "#middleware/generateVerificationToken.js";

export async function registerNewUser(req, res) {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: "250", d: "retro", r: "g" });

  const { error } = registerNewUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = new User({ email, password: hashedPassword, avatarURL });
    const savedUser = await newUser.save();
    // Generowanie i wysłanie e-maila weryfikacyjnego
    const verificationToken = generateVerificationToken(); // Funkcja generująca token weryfikacyjny
    sendVerificationEmail(email, verificationToken);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
