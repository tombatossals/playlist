/// <reference path="../../typings/tsd.d.ts" />

import { DocumentDB, IDocumentDBConfig } from "./documentDB";
import * as spotify from "./spotify";
import { Logger } from "./logger";
import { TrackModel } from "../models/track";

export interface IRockBandConfig {
	playlists: {
		[key:string]: {
			username: string,
			id: string
		}
	};
}

export interface Track {
	position: number;
	name: string;
	artist: string;
	album: string;
}

export class RockBand {
	spotify:spotify.Spotify;
	db: DocumentDB;
	logger: Logger;

	constructor(databaseConfig: IDocumentDBConfig, spotifyConfig:spotify.ISpotifyConfig) {
		this.logger = new Logger();
		this.spotify = new spotify.Spotify(spotifyConfig);
		this.db = DocumentDB.connect(databaseConfig.documentDB.connection);
	}

	public removePlayList(spotifyPlayList:spotify.ISpotifyPlaylistQuery):Promise<boolean> {
		return TrackModel.deletePlayList(spotifyPlayList);
	}

	public storePlayListSongs(spotifyPlayList:spotify.ISpotifyPlaylistQuery): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.getSongs(spotifyPlayList).then((tracks) => {
				TrackModel.deletePlayList(spotifyPlayList).then(() => {
					TrackModel.insertTracks(tracks).then(() => {
						resolve(true);
					}).catch(err => {
						reject(err);
					});
				});
			});
		});
	}

	private getSongs(spotifyPlayList:spotify.ISpotifyPlaylistQuery):Promise<spotify.ISpotifyTrack[]> {
		this.logger.info("Getting songs from the playlist " + spotifyPlayList.id);
		return new Promise((resolve, reject) => {
			resolve(this.spotify.getPlayList(spotifyPlayList));
		});
	}
}