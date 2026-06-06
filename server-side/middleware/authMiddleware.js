import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
};

export default protect;
