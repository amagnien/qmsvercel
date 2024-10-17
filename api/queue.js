const fs = require('fs');
const path = require('path');

const queueFilePath = path.resolve('.', 'queue.json');

function readQueue() {
    if (fs.existsSync(queueFilePath)) {
        return JSON.parse(fs.readFileSync(queueFilePath, 'utf8'));
    }
    return [];
}

function writeQueue(queue) {
    fs.writeFileSync(queueFilePath, JSON.stringify(queue));
}

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { user } = req.body;
        const queue = readQueue();
        queue.push(user);
        writeQueue(queue);
        res.status(200).json({ message: 'Added to queue' });
    } else if (req.method === 'GET') {
        const queue = readQueue();
        res.status(200).json(queue);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
