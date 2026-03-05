const UserModel = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  const result = UserModel.getAll(req.query.role);
  res.status(200).json({ success: true, count: result.length, data: result });
};

exports.getUserById = (req, res) => {
  const user = UserModel.getById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  res.status(200).json({ success: true, data: user });
};

exports.createUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Les champs name et email sont requis' });
  }
  if (UserModel.emailExists(email)) {
    return res.status(409).json({ success: false, message: 'Cet email est déjà utilisé' });
  }
  const newUser = UserModel.create({ name, email, role });
  res.status(201).json({ success: true, data: newUser });
};

exports.updateUser = (req, res) => {
  const user = UserModel.getById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  const { id, createdAt, ...updates } = req.body;
  if (updates.email && UserModel.emailExists(updates.email, user.id)) {
    return res.status(409).json({ success: false, message: 'Cet email est déjà utilisé' });
  }
  const updated = UserModel.update(req.params.id, updates);
  res.status(200).json({ success: true, data: updated });
};

exports.deleteUser = (req, res) => {
  const removed = UserModel.remove(req.params.id);
  if (!removed) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  res.status(204).send();
};
