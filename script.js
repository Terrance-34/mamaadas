let cart = {};

const listEl = document.getElementById("cartList");
const totalEl = document.getElementById("count");

function render() {
  let html = "";
  let total = 0;

  for (const name in cart) {
    const item = cart[name];
    const lineTotal = item.price * item.qty;
    total = total + lineTotal;

    html = html + `
      <div class="line">
        <span>${item.qty} × ${name}</span>
        <span>₦${lineTotal.toLocaleString()}</span>
        <button class="remove" data-name="${name}">Remove</button>
      </div>`;
  }

  if (html === "") {
    html = "<p>Your cart is empty.</p>";
  }

  listEl.innerHTML = html;
  totalEl.textContent = total.toLocaleString();
}

document.querySelectorAll(".add").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    if (cart[name]) {
      cart[name].qty = cart[name].qty + 1;
    } else {
      cart[name] = { price: price, qty: 1 };
    }
    render();
  });
});

listEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove")) {
    const name = e.target.dataset.name;
    cart[name].qty = cart[name].qty - 1;
    if (cart[name].qty <= 0) {
      delete cart[name];
    }
    render();
  }
});

render();
const WHATSAPP_NUMBER = "2349165871309";

document.querySelector(".checkout").addEventListener("click", function () {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let message = "Hello, I'd like to order:\n";
  let total = 0;

  for (const name in cart) {
    const item = cart[name];
    total = total + item.price * item.qty;
    message = message + item.qty + " x " + name + "\n";
  }

  message = message + "\nTotal: ₦" + total.toLocaleString();

  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
});