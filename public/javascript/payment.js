document.getElementById("registerBtn").onclick = async function(e) {
  e.preventDefault();

  // Step 1: Request order creation from your backend
  const res = await fetch("/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  // Step 2: Setup Razorpay options with the real order_id
  const options = {
    key: "rzp_test_RUU5sZSiH6upBZ",
    amount: data.amount,
    currency: data.currency,
    name: "Acme Corp",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: data.orderId,
    handler: function (response) {
      alert("Payment ID: " + response.razorpay_payment_id);
      alert("Order ID: " + response.razorpay_order_id);
      alert("Signature: " + response.razorpay_signature);
      // 👉 Optional: POST this to backend for signature verification
    },
    theme: { color: "#3399cc" },
  };

  // Step 3: Open Razorpay checkout
  const rzp1 = new Razorpay(options);
  rzp1.open();
};