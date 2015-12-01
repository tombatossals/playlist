/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/redis/redis.d.ts" />

import * as redis from "redis";
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class KVDB {
	client:redis.RedisClient;
	
	constructor(conn:string) {
		this.client = redis.createClient();
	}
	
	getSongs(key) {
		this.client;
	}
	
}