const BoardService = require("../services/boards.service");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const BoardServiceInstance = new BoardService();

const patchEditBoard = catchAsync(async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            columns: req.body.columnName
        }
        const result = await BoardServiceInstance.editBoard(req.user.email, req.body.boardIndex, payload)
        res.status(200).json(result);
    } catch (error) {
        throw new ApiError(error.statusCode);
    }

});

const patchAddBoard = catchAsync(async (req, res) => {
    try {
        const { email } = req.user;
        const result = await BoardServiceInstance.addBoard(email, req.body);
    } catch (error) {
    throw new ApiError(error.statusCode);
}
});


const deleteBoard = catchAsync(async (req, res) => {
    try {
        const { email } = req.user;
        console.log('reached controller')
        const result = await BoardServiceInstance.deleteBoard(email, req.body);
        res.status(204).json(result);
    } catch (error) {
    throw new ApiError(error.statusCode);
}
});




module.exports = {
    patchEditBoard,
    patchAddBoard,
    deleteBoard
}