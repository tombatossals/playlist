/// <reference path="../typings/tsd.d.ts" />
export interface ILogger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
export declare class BunyanLogger implements ILogger {
    logger: any;
    constructor();
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}
