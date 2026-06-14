const schema = require('../config/schema.json');
const getTrendingTrips = require('../controllers/getTrendingTripsFromDB.js');
const createTrip = require('../controllers/createTrip.js');
const getTripsForUser = require('../controllers/getTripsForUser.js');
const getUsersForTrip = require('../controllers/getUsersForTrip.js');
const getTripsForGuide = require('../controllers/getTripsForGuide.js');
const getTripDetails = require('../controllers/getTripDetails.js');
const getPopularTripsByCategory = require('../controllers/getTripsByCateogary.js');

const { userSignup, userLogin } = require('../controllers/loginSignupController.js');
const { guideSignup, guideLogin, registerAsGuide, updateGuideProfile } = require('../controllers/guideLoginSignup.js');
const getImageFromText = require('../controllers/getImageFromText.js');
const getTripadvisorPlaces = require('../controllers/getMostVisitedPlaces.js');
const addTripToUser = require('../controllers/addTripToUser.js');
const { geminiFetch } = require('../controllers/geminiApi.js');
const getAllGuides = require('../controllers/getAllGuides.js');
const { verifyAdmin } = require('../middleware/authMiddleware');
const {
  adminLogin,
  getPendingGuides,
  approveGuide,
  getAllGuidesForAdmin,
  getAllTripsForAdmin,
  deleteGuide,
  deleteTrip,
} = require('../controllers/adminController');

async function routes(fastify) {
  fastify.post(
    schema.dataBaseApis['getAllGuides'].schema.url,
    schema.dataBaseApis['getAllGuides'],
    getAllGuides
  );
  fastify.post(
    schema.externalApis['geminiApi'].schema.url,
    schema.externalApis['geminiApi'],
    geminiFetch
  );
  fastify.post(
    schema.dataBaseApis['addTripToUser'].schema.url,
    schema.dataBaseApis['addTripToUser'],
    addTripToUser
  );
  fastify.post(
    schema.externalApis['getMostVisitedPlaces'].schema.url,
    schema.externalApis['getMostVisitedPlaces'],
    getTripadvisorPlaces
  );
  fastify.post(
    schema.dataBaseApis['createTrip'].schema.url,
    schema.dataBaseApis['createTrip'],
    createTrip
  );
  fastify.post(
    schema.dataBaseApis['getTripsForGuide'].schema.url,
    schema.dataBaseApis['getTripsForGuide'],
    getTripsForGuide
  );
  fastify.post(
    schema.dataBaseApis['getTripDetails'].schema.url,
    schema.dataBaseApis['getTripDetails'],
    getTripDetails
  );
  fastify.post(
    schema.dataBaseApis['getTripsForUser'].schema.url,
    schema.dataBaseApis['getTripsForUser'],
    getTripsForUser
  );
  fastify.post(
    schema.dataBaseApis['getUsersForTrip'].schema.url,
    schema.dataBaseApis['getUsersForTrip'],
    getUsersForTrip
  );
  fastify.post(
    schema.dataBaseApis['getTripsFromDB'].schema.url,
    schema.dataBaseApis['getTripsFromDB'],
    getTrendingTrips
  );
  fastify.post(
    schema.dataBaseApis['userSignup'].schema.url,
    schema.dataBaseApis['userSignup'],
    userSignup
  );
  fastify.post(
    schema.dataBaseApis['userLogin'].schema.url,
    schema.dataBaseApis['userLogin'],
    userLogin
  );
  fastify.post(
    schema.dataBaseApis['guideSignup'].schema.url,
    schema.dataBaseApis['guideSignup'],
    guideSignup
  );
  fastify.post(
    schema.dataBaseApis['guideLogin'].schema.url,
    schema.dataBaseApis['guideLogin'],
    guideLogin
  );
  fastify.post(
    schema.dataBaseApis['registerAsGuide'].schema.url,
    schema.dataBaseApis['registerAsGuide'],
    registerAsGuide
  );
  fastify.post(
    schema.dataBaseApis['updateGuideProfile'].schema.url,
    schema.dataBaseApis['updateGuideProfile'],
    updateGuideProfile
  );
  fastify.post(
    schema.dataBaseApis['adminLogin'].schema.url,
    schema.dataBaseApis['adminLogin'],
    adminLogin
  );
  fastify.post(
    schema.dataBaseApis['getPendingGuides'].schema.url,
    {
      ...schema.dataBaseApis['getPendingGuides'],
      preHandler: verifyAdmin,
    },
    getPendingGuides
  );
  fastify.post(
    schema.dataBaseApis['approveGuide'].schema.url,
    {
      ...schema.dataBaseApis['approveGuide'],
      preHandler: verifyAdmin,
    },
    approveGuide
  );
  fastify.post(
    schema.dataBaseApis['adminGetAllGuides'].schema.url,
    {
      ...schema.dataBaseApis['adminGetAllGuides'],
      preHandler: verifyAdmin,
    },
    getAllGuidesForAdmin
  );
  fastify.post(
    schema.dataBaseApis['adminGetAllTrips'].schema.url,
    {
      ...schema.dataBaseApis['adminGetAllTrips'],
      preHandler: verifyAdmin,
    },
    getAllTripsForAdmin
  );
  fastify.post(
    schema.externalApis['getImageFromText'].schema.url,
    schema.externalApis['getImageFromText'],
    getImageFromText
  );
  fastify.post(
    schema.dataBaseApis['getTripsByCategory'].schema.url,
    schema.dataBaseApis['getTripsByCategory'],
    getPopularTripsByCategory
  );
  
  // Delete routes (admin only)
  fastify.delete(
    '/api/admin/guides/:guideId',
    { preHandler: verifyAdmin },
    deleteGuide
  );
  
  fastify.delete(
    '/api/admin/trips/:tripId',
    { preHandler: verifyAdmin },
    deleteTrip
  );
}

module.exports = routes;
