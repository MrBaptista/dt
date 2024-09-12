(function() {
    const powerButton = document.getElementById('powerButton');
    const sectionForDebts = document.querySelector('.debts-section'); // Renamed to avoid conflict with 'debtsSection'

    // Event listener for the power button click
    powerButton.addEventListener('click', () => {
        // Prompt the user to enter a PIN
        const userPin = prompt('Enter the PIN to clear all data:');
        
        // Example: predefined correct PIN
        const correctPin = '1234';  // You can change this to any PIN you'd like
        
        if (userPin === correctPin) {
            // Clear localStorage
            localStorage.clear();

            // Clear the debts from the DOM
            const debtItems = document.querySelectorAll('.debt-item');
            debtItems.forEach(debt => debt.remove());

            alert('All data has been cleared.');
        } else {
            alert('Incorrect PIN. Data has not been cleared.');
        }
    });
})();
