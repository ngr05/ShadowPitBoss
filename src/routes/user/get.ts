import type { Request, Response } from "express";
import { RequestType } from "../Route";

export default {
    handler: (req: Request, res: Response) => {
        const user = {};
        res.json(user);
    },
    path: ["/user", "/user/:id"],
    type: RequestType.GET,
};
