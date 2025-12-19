// Load tasks from LocalStorage on startup
document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const categoryInput = document.getElementById('categoryInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value === '') return alert("Please enter a task!");

    const taskObj = {
        id: Date.now(),
        text: taskInput.value,
        date: dateInput.value,
        category: categoryInput.value,
        completed: false
    };

    createTaskElement(taskObj);
    saveLocalTask(taskObj);

    // Clear inputs
    taskInput.value = '';
    dateInput.value = '';
}

function createTaskElement(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
        <div class="task-info">
            <span class="category-tag">${task.category}</span>
            <strong>${task.text}</strong>
            <span class="task-date">${task.date ? new Date(task.date).toLocaleString() : 'No date'}</span>
        </div>
        <div>
            <button onclick="toggleComplete(${task.id})">✔️</button>
            <button onclick="deleteTask(${task.id})" style="background:#ff5e5e">🗑️</button>
        </div>
    `;
    taskList.appendChild(li);
}

function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload(); // Refresh to show changes
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
}

// Local Storage Functions
function saveLocalTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}