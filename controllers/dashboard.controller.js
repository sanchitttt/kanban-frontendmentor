const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const BoardService = require('../services/boards.service');

const BoardServiceInstance = new BoardService();

const getDashboard = catchAsync(async (req, res) => {
    try {
        const board = await BoardServiceInstance.getBoard(req.user.email);
        res.status(200).json(board);
    } catch (error) {
        console.log('error',error);
        throw new ApiError(error.statusCode);
    }
})


module.exports = {
    getDashboard
}