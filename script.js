// Initialize tasks and theme
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let darkModeEnabled = JSON.parse(localStorage.getItem('darkModeEnabled')) || false;

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
}

function toggleDarkMode() {
    darkModeEnabled = !darkModeEnabled;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkModeEnabled', JSON.stringify(darkModeEnabled));
}

// Add new task on Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

// Add new task
function addTask() {
    const todoText = document.getElementById('todo-text').value;
    const priority = document.getElementById('priority').value;

    if (todoText) {
        tasks.push({ text: todoText, priority: priority, completed: false });
        document.getElementById('todo-text').value = '';
        saveTasks();
        renderTasks();
    }
}

// Mark task as completed
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Render tasks
function renderTasks() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(task.priority);
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerText = task.text;

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleTaskCompletion(index);

        li.appendChild(completeBtn);
        list.appendChild(li);
    });
}

// Filter tasks by priority
function filterTasks() {
    const filter = document.getElementById('filter-priority').value;
    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.priority === filter);

    const list = document.getElementById('todo-list');
    list.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add(task.priority);
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerText = task.text;

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.innerHTML = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleTaskCompletion(index);

        li.appendChild(completeBtn);
        list.appendChild(li);
    });
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks on page load
renderTasks();
