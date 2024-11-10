// localStorage से खर्चों को प्राप्त करें या खाली array सेट करें
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// लिस्ट को अपडेट करें
function updateExpenseList() {
  const expenseList = document.getElementById('expenseList');
  const totalExpense = document.getElementById('totalExpense');
  let total = 0;

  expenseList.innerHTML = ''; // पहले लिस्ट को साफ करें

  expenses.forEach((expense, index) => {
    total += expense.amount;

    // खर्चे की जानकारी के लिए एक नई list item बनाएं
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount} (${expense.category}) on ${expense.date}
      <button onclick="editExpense(${index})">Edit</button>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li); // खर्चे को लिस्ट में जोड़ें
  });

  totalExpense.textContent = total; // टोटल खर्चा अपडेट करें
  localStorage.setItem('expenses', JSON.stringify(expenses)); // localStorage में अपडेट करें
}

// फ़ॉर्म सबमिट इवेंट हैंडलर
document.getElementById('expenseForm').addEventListener('submit', function(event) {
  event.preventDefault(); // फ़ॉर्म को रिफ्रेश होने से रोकें

  // इनपुट्स से डेटा प्राप्त करें
  const name = document.getElementById('expenseName').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);
  const category = document.getElementById('expenseCategory').value;
  const date = document.getElementById('expenseDate').value;

  // वैलिडेशन चेक
  if (name && amount > 0 && date) {
    const expense = { name, amount, category, date }; // खर्चे का ऑब्जेक्ट बनाएं
    expenses.push(expense); // खर्चे को array में जोड़ें
    updateExpenseList(); // लिस्ट को अपडेट करें
    this.reset(); // फ़ॉर्म रीसेट करें
  } else {
    alert('कृपया सही डेटा डालें।'); // वैलिडेशन एरर
  }
});

// खर्चे को एडिट करने का फंक्शन
function editExpense(index) {
  const expense = expenses[index];
  
  // फ़ॉर्म में पुराने डेटा को भरें
  document.getElementById('expenseName').value = expense.name;
  document.getElementById('expenseAmount').value = expense.amount;
  document.getElementById('expenseCategory').value = expense.category;
  document.getElementById('expenseDate').value = expense.date;

  // खर्चे को अपडेट करें
  expenses.splice(index, 1); // पुराना खर्चा हटाएं
  updateExpenseList(); // लिस्ट को अपडेट करें
}

// खर्चे को हटाने का फंक्शन
function deleteExpense(index) {
  expenses.splice(index, 1); // खर्चे को array से हटाएं
  updateExpenseList(); // लिस्ट को अपडेट करें
}

// पेज लोड होते ही लिस्ट को अपडेट करें
updateExpenseList();
