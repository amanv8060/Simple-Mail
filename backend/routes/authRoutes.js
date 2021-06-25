const router = require('express').Router();
const { authJwt } = require('../middlewares');
const controller = require('../controllers/authController');

router.put('/auth/user/signup', controller.createUser);

router.post('/auth/user/signin', controller.userSignin);
router.get('/token/verify', [authJwt.verifyToken], controller.tokenVerify);
router.get('/auth/email/verify', controller.emailVerify);
router.get('/auth/phone/verify', controller.emailVerify);
router.get('/auth/user/exists', controller.checkLoginId);

router.get('/auth/owner/exists', controller.checkOwnerLoginId);

module.exports = router;