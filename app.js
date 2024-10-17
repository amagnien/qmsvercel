async function addToQueue() {
    const user = `User ${Date.now()}`;
    await fetch('/api/queue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
    });
    displayQueue();
}

async function displayQueue() {
    const response = await fetch('/api/queue');
    const queue = await response.json();
    const queueList = document.getElementById('queue-list');
    queueList.innerHTML = queue.map(user => `<div>${user}</div>`).join('');
}

// Initial display
displayQueue();
