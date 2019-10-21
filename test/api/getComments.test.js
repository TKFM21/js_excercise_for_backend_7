const assert = require('power-assert');
const requestHelper = require('../helper/requestHelper');

describe('API GET /api/comments', () => {
    it('getCommentsで配列内にオブジェクトがあり、構成が正しい型の確認', async () => {
        const response = await requestHelper.request({
            method: 'get',
            endPoint: '/api/comments',
            statusCode: 200
        });

        const comments = response.body;
        assert.strictEqual(Array.isArray(comments), true);
        comments.forEach(comment => {
            assert.strictEqual(typeof comment.id, 'number');
            assert.strictEqual(typeof comment.username, 'string');
            assert.strictEqual(typeof comment.body, 'string');
            assert.strictEqual(typeof comment.createdAt, 'string');
            assert.strictEqual(typeof comment.updatedAt, 'string');
        });
    });
});