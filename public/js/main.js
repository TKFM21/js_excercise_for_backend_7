(() => {
    const comments = [];
    const API_URL = 'http://localhost:3001/api/comments';
    const addUsername = document.getElementById('add-username');
    const addBody = document.getElementById('add-body');
    const addBtn = document.getElementById('add-btn');
    const tbody = document.getElementById('tbody');
    const KEYS = ['id', 'username', 'body', 'createdAt', 'updatedAt'];

    window.addEventListener('load', event => {
        listComment();
    });

    const listComment = async () => {
        allDeleteComments();
        const comments = await getAllComments();
        comments.forEach(comment => {
            const trElement = document.createElement('tr');
            KEYS.forEach(key => {
                const tdElement = document.createElement('td');
                tdElement.textContent = comment[key];
                trElement.appendChild(tdElement);
            });
            tbody.appendChild(trElement);
        });
    };

    const getAllComments = async () => {
        const response = await fetch(API_URL);
        const comments = await response.json();
        return comments;
    };

    const allDeleteComments = () => {
        while(tbody.firstChild) tbody.removeChild(tbody.firstChild);
    };
})();