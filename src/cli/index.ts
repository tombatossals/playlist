/// <reference path="../../typings/tsd.d.ts" />

import { RockBand, IRockBandConfig} from "../lib/rockband";
import { ISpotifyConfig } from "../lib/spotify";

var rockbandConfig:IRockBandConfig = require("../../config/rockband");
var spotifyConfig:ISpotifyConfig = require("../../config/spotify");
var playlist:RockBand = new RockBand(rockbandConfig, spotifyConfig);

playlist.getSongs("DLC2007").then((songs) => {
	console.log(songs.length);
});








