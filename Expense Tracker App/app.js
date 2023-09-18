// Initialize expense data
let expenses = [];

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('category');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list-items');

// Event Listeners
expenseForm.addEventListener('submit', addExpense);

// Functions
function addExpense(e) {
    e.preventDefault();
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);

    if (description && !isNaN(amount)) {
        const expense = {
            description,
            amount
        };
        expenses.push(expense);
        saveExpensesToLocal();
        displayExpenses();
        clearInputFields();
    }
}

function saveExpensesToLocal() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpensesFromLocal() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        displayExpenses();
    }
}

function displayExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${expense.description}: RS ${expense.amount.toFixed(2)}</span>
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(listItem);
    });
}

function clearInputFields() {
    descriptionInput.value = '';
    amountInput.value = '';
}

function editExpense(index) {
    const updatedDescription = prompt('Edit Description:', expenses[index].description);
    const updatedAmount = parseFloat(prompt('Edit Amount:', expenses[index].amount));
    
    if (updatedDescription && !isNaN(updatedAmount)) {
        expenses[index].description = updatedDescription;
        expenses[index].amount = updatedAmount;
        saveExpensesToLocal();
        displayExpenses();
    }
}

function deleteExpense(index) {
    const confirmDelete = confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
        expenses.splice(index, 1);
        saveExpensesToLocal();
        displayExpenses();
    }
}

// Load existing expenses from local storage on page load
loadExpensesFromLocal();
