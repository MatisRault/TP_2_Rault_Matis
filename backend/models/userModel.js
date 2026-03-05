const users = require('../data/users');
let nextId = users.length + 1;

module.exports = {
  getAll(role) { return role ? users.filter(u => u.role === role) : users; },
  getById(id) { return users.find(u => u.id === parseInt(id)); },
  emailExists(email, excludeId) { return users.some(u => u.email === email && u.id !== excludeId); },
  create(data) {
    const newUser = { id: nextId++, ...data, role: data.role || 'user', createdAt: new Date().toISOString().split('T')[0] };
    users.push(newUser);
    return newUser;
  },
  update(id, updates) {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    return users[index];
  },
  remove(id) {
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },
};
