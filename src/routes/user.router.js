const express = require('express');
const api = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/models/index');
const { jwtMiddleware } = require('../middlewares/auth')

// Registration
api.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, mail, password } = req.body;

    const user = await db.User.create({ firstName, lastName, mail, password });
    res.status(201).json({
      success: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Login
api.post('/login', async (req, res) => {
    try {
      const { mail, password } = req.body;

      const user = await db.User.findOne({ where: { mail } });
      if (!user) {
        return res.status(401).send('Authentication failed');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send('Authentication failed');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.send({ token });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
});

api.get('/info', jwtMiddleware, async (req, res) => {
    try {
      // Use req.userId to retrieve user information from the database
      const user = await db.User.findOne({
        where: { id: req.user.userId },
        attributes: ['firstName', 'lastName', 'mail'], // Select the desired user attributes
      });
  
      if (!user) {
        return res.status(404).send('User not found.');
      }
  
      // Return user information as JSON response
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        mail: user.mail,
        // Add other user properties as needed
      });
    } catch (error) {
      console.error('Error retrieving user information:', error);
      res.status(500).send('Error retrieving user information.');
    }
});

module.exports = api;