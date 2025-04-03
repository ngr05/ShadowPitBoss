import type { Request, Response } from "express";
import { RequestType } from "./Route";

export default {
    handler: (req: Request, res: Response) => {
        const state = {
            status: "ok",
            message: "Shadow Pitboss is running",
            version: process.env.VERSION || "unknown",
        }
        res.json(state);
    },
    path: ["/", "/status", "/health"],
    type: RequestType.GET,
};