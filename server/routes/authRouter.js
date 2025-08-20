
const { signup, login } = require('../controllers/authController');
const { loginValidation, signupValidation } = require('../middlewares/validate');

const router=require('express').Router();

router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);


module.exports=router;