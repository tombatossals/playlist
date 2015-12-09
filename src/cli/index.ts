/// <reference path="../../typings/tsd.d.ts" />

import { RockBand } from "../lib/rockband";
import { ISpotifyConfig } from "../lib/spotify";
import { DocumentDB, IDocumentDBConfig } from "../lib/documentDB";
import { ArgParser } from "../lib/argparser";

var databaseConfig:IDocumentDBConfig = require("../../config/database");
var spotifyConfig:ISpotifyConfig = require("../../config/spotify");
var rockband:RockBand = new RockBand(databaseConfig, spotifyConfig);
var argv = new ArgParser();

switch (argv.getCommand()) {
	case "insert":

		rockband.storePlayListSongs(argv.getPlayList()).then(result => {
			DocumentDB.disconnect();
		}).catch(err => {
			console.log(err);
		});
		break;
	case "remove":
		rockband.removePlayList(argv.getPlayList()).then(() => {
			DocumentDB.disconnect();
		});
		break;
	default:
		DocumentDB.disconnect();
}









