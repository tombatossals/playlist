/// <reference path="../../typings/tsd.d.ts" />

import * as spotify from "./spotify";
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
	spotify:spotify.Spotify;
	logger: Logger;

	constructor(public config:IRockBandConfig, spotifyConfig:spotify.ISpotifyConfig) {
		this.logger = new Logger();
		this.spotify = new spotify.Spotify(spotifyConfig);
	}
	
	public loadPlayLists(playlistConfig:IRockBandConfig) {
		
	}
	
	public getSpotifyPlaylist(id:string): spotify.ISpotifyPlaylistQuery {
		if (this.config.playlists.hasOwnProperty(id)) {
			return this.config.playlists[id];
		}
	}

	public getSongs(id:string):Promise<spotify.ISpotifyTrack[]> {
		this.logger.info("Getting songs from the playlist " + id);
		var spotifyPlayList = this.getSpotifyPlaylist(id);
		return new Promise((resolve, reject) => {
			resolve(this.spotify.getPlayList(spotifyPlayList));
		});
	}
}