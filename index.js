'use strict';

var http = require('http');
var SpotifyWebApi = require('spotify-web-api-node');

var clientId = require('./config/spotify_keys').clientId;
var clientSecret = require('./config/spotify_keys').clientSecret;

console.log(clientId);
//SpotifyWebApi.setAccessToken('<your_access_token>');
