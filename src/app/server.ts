/// <reference path="../../typings/tsd.d.ts" />

import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import { DocumentDB } from "../lib/documentDB";

interface IExpressConfig {
	database: string;	
	secret: string;
	port: number;
	environment: string;
}


class App {
	app:express.Express;
	db: DocumentDB;
	
	constructor(public config:IExpressConfig) {
		this.app = express(); 		
		this.db = new DocumentDB(expressConfig.database);
		this.app.set("superSecret", expressConfig.secret);
		
		// use body parser so we can get info from POST and/or URL parameters
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		
		// use morgan to log requests to the console
		this.app.use(morgan(this.config.environment));
		
		var routes = require("./routes");
		this.app.use("/", routes);
	}
	
	start() {
		this.app.listen(this.config.port);
	}
}

var expressConfig:IExpressConfig = require("../../config/express");
var app = new App(expressConfig);
app.start();
