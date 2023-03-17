const httpStatus = require('http-status');
const Board = require('../models/boards.schema');
const ApiError = require('../utils/ApiError');

class TaskService {
    async deleteTask(email, data) {
        try {
            console.log('reached service')
            const { boardIndex, columnIndex, taskIndex } = data;
            console.log(data);
            await Board.updateOne({ email: email }, { $unset: { [`boards.${boardIndex}.columns.${columnIndex}.tasks.${taskIndex}`]: 1 } })
            await Board.updateOne({ email: email }, { $pull: { [`boards.${boardIndex}.columns.${columnIndex}.tasks`]: null } })
            return {"message":"Removed task!"};
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async patchSubtasks(data) {
        try {
            const { boardIndex, columnIndex, taskIndex } = data;
            const subtasks = [
                ...data.subtasks
            ]

            await Board.updateOne({ email: data.email },
                { $set: { [`boards.${boardIndex}.columns.${columnIndex}.tasks.${taskIndex}.subtasks`]: subtasks } }
            );
            return { "message": "Updated task!" };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async editTask(data) {
        try {
            const { boardIndex, columnIndex, taskIndex } = data;
            const task = {
                title: data.title,
                status: data.status,
                subtasks: data.subtasks,
                description: data.description
            }


            await Board.updateOne({ email: data.email },
                { $set: { [`boards.${boardIndex}.columns.${columnIndex}.tasks.${taskIndex}`]: task } }
            );

            return { "message": "Updated task!" };
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addTask(email, data) {
        try {
            const { boardIndex, columnIndex } = data;
            const task = {
                title: data.title,
                status: data.status,
                subtasks: data.subtasks,
                description: data.description
            }

            await Board.updateOne({ email: email }, {
                $push: { [`boards.${boardIndex}.columns.${columnIndex}.tasks`]: task }
            });

            return { "message": "Updated task!" };
        } catch (error) {
            console.log('error=', error);
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = TaskService;