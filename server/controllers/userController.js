const User = require("../model/userSchema");
const { hashPassword, generateToken, compare } = require("../utils/helper");

exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).send({ message: "User already exists" });

    req.body.password = await hashPassword(req.body.password);
    user = await User.create(req.body);

    const token = generateToken({ id: user.id, role: user.role });
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(403).send({ message: "User not found" });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(403).send({ message: "Invalid password" });

    const token = generateToken({ id: user.id, role: user.role });
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
