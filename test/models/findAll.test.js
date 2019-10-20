const assert = require('power-assert');
const Comment = require('../../models/commentModel');

describe('model findAll method test', () => {
    it('findAll method の存在確認', () => {
        assert.equal(typeof Comment.findAll, 'function');
    });

    it('getしたcommentを1件ごとに確認と件数確認', () => {
        const comments = Comment.findAll();
        assert.equal(Array.isArray(comments), true);
        assert.equal(comments.length > 0, true);

        comments.forEach(comment => {
            assert.deepStrictEqual({ ...comment }, {
                id: comment.id,
                username: comment.username,
                body: comment.body,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt
            });
        });
    });
});