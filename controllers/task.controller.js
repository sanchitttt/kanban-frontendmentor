const httpStatus = require("http-status");
const TaskService = require("../services/task.service");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync")

const TaskServiceInstance = new TaskService();

const patchEditTask = catchAsync(async (req, res) => {
    console.log('reache');
    try {
        const data = {
            email: req.user.email,
            ...req.body
        }
        const result = await TaskServiceInstance.editTask(data);
        res.status(httpStatus.OK, { "message": "Edited task successfully!" });
    } catch (error) {
        throw new ApiError(error.statusCode);
    }
});

const patchAddTask = catchAsync(async (req, res) => {
    try {
        const result = await TaskServiceInstance.addTask(req.user.email,req.body);
        res.json(result);
    } catch (error) {
        throw new ApiError(error.statusCode);
    }
});

const patchViewTasks = catchAsync(async (req, res) => {
    try {
        const data = {
            email: req.user.email,
            ...req.body
        }
        const result = await TaskServiceInstance.patchSubtasks(data);
        res.status(httpStatus.OK, { "message": "Edited task successfully!" });
    } catch (error) {
        throw new ApiError(error.statusCode);
    }
});


const deleteTask = catchAsync(async (req, res) => {
    try {
        const { email } = req.user;
        console.log('reached controller')
        const result = await TaskServiceInstance.deleteTask(email, req.body);
        res.status(204).json(result);
    } catch (error) {
    throw new ApiError(error.statusCode);
}
});


module.exports = {
    patchEditTask,
    patchAddTask,
    patchViewTasks,
    deleteTask
}