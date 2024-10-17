document.getElementById('newCustomerBtn').addEventListener('click', showNewCustomerForm);
document.getElementById('reportBtn').addEventListener('click', generateReport);
document.getElementById('deleteEODBtn').addEventListener('click', showDeleteWarning);
document.getElementById('customerForm').addEventListener('submit', addCustomer);
document.getElementById('proceed-delete-btn').addEventListener('click', deleteData);
document.getElementById('cancel-delete-btn').addEventListener('click', hideDeleteWarning);

const waitingCustomers = document.getElementById('waitingCustomers');
const servedCustomers = document.getElementById('servedCustomers');

function showNewCustomerForm() {
    document.getElementById('newCustomerForm').style.display = 'block';
}

async function addCustomer(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const service = document.getElementById('service').value;

    const customer = { name, description, service, status: 'waiting', ticketNumber: Date.now(), time: new Date().toLocaleTimeString() };

    await fetch('/api/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    });

    displayQueue();
    document.getElementById('newCustomerForm').style.display = 'none';
    document.getElementById('customerForm').reset();
}

async function displayQueue() {
    const response = await fetch('/api/queue');
    const queue = await response.json();
    
    const waitingTableBody = document.querySelector('#waitingTable tbody');
    const servedTableBody = document.querySelector('#servedTable tbody');

    waitingTableBody.innerHTML = '';
    servedTableBody.innerHTML = '';

    queue.forEach(customer => {
        if (customer.status === 'waiting') {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.ticketNumber}</td>
                <td>${customer.name}</td>
                <td>${customer.description}</td>
                <td>${customer.service}</td>
                <td>${customer.time}</td>
                <td><button onclick="serveCustomer('${customer.ticketNumber}')">Serve</button></td>
            `;
            waitingTableBody.appendChild(row);
        } else if (customer.status === 'served') {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.ticketNumber}</td>
                <td>${customer.name}</td>
                <td>${customer.description}</td>
                <td>${customer.service}</td>
                <td>${customer.time}</td>
                <td>${customer.servedAt}</td>
                <td>${customer.waitingTime}</td>
            `;
            servedTableBody.appendChild(row);
        }
    });
}

async function serveCustomer(ticketNumber) {
    const response = await fetch('/api/queue');
    const queue = await response.json();
    
    const customer = queue.find(cust => cust.ticketNumber == ticketNumber);
    customer.status = 'served';
    customer.servedAt = new Date().toLocaleTimeString();
    customer.waitingTime = calculateWaitingTime(customer.time, customer.servedAt);

    await fetch('/api/queue', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queue),
    });

    displayQueue();
}

function calculateWaitingTime(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const diff = new Date(end - start);
    return `${diff.getUTCHours()}:${diff.getUTCMinutes()}:${diff.getUTCSeconds()}`;
}

function generateReport() {
    const response = fetch('/api/queue');
    const queue = response.json();
    
    const reportContent = queue.filter(customer => customer.status === 'served').map(customer => `
        <div>
            <p>Ticket Number: ${customer.ticketNumber}</p>
            <p>Name: ${customer.name}</p>
            <p>Description: ${customer.description}</p>
            <p>Service: ${customer.service}</p>
            <p>Time: ${customer.time}</p>
            <p>Served At: ${customer.servedAt}</p>
            <p>Waiting Time: ${customer.waitingTime}</p>
        </div>
    `).join('');

    const newWindow = window.open("", "Print Report");
    newWindow.document.write(`<html><head><title>Report</title></head><body>${reportContent}</body></html>`);
    newWindow.print();
}

function showDeleteWarning() {
    document.getElementById('delete-warning').style.display = 'block';
}

function hideDeleteWarning() {
    document.getElementById('delete-warning').style.display = 'none';
}

async function deleteData() {
    await fetch('/api/queue', { method: 'DELETE' });
    displayQueue();
    hideDeleteWarning();
}

document.add[_{{{CITATION{{{_1{](https://github.com/Babii-Oleksandr/Babii-Oleksandr_GH8_CMS/tree/ddbc66b94acc5a3d11d5a0cd341998f4768af4d8/home14%2Findex.php)