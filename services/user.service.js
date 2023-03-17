const httpStatus = require("http-status");
const bcrypt = require('bcrypt');
const User = require("../models/user.modal");
const ApiError = require("../utils/ApiError");
const Board = require("../models/boards.schema");
const data = require('../data/data.json');
const BoardService = require("./boards.service");


const BoardServiceInstance = new BoardService();

class UserService {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    async createUser(userBody) {
        try {
            const isEmailTaken = await User.findOne({ email: userBody.email });
            if (isEmailTaken) {
                throw new ApiError(httpStatus.OK, "Email already taken");
            }
            else {
                const hashedPassword = await this.hashPassword(userBody.password);
                const newUser = await User.create({ ...userBody, password: hashedPassword })
                const obj = {
                    email: userBody.email,
                    name: userBody.name,
                    boards: data.boards
                }
                await Board.create({name:userBody.email,email:userBody.email});
                await BoardServiceInstance.addBoard(userBody.email,data.boards);
                return newUser;
            }
        } catch (error) {
            console.log('error = ', error);
            throw error;
        }
    }
}


module.exports = UserService;