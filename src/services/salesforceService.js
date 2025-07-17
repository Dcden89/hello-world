const axios = require('axios');

let auth = null;

async function authenticate() {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', process.env.SALESFORCE_CLIENT_ID);
  params.append('client_secret', process.env.SALESFORCE_CLIENT_SECRET);
  params.append('username', process.env.SALESFORCE_USERNAME);
  params.append('password', process.env.SALESFORCE_PASSWORD);

  const url = `https://$${'{process.env.SALESFORCE_DOMAIN}'}/services/oauth2/token`;
  const res = await axios.post(url, params);
  auth = { accessToken: res.data.access_token, instanceUrl: res.data.instance_url };
  return auth;
}

function getAuth() { return auth; }

async function createContact(fields) {
  const { instanceUrl, accessToken } = auth;
  const url = `${instanceUrl}/services/data/v57.0/sobjects/Contact/`;
  const res = await axios.post(url, fields, { headers: { Authorization: `Bearer ${accessToken}` } });
  return res.data.id;
}

async function createTask(payload) {
  const { instanceUrl, accessToken } = auth;
  const url = `${instanceUrl}/services/data/v57.0/sobjects/Task/`;
  const res = await axios.post(url, payload, { headers: { Authorization: `Bearer ${accessToken}` } });
  return res.data.id;
}

async function createTaskRelations(taskId, contactIds) {
  if (!contactIds.length) return;
  const { instanceUrl, accessToken } = auth;
  const url = `${instanceUrl}/services/data/v57.0/composite/batch`;
  const batchRequests = contactIds.map(id => ({
    method: 'POST',
    url: '/services/data/v57.0/sobjects/TaskRelation/',
    richInput: { TaskId: taskId, RelationId: id }
  }));
  await axios.post(url, { batchRequests }, { headers: { Authorization: `Bearer ${accessToken}` } });
}

module.exports = { authenticate, getAuth, createContact, createTask, createTaskRelations };
