/// <reference path="../typings/tsd.d.ts" />

var axios:axios.AxiosStatic = require("axios");
var SpotifyWebApi = require('spotify-web-api-node');
import { Track } from './rockband';

class SpotifyLoginAuth {
	clientID: string;
	clientSecret: string;
	redirectURI: string;
}

export interface SpotifyConfig {
	apiURL: string;
	auth:SpotifyLoginAuth;
	token:string;
}

export class Spotify {
	axios: axios.AxiosStatic = axios;
	spotifyApi:any;
	
	constructor(public config:SpotifyConfig) {
		this.spotifyApi = new SpotifyWebApi({
			clientId: config.auth.clientID,
			clientSecret: config.auth.clientSecret,
			redirectUri: config.auth.redirectURI
		});		
	}
	
	private getBase64AuthHeader(): string {
		return 'Basic ' + new Buffer(this.config.auth.clientID + ':' + this.config.auth.clientSecret).toString('base64');
	}
	
	private auth():Promise<any> {
		return new Promise((resolve, reject) => {
			axios({
				url: this.config.apiURL,
				method: 'post',
				params: {
					grant_type: 'client_credentials'	
				},
				headers: { 
					Authorization: this.getBase64AuthHeader(),
					'Content-Type':'application/x-www-form-urlencoded' 
				}
			}).then(response => {
				this.config.token = response.data['access_token'];
				this.spotifyApi.setAccessToken(this.config.token);
				resolve(this.config.token);
			}).catch(response => {
				reject(response);
			});
		});
	}
	
	public getPlayList(id: string):Promise<Track[]> {
		return new Promise((resolve, reject) => {
			if (!this.config.token) {
				this.auth().then(() => {
					this.spotifyApi.getPlaylist('bufanuvols', id).then(data => {
						resolve(data);
					}, (err) => {
						console.log(err);
					});
				});
			}
		});
	}
}