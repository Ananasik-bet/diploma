const { get_request_logs, get_banned_request_logs } = require('../services/log')

const get_logs = async() => {
    try {
       const data = get_request_logs();

       return data
    } catch (error) {
        throw error;
    }
}

const get_banned_logs = async() => {
    try {
       const data = get_banned_request_logs();

       return data
    } catch (error) {
        throw error;
    }
}

module.exports = {
    get_logs,
    get_banned_logs
}