// Type definitions for spotify-web-api-node
// Project: https://github.com/thelinmichael/spotify-web-api-node

declare module "spotify-web-api-node" {
	
}

interface ISpotifyLoginAuth {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
}

declare interface SpotifyWebAPI {
	setAccessToken(accessToken:string): void;
	getPlaylist(username:string, id:string): Promise<any>;
	getPlaylistTracks(username:string, id:string): Promise<any>;
	new(auth:ISpotifyLoginAuth): SpotifyWebAPI;
}
