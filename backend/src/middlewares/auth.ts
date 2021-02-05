import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const [scheme, token] = authHeader.split(" ");

    try {
        await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalid" });
    }
};

export default authMiddleware;