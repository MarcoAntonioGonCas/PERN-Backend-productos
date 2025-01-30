import express from 'express';
declare class Server {
    app: express.Application;
    port: number;
    private severInstance;
    constructor(autoInit?: boolean);
    init(): Promise<void>;
    connectDb(): Promise<void>;
    configure(): void;
    configureRoutes(): void;
    start(callback: () => void): void;
    stop(callback: () => void): void;
}
export default Server;
