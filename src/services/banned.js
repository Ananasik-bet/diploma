const db = require('../database/models/index')

const banned_ip = async() => {
    try {
        const banned = await db.BannedIP.findAll();
        return banned;
      } catch (error) {
        console.error('Error retrieving logs:', error.message);
        throw error;
      }
}

module.exports = {
    banned_ip
}