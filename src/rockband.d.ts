/// <reference path="../typings/tsd.d.ts" />
import * as spotify from './spotify';
import * as logger from './logger';
export declare class Track {
    position: number;
    name: string;
    artist: string;
    album: string;
    constructor(position: number, name: string, artist: string, album: string);
}
export declare class PlayList {
    config: spotify.SpotifyConfig;
    spotify: spotify.Spotify;
    id: string;
    logger: logger.ILogger;
    constructor(id: string);
    getSongs(id: string): Promise<any[]>;
}
