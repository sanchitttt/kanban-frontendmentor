const httpStatus = require('http-status');
const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');
const { jwt: jwtt } = require('../config/config');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const TokenService = require('../services/token.service');
const Board = require('../models/boards.schema');
const data = require('../data/data.json');

const UserServiceInstance = new UserService();
const AuthServiceInstance = new AuthService();
const TokenServiceInstance = new TokenService();

const register = catchAsync(async (req, res) => {
    try {
        const newUser = await UserServiceInstance.createUser(req.body);

        res.status(httpStatus.CREATED).json(newUser);
    } catch (error) {

        if (error.statusCode === 200) {
            throw new ApiError(error.statusCode, error.message);
        }
        else {
            throw new ApiError(httpStatus.BAD_REQUEST);
        }
    }
})

const login = catchAsync(async (req, res) => {
    try {
        console.log('reached');
        const user = await AuthServiceInstance.loginWithEmailAndPassword(req.body);
        if (!user) {
            res.status(httpStatus.NOT_FOUND).json({ "message": "User doesnt exist" })
        }
        else {
            const payload = user._id;
            const token = TokenServiceInstance.generateAuthToken(payload);
            const expiration = (new Date(Date.now() + 604800000)).getTime()
            res.cookie("token", token, {
                maxAge: expiration,
                httpOnly: true,
                secure: true
            })
            user.password = null;
            req.user = user;
            res.status(httpStatus.OK).end();
        }

    } catch (error) {
        console.log(error.statusCode, error.message)
        throw new ApiError(error.statusCode, error.message);
    }
})


module.exports = {
    register,
    login
};