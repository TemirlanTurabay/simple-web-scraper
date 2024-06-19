const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const URL = 'https://2play.kz/collection/aksessuary/playstation-4/';

const scrape2Play = async () => {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);
    const items = [];
    $('.list-product').each((index, element) => {
      const title = $(element).find('.product-link').text().trim();
      const price = $(element).find('.current-price').text().trim();
      let imageUrl = $(element).find('.first-img').attr('src');
      if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = new URL(imageUrl, URL).href;
      }
      items.push({ title, price, imageUrl });
    });
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    fs.writeFileSync(
      path.join(__dirname, 'data', 'products.json'),
      JSON.stringify(items, null, 2)
    );
    console.log('Scraping completed successfully.');
    return items;
  } catch (error) {
    console.error('Error scraping 2play.kz:', error.message);
    return [];
  }
};

module.exports = { scrape2Play };
