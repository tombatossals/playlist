/// <reference path="../../typings/tsd.d.ts" />

import * as mongoose from "mongoose";

interface ITrackModel extends mongoose.Document {
    name: string;
    id: string;
    updated: Date;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    name: String,
    id: {
        type: String,
        unique: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
}).pre('save', function(next) {
    this.updated = new Date();
    next();
});


var _model = mongoose.model <ITrackModel> ('TrackModel', _schema);

export class TrackModel {

    private _document: ITrackModel;
    
    constructor(document: ITrackModel) {
        this._document = document;
    }
    
    static insertTracks<T>(tracks: T[]) {
        tracks.forEach(track => {
            console.log(track);
        });
    }
}