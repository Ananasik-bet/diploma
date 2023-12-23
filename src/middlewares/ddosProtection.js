const requestCounts = {};
const REQUEST_LIMIT = 100; // Example threshold
const TIME_WINDOW_MS = 60000; // Time window in milliseconds

const ddosProtection = (req, res, next) => {
  const ip = req.ip;
  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, timer: setTimeout(() => delete requestCounts[ip], TIME_WINDOW_MS) };
  } else {
    requestCounts[ip].count++;
    if (requestCounts[ip].count > REQUEST_LIMIT) {
      // Ban IP and clean up
      clearTimeout(requestCounts[ip].timer);
      delete requestCounts[ip];
      // Implement IP ban logic here
      return res.status(429).send('Too many requests - IP banned due to suspected DDoS');
    }
  }
  next();
};

module.exports = {
    ddosProtection
}