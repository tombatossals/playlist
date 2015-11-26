/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../spotify-web-api-node.d.ts" />

var jsonConfig:any = require('../config');
import { Track } from 'track';
import { Spotify, SpotifyConfig } from 'spotify';

export class PlayList {
	config:SpotifyConfig = new SpotifyConfig(jsonConfig);
	spotify:Spotify = new Spotify(jsonConfig);
	id:string;
	
	constructor(id:string) {
		this.id = id;
	}
	
	public getSongs(id:string):Promise<any[]> {
		return new Promise((resolve, reject) => {
			this.spotify.getPlayList(this.id).then((data:any) => {
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