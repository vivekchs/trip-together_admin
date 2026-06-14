const jwt = require('jsonwebtoken');

async function verifyAdmin(request, reply) {
  try {
    const authHeader = request.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if (!token) {
      return reply.code(401).send({ message: 'Authorization header required' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role !== 'admin') {
      return reply.code(403).send({ message: 'Admin access required' });
    }

    request.user = payload;
  } catch (error) {
    return reply.code(401).send({ message: 'Invalid or expired token' });
  }
}

module.exports = { verifyAdmin };