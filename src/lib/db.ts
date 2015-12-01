/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/redis/redis.d.ts" />

import * as redis from "redis";
var bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class DB {
	client:redis.RedisClient;
	
	constructor() {
		this.client = redis.createClient();
	}
	
	getSongs(key) {
		this.client;
	}
	
}