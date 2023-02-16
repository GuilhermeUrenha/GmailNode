const express = require('express');
const controllers = require('./controllers');
const router = express.Router();

router.get('/user/:email', controllers.getUser)
router.get('/send', controllers.sendMail);
router.get('/drafts/:email', controllers.getDrafts);
router.get('/read/:email/:messageId', controllers.readMail);
//router.get('/watch/:email', controllers.watchEmail);

// http://localhost:8000/api/user/me   / guilherme.urenha@gmail.com
module.exports = router;