declare module 'express-graceful-shutdown' {
    import { Express } from 'express';
  
    interface GracefulShutdownOptions {
        development?: boolean; // Enable development mode (default is false)
      onShutdown?: () => Promise<void> | void;
      timeout?: number; // Timeout before forcing shutdown
      signals?: string[]; // Signals to listen for (default is SIGINT, SIGTERM)
    }
  
    function gracefulShutdown(app: Express, options?: GracefulShutdownOptions): void;
    export default gracefulShutdown;
  }