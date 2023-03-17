const router = require('express').Router();
const openAiController = require('../../controllers').openAiController;

router.post('/', openAiController.getPrompt);


module.exports = router;