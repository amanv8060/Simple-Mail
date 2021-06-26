const router = require('express').Router();
const { authJwt } = require('../middlewares');
const controller = require('../controllers/authController');

router.put('/auth/user/signup', controller.createUser);
router.post('/auth/user/signin', controller.userSignin);
router.get('/token/verify', [authJwt.verifyToken], controller.tokenVerify);
router.get('/auth/user/exists', controller.checkLoginId);
router.put('/auth/user/googleLogin', controller.googleLogin);

module.exports = router;