document.getElementById('generateInvoice').addEventListener('click', generateInvoice);

let selectedDebt = null; // This will hold the right-clicked debt item

// Event listener to capture the right-clicked debt item
document.querySelector('.debts-section').addEventListener('contextmenu', (event) => {
    const debtItem = event.target.closest('.debt-item');
    if (debtItem) {
        selectedDebt = debtItem; // Store the clicked debt item
    }
});

function generateInvoice() {
    if (!selectedDebt) {
        alert('No debt selected for generating an invoice.');
        return;
    }

    // Retrieve debt details from the selected debt item
    const debtName = selectedDebt.querySelector('.debt-name').textContent;
    const debtAmount = selectedDebt.querySelector('.debt-amount').textContent.replace('$', '');
    const debtDate = selectedDebt.querySelector('.debt-date').textContent;

    const { jsPDF } = window.jspdf;

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font and prepare invoice layout with spacing to avoid overlapping
    doc.setFont('Helvetica', 'normal');

    // Company Logo and Name
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 102); // Teal color
    doc.text('BIGNUGETS', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50); // Dark Gray
    doc.text('We Make You Giggle!', 20, 30);

    // Invoice Details (Top right)
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text('INVOICE NO: 40266', 150, 20);
    doc.text(`Amount: $${debtAmount}`, 150, 30);

    // Line break
    doc.setDrawColor(0, 102, 102);
    doc.setLineWidth(1);
    doc.line(20, 35, 190, 35); // Horizontal line

    // Invoice Details section
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 102); // Teal
    doc.text('Invoice Details', 20, 50);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(`Total: $${debtAmount}\nInvoice No: 40266\nIssue Date: ${debtDate}\nDue Date: 7 days later\nInvoice Status: Pending`, 20, 60, {
        maxWidth: 100,
        lineHeightFactor: 1.5,
    });

    // Invoice To section (displays the debt name dynamically)
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 102); // Teal
    doc.text('Invoice To:', 100, 50);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(`${debtName}\n112 Main St., Los Angeles, CA, 90210\ncustomer@email.com\n323-283-3266`, 100, 60, {
        maxWidth: 90,
        lineHeightFactor: 1.5,
    });

    // Line break
    doc.setDrawColor(0, 102, 102);
    doc.setLineWidth(1);
    doc.line(20, 100, 190, 100); // Horizontal line

    // Description and Amount Table
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 102); // Teal
    doc.text('Description', 20, 110);
    doc.text('Amount', 160, 110);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black
    doc.text('Gigglebush', 20, 120);
    doc.text(`$${debtAmount}`, 160, 120);

    // Grand Total
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 102); // Teal
    doc.text(`Grand Total: $${debtAmount}`, 20, 140);

    // Disclaimer with funny side effects
    doc.setFontSize(12);
    doc.setTextColor(0, 102, 102); // Teal
    doc.text('Potential side effects include, but are not limited to:', 20, 160);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(`- Gliggle Time
- Pizza Time
- Forgot My Keys
- Where's My Phone
- Do I Need to Sh*t or Was That the Coffee?
- Unexpected Bursts of Karaoke
- Sudden Affinity for Sock Puppets
- Impulsive Dance Moves in Public
- Involuntary Haiku Composition
- Compulsive Collection of Paper Clips
- Chronic Mismatching of Socks
- Random Outbursts of Limericks
- Sudden Desire to Speak in Rhyme
- Obsessive Interest in Garden Gnomes
- Frequent and Unexplained Napping
- Uncontrolled Giggle Fits at Serious Events
- Involuntary Adoption of a New Accent
- Unpredictable Urge to Organize Drawers
- Compulsive Urge to Sing in the Shower
- Unusual Fascination with Insects
- Spontaneous Creative Writing Sessions
- Sudden Compulsion to Write Letters to Celebrities
- Unexpected Interest in Knitting`, 20, 170, {
        maxWidth: 170,
        lineHeightFactor: 1.5,
    });

    // Save the PDF and trigger download
    doc.save(`invoice_${debtName}.pdf`);
}
