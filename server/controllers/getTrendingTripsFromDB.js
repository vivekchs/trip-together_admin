const Trip = require('../models/tripsSchema');
const axios = require('axios');
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function getImageFromText(query) {
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

const getTrendingTrips = async (req, res) => {
  try {
    const trendingTrips = await Trip.find({ status: { $ne: 'completed' } })
      .sort({ users: -1 })
      .populate('users', 'name')
      .populate('guide', 'name');

    const enrichedTrips = await Promise.all(
      trendingTrips.map(async trip => {
        try {
          const tripObj = trip.toObject();

          if (tripObj.imageUrl) {
            return tripObj;
          }

          const image = await getImageFromText(tripObj.state);

          trip.imageUrl = image;
          await trip.save();

          return {
            ...tripObj,
            imageUrl: image,
          };
        } catch (error) {
          console.error('Error enriching trip:', error);
          return trip.toObject(); // fallback on error
        }
      })
    );

    console.log('Trending Trips:', enrichedTrips);
    res.code(200).send(enrichedTrips);
  } catch (error) {
    console.error('Error fetching trending trips:', error);
    res.code(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = getTrendingTrips;
