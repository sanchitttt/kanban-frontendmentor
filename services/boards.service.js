const httpStatus = require('http-status');
const Board = require('../models/boards.schema');
const ApiError = require('../utils/ApiError');

class BoardService {
    async getBoard(email) {
        try {
            const boards = await Board.findOne({ email: email });
            if (!boards) {
                throw new ApiError(httpStatus.NOT_FOUND);
            }
            return boards;
        } catch (error) {

            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async editBoard(email, index, data) {
        try {
            await Board.updateOne({ email: email }, {
                $set: { [`boards.${index}`]: data }
            })
            return { "message": "Done saving" };
        } catch (error) {
            console.log('error=', error);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addBoard(email, data) {
        try {
            await Board.updateOne({ email: email },
                {
                    $push: { "boards": data }
                }
            );
            return { "message": "Done adding" };
        } catch (error) {
            console.log('error=', error);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteBoard(email, index) {
        try {
            const { boardIndex } = index;
            await Board.updateOne({ email: email }, { $unset: { [`boards.${boardIndex}`]: 1 } })
            await Board.updateOne({ email: email }, { $pull: { "boards": null } })
            return { "message": "Removed successfully" }
        } catch (error) {
            console.log('error');
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = BoardService;