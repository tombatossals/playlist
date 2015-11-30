/// <reference path="../typings/tsd.d.ts" />

var axios:axios.AxiosStatic = require("axios");
var SpotifyAPI:SpotifyWebAPI = require("spotify-web-api-node");
import { Track } from "./rockband";

export interface ISpotifyPlaylistQuery {
	username: string;
	id: string;	
}

export interface ISpotifyConfig {
	apiURL: string;
	auth: { clientID: string, clientSecret: string, redirectURI?: string };
}

export class Spotify {
	axios: axios.AxiosStatic = axios;
	spotifyApi:SpotifyWebAPI;
	authToken: string;
	
	constructor(public config:ISpotifyConfig) {
		this.spotifyApi = new SpotifyAPI({
			clientId: config.auth.clientID,
			clientSecret: config.auth.clientSecret,
			redirectUri: config.auth.redirectURI
		});
	}

	private getBase64AuthHeader(): string {
		return "Basic " + new Buffer(this.config.auth.clientID + ":" + this.config.auth.clientSecret).toString("base64");
	}

	private auth():Promise<any> {
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

	public getPlayList(spotifyPlayList: ISpotifyPlaylistQuery):Promise<Track[]> {
		return new Promise((resolve, reject) => {
			if (!this.authToken) {
				this.auth().then(() => {
					this.spotifyApi.getPlaylist(spotifyPlayList.username, spotifyPlayList.id).then(data => {
						resolve(data);
					}, (err) => {
						console.log(err);
					});
				});
			}
		});
	}
}