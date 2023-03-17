const httpStatus = require('http-status');

const errorHandler = (err, req, res, next) => {
    const { statusCode, message } = err;
    const response = {
        error : err.name,
        status : statusCode,
        message : message
    }
    res.status(statusCode).json(response);
};

module.exports = { errorHandler }