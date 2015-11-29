// Type definitions for spotify-web-api-node
// Project: https://github.com/mzabriskie/axios

interface ISpotifyLoginAuth {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
}

declare interface SpotifyWebAPI {
	setAccessToken(accessToken:string): void;
	getPlaylist(username:string, id:string): Promise<any>;
	new(auth:ISpotifyLoginAuth): SpotifyWebAPI;
}


