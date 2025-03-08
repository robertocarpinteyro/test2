
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

oAuth2Client.setCredentials({
  refresh_token: '1//0fo1uyFGgeYbLCgYIARAAGA8SNwF-L9Irjh6BcLwjw6ajGdIkqA-KQ74PwSyIGFjUIjsOEnYNX8NlPg2XRmLd2wwi83FufG3QT6A', // Reemplaza 'YOUR_REFRESH_TOKEN' con el token que obtuviste
});

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

async function appendDataToSheet(data) {
  const spreadsheetId = '1UDohHohBoJWOtH2j4kS2LDUALQyVZeBeDP1tjevYywk'; // Reemplaza 'YOUR_SPREADSHEET_ID' con el ID de tu hoja de cálculo
  const range = '1UDohHohBoJWOtH2j4kS2LDUALQyVZeBeDP1tjevYywk!A:C'; // Ajusta el rango según sea necesario

  console.log('Appending data to sheet:', { spreadsheetId, range, data });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: {
      values: [data],
    },
  });

  console.log('Data appended to sheet successfully');
}

module.exports = { appendDataToSheet };