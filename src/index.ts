/// <reference path="../typings/tsd.d.ts" />

import RockBandPlayList = require('RockBandPlayList');

var playlist:RockBandPlayList = new RockBandPlayList('DLC2007');


playlist.getSongs().then((songs) => {
	console.log(songs);
});








