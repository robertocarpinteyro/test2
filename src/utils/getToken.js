// filepath: c:\Users\AMD FX\Desktop\NiddoTemp\NIDDIOS\test2\src\utils\getToken.js
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const fs = require('fs');
const path = require('path');

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'client_secret_980737525198-e2uon4k0cll48gdtdab51qv2po3sck6o.apps.googleusercontent.com.json')));

const oAuth2Client = new OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  'http://localhost'
);

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this url:', authUrl);

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from that page here: ', (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log('Your refresh token is:', token.refresh_token);
  });
});