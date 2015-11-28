/// <reference path="../typings/tsd.d.ts" />

var jsonConfig:any = require('../config/spotify');
import * as spotify from './spotify';
import * as logger from './logger';

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
	id: string;
	logger: logger.ILogger;
	
	constructor(id:string) {
		this.id = id;
		this.logger = new logger.BunyanLogger();
	}
	
	public getSongs(id:string):Promise<any[]> {
		this.logger.info("Getting songs from the playlist " + id);	
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