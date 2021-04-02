// Catch error handlers

exports.catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      // Validation errors
      if (typeof err === 'string') {
        res.status(400).json({
          message: err,
        });
      } else if (typeof err === 'object') {
        if (err.length > 0) {
          res.status(400).json(err);
        } else {
          res.status(400).json(err.message);
        }
      } else {
        next(err);
      }
    });
  };
};

// MongoDB validation error handler

exports.mongooseError = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  let message = '';
  errorKeys.forEach((key) => {
    message += `${err.errors[key].message}, `;
    return message;
  });

  message = message.substr(0, message.length - 2);

  return res.status(400).json({
    message,
  });
};

// Development error handler

exports.developmentErrors = (err, req, res) => {
  const error = err;
  error.stack = err.stack || '';

  res.status(error.status || 500).json(error); // Send JSON back
};

// Production error handler

// No stacktraces and error details are leaked to user
exports.productionErrors = (err, req, res) => {
  res.status(err.status || 500).json({
    error: 'Internal server error',
  });
};

// 404 Page error
exports.notFound = (req, res) => {
  res.status(404).json({
    message: 'Route not found.',
  });
};
