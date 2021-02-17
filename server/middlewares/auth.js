const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw 'Forbidden.';
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET, (err, decoded));
    req.payload = payload;
    
    next();
  } catch {
    res.status(401).json({
      message: 'Forbidden.',
    })
  }
};
