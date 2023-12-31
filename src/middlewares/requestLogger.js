const db = require('../database/models/index.js');

const logRequest = async (req) => {
  const { method, url, headers, query, params, body } = req;
  const ip_address =
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  try {
    // Save the request log to the database
    await db.RequestLog.create({
      method,
      url,
      headers,
      query,
      params,
      body,
      ip_address,
    });
    console.log('Request logged and saved:', method, url);
  } catch (error) {
    console.error('Error saving request log:', error.message);
  }
};

module.exports = {
  logRequest,
};
