const router = require('express').Router();
const dashboardController = require('../../controllers').dashboardController;
const taskController = require('../../controllers').taskController;
const boardController = require('../../controllers').boardController;
const validate = require('../../middlewares/validate');
const validationSchema = require('../../validations/board.validation');

router.get("/", dashboardController.getDashboard);

router.patch("/editTask", validate(validationSchema.editTask, 'body'), taskController.patchEditTask);
router.patch("/viewTask", validate(validationSchema.editTaskSubtasks, 'body'), taskController.patchViewTasks);
router.patch("/editBoard", validate(validationSchema.editBoard, 'body'), boardController.patchEditBoard);
router.patch("/addBoard", validate(validationSchema.addBoard, 'body'), boardController.patchAddBoard);
router.patch("/addTask", validate(validationSchema.addTask, 'body'), taskController.patchAddTask);

router.patch("/deleteTask", validate(validationSchema.deleteTask, 'body'), taskController.deleteTask);
router.patch("/deleteBoard", validate(validationSchema.deleteBoard, 'body'), boardController.deleteBoard);


module.exports = router;