const assert = require('power-assert');
const Comment = require('../../models/commentModel');

describe('Model postComment methodのテスト', () => {
    it('postCommentメソッドの存在確認', () => {
        assert.equal(typeof Comment.postComment, 'function');
    });

    it('usernameがなかったらエラー', () => {
        const failData = {
            body: 'test body'
        };
        try {
            Comment.postComment(failData);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'usernameがありません');
        }
    });

    it('bodyがなかったらエラー', () => {
        const failData = {
            username: 'test username'
        };
        try {
            Comment.postComment(failData);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'bodyがありません');
        }
    });

    it('正しく処理：戻り値の一致性、追加後に配列lengthが一つ増えていることを確認', () => {
        const oldComments = Comment.findAll();
        const data = {
            username: 'test username',
            body: 'test body'
        };
        const newComment = Comment.postComment(data);
        assert.deepEqual(newComment, {
            id: newComment.id,
            username: data.username,
            body: data.body,
            createdAt: newComment.createdAt,
            updatedAt: newComment.updatedAt
        });
        const newComments = Comment.findAll();
        assert.equal(newComments.length, oldComments.length + 1)
    });
});