import type { Request, Response } from "express";
import { RequestType } from "../Route";
import { update } from "../../data";

export default {
    handler: async (req: Request, res: Response) => {
        const user = req.body;

        try {
            await update("User", (({ id, ...o }) => o)(user), {id: user.id});
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
    type: RequestType.PATCH,
};
