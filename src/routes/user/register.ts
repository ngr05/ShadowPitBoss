import type { Request, Response } from "express";
import { RequestType } from "../Route";
import { addTo } from "../../data";

export default {
    handler: async (req: Request, res: Response) => {
        const user = req.body;

        try {
            await addTo("User", user);
        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                error,
            });
        }

        res.json({
            success: true,
            user,
        });
    },
    path: "/user",
    type: RequestType.POST,
};
