const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const filter = req.query.role ? { role: req.query.role } : {};
    const users = await User.find(filter);
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ success: false, message: 'ID invalide' });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email)
      return res.status(400).json({ success: false, message: 'Les champs name et email sont requis' });
    const user = await User.create({ name, email, role });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ success: false, message: 'Cet email est déjà utilisé' });
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ success: false, message: 'ID invalide' });
    const { _id, createdAt, ...updates } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ success: false, message: 'Cet email est déjà utilisé' });
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ success: false, message: 'ID invalide' });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
