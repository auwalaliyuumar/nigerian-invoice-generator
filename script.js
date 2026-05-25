// Add first item when page loads
window.onload = function() {
    addNewItem();
};

function addNewItem() {
    const container = document.getElementById('items-container');
    const itemHTML = `
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 60px; gap: 10px; margin-bottom: 12px;">
            <input type="text" class="item-desc" placeholder="Description" value="Service">
            <input type="number" class="item-qty" placeholder="Qty" value="1" style="text-align:center;">
            <input type="number" class="item-price" placeholder="Price" value="2500" style="text-align:right;">
            <button onclick="this.parentElement.remove()" style="background:#e74c3c;color:white;border:none;">×</button>
        </div>
    `;
    container.innerHTML += itemHTML;
}

function generateInvoice() {
    const businessName = document.getElementById('businessName').value || "My Business";
    const clientName = document.getElementById('clientName').value || "Client";
    const invoiceNumber = document.getElementById('invoiceNumber').value || "INV-001";

    let total = 0;
    let itemsHTML = "";

    document.querySelectorAll('#items-container > div').forEach(row => {
        const desc = row.querySelector('.item-desc').value || "Item";
        const qty = parseFloat(row.querySelector('.item-qty').value) || 1;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const amount = qty * price;
        total += amount;

        itemsHTML += `
            <tr>
                <td>${desc}</td>
                <td style="text-align:center;">${qty}</td>
                <td style="text-align:right;">₦${price.toLocaleString('en-NG')}</td>
                <td style="text-align:right;">₦${amount.toLocaleString('en-NG')}</td>
            </tr>
        `;
    });

    const preview = document.getElementById('invoicePreview');
    preview.innerHTML = `
        <div style="border:2px solid #333; padding:30px; max-width:800px; margin:0 auto;">
            <h2 style="text-align:center;">INVOICE</h2>
            <p style="text-align:right;">Invoice #: ${invoiceNumber}</p>
            
            <p><strong>From:</strong> ${businessName}</p>
            <p><strong>To:</strong> ${clientName}</p>
            
            <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                <tr style="background:#f1f1f1;">
                    <th style="padding:10px; text-align:left;">Description</th>
                    <th style="padding:10px;">Qty</th>
                    <th style="padding:10px; text-align:right;">Price</th>
                    <th style="padding:10px; text-align:right;">Amount</th>
                </tr>
                ${itemsHTML}
            </table>
            
            <h3 style="text-align:right;">Total: ₦${total.toLocaleString('en-NG')}</h3>
            
            <div style="text-align:center; margin-top:40px;">
                <button onclick="window.print()" style="padding:12px 30px; background:#27ae60; color:white; border:none; border-radius:8px;">
                    Print / Save as PDF
                </button>
            </div>
        </div>
    `;
}