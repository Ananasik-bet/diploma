const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });
const { banIp } = require('./checkIP');
const { banRequest } = require('./checkIP')


const csrfProtectionWithBan = (req, res, next) => {
  csrfProtection(req, res, (err) => {
    if (err) {
      // CSRF token validation failed
      banRequest(req, 'CSRF attempt detected')
      const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
      banIp(ip, 'CSRF attempt detected').then(() => {
        return res.status(403).send('Access denied. CSRF attempt detected.');
      }).catch(next);
    } else {
      next();
    }
  });
};

module.exports = { csrfProtectionWithBan };