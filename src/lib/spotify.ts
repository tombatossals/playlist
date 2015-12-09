/// <reference path="../../typings/tsd.d.ts" />

import * as axios from "axios";
var SpotifyWebAPI = require("spotify-web-api-node");

export interface ISpotifyPlaylistQuery {
	username: string;
	id: string;
}

export interface ISpotifyConfig {
	apiURL: string;
	auth: { clientID: string, clientSecret: string, redirectURI?: string };
}

interface ISpotifyArtist {
	external_urls: {
		spotify: string
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

interface ISpotifyAlbumImage {
	height: number;
	width: number;
	url: string;
}

interface ISpotifyAlbum {
	album_type: string;
	available_markets: string[];
	external_urls: {
		spotify: string
	};
	href: string;
	id: string;
	images: ISpotifyAlbumImage[];
	name: string;
	type: string;
	uri: string;
}

export interface ISpotifyTrack {
	added_at: Date;
	added_by: string;
	playlist_id: string;
	track: {
		uri: string,
		type: string,
		track_number: number,
		preview_url: string,
		popularity: number,
		name: string,
		id: string,
		href: string,
		external_urls: {
			spotify: string
		},
		external_ids: {
			isrc: string
		},
		explicit: boolean,
		duration_ms: number,
		disc_number: number,
		available_markets: string[],
		artists: ISpotifyArtist[],
		album: ISpotifyAlbum
	};
}

export class Spotify {
	axios: axios.AxiosStatic = axios;
	spotifyApi:SpotifyWebAPI;
	authToken: string;

	constructor(public config:ISpotifyConfig) {
		this.spotifyApi = new SpotifyWebAPI({
			clientId: config.auth.clientID,
			clientSecret: config.auth.clientSecret,
			redirectUri: config.auth.redirectURI
		});
	}

	private getBase64AuthHeader(): string {
		return "Basic " + new Buffer(this.config.auth.clientID + ":" + this.config.auth.clientSecret).toString("base64");
	}

	private auth():Promise<string> {
		return new Promise((resolve, reject) => {
			axios({
				url: this.config.apiURL,
				method: "post",
				params: {
					grant_type: "client_credentials"
				},
				headers: {
					Authorization: this.getBase64AuthHeader(),
					"Content-Type":"application/x-www-form-urlencoded"
				}
			}).then(response => {
				this.authToken = response.data["access_token"];
				this.spotifyApi.setAccessToken(this.authToken);
				resolve(this.authToken);
			}).catch(response => {
				reject(response);
			});
		});
	}

	private getAuthPlayList(spotifyPlayList: ISpotifyPlaylistQuery):Promise<ISpotifyTrack[]> {
		return new Promise((resolve, reject) => {
			this.spotifyApi.getPlaylistTracks(spotifyPlayList.username, spotifyPlayList.id).then(data => {
				var tracks:ISpotifyTrack[] = data.body.items;
				tracks.map(track => {
					track.playlist_id = spotifyPlayList.id;
					track.added_by = spotifyPlayList.username;
				});
				resolve(tracks);
			});
		});
	}

	public getPlayList(spotifyPlayList: ISpotifyPlaylistQuery):Promise<ISpotifyTrack[]> {
		return new Promise((resolve, reject) => {
			if (!this.authToken) {
				this.auth().then(() => {
					resolve(this.getAuthPlayList(spotifyPlayList));
				}).catch(err => {
					reject(err);
				});
			} else {
				resolve(this.getAuthPlayList(spotifyPlayList));
			}
		});
	}
}