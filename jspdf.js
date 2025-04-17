  <script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    let cart = [];

    document.getElementById("product-form").addEventListener("submit", function(e) {
      e.preventDefault();
      let name = document.getElementById("product-name").value;
      let price = parseFloat(document.getElementById("product-price").value);
      let qty = parseInt(document.getElementById("product-qty").value);
      cart.push({ name, price, qty });
      updateCartDisplay();
    });

    function updateCartDisplay() {
      let tbody = document.querySelector("#cart-table tbody");
      tbody.innerHTML = "";
      let subtotal = 0;

      cart.forEach(product => {
        let total = product.price * product.qty;
        subtotal += total;
        tbody.innerHTML += `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.qty}</td><td>${total.toFixed(2)}</td></tr>`;
      });

      let tax = subtotal * 0.06;
      let grandTotal = subtotal + tax;

      document.getElementById("subtotal").innerText = `Subtotal: RM${subtotal.toFixed(2)}`;
      document.getElementById("tax").innerText = `Service Tax (6%): RM${tax.toFixed(2)}`;
      document.getElementById("grand-total").innerText = `Grand Total: RM${grandTotal.toFixed(2)}`;
    }

    document.getElementById("generate-pdf").addEventListener("click", function() {
      let doc = new jsPDF();
      let now = new Date();
      let dateStr = now.toLocaleString();

      doc.setFontSize(16);
      doc.text("Yogi Fried Rice", 10, 10);
      doc.setFontSize(10);
      doc.text("POS Operator: Yogi Invoices Company", 10, 16);
      doc.text(`Date & Time: ${dateStr}`, 10, 22);
      doc.setFontSize(12);

      let y = 30;
      cart.forEach(item => {
        doc.text(`${item.name} x${item.qty} = RM${(item.price * item.qty).toFixed(2)}`, 10, y);
        y += 10;
      });

      let subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      let tax = subtotal * 0.06;
      let grand = subtotal + tax;

      doc.text(`Subtotal: RM${subtotal.toFixed(2)}`, 10, y);
      doc.text(`Tax (6%): RM${tax.toFixed(2)}`, 10, y + 10);
      doc.text(`Total: RM${grand.toFixed(2)}`, 10, y + 20);

      let pdfData = doc.output("bloburl");
      let win = window.open(pdfData, '_blank');
      win.onload = function() {
        win.focus();
        win.print();
      };
    });
  </script>
