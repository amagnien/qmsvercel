let queue = [];
let served = [];

async function addCustomer() {
    const name = document.getElementById('customer-name').value;
    const description = document.getElementById('customer-description').value;
    const serviceRequested = document.getElementById('service-requested').value;
    const serviceType = document.getElementById('service-type').value;
    
    const customer = { name, description, serviceRequested, serviceType, status: 'waiting' };
    await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });
    displayQueue();
}

function showNewCustomerForm() {
    document.getElementById('customer-form').style.display = 'block';
}

function generateReport() {
    const report = served.map(customer => `
        <div>
            <p>Name: ${customer.name}</p>
            <p>Description: ${customer.description}</p>
            <p>Service Requested: ${customer.serviceRequested}</p>
            <p>Service Type: ${customer.serviceType}</p>
        </div>
    `).join('');
    document.getElementById('queue-list').innerHTML = report;
}

function showDeleteWarning() {
    document.getElementById('delete-warning').style.display = 'block';
}

function hideDeleteWarning() {
    document.getElementById('delete-warning').style.display = 'none';
}

async function deleteData() {
    await fetch('/api/queue', { method: 'DELETE' });
    queue = [];
    served = [];
    displayQueue();
}

async function displayQueue() {
    const response = await fetch('/api/queue');
    queue = await response.json();
    const queueList = document.getElementById('queue-list');
    const waitingCustomers = queue.filter(customer => customer.status === 'waiting').map(customer => `
        <div>
            <p>${customer.name}</p>
            <button onclick="serveCustomer('${customer.name}')">Serve</button>
        </div>
    `).join('');
    const servedCustomers = served.map(customer => `<p>${customer.name}</p>`).join('');
    queueList.innerHTML = waitingCustomers + servedCustomers;
}

async function serveCustomer(name) {
    const customer = queue.find(customer => customer.name === name);
    customer.status = 'served';
    served.push(customer);
    queue = queue.filter(customer => customer.name !== name);
    await fetch('/api/queue', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(queue) });
    displayQueue();
}

function showTab(tab) {
    // Logic to show different tabs based on the parameter "tab"
}

// Initial display
displayQueue();
