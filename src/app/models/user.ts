/// <reference path="../../../typings/tsd.d.ts" />

import * as mongoose from "mongoose";

interface IUser extends mongoose.Document {
    username: string;
    password: string;
    admin: boolean;
    updated: Date;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    admin: Boolean,
    updated: {
        type: Date,
        default: Date.now
    }
}).pre('save', function(next) {
    this.updated = new Date();
    next();
});


var _model = mongoose.model <IUser> ('User', _schema);

class User {

    private _document: IUser;
    
    constructor(document: IUser) {
        this._document = document;
    }
    
    static findByUsername(username: string): Promise <IUser> {
        return new Promise <IUser>((resolve, reject) => {
            _model.findOne({ username: username}).exec().then(user => {
                resolve(user);
                console.log(user);
            }).reject((err) => {
                reject(err);
            })
        })
    }
}

export = User;