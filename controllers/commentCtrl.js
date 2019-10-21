const Comment = require('../models/commentModel');

module.exports = {
    getComments: (req, res) => {
        const comments = Comment.findAll();
        res.status(200).json(comments);
    },
    postComment: (req, res) => {
        try {
            const {username, body} = req.body;
            const postComment = Comment.postComment({username, body});
            res.status(200).json(postComment);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
};