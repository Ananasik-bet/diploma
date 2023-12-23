module.exports = (router) => {
  router.use('/dashboard', require('./dashboard.router'))

  router.get("/", (req, res) => {
    res.json({ message: "Welcome to the TEMP REST API" })
  });
}