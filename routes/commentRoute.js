const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentsCtrl');

router
    .get('/', (req, res) => {
        res.render('index');
    });

router
    .route('/api/comments')
    .get(controller.getComments);

module.exports = router;