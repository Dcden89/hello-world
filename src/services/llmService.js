const axios = require('axios');

const providers = {
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    model: process.env.OPENAI_MODEL || 'o4-mini',
    key: process.env.OPENAI_KEY,
  },
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-haiku-20241022',
    key: process.env.ANTHROPIC_KEY,
  },
};

function buildPayload(provider, systemPrompt, emailBody) {
  switch (provider) {
    case 'openai':
      return {
        model: providers.openai.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: emailBody }
        ],
        max_tokens: 1000,
      };
    case 'anthropic':
      return {
        model: providers.anthropic.model,
        messages: [{ role: 'user', content: systemPrompt + emailBody }],
        max_tokens: 1000,
      };
    default:
      throw new Error('Unknown provider');
  }
}

async function analyzeEmail(provider, systemPrompt, body) {
  const cfg = providers[provider];
  const payload = buildPayload(provider, systemPrompt, body);
  const headers = { 'Content-Type': 'application/json' };
  if (provider === 'openai') headers['Authorization'] = `Bearer ${cfg.key}`;
  if (provider === 'anthropic') {
    headers['x-api-key'] = cfg.key;
    headers['anthropic-version'] = '2023-06-01';
  }
  const res = await axios.post(cfg.url, payload, { headers });
  const data = res.data;
  const content = provider === 'openai' ? data.choices[0].message.content : data.content[0].text;
  return JSON.parse(content);
}

module.exports = { analyzeEmail };
