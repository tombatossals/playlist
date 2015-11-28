/// <reference path="../typings/tsd.d.ts" />

var jsonConfig:any = require('../config/spotify');
import * as spotify from './spotify';

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

export class PlayList {
	config:spotify.SpotifyConfig = new spotify.SpotifyConfig(jsonConfig);
	spotify:spotify.Spotify = new spotify.Spotify(jsonConfig);
	id:string;
	
	constructor(id:string) {
		this.id = id;
	}
	
	public getSongs(id:string):Promise<any[]> {
		return new Promise((resolve, reject) => {
			this.spotify.getPlayList(id).then((data:any) => {
				var tracks:Track[] = [];
				var dataTracks:any = data.body.tracks.items;
				
				dataTracks.forEach((element, i) => {
					var track:Track = new Track(i+1, element.track.name, element.track.artists[0].name, element.track.album.name);
					tracks.push(track);	
				});
				resolve(tracks);
			});
		});
		
	}
}