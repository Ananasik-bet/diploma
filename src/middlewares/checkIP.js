const db = require('../database/models/index')

const checkBannedIp = async (req, res, next) => {
    const ip_address = req.ip || req.connection.remoteAddress;
    try {
      const banned = await db.BannedIP.findOne({ where: { ip_address: ip_address } });
      if (banned) {
        return res.status(403).send('Access denied. Your IP address has been banned.');
      }
      next();
    } catch (error) {
      console.error('Error checking banned IP:', error.message);
      res.status(500).send('An error occurred while checking the IP address.');
    }
};

const banIp = async (ip_address, reason) => {
  try {
    // Add the IP address to the database
    await db.BannedIP.create({
      ip_address,
      reason,
    });
    console.log('IP address banned:', ip_address, ' Reason: ', reason);
  } catch (error) {
    console.error('Error banning IP address:', error.message);
  }
};

module.exports = {
    checkBannedIp,
    banIp
};
