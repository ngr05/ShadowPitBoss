import express, { type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import routes from "./routes";
import type { Route } from "./routes/Route";

const app = express();

app.use(helmet());
app.use(express.json());

// 100 requests per 15 minutes
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

routes.forEach((route: Route) => {
    const paths = Array.isArray(route.path) ? route.path : [route.path];
    paths.forEach((path: string) => {
        app[route.type](path, route.handler);
    });
});

export default app;
