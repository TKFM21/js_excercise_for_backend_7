const Comment = require('../models/commentModel');

module.exports = {
    getComments: (req, res) => {
        const comments = Comment.findAll();
        res.status(200).json(comments);
    }
}