const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

function getAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify'
  ];
  return oauth2Client.generateAuthUrl({ access_type: 'offline', scope: scopes });
}

async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

async function setCredentials(tokens) {
  oauth2Client.setCredentials(tokens);
}

async function listMessages(query) {
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const res = await gmail.users.messages.list({ userId: 'me', q: query });
  return res.data.messages || [];
}

module.exports = { getAuthUrl, getTokens, setCredentials, listMessages };
