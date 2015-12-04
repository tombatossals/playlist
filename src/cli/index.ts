/// <reference path="../../typings/tsd.d.ts" />

import { RockBand, IRockBandConfig} from "../lib/rockband";
import { ISpotifyConfig } from "../lib/spotify";
import * as yargs from "yargs";
import * as documentDB from "../lib/documentDB";
import { TrackModel } from "../models/track";

var rockbandConfig:IRockBandConfig = require("../../config/rockband");
var databaseConfig:documentDB.IDocumentDBConfig = require("../../config/database");
var spotifyConfig:ISpotifyConfig = require("../../config/spotify");
var playlist:RockBand = new RockBand(rockbandConfig, spotifyConfig);


var argv = yargs.demand(2)
				.usage("Usage: $0 <action> <RockBand PlayList ID>")
				.check((argv, options) => {
					return true;
				})
				.argv;

var playlistID = argv._[1];
var db = documentDB.DocumentDB.connect(databaseConfig.documentDB.connection);


console.log(playlistID);
playlist.getSongs(playlistID).then((tracks) => {
	TrackModel.insertTracks(tracks);
	documentDB.DocumentDB.disconnect();
});








