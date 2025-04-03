import type { Request, Response } from "express";
import { RequestType } from "../Route";
import { update } from "../../data";

export default {
    handler: (req: Request, res: Response) => {
        // check if a user ID has been provided
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                error: "No user ID provided",
            });
        }

        update("User", { locked: false }, { id })

        // get all users if no ID provided
        res.json({ success: true });
    
    },
    path: "/user/release",
    type: RequestType.POST,
};
