const comments = [];
let nextId = 1;

class Comment{
    constructor({username, body}) {
        this.id = nextId++;
        this.username = username;
        this.body = body;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

for (let i = 0; i < 5; i++) {
    const index = i + 1;
    const comment = new Comment({
        username: 'test' + index,
        body: 'body' + index
    });
    comments.push(comment);
}

module.exports = {
    findAll: () => {
        return comments.slice();
    },
    postComment: ({username, body}) => {
        if (!username) {
            throw new Error('usernameがありません');
        }
        if (!body) {
            throw new Error('bodyがありません');
        }

        const newComment = new Comment({
            username: username,
            body: body
        });
        comments.push(newComment);
        return newComment;
    },
    updateComment: ({id, username, body}) => {
        if (typeof id !== 'number' || id < 1 || isNaN(id)) {
            throw new Error('idが不正です。（1以上の数値）');
        }
        if (!username) {
            throw new Error('usernameがありません');
        }
        if (!body) {
            throw new Error('bodyがありません');
        }
        const targetComment = comments.find(comment => comment.id === id);
        if (!targetComment) {
            throw new Error('idに該当するCommentがありません');
        }

        targetComment.username = username;
        targetComment.body = body;
        targetComment.updatedAt = new Date();
        return targetComment;
    }
};