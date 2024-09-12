// Context Menu Functionality

let clickedDebt = null; // Store the debt item that was clicked or right-clicked
const contextMenu = document.getElementById('contextMenu');
const debtsSection = document.querySelector('.debts-section');

// Event delegation: Show the context menu on debt item right-click
debtsSection.addEventListener('contextmenu', (e) => {
    const debtItem = e.target.closest('.debt-item');
    if (debtItem) {
        clickedDebt = debtItem; // Store the clicked debt item
        showContextMenu(e);
    }
});

// Hide the menu when clicking elsewhere
document.addEventListener('click', (e) => {
    if (e.target.closest('.debt-item') === null && e.target.closest('#contextMenu') === null) {
        contextMenu.style.display = 'none';
        clickedDebt = null; // Reset the clicked debt when clicking elsewhere
    }
});

// Show the context menu at the mouse click position
function showContextMenu(event) {
    event.preventDefault();

    // Get the mouse position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Set the position of the context menu
    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;

    // Show the menu
    contextMenu.style.display = 'block';
}

// Add event listeners for each context menu item
document.getElementById('makePayment').addEventListener('click', () => {
    contextMenu.style.display = 'none';
    clickedDebt = null; // Reset clicked debt after action
});

document.getElementById('generateInvoice').addEventListener('click', () => {
    contextMenu.style.display = 'none';
    clickedDebt = null; // Reset clicked debt after action
});

// Void functionality: Remove debt from both the DOM and localStorage
document.getElementById('void').addEventListener('click', () => {
    if (clickedDebt) {
        // Get the debt name and amount from the clickedDebt element
        const debtName = clickedDebt.querySelector('.debt-name').textContent;
        const debtAmount = clickedDebt.querySelector('.debt-amount').textContent.replace('$', '');

        // Remove the debt from localStorage
        voidDebtFromLocalStorage(debtName, debtAmount);

        // Remove the debt from the DOM
        clickedDebt.remove();
        
        alert('Debt has been voided.');
        
        // Hide the context menu
        contextMenu.style.display = 'none';

        // Reset clickedDebt
        clickedDebt = null;
    }
});

// Function to remove debt from localStorage
function voidDebtFromLocalStorage(name, amount) {
    let debts = JSON.parse(localStorage.getItem('debts')) || [];
    
    // Filter out the debt that matches the name and amount
    debts = debts.filter(debt => !(debt.name === name && debt.amount === parseFloat(amount).toFixed(2)));
    
    // Update localStorage with the new debts array
    localStorage.setItem('debts', JSON.stringify(debts));
}
