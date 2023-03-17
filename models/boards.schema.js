const mongoose = require('mongoose');
const validator = require('validator');


const TasksSchema = new mongoose.Schema({
    title: {
        type: String, trim: true, required: true
    },
    description: {
        type: String, trim: true, required: true
    },
    status: {
        type: String, trim: true, required: true
    },
    subtasks: [
        {
            title: { type: String, trim: true, required: true },
            isComplete: { type: Boolean, required: true }
        }
    ]
})

const ColumnSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    tasks: [TasksSchema]
});

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        // unique:true
    },
    columns: [ColumnSchema]
})

const BoardsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            return validator.isEmail(value)
        }
    },
    boards: {type:[BoardSchema],default:[]}
})

const Board = mongoose.model('boards', BoardsSchema);

module.exports = Board;