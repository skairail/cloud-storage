import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

const authMiddleware = async (req: any, res: any, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    const decoded: any = jwt.verify(token, config.get("secretKey")) as any;
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Auth error" });
  }
};

export = authMiddleware;
