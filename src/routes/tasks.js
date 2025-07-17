const express = require('express');
const router = express.Router();
const { processEmails } = require('../services/emailProcessor');

router.post('/process', async (req, res, next) => {
  try {
    const { query, provider } = req.body;
    await processEmails(query, process.env.SYSTEM_PROMPT, provider || 'openai');
    res.json({ status: 'queued' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
