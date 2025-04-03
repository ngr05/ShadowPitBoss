import type { Request, Response } from "express";
import { RequestType } from "../Route";
import { getAll, getSingle } from "../../data";

export default {
    handler: async (req: Request, res: Response) => {
        // check if a user ID has been provided
        const { id } = req.params;

        // get single user if ID provided
        if (id) {
            return res.json(await getSingle("User", id));
        }

        // get all users if no ID provided
        const users = await getAll("User");
        console.debug(users);
        res.json(users[Math.floor(Math.random() * users.length)]);
    },
    path: ["/user", "/user/:id"],
    type: RequestType.GET,
};
