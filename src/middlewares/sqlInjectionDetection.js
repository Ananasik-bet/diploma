const banIp = require('./checkIP');

const sqlInjectionDetection = async (req, res, next) => {
    const isSuspicious = (value) => {
      const sqlInjectionPatterns = [
        // List of patterns commonly found in SQL injections
        '--', ';', '/*', '*/', '@@', '@', 
        'char', 'nchar', 'varchar', 'nvarchar', 
        'alter', 'begin', 'cast', 'create', 'cursor', 
        'declare', 'delete', 'drop', 'end', 'exec', 
        'execute', 'fetch', 'insert', 'kill', 'select', 
        'sys', 'sysobjects', 'syscolumns', 'table', 'update'
      ];
  
      return sqlInjectionPatterns.some(pattern => value.includes(pattern));
    };
  
    const { query, params, body } = req;
  
    // Check for SQL injection patterns in query, params, and body
    if (
      Object.values(query).some(isSuspicious) ||
      Object.values(params).some(isSuspicious) ||
      Object.values(body).some(isSuspicious)
    ) {
        const ip = req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        await banIp(ip, 'SQL injection attempt')
        return res.status(400).send('SQL injection attempt detected');
    }
  
    next();
  };
  
  module.exports = {
    sqlInjectionDetection,
  };
  