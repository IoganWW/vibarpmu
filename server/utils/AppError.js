class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // вызывает конструктор родителя (Error)
    this.statusCode = statusCode;
    this.isOperational = true; // пометка, что ошибка "управляемая" (не баг кода)

    Error.captureStackTrace(this, this.constructor); // красивая чистая трассировка ошибок
  }
}

module.exports = AppError;
