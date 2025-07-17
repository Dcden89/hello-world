const express = require('express');
const router = express.Router();
const gmail = require('../services/gmailService');
const User = require('../models/User');

router.get('/google', (req, res) => {
  const url = gmail.getAuthUrl();
  res.redirect(url);
});

router.get('/google/callback', async (req, res, next) => {
  try {
    const tokens = await gmail.getTokens(req.query.code);
    const [user] = await User.findOrCreate({ where: { email: req.query.state } });
    user.refreshToken = tokens.refresh_token;
    await user.save();
    res.send('Authenticated');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
