/// <reference path="../../typings/tsd.d.ts" />

import { Spotify, ISpotifyConfig, ISpotifyPlaylistQuery } from "./spotify";
import { Logger } from "./logger";

export interface IRockBandConfig {
	playlists: {
		[key:string]: {
			username: string,
			id: string
		}
	}
}

export interface Track {
	position: number;
	name: string;
	artist: string;
	album: string;
}

export class RockBand {
	spotify:Spotify;
	logger: Logger;

	constructor(public config:IRockBandConfig, spotifyConfig:ISpotifyConfig) {
		this.logger = new Logger();
		this.spotify = new Spotify(spotifyConfig);
	}
	
	public loadPlayLists(playlistConfig:IRockBandConfig) {
		
	}
	
	public getSpotifyPlaylist(id:string): ISpotifyPlaylistQuery {
		if (this.config.playlists.hasOwnProperty(id)) {
			return this.config.playlists[id];
		}
	}

	public getSongs(id:string):Promise<any[]> {
		this.logger.info("Getting songs from the playlist " + id);
		var spotifyPlayList = this.getSpotifyPlaylist(id);
		return new Promise((resolve, reject) => {
			this.spotify.getPlayList(spotifyPlayList).then((data:any) => {
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