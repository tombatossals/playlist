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
	logger: {
		format: string
	}
}

interface ILoggerConfig {
	stream?: TextStreamWriter,
	format: string
}

class App {
	app:express.Express;
	db: DocumentDB;
	
	// use morgan to log requests to the console
	configureLogger(loggerConfig?:ILoggerConfig) {
		this.app.use(morgan(loggerConfig.format));
	}
	
	// use body parser so we can get info from POST and/or URL parameters
	configureBodyParser() {
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
	}
	
	configureRoutes() {
		var routes = require("./routes");
		this.app.use("/", routes);
	}
	
	constructor(public config:IExpressConfig) {
		this.app = express(); 		
		this.db = new DocumentDB(expressConfig.database);
		this.app.set("superSecret", expressConfig.secret);
		
		this.configureLogger(this.config.logger);
		this.configureBodyParser();
		this.configureRoutes();
	}
	
	start() {
		this.app.listen(this.config.port);
		console.log("Running! Listening in port " + this.config.port);
	}
}

var expressConfig:IExpressConfig = require("../../config/express");
var app = new App(expressConfig);
app.start();
