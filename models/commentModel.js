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
    }
};