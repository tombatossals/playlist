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


var argv = yargs.demand(1).usage("Usage: $0 <RockBand PlayList ID>").argv;

var playlistID = argv._[0];
var documentDB = new documentDB.DocumentDB(databaseConfig.connection);

playlist.getSongs(playlistID).then((tracks) => {

	TrackModel.insertTracks(tracks);
});








