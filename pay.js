(function() {
    let clickedDebt = null; // Track which debt is being paid

    const debtsSection = document.querySelector('.debts-section');
    const newDebtSection = document.querySelector('.new-debt-section'); // The section to be replaced
    const debtFormHTML = newDebtSection.innerHTML; // Save the original form HTML to revert later

    // Add event listener to the "Make Payment" context menu item
    document.getElementById('makePayment').addEventListener('click', () => {
        if (clickedDebt) {
            // Replace the New Debt form with the Make Payment form
            showPaymentForm();
        }
    });

    // Function to display the Make Payment form
    function showPaymentForm() {
        const debtName = clickedDebt.querySelector('.debt-name').textContent;
        const debtAmount = clickedDebt.querySelector('.debt-amount').textContent.replace('$', '');

        newDebtSection.innerHTML = `
            <h2>Make Payment</h2>
            <form id="paymentForm">
                <label for="paymentAmount">Payment Amount:</label>
                <input type="number" id="paymentAmount" name="paymentAmount" placeholder="Enter payment amount" required>
                
                <button type="submit" id="payBtn">Save</button>
                <button type="button" id="cancelBtn">Cancel</button>
            </form>
        `;

        // Add event listener for the payment form submit (Save button)
        document.getElementById('paymentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);
            processPayment(paymentAmount, debtName, debtAmount);
        });

        // Add event listener for the Cancel button to revert to the original form
        document.getElementById('cancelBtn').addEventListener('click', () => {
            revertToNewDebtForm();
        });
    }

    // Function to process the payment
    function processPayment(paymentAmount, debtName, debtAmount) {
        const remainingAmount = parseFloat(debtAmount) - paymentAmount;

        if (remainingAmount <= 0) {
            // If the debt is paid off or overpaid, remove it
            clickedDebt.remove();
            removeDebtFromLocalStorage(debtName);
        } else {
            // Otherwise, update the amount in the DOM and localStorage
            clickedDebt.querySelector('.debt-amount').textContent = `$${remainingAmount.toFixed(2)}`;
            updateDebtInLocalStorage(debtName, remainingAmount);
        }

        // Revert to the original New Debt form
        revertToNewDebtForm();
    }

    // Function to revert to the original New Debt form
    function revertToNewDebtForm() {
        newDebtSection.innerHTML = debtFormHTML;
    }

    // Function to update the debt amount in localStorage
    function updateDebtInLocalStorage(debtName, remainingAmount) {
        let debts = JSON.parse(localStorage.getItem('debts')) || [];
        debts = debts.map(debt => {
            if (debt.name === debtName) {
                debt.amount = remainingAmount.toFixed(2); // Update the debt amount
            }
            return debt;
        });
        localStorage.setItem('debts', JSON.stringify(debts));
    }

    // Function to remove a debt from localStorage
    function removeDebtFromLocalStorage(debtName) {
        let debts = JSON.parse(localStorage.getItem('debts')) || [];
        debts = debts.filter(debt => debt.name !== debtName);
        localStorage.setItem('debts', JSON.stringify(debts));
    }

    // Event listener for right-clicking on a debt item
    debtsSection.addEventListener('contextmenu', (event) => {
        const debtItem = event.target.closest('.debt-item');
        if (debtItem) {
            clickedDebt = debtItem; // Track the clicked debt item
        }
    });
})();
