import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) =>
{
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({
      success: false,
      message: "Invalid credential",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // eslint-disable-next-line no-undef
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid credential",
      error: error.message,
    });
  }
};