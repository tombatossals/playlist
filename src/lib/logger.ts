/// <reference path="../../typings/tsd.d.ts" />

var w = require("winston");

export interface ILogger {
 	debug(message:string): void;
	info(message:string): void;
	warn(message:string): void;
	error(message:string): void;
}

export class Logger implements ILogger {
	logger:winston.LoggerInstance;

	constructor() {
		if (!this.logger) {
			this.logger = new w.Logger({
				name: "rockband",
				transports: [
					new w.transports.Console()
				],
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