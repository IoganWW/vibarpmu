module.exports = (err, req, res, next) => {
  console.error(err.stack); // для логов в консоль

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    isOperational: err.isOperational || false
  });
};
