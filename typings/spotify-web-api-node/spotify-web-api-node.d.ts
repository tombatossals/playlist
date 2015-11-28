declare module "spotify-web-api-node" {
	
	class SpotifyWebApiNode {
		setAccessToken<T>(accessToken:string): void;
	}
	
	export = SpotifyWebApiNode;
}