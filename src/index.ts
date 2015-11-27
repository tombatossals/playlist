/// <reference path="../typings/tsd.d.ts" />

import * as rockband from './rockband';

var playlist:rockband.PlayList = new rockband.PlayList('DLC2007');


playlist.getSongs('6wOqqTrN3ZzdiyoEDMtfTW').then((songs) => {
	console.log(songs);
});








