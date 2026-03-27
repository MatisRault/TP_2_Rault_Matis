require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/userModel');

const seedUsers = [
  { name: 'Alice Martin',   email: 'alice@example.com',   role: 'admin', createdAt: new Date('2024-01-15') },
  { name: 'Bob Dupont',     email: 'bob@example.com',     role: 'user',  createdAt: new Date('2024-02-10') },
  { name: 'Charlie Moreau', email: 'charlie@example.com', role: 'user',  createdAt: new Date('2024-03-05') },
];

(async () => {
  await connectDB();
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany(seedUsers);
    console.log('3 utilisateurs insérés');
  } else {
    console.log('Collection déjà peuplée, seed ignoré');
  }
  process.exit(0);
})();
