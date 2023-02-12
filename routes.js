const express = require('express');
const controllers = require('./controllers');
const router = express.Router();

router.get('/mail/user/:email', controllers.getUser)
router.get('/mail/send', controllers.sendMail);
router.get('/mail/drafts/:email', controllers.getDrafts);
router.get('/mail/read/:email/:messageId', controllers.readMail);
router.get('/mail/watch/:email', controllers.watchEmail);

// http://localhost:8000/api/mail/user/me   / guilherme.urenha@gmail.com
module.exports = router;