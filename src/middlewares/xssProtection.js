const xss = require('xss-clean');
const { banIp } = require('./checkIP');
const { banRequest } = require('./checkIP')


module.exports = async (req, res, next) => {
  const detectXssAttempt = (value) => {
    // Define patterns that are indicative of XSS attacks
    const xssPatterns = ['<script>', 'javascript:', '<iframe>', 'onerror', 'onload'];
    return xssPatterns.some(pattern => value.includes(pattern));
  };

  const isSuspicious = Object.values(req.body).some(detectXssAttempt) ||
                       Object.values(req.query).some(detectXssAttempt) ||
                       Object.values(req.params).some(detectXssAttempt);

  if (isSuspicious) {
    await banRequest(req, 'XSS attempt detected')
    const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    await banIp(ip, 'XSS attempt detected');
    return res.status(403).send('Access denied. XSS attempt detected.');
  }

  // Clean the data if no XSS patterns are detected
  // req.body = xss(req.body);
  // req.query = xss(req.query);
  // req.params = xss(req.params);

  next();
};
