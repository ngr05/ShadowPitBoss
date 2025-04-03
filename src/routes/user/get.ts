import type { Request, Response } from "express";
import { RequestType } from "../Route";
import { getAll, getSingle, update } from "../../data";

export default {
    handler: async (req: Request, res: Response) => {
        // check if a user ID has been provided
        const { id } = req.params;

        // get single user if ID provided
        let user;
        if (id) {
            user = await getSingle("User", id);
            if (user.locked) {
                return res.status(400).json({
                    success: false,
                    error: "User locked and already in use",
                });
            }
        } else {
            const allUsers = await getAll("User");
            const users = allUsers.filter((user) => !user.locked);
            if (users.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "No users available",
                });
            }
            console.debug(users);
            user = users[Math.floor(Math.random() * users.length)];
        }

        // if no user found, return 404
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "No user not found",
            });
        }

        update("User", { locked: true }, { id: user.id })

        // get all users if no ID provided
        res.json(user);
    },
    path: ["/user", "/user/:id"],
    type: RequestType.GET,
};
