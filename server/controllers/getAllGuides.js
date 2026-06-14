const Guide = require('../models/guideSchema');

const getAllGuides = async (req, res) => {
  try {
    const { limit = 10 } = req.body;

    const guides = await Guide.find().limit(limit);

    res.status(200).send({
      status: 'success',
      total: guides.length,
      data: guides,
    });
  } catch (error) {
    console.error('Error fetching all guides:', error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

module.exports = getAllGuides;
