const { banned_ip } = require('../services/banned')

const get_banned_ip = async() => {
    try {
       const data = banned_ip();

       return data
    } catch (error) {
        throw error;
    }
}

module.exports = {
    get_banned_ip
}