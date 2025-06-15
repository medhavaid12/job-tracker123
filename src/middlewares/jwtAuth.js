import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Authentication failed." });
  }
}
