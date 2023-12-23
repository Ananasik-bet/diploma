const express = require('express');
const api = express.Router();
const { exec } = require('child_process');

api.get('/ping', async (req, res) => {
  res.json({
    success: true,
    message: "pong"
  })
});

api.get('/firewall-status', (req, res) => {
  console.log('Here')
  exec('sudo iptables -L', (error, stdout, stderr) => {
    console.log('Here')
    if (error) {
      return res.status(500).json({ message: 'Error retrieving firewall status' });
    }
    res.json({ 
      success: true,
      status: stdout 
    });
  });
});

module.exports = api;