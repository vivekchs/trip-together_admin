const axios = require('axios');
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function getImageFromText(req, res) {
  const { query } = req.body;

  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    const imageUrl = response.data?.urls?.regular;
    return imageUrl || 'No image found';
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error.message);
    return null;
  }
}

module.exports = getImageFromText;
