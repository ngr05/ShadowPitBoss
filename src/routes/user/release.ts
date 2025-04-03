import type { Request, Response } from "express";
import { RequestType } from "../Route";

export default {
    handler: (req: Request, res: Response) => {
        res.json({
            success: true,
        });
    },
    path: "/user/release",
    type: RequestType.POST,
};
