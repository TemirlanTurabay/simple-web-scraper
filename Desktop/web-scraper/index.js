const express = require('express');
const cron = require('node-cron');
const { scrape2Play } = require('./scraper');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;
cron.schedule('0 0 * * *', scrape2Play);

app.use('/api', routes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  scrape2Play();
});
