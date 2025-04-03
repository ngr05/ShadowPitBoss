import type { Request, Response } from "express";
import { RequestType } from "../Route";

export default {
    handler: (req: Request, res: Response) => {
        res.json({
        });
    },
    path: "/user/register",
    type: RequestType.POST,
};
