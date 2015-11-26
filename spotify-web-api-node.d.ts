declare module SpotifyWebApiNode {
	  interface SpotifyWebApiNodeStatic {
		  setAccessToken<T>(accessToken:string): void;
	  }
}

declare var spotifyWebApiNode: SpotifyWebApiNode.SpotifyWebApiNodeStatic;

declare module "spotify-web-api-node" {
  export = spotifyWebApiNode;
}
