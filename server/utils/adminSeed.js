const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema');

const seedAdmin = async () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn('Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD is not set');
    return;
  }

  const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
  if (existingAdmin) {
    console.log('Admin account already exists:', ADMIN_EMAIL);
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = new Admin({
    name: ADMIN_NAME || 'Admin',
    email: ADMIN_EMAIL.toLowerCase(),
    password: hashedPassword,
  });

  await admin.save();
  console.log('Admin account created:', ADMIN_EMAIL);
};

module.exports = seedAdmin;
