// Catch error handlers

exports.catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      // Validation errors
      if (typeof err === 'string') {
        res.status(400).json({
          message: err,
        });
      } else {
        next(err);
      }
    });
  };
};

// MongoDB validation error handler

// Detect if there are mongoDB validation errors so that we send them nicely back.
exports.mongooseError = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const errorKeys = Object.keys(err.errors);
  let message = '';
  errorKeys.forEach((key) => (message += err.errors[key].message + ', '));

  message = message.substr(0, message.length - 2);

  res.status(400).json({
    message,
  });
};

// Development error handler

// In development we show good error messages so if we hit a syntax error or any other error, we get a message explaining.
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };

  res.status(err.status || 500).json(errorDetails); // Send JSON back
};

// Production error handler

// No stacktraces and error details are leaked to user
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: 'Internal server error',
  });
};

// 404 Page error
exports.notFound = (req, res, next) => {
  res.status(404).json({
    message: 'Route not found.',
  });
};
