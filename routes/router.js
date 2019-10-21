const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentCtrl')

router.use((req, res, next) => {
    console.log(req.method, req.url, req.httpVersion);
    console.log('  Time--:', Date.now());
    next();
});

router
    .route('/')
    .get(controller.getComments)
    .post(controller.postComment);

module.exports = router;