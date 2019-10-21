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
    },
    putComment: (req, res) => {
        try {
            const {username, body} = req.body;
            const strId = req.params.id;
            const id = parseInt(strId, 10);
            const putComment = Comment.updateComment({id, username, body});
            res.status(200).json(putComment);
        } catch (error) {
            if (error.message === 'idに該当するCommentがありません') {
                res.status(404).json({message: error.message});
            } else {
                res.status(400).json({message: error.message});
            }
        }
    }
};