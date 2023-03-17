const Joi = require("joi");

const editTask = Joi.object().keys({
    _id: Joi.string(),
    boardIndex: Joi.number().required(),
    columnIndex: Joi.number().required(),
    taskIndex: Joi.number().required(),
    title: Joi.string().min(4).required(),
    description: Joi.string().min(0).max(100),
    subtasks: Joi.array().required(),
    status: Joi.string().required()
});

const editTaskSubtasks = Joi.object().keys({
    boardIndex: Joi.number().required(),
    columnIndex: Joi.number().required(),
    taskIndex: Joi.number().required(),
    subtasks: Joi.array().required(),
})

const addTask = Joi.object().keys({
    boardIndex: Joi.number().required(),
    columnIndex: Joi.number().required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().min(0).max(100),
    subtasks: Joi.array().required(),
    status: Joi.string().required()
});

const editBoard = Joi.object().keys({
    name: Joi.string().min(4).max(25).required(),
    boardIndex: Joi.number().required(),
    columnName: Joi.array().required()
});

const addBoard = Joi.object().keys({
    name: Joi.string().min(4).max(25).required(),
    columns: Joi.array().required()
});

const deleteBoard = Joi.object().keys({
    boardIndex: Joi.number().required()
})

const deleteTask = Joi.object().keys({
    boardIndex: Joi.number().required(),
    columnIndex: Joi.number().required(),
    taskIndex: Joi.number().required()

})


module.exports = {
    editTask,
    addTask,
    editBoard,
    editTaskSubtasks,
    addBoard,
    deleteBoard,
    deleteTask
}