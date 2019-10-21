const assert = require('power-assert');
const requestHelper = require('../helper/requestHelper');

const VALID_ID = 1;
const INVALID_ID = 999999999;

const getComments = async () => {
    const response = await requestHelper.request({
        method: 'get',
        endPoint: '/api/comments',
        statusCode: 200
    });
    return response.body;
};

describe('API PUT /api/comments/:id', () => {
    it('不正idの場合400エラー', async () => {
        const failData = {
            username: 'test',
            body: 'body'
        };

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/-1`,
            statusCode: 400
        }).send(failData);
        assert.deepStrictEqual(response.body, {
            message: 'idが不正です。（1以上の数値）'
        });
    });

    it('存在しないidの場合400エラー', async () => {
        const failData = {
            username: 'test',
            body: 'body'
        };

        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${INVALID_ID}`,
            statusCode: 400
        }).send(failData);
        assert.deepStrictEqual(response.body, {
            message: 'idに該当するCommentがありません'
        });
    });

    it('usernameがなかったらエラー400', async () => {
        const failData = {
            body: 'test Body'
        };
        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 400
        }).send(failData);

        assert.deepStrictEqual(response.body, {
            message: 'usernameがありません'
        });
    });

    it('bodyがなかったらエラー400', async () => {
        const failData = {
            username: 'test username'
        };
        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 400
        }).send(failData);

        assert.deepStrictEqual(response.body, {
            message: 'bodyがありません'
        });
    });

    it('正常系のテスト', async () => {
        const oldComments = await getComments();
        const data = {
            username: 'update test username',
            body: 'update test body'
        };
        const response = await requestHelper.request({
            method: 'put',
            endPoint: `/api/comments/${VALID_ID}`,
            statusCode: 200
        }).send(data);

        const updateComment = response.body;
        assert.deepStrictEqual({ ...updateComment }, {
            id: VALID_ID,
            username: data.username,
            body: data.body,
            createdAt: updateComment.createdAt,
            updatedAt: updateComment.updatedAt
        });

        const currentComments = await getComments();
        assert.notDeepStrictEqual(currentComments, oldComments);
    });
});