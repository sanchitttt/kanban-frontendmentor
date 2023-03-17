const { getChatGptResponse } = require("../openai");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const BoardService = require("../services/boards.service");
const BoardServiceInstance = new BoardService();

const getPrompt = catchAsync(async (req, res) => {
    try {
        const { prompt } = req.body;
        const { email } = req.user;
        const chatGPTGeneratedReponse = await getChatGptResponse(prompt)
        await BoardServiceInstance.addBoard(email, JSON.parse(chatGPTGeneratedReponse));
        res.status(200).json(JSON.parse(chatGPTGeneratedReponse));
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = { getPrompt };