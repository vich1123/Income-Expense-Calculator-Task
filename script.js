// Elements from DOM
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addButton = document.getElementById("add-btn");
const transactionsList = document.getElementById("transactions");
const totalBalance = document.getElementById("total-balance");

let transactions = [];

// Function to Generate a Random Color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // Function to Update Background with Random Gradient
    function updateBackgroundGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const directions = ['to right', 'to bottom', 'to bottom right', 'to bottom left'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
  
    document.body.style.transition = 'background 2s'; // Smooth transition
    document.body.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
  }
  
  // Set Interval to Change Background Automatically Every 5 Seconds
  setInterval(updateBackgroundGradient, 2000);
  

// Add Transaction
addButton.addEventListener("click", () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please provide valid input!");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  transactions.push(transaction);
  updateUI();
  clearInputs();
});

// Update UI
function updateUI() {
  transactionsList.innerHTML = "";

  let balance = 0;
  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add(transaction.type);

    li.innerHTML = `
      ${transaction.description} - $${transaction.amount.toFixed(2)}
      <div class="transaction-buttons">
        <button onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
      </div>
    `;

    transactionsList.appendChild(li);

    if (transaction.type === "income") {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  });

  totalBalance.textContent = `$${balance.toFixed(2)}`;
}

// Clear Input Fields
function clearInputs() {
  descriptionInput.value = "";
  amountInput.value = "";
  typeSelect.value = "income";
}

// Edit Transaction
function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (transaction) {
    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeSelect.value = transaction.type;

    deleteTransaction(id);
  }
}

// Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateUI();
}

const totalExpenses = document.getElementById("total-expenses");

function updateUI() {
  transactionsList.innerHTML = "";
  let balance = 0;
  let totalExpensesAmount = 0;

  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add(transaction.type);
    li.innerHTML = `
      ${transaction.description} - $${transaction.amount.toFixed(2)}
      <div class="transaction-buttons">
        <button onclick="editTransaction(${transaction.id})">Edit</button>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
      </div>
    `;
    transactionsList.appendChild(li);

    if (transaction.type === "income") {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
      totalExpensesAmount += transaction.amount;
    }
  });

  totalBalance.textContent = `$${balance.toFixed(2)}`;
  totalExpenses.textContent = `$${totalExpensesAmount.toFixed(2)}`;
}
