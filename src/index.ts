/// <reference path="../typings/tsd.d.ts" />

import { PlayList } from "./rockband";

var playlist:PlayList = new PlayList("DLC2007");


playlist.getSongs("DLC2007").then((songs) => {
	console.log(songs.length);
});








