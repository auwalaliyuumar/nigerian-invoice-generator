let itemCount = 1;

function addNewItem() {
    itemCount++;
    const container = document.getElementById('items-container');
    
    const html = `
        <div class="item-row" style="display:grid;grid-template-columns:2fr 1fr 1fr 60px;gap:10px;margin-bottom:12px;">
            <input type="text" class="item-desc" placeholder="Description" value="Service ${itemCount}">
            <input type="number" class="item-qty" placeholder="Qty" value="1" style="text-align:center;">
            <input type="number" class="item-price" placeholder="Unit Price" value="2500" style="text-align:right;">
            <button onclick="this.parentElement.remove()" style="background:#e74c3c;color:white;border:none;border-radius:4px;">×</button>
        </div>
    `;
    container.innerHTML += html;
}

function generateInvoice() {
    const businessName = document.getElementById('businessName').value || "My Business";
    const clientName = document.getElementById('clientName').value || "Client";
    const invoiceNumber = document.getElementById('invoiceNumber').value || "INV-001";

    let total = 0;
    let itemsHTML = "";

    document.querySelectorAll('.item-row').forEach(row => {
        const desc = row.querySelector('.item-desc').value || "Item";
        const qty = parseFloat(row.querySelector('.item-qty').value) || 1;
        const price = parseFloat(row.querySelector('.item-price').value) || 0;
        const amount = qty * price;
        total += amount;

        itemsHTML += `
            <tr>
                <td style="padding:12px;border:1px solid #ddd;">${desc}</td>
                <td style="padding:12px;text-align:center;border:1px solid #ddd;">${qty}</td>
                <td style="padding:12px;text-align:right;border:1px solid #ddd;">₦${price.toLocaleString('en-NG')}</td>
                <td style="padding:12px;text-align:right;border:1px solid #ddd;">₦${amount.toLocaleString('en-NG')}</td>
            </tr>
        `;
    });

    const preview = document.getElementById('invoicePreview');
    preview.innerHTML = `
        <div style="max-width:800px;margin:0 auto;background:white;border:2px solid #333;padding:40px;">
            <h2 style="text-align:center;color:#2c3e50;">INVOICE</h2>
            <p style="text-align:right;">#${invoiceNumber}</p>
            
            <p><strong>From:</strong> ${businessName}</p>
            <p><strong>To:</strong> ${clientName}</p>

            <table style="width:100%;border-collapse:collapse;margin:25px 0;">
                <thead>
                    <tr style="background:#f1f1f1;">
                        <th style="padding:12px;text-align:left;">Description</th>
                        <th style="padding:12px;">Qty</th>
                        <th style="padding:12px;text-align:right;">Price</th>
                        <th style="padding:12px;text-align:right;">Amount</th>
                    </tr>
                </thead>
                <tbody>${itemsHTML}</tbody>
            </table>

            <h3 style="text-align:right;">Total: ₦${total.toLocaleString('en-NG')}</h3>
            
            <p style="text-align:center;margin-top:50px;color:#666;">Thank you for your business!</p>
        </div>

        <div style="text-align:center;margin-top:25px;">
            <button onclick="window.print()" style="padding:14px 40px;background:#27ae60;color:white;border:none;border-radius:8px;font-size:17px;">
                🖨️ Print / Save as PDF
            </button>
        </div>
    `;
}

// Initialize
window.onload = () => addNewItem();