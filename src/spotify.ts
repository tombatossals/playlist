/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../spotify-web-api-node.d.ts" />

var axios:axios.AxiosStatic = require("axios");
var SpotifyWebApi = require('spotify-web-api-node');
import * as track from './track';


export class SpotifyConfig {
	apiURL: string;
	auth: {
		clientID: string;
		clientSecret: string;
		redirectURI: string;
	}
	
	constructor(jsonConfig:any) {
		this.auth.clientID = jsonConfig.auth.clientID;
		this.auth.clientSecret = jsonConfig.auth.clientSecret;
		this.auth.redirectURI = jsonConfig.auth.redirectURI;
	}
}

export class Spotify {
	axios: axios.AxiosStatic = axios;
	spotifyApi: any;
	config: SpotifyConfig;
	
	constructor(config:SpotifyConfig) {
		this.config = config;
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
				var token = response.data['access_token'];
				this.spotifyApi.setAccessToken(token);
				resolve();
			}).catch(response => {
				reject(response);
			});
		});
	}
	
	public getPlayList(id: string):Promise<Track[]> {
		return new Promise((resolve, reject) => {
			
		});
	}
}