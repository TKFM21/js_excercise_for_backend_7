const assert = require('power-assert');
const Comment = require('../../models/commentModel');

describe('Model removeComment methodのテスト', () => {
    it('methodの存在確認', () => {
        assert.strictEqual(typeof Comment.removeComment, 'function');
    });

    it('idが不正な値だったらエラー', () => {
        const failIds = ['1', '', null, , [], {}, NaN, 0, -1];
        failIds.forEach(failId => {
            try {
                Comment.removeComment(failId);
                assert.fail();
            } catch (error) {
                assert.strictEqual(error.message, 'idが不正です。（1以上の数値）');
            }
        });
    });

    it('idに該当するCommentがない場合エラー', () => {
        const failId = 9999999999;
        try {
            Comment.removeComment(failId);
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'idに該当するCommentがありません');
        }
    });

    it('正常系の確認', () => {
        const oldComments = Comment.findAll();
        const id = 5;
        const removeComment = Comment.removeComment(id);
        assert.deepStrictEqual({ ...removeComment }, {
            id: id,
            username: removeComment.username,
            body: removeComment.body,
            createdAt: removeComment.createdAt,
            updatedAt: removeComment.updatedAt
        });
        const currentComment = Comment.findAll();
        assert.strictEqual(oldComments.length - 1, currentComment.length);
    });
});