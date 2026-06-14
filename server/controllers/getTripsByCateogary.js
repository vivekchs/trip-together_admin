const Trip = require('../models/tripsSchema');

const getPopularTripsByCategory = async (req, res) => {
  try {
    const { category, limit = 10 } = req.body;

    if (!category) {
      return res.code(400).send({
        status: 'error',
        message: 'Category is required',
      });
    }

    const trips = await Trip.aggregate([
      { $match: { category, status: { $ne: 'completed' } } },
      {
        $addFields: {
          userCount: { $size: '$users' },
        },
      },
      { $sort: { userCount: -1 } }, // Always sort by most users
      { $limit: parseInt(limit) },
    ]);

    res.code(200).send({
      status: 'success',
      total: trips.length,
      data: trips,
    });
  } catch (error) {
    console.error('Error fetching popular trips by category:', error);
    res.code(500).send({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

module.exports = getPopularTripsByCategory;
