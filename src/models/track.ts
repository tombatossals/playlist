/// <reference path="../../typings/tsd.d.ts" />

import * as mongoose from "mongoose";
import { ISpotifyTrack, ISpotifyPlaylistQuery } from "../lib/spotify";
interface ITrackModel extends ISpotifyTrack, mongoose.Document {
}

var _schema: mongoose.Schema = new mongoose.Schema({
    added_at: Date,
    added_by: String,
    playlist_id: String,
    track: {
        uri: String,
        track_number: Number,
        preview_url: String,
        popularity: Number,
        name: String,
        id: String,
        href: String,
        external_Urls: {
            spotify: String
        },
        external_ids: {
            isrc: String
        },
        explicit: Boolean,
        duration_ms: Number,
        disc_number: Number,
        available_markets: [ String ],
        artists: [ {
            external_urls: {
                spotify: String
            },
            href: String,
            id: String,
            name: String,
            uri: String
        }],
        album: {
            album_type: String,
            available_markets: [ String ],
            external_urls: {
                spotify: String
            },
            href: String,
            id: String,
            images: [ {
                height: Number,
                width: Number,
                url: String
            }],
            name: String,
            uri: String
        }
    },
    updated: {
        type: Date,
        default: Date.now
    }
}).pre("save", function(next) {
    this.updated = new Date();
    next();
});


var _model = mongoose.model <ITrackModel> ("Track", _schema);

export class TrackModel {

    private _document: ITrackModel;

    constructor(document: ITrackModel) {
        this._document = document;
    }

    static deletePlayList(spotifyPlaylist: ISpotifyPlaylistQuery): Promise<boolean> {
        return new Promise((resolve, reject) => {
            _model.remove({ playlist_id: spotifyPlaylist.id }, (err) => {
                err ? reject(err) : resolve(true);
            });
        });
    }

    static insertTracks(tracks: ISpotifyTrack[]):Promise<ITrackModel[]> {
        return new Promise((resolve, reject) => {
            _model.create(tracks).then(result => {
                resolve(result);
            }, err => {
                reject(err);
            });
        });
    }
}