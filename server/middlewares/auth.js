const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('Forbidden. No authorization headers found.');
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET);
    req.payload = payload.id;

    const user = await User.findById(payload.id);
    if (!user)
      throw new Error('The request can only be made by a registered user.');

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Forbidden. We could not validate your authorization headers.',
    });
  }
};
