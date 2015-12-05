/// <reference path="../../typings/tsd.d.ts" />

import * as yargs from "yargs";
import * as url from "url";
import { ISpotifyPlaylistQuery } from "./spotify";

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

	getPlayList():ISpotifyPlaylistQuery {
		var pathname:string[] = url.parse(this.argv._[1]).pathname.split("/");

		return {
			username: pathname.slice(-3)[0],
			id: pathname.slice(-1)[0]
		};
	}
}