/// <reference path="../../typings/tsd.d.ts" />

import * as mongoose from "mongoose";
import { ISpotifyTrack } from "../lib/spotify";
interface ITrackModel extends ISpotifyTrack, mongoose.Document {
}

var _schema: mongoose.Schema = new mongoose.Schema({
    added_at: Date,
    added_by: String,
    playlist: {
        username: String,
        id: String
    },
    track: {
        uri: String,
        type: String,
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
            type: String,
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
            type: String,
            uri: String
        }
    },
    updated: {
        type: Date,
        default: Date.now
    }
}).pre('save', function(next) {
    this.updated = new Date();
    next();
});


var _model = mongoose.model <ITrackModel> ('Track', _schema);

export class TrackModel {

    private _document: ITrackModel;
    
    constructor(document: ITrackModel) {
        this._document = document;
    }

    static createTrackModels(tracks:ISpotifyTrack[]):TrackModel[] {
        var trackModels = [];
        
        tracks.forEach(track => {
            var trackModel = new _model(track);
            
            trackModels.push(trackModel);    
        });
        
        return trackModels;
    }
    
    static insertTracks(tracks: ISpotifyTrack[]):Promise<ITrackModel[]> {
        return new Promise((resolve, reject) => {
            _model.create(tracks).then(result => {
                console.log('ye');
                resolve(result);
            }, err => {
                console.log(err);
                reject(err);
            });
        });
    }
}