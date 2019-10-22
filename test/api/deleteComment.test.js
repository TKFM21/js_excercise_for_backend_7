const assert = require('power-assert');
const requestHelper = require('../helper/requestHelper');

const VALID_ID = 4;
const INVALID_ID = 999999999;

const getComments = async () => {
    const response = await requestHelper.request({
        method: 'get',
        endPoint: '/api/comments',
        statusCode: 200
    });
    return response.body;
};

describe('API Delete /api/comments/:id', () => {
    it('不正idの場合400エラー', async () => {
        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/comments/-1`,
            statusCode: 400
        });
        assert.deepStrictEqual(response.body, {
            message: 'idが不正です。（1以上の数値）'
        });
    });

    it('存在しないidの場合404エラー', async () => {
        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/comments/${INVALID_ID}`,
            statusCode: 404
        });
        assert.deepStrictEqual(response.body, {
            message: 'idに該当するCommentがありません'
        });
    });

    it('正常系のテスト', async () => {
        const oldComments = await getComments();
        const response = await requestHelper.request({
            method: 'delete',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 200
        });

        const deleteComment = response.body;
        assert.deepStrictEqual({ ...deleteComment }, {
            id: VALID_ID,
            username: deleteComment.username,
            body: deleteComment.body,
            createdAt: deleteComment.createdAt,
            updatedAt: deleteComment.updatedAt
        });

        const currentComments = await getComments();
        assert.strictEqual(currentComments.length, oldComments.length - 1);
        assert.deepStrictEqual(deleteComment, oldComments[3]);
        assert.notDeepStrictEqual(deleteComment, currentComments[3]);
    });
});