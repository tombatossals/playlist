/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/redis/redis.d.ts" />

import * as mongoose from "mongoose";

export interface IDocumentDBConfig {
	documentDB: {
		connection: string;
	};
}

export class DocumentDB {
	static connect(conn:string):mongoose.Mongoose {
		return mongoose.connect(conn);
	}

	static disconnect():void {
		mongoose.disconnect();
	}
}