const assert = require('power-assert');
const Comment = require('../../models/commentModel');

describe('Model updateComment method Test', () => {
    it('methodの存在確認', () => {
        assert.equal(typeof Comment.updateComment, 'function');
    });

    it('idがなかったり、不正な値だったらエラー', () => {
        const failDatas = [
            {},
            {id: '1'},
            {id: NaN},
            {id: 0},
            {id: null},
            {id: []},
            {id: {}},
            {id: -1}
        ];
        failDatas.forEach(failData => {
            try {
                Comment.updateComment(failData);
                assert.fail();
            } catch (error) {
                assert.equal(error.message, 'idが不正です。（1以上の数値）');
            }
        });
    });

    it('usernameがなかったらエラー', () => {
        const failData = {
            id: 1,
            body: 'test body'
        };
        try {
            Comment.updateComment(failData);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'usernameがありません');
        }
    });

    it('bodyがなかったらエラー', () => {
        const failData = {
            id: 1,
            username: 'test username'
        };
        try {
            Comment.updateComment(failData);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'bodyがありません');
        }
    });

    it('存在しないidだったらエラー', () => {
        const failData = {
            id: 99999999,
            username: 'test username',
            body: 'test body'
        };
        try {
            Comment.updateComment(failData);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'idに該当するCommentがありません');
        }
    });

    it('正常系のテスト', () => {
        const data = {
            id: 1,
            username: 'update test',
            body: 'update test body'
        };
        const updateComment = Comment.updateComment(data);
        assert.deepStrictEqual({ ...updateComment }, {
            id: data.id,
            username: data.username,
            body: data.body,
            createdAt: updateComment.createdAt,
            updatedAt: updateComment.updatedAt
        });

        const comments = Comment.findAll();
        assert.deepStrictEqual(comments[0], updateComment);
        assert.equal(updateComment.updatedAt > updateComment.createdAt, true);
    });
});