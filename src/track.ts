/// <reference path="../typings/tsd.d.ts" />

declare module track {
	export class Track {
		position: number;
		name: string;
		artist: string;
		album: string;
		
		constructor(position:number, name:string, artist:string, album:string) {
			this.position = position;
			this.name = name;
			this.artist = artist;
			this.album = album;
		}
	}
}