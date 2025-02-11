const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const generateToken = async (data) => {
  try {
    let token = await jwt.sign(data, process.env.private_key);
    return token;
  } catch (error) {
    throw new Error("Could not sign token: " + error);
  }
};

const hashPassword = async (password) => {
  let hash = await bcrypt.hash(password, 10);
  return hash;
};

const compare = async (hash, password) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { generateToken, compare, hashPassword }; 
