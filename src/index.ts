import dotenv from "dotenv";
import gracefulShutdown from 'express-graceful-shutdown';

import app from "./server";
import { close, connect, migrate } from "./data";

dotenv.config();

const { PORT } = process.env;

(async () => {
    await connect();
    await migrate();
    
    app.listen(PORT ?? 3000, () => {
        console.log(`App is running at http://localhost:${PORT}`);
    });
    
    gracefulShutdown(app, {
        development: true,
        onShutdown: async () => {
          console.log('Shutting down gracefully...');
          await cleanUp();
        },
        timeout: 5000,
    });
})();
    
const cleanUp = async () => {
    console.log("Cleaning up...");
    await close();
};

process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    cleanUp();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
    cleanUp();
    process.exit(1);
});