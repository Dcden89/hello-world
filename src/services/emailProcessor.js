const EmailLog = require('../models/EmailLog');
const { listMessages } = require('./gmailService');
const { analyzeEmail } = require('./llmService');
const salesforce = require('./salesforceService');

async function processEmails(query, systemPrompt, provider) {
  const messages = await listMessages(query);
  for (const msg of messages) {
    // placeholder: fetch details using Gmail API
    const body = '...';
    const analysis = await analyzeEmail(provider, systemPrompt, body);
    await EmailLog.create({
      threadId: msg.threadId,
      messageId: msg.id,
      body,
      execSummary: analysis.summary,
      messageTags: analysis.tags,
      sentiment: analysis.sentiment,
      emailCategory: analysis.Category,
    });
    // create Salesforce records based on analysis
    // await salesforce.createTask(...)
  }
}

module.exports = { processEmails };
