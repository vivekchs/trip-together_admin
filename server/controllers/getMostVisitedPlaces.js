const axios = require('axios');

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = 'travel-advisor.p.rapidapi.com';

// Sleep utility
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wikipedia fallback
async function fetchWikipediaDescription(title) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await axios.get(url);
    return res.data.extract || null;
  } catch (err) {
    console.warn(`Wikipedia fallback failed for ${title}: ${err.message}`);
    return null;
  }
}

// Main function
async function getTripadvisorPlaces(req, res) {
  const { query } = req.body;

  const searchOptions = {
    method: 'GET',
    url: `https://${RAPID_API_HOST}/locations/search`,
    params: {
      query,
      limit: '30',
      offset: '0',
      units: 'km',
      currency: 'INR',
      sort: 'relevance',
      lang: 'en_US',
    },
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    },
  };

  try {
    const searchRes = await axios.request(searchOptions);
    const items = searchRes.data.data;

    const blacklist = /tour|taxi|driver|car|mall|planner|travel|agency|holidays|private/i;
    const filtered = items
      .filter(
        item =>
          item.result_type === 'things_to_do' &&
          item.result_object?.photo?.images?.large?.url &&
          !blacklist.test(item.result_object.name)
      )
      .slice(0, 20); // buffer in case some fail

    const results = [];

    for (const item of filtered) {
      const title = item.result_object.name;
      const image = item.result_object.photo.images.large.url;
      let description = item.result_object.description || null;

      if (!description && !blacklist.test(title)) {
        description = await fetchWikipediaDescription(title);
      }

      results.push({ title, image, description });

      if (results.length === 10) break;

      await sleep(500); // short delay to avoid Wikipedia rate limits
    }

    return results;
  } catch (err) {
    console.error('Tripadvisor API error:', err.message);
    return [];
  }
}

module.exports = getTripadvisorPlaces;
