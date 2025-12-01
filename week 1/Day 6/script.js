// ==========================================
// 1. Todo List with LocalStorage
// ==========================================

const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load todos from local storage on startup
let todos = JSON.parse(localStorage.getItem('myTodos')) || [];

function saveTodos() {
    localStorage.setItem('myTodos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="btn danger delete-btn">Delete</button>
        `;

        // Event Listeners for dynamic elements
        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(index));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(index));

        todoList.appendChild(li);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initial Render
renderTodos();


// ==========================================
// 2. Debounce Search
// ==========================================

const searchInput = document.getElementById('search-input');
const searchStatus = document.getElementById('search-status');

// Debounce Function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Simulated Search Function
function performSearch(query) {
    if (!query) {
        searchStatus.textContent = 'Ready to search...';
        return;
    }
    searchStatus.textContent = `Searching for "${query}"... (Simulated API Call)`;
    searchStatus.style.color = '#3498db';

    // Simulate API delay
    setTimeout(() => {
        searchStatus.textContent = `Results found for "${query}"!`;
        searchStatus.style.color = '#2ecc71';
    }, 500);
}

// Apply Debounce
const debouncedSearch = debounce((e) => {
    performSearch(e.target.value);
}, 600); // 600ms delay

searchInput.addEventListener('input', (e) => {
    searchStatus.textContent = 'Typing...';
    searchStatus.style.color = '#7f8c8d';
    debouncedSearch(e);
});


// ==========================================
// 3. Form Validation
// ==========================================

const form = document.getElementById('registration-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const formSuccess = document.getElementById('form-success');

// Email Validation Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    // Update UI
    let width = 0;
    let color = '#e74c3c';
    let text = '';

    switch (strength) {
        case 0:
        case 1:
            width = 25;
            color = '#e74c3c'; // Red
            text = 'Weak';
            break;
        case 2:
            width = 50;
            color = '#f1c40f'; // Yellow
            text = 'Medium';
            break;
        case 3:
            width = 75;
            color = '#3498db'; // Blue
            text = 'Strong';
            break;
        case 4:
            width = 100;
            color = '#2ecc71'; // Green
            text = 'Very Strong';
            break;
    }

    if (password.length === 0) {
        width = 0;
        text = '';
    }

    strengthBar.style.width = width + '%';
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = text;
    strengthText.style.color = color;

    return strength >= 2; // Require at least medium strength
}

emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', () => {
    checkPasswordStrength();
    if (passwordInput.value.length > 0 && passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
    } else {
        passwordError.textContent = '';
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPasswordStrong = checkPasswordStrength();
    const isPasswordLengthValid = passwordInput.value.length >= 8;

    if (isEmailValid && isPasswordStrong && isPasswordLengthValid) {
        formSuccess.textContent = 'Registration Successful!';
        form.reset();
        strengthBar.style.width = '0';
        strengthText.textContent = '';
        setTimeout(() => {
            formSuccess.textContent = '';
        }, 3000);
    } else {
        formSuccess.textContent = '';
        if (!isPasswordLengthValid) {
            passwordError.textContent = 'Password must be at least 8 characters';
        }
    }
});
