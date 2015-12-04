/// <reference path="../../typings/tsd.d.ts" />

import * as yargs from "yargs";

export class ArgParser {
	argv;
	
	private check(argv: yargs.Argv, options: yargs.Options) {
		return true;
	}
	
	constructor() {
		this.argv = yargs.demand(2)
						 .usage("Usage: $0 <action> <RockBand PlayList ID>")
						 .check(this.check)
						 .argv;						 
	}
	
	getCommand() {
		return this.argv._[0];
	}
	
	getPlaylist() {
		return this.argv._[1];
	}
}