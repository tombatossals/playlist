/// <reference path="../../../typings/tsd.d.ts" />

import * as mongoose from "mongoose";

module.exports = mongoose.model("User", new mongoose.Schema({
	username: String,
	password: String,
	admin: Boolean
}));