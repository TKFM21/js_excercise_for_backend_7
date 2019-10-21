const assert = require('power-assert');
const requestHelper = require('../helper/requestHelper');

const getComments = async () => {
    const response = await requestHelper.request({
        method: 'get',
        endPoint: '/api/comments',
        statusCode: 200
    });
    return response.body;
};

describe('API POST /api/comments', () => {
    it('usernameがなかったらエラー400', async () => {
        const failData = {
            body: 'test Body'
        };
        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
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
            method: 'post',
            endPoint: '/api/comments',
            statusCode: 400
        }).send(failData);

        assert.deepStrictEqual(response.body, {
            message: 'bodyがありません'
        });
    });

    it('postCommentでコメントを新規追加。戻り値が正しい構成か確認', async () => {
        const oldComments = await getComments();

        const postData = {
            username: 'postUsername',
            body: 'postBody'
        };

        const response = await requestHelper.request({
            method: 'post',
            endPoint: '/api/comments',
            statusCode: 200
        }).send(postData);

        const postComment = response.body;
        assert.deepStrictEqual({ ...postComment }, {
            id: postComment.id,
            username: postData.username,
            body: postData.body,
            createdAt: postComment.createdAt,
            updatedAt: postComment.updatedAt
        });
        
        const currentComments = await getComments();
        assert.strictEqual(oldComments.length + 1, currentComments.length);
    });
});