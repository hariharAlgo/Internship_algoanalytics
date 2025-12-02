// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const countSpan = document.getElementById('count');
const clearBtn = document.getElementById('clear-completed');
const emptyState = document.getElementById('empty-state');
const dateDisplay = document.getElementById('date-display');

// State
let todos = JSON.parse(localStorage.getItem('taskMasterTodos')) || [];
let currentFilter = 'all';

// Initialization
function init() {
    // Set Date
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);

    render();
}

// Save to LocalStorage
function save() {
    localStorage.setItem('taskMasterTodos', JSON.stringify(todos));
    render();
}

// Render Function
function render() {
    // 1. Filter Todos
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    // 2. Clear List
    todoList.innerHTML = '';
    todoList.appendChild(emptyState); // Keep empty state in DOM

    // 3. Show/Hide Empty State
    if (filteredTodos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // 4. Render Items
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group';

        li.innerHTML = `
            <div class="flex items-center space-x-3 flex-1 cursor-pointer" onclick="toggleTodo(${todo.id})">
                <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}">
                    ${todo.completed ? '<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' : ''}
                </div>
                <span class="text-gray-700 ${todo.completed ? 'line-through text-gray-400' : ''}">${todo.text}</span>
            </div>
            <button onclick="deleteTodo(${todo.id})" class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        todoList.appendChild(li);
    });

    // 5. Update Count (Active tasks)
    const activeCount = todos.filter(t => !t.completed).length;
    countSpan.textContent = activeCount;
}

// Actions
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    save();
    todoInput.value = '';
}

// Exposed to global scope for HTML onclick attributes
window.toggleTodo = function (id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    save();
};

window.deleteTodo = function (id) {
    todos = todos.filter(todo => todo.id !== id);
    save();
};

// Event Listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update UI
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update Filter
        currentFilter = btn.getAttribute('data-filter');
        render();
    });
});

clearBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    save();
});

// Start
init();
