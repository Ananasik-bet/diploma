const db = require('../database/models/index')

const get_request_logs = async() => {
    try {
        const logs = await db.RequestLog.findAll({
          limit: 50, // Limit to the last 50 entries
          order: [['createdAt', 'DESC']], // Order by creation date, descending
        });
        return logs;
      } catch (error) {
        console.error('Error retrieving logs:', error.message);
        throw error;
      }
}

module.exports = {
    get_request_logs
}