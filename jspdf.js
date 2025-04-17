 <script>
  let cart = [];

  // Handle product form submission
  document.getElementById("product-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get product details
    let name = document.getElementById("product-name").value;
    let price = parseFloat(document.getElementById("product-price").value);
    let qty = parseInt(document.getElementById("product-qty").value);

    // Add product to cart array
    cart.push({ name, price, qty });

    // Clear form fields
    document.getElementById("product-name").value = '';
    document.getElementById("product-price").value = '';
    document.getElementById("product-qty").value = '';

    // Update cart display
    updateCartDisplay();
  });

  // Update the cart display table
  function updateCartDisplay() {
    let tbody = document.querySelector("#cart-table tbody");
    tbody.innerHTML = "";  // Clear the table body first
    let subtotal = 0;

    // Loop through each item in the cart and display them in the table
    cart.forEach(product => {
      let total = product.price * product.qty;
      subtotal += total;
      tbody.innerHTML += `
        <tr>
          <td>${product.name}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>${product.qty}</td>
          <td>${total.toFixed(2)}</td>
        </tr>
      `;
    });

    // Calculate tax and grand total
    let tax = subtotal * 0.06;
    let grandTotal = subtotal + tax;

    // Update the totals on the page
    document.getElementById("subtotal").innerText = `Subtotal: RM${subtotal.toFixed(2)}`;
    document.getElementById("tax").innerText = `Service Tax (6%): RM${tax.toFixed(2)}`;
    document.getElementById("grand-total").innerText = `Grand Total: RM${grandTotal.toFixed(2)}`;
  }

  // Handle PDF generation
  document.getElementById("generate-pdf").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let now = new Date();
    let dateStr = now.toLocaleString();

    // Add title and info to PDF
    doc.setFontSize(16);
    doc.text("Yogi Fried Rice", 10, 10);
    doc.setFontSize(10);
    doc.text("POS Operator: Yogi Invoices Company", 10, 16);
    doc.text(`Date & Time: ${dateStr}`, 10, 22);
    doc.setFontSize(12);

    // Add product details to PDF
    let y = 30;
    cart.forEach(item => {
      doc.text(`${item.name} x${item.qty} = RM${(item.price * item.qty).toFixed(2)}`, 10, y);
      y += 10;
    });

    // Calculate subtotal, tax, and grand total for PDF
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let tax = subtotal * 0.06;
    let grand = subtotal + tax;

    // Add totals to PDF
    doc.text(`Subtotal: RM${subtotal.toFixed(2)}`, 10, y);
    doc.text(`Tax (6%): RM${tax.toFixed(2)}`, 10, y + 10);
    doc.text(`Total: RM${grand.toFixed(2)}`, 10, y + 20);

    // Save PDF
    doc.save("invoice.pdf");
  });
</script>
