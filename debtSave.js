(function() {
    const debtForm = document.getElementById('debtForm');
    const debtsSection = document.querySelector('.debts-section');

    // Load debts from localStorage on page load
    document.addEventListener('DOMContentLoaded', loadDebts);

    // Handle form submission to save new debt
    debtForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;

        if (!name || !amount || !date) {
            alert('Please fill out all fields.');
            return;
        }

        // Create a new debt object
        const debt = {
            name,
            amount: parseFloat(amount).toFixed(2), // Ensure amount is formatted
            date
        };

        // Save debt to localStorage
        saveDebtToLocalStorage(debt);

        // Add the debt to the DOM
        addDebtToDOM(debt);

        // Clear form
        debtForm.reset();
    });

    // Save debt to localStorage
    function saveDebtToLocalStorage(debt) {
        let debts = getDebtsFromLocalStorage();
        debts.push(debt);
        localStorage.setItem('debts', JSON.stringify(debts));
    }

    // Get debts from localStorage
    function getDebtsFromLocalStorage() {
        let debts = localStorage.getItem('debts');
        return debts ? JSON.parse(debts) : [];
    }

    // Load all debts from localStorage and display them
    function loadDebts() {
        const debts = getDebtsFromLocalStorage();
        debts.forEach(debt => addDebtToDOM(debt));
    }

    // Add a debt to the DOM
    function addDebtToDOM(debt) {
        const debtItem = document.createElement('div');
        debtItem.classList.add('debt-item');
        debtItem.innerHTML = `
            <span class="debt-name">${debt.name}</span>: 
            <span class="debt-amount">$${debt.amount}</span> 
            due on <span class="debt-date">${debt.date}</span>
        `;
        debtsSection.appendChild(debtItem);
    }
})();
