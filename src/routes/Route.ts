import type { Request, Response } from "express";

export enum RequestType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
};

export interface Route {
    handler: (req: Request, res: Response) => void;
    path: string | string[];
    type: RequestType;
}
