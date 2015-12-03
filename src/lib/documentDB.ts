/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/redis/redis.d.ts" />

import * as mongoose from "mongoose";

export interface IDocumentDBConfig {
	connection: string;
}

export class DocumentDB {
	db:mongoose.Connection;
	
	constructor(conn:string) {
		if (!this.db) {
			mongoose.connect(conn);
			this.db = mongoose.connection;
		}
	}
}