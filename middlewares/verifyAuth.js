const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/config');
const User = require('../models/user.modal');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const verifyAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        const jwtPayload = jwt.verify(token, TOKEN_SECRET); // throws an error if invalid


        if (jwtPayload) {
            const fetchUser = (id) => {
                return User.findOne({ _id: id });
            }
            fetchUser(jwtPayload.userId).then((result) => {
                if (!result) {
                    throw new ApiError(httpStatus.NOT_FOUND);
                }
                else {
                    result.password = null;
                    req.user = result;
                    next();
                }
            }).catch((err) => {
                if (err.statusCode === 404) res.status(401, "Please login first!").end()
                else res.status(401, "Please login first!").end()
            })
        }


    } catch (error) {
        console.log('error is ', error);
        throw new ApiError(httpStatus.UNAUTHORIZED, "Please login first");
    }

}

module.exports = verifyAuth;