const express = require('express');
const api = express.Router();
const { exec } = require('child_process');
const { banIp } = require('../middlewares/checkIP');
const { get_logs, get_banned_logs } = require('../controllers/request_log')
const { get_banned_ip } = require('../controllers/banned_ip')


api.get('/ping', async (req, res) => {
  res.json({
    success: true,
    message: "pong"
  })
});

api.get('/ip-requests', async (req, res) => {
  try{
    const data = await get_logs();

    res.status(200).json({
      success: true,
      data: data
    })
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e.message
    })
  }
  

})

api.get('/banned-requests', async (req, res) => {
  try{
    const data = await get_banned_logs();

    res.status(200).json({
      success: true,
      data: data
    })
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e.message
    })
  }
})

api.post('/ban-ip', async (req, res) => {
  const {
    ip,
    reason
  } = req.body;

  try{
    await banIp(ip, reason);
    res.status(201).json({
      success: true,
      message: 'IP Banned',
      reason: reason,
      ip: ip
    })
  } catch (e) { 
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
})

api.get('/ban-ip', async (req, res) => {
  try{
    
    const data = await get_banned_ip();
    res.status(201).json({
      success: true,
      data: data,
    })
  } catch (e) { 
    res.status(400).json({
      success: false,
      message: e.message
    })
  }
})


api.get('/firewall-status', (req, res) => {
  exec('sudo iptables -L', (error, stdout, stderr) => {
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