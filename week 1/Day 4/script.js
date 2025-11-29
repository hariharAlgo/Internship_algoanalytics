// ==========================================
// 1. Custom Array Methods (Map & Reduce)
// ==========================================

// --- Custom Map Implementation ---
// The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
Array.prototype.myMap = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        // Only process if the index exists (handles sparse arrays)
        if (this.hasOwnProperty(i)) {
            result.push(callback(this[i], i, this));
        }
    }
    return result;
};

// --- Custom Reduce Implementation ---
// The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element.
Array.prototype.myReduce = function (callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    // If no initialValue is provided, use the first element of the array as the accumulator
    if (initialValue === undefined) {
        if (this.length === 0) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }
    return accumulator;
};

// --- Mini Examples ---

const numbers = [1, 2, 3, 4, 5];

// Example 1: Using myMap to square numbers
const squared = numbers.myMap(num => num * num);

// Example 2: Using myReduce to sum numbers
const sum = numbers.myReduce((acc, curr) => acc + curr, 0);

// Example 3: Using myReduce for filtering (e.g., keep only even numbers)
// Note: Usually filter() is used, but reduce can do it too!
const evens = numbers.myReduce((acc, curr) => {
    if (curr % 2 === 0) acc.push(curr);
    return acc;
}, []);

// Display results in the UI
const outputBox = document.getElementById('console-output');
outputBox.innerHTML = `
<strong>Original Array:</strong> [${numbers}]

<strong>1. myMap (Square):</strong> [${squared}]
<em>Code: numbers.myMap(num => num * num)</em>

<strong>2. myReduce (Sum):</strong> ${sum}
<em>Code: numbers.myReduce((acc, curr) => acc + curr, 0)</em>

<strong>3. myReduce (Filter Evens):</strong> [${evens}]
<em>Code: numbers.myReduce((acc, curr) => { if (curr % 2 === 0) acc.push(curr); return acc; }, [])</em>
`;

console.log("Original:", numbers);
console.log("Squared (myMap):", squared);
console.log("Sum (myReduce):", sum);
console.log("Evens (myReduce):", evens);


// ==========================================
// 2. Tab Switcher Logic
// ==========================================

const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 1. Remove 'active' class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // 2. Add 'active' class to clicked tab
        tab.classList.add('active');

        // 3. Show corresponding content
        const targetId = tab.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});


// ==========================================
// 3. Counter App Logic
// ==========================================

const counterValue = document.getElementById('counter-value');
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById('decrease-btn');

let count = 0;

function updateCounter() {
    counterValue.textContent = count;

    // Optional: Change color based on value
    if (count > 0) counterValue.style.color = '#2ecc71';
    else if (count < 0) counterValue.style.color = '#e74c3c';
    else counterValue.style.color = '#333';
}

increaseBtn.addEventListener('click', () => {
    count++;
    updateCounter();
});

decreaseBtn.addEventListener('click', () => {
    count--;
    updateCounter();
});
