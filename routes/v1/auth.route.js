const router = require('express').Router();
const validate = require('../../middlewares/validate');
const authValidationSchema = require('../../validations/auth.validation');
const authController = require('../../controllers').authController;


router.post("/register", validate(authValidationSchema.register,'body'), authController.register);
router.post("/login", validate(authValidationSchema.login,'body'), authController.login);


module.exports = router;