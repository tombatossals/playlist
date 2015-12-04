/// <reference path="../../typings/tsd.d.ts" />

import { RockBand, IRockBandConfig} from "../lib/rockband";
import { ISpotifyConfig } from "../lib/spotify";
import * as documentDB from "../lib/documentDB";
import { TrackModel } from "../models/track";
import { ArgParser } from "../lib/argparser";

var rockbandConfig:IRockBandConfig = require("../../config/rockband");
var databaseConfig:documentDB.IDocumentDBConfig = require("../../config/database");
var spotifyConfig:ISpotifyConfig = require("../../config/spotify");
var playlist:RockBand = new RockBand(rockbandConfig, spotifyConfig);

var argv = new ArgParser();
var db = documentDB.DocumentDB.connect(databaseConfig.documentDB.connection);


playlist.getSongs(argv.getPlaylist()).then((tracks) => {

	TrackModel.insertTracks(tracks).then(data => {
		console.log(data);
	}).catch(err => {
		console.log(err);
	}).then(() => {
		documentDB.DocumentDB.disconnect();
	});
});








