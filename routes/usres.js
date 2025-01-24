const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../utils/prismaClient");
const SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser)
    return res.status(400).send({ message: "Email is already in use." });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      fullname,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "User registered successfully!" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).send({ message: "User not found" });

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(401).send({ message: "Unvalid Password" });

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.fullname },
    SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Login successful!" });
};

const recoverAccount = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).send({ message: "User Not Found" });
  res.status(200).json({ message: "Redirect successful", user });
};

const resetPassword = async (req, res) => {
  const { userId, password } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).send({ message: "User Not Found" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  res.status(200).json({ message: "reset successful", user });
};

const getUserData = (req, res) => {
  const { name } = req.user;
  try {
    return res.status(200).send({ message: "success", name });
  } catch (error) {
    return res.status(500).send({ message: "Something Went wrong" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  recoverAccount,
  resetPassword,
  getUserData,
};
