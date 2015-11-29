/// <reference path="../typings/tsd.d.ts" />

var jsonConfig:any = require("../config/spotify");
import { Spotify } from "./spotify";
import { Logger } from "./logger";

export interface Track {
	position: number;
	name: string;
	artist: string;
	album: string;
}

export class PlayList {
	spotify:Spotify = new Spotify(jsonConfig);
	id: string;
	logger: Logger;

	constructor(id:string) {
		this.id = id;
		this.logger = new Logger();
	}

	public getSongs(id:string):Promise<any[]> {
		this.logger.info("Getting songs from the playlist " + id);
		return new Promise((resolve, reject) => {
			this.spotify.getPlayList(id).then((data:any) => {
				var tracks:Track[] = [];
				var dataTracks:any = data.body.tracks.items;

				dataTracks.forEach((element, i) => {
					var track:Track = {
						position: i+1,
						name: element.track.name,
						artist: element.track.artists[0].name,
						album: element.track.album.name
					};
					tracks.push(track);
				});
				resolve(tracks);
			});
		});

	}
}