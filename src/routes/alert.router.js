import express from 'express';
const router = express.Router();

// GET route for the alert home page
router.get('/', (req, res) => {
  res.send('Alert Home');
});

// GET route for displaying alert data
router.get('/data', (req, res) => {
  // Implement logic to fetch and send alert data
  res.send('Alert Data');
});

// POST route for submitting data to the alert system
router.post('/submit', (req, res) => {
  // Implement logic to process submitted alert data
  res.send('Data Submitted to Alert System');
});

export default router;