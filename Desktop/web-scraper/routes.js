const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/products', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'products.json');
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath);
      const products = JSON.parse(data);
      res.json(products);
    } else {
      res.status(404).send('No data available');
    }
  } catch (error) {
    res.status(500).send('Error reading data');
  }
});

module.exports = router;
