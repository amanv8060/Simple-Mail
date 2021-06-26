const router = require('express').Router();
const { authJwt } = require('../middlewares');
const controller = require('../controllers/mailController');

router.get('/mails/getsent', [authJwt.verifyToken], controller.getSentMails);
router.delete('/mails/delete', [authJwt.verifyToken], controller.deleteSchedule);
router.put('/mails/create', [authJwt.verifyToken], controller.createEmail);
router.post('/mails/edit', [authJwt.verifyToken], controller.editSchedule)


module.exports = router;