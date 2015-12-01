/// <reference path="../../typings/tsd.d.ts" />

import * as bunyan from "bunyan";

export interface ILogger {
 	debug(message:string): void;
	info(message:string): void;
	warn(message:string): void;
	error(message:string): void;
}

export class Logger implements ILogger {
	logger:bunyan.Logger;

	constructor() {
		if (!this.logger) {
			this.logger = bunyan.createLogger({
				name: "RockBand",
				stream: process.stdout,
				level: "info"
			});
		}
	}

	debug(message:string):void {
		this.logger.debug(message);
	}

 	info(message:string): void {
		this.logger.info(message);
	}

	warn(message:string): void {
		this.logger.warn(message);
	}

	error(message:string): void {
		this.logger.error(message);
	}
}