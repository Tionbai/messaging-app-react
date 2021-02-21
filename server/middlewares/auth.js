const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw 'Forbidden. No authorization headers found.';
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET);
    req.payload = payload.id;

    next();
  } catch (err) {
    res.status(401).json({
      message: 'Forbidden. We could not validate your authorization headers.',
    });
  }
};
