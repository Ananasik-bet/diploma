const express = require('express');
const api = express.Router();


api.get('/ping', async (req, res) => {
  res.json({
    success: true,
    message: "pong"
  })
});

module.exports = api;