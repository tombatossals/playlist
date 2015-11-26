/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../spotify-web-api-node.d.ts" />

var axios = require("axios");
var SpotifyWebApi = require('spotify-web-api-node');
var clientId:string= require('../config/spotify').clientId;
var clientSecret:string = require('../config/spotify').clientSecret;
var apiURL:string = require('../config/spotify').apiURL;
var redirectUri:string = require('../config/spotify').redirectUri;
var base64Auth = new Buffer(clientId + ':' + clientSecret).toString('base64');

class RockBandPlayList {
	axios: axios.AxiosStatic = axios;
	spotifyApi: any;
	
	private getSpotifyAccessToken() {
		axios({
			url: apiURL,
			method: 'post',
			params: {
				grant_type: 'client_credentials'	
			},
			headers: { 
			Authorization: 'Basic ' + base64Auth,
			'Content-Type':'application/x-www-form-urlencoded' 
			}
		}).then(response => {
			var token = response.data['access_token'];
			spotifyApi.setAccessToken(token);
			getPlaylist('bufanuvols', '6wOqqTrN3ZzdiyoEDMtfTW');
			
		}).catch(response => {
			console.log(response);
		});
	}
	
	constructor(public id:string) {
		this.spotifyApi = new SpotifyWebApi({
			clientId: clientId,
			clientSecret: clientSecret,
			redirectUri: redirectUri
		});		
	}
	
	public getSongs():Promise<any[]> {
		this.spotifyApi.getPlaylist(user, id).then((data) => {
			var tracks:any[] = data.body.tracks.items;
			
			tracks.forEach((element, i) => {
				console.log(i +1 , element.track.name, element.track.artists[0].name, element.track.album.name);
			});
		});
		
		return 'hola';
	}
}

declare module 'RockBandPlayList' {
	export = RockBandPlayList;
};