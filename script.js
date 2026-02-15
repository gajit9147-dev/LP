/* ===============================
   🧺 SERVICES DATA
================================ */
const servicesData = [
  { name: "Dry Cleaning.", price: 200 },
  { name: "Wash & Fold", price: 100 },
  { name: "Ironing", price: 30 },
  { name: "Stain Removal", price: 500 },
  { name: "Leather & Suede Cleaning", price: 999 },
  { name: "Wedding Dress Cleaning", price: 2800 }
];

const ADMIN_EMAIL = "ajeetgupta80045@gmail.com";

/* ===============================
   🛒 CART + ELEMENTS
================================ */
const cart = [];
const servicesDiv = document.getElementById("services-list");
const cartBody = document.getElementById("cart");
const totalSpan = document.getElementById("total");

const bookingNameInput = document.getElementById("booking-name");
const bookingEmailInput = document.getElementById("booking-email");
const bookingPhoneInput = document.getElementById("booking-phone");
const bookingMessage = document.getElementById("msg");
const bookingStatus = document.getElementById("booking-status");
const bookNowButton = document.getElementById("book-now");

/* ===============================
   STATUS MESSAGE FUNCTION
================================ */
function setBookingStatus(message, tone) {
  bookingStatus.classList.remove("text-red-600", "text-green-600");
  bookingStatus.style.color = "";

  if (tone === "warning") {
    bookingStatus.classList.add("text-red-600");
    bookingStatus.style.color = "#dc2626";
  }

  if (tone === "success") {
    bookingStatus.classList.add("text-green-600");
    bookingStatus.style.color = "#16a34a";
  }

  bookingStatus.innerText = message;
}

/* ===============================
   RENDER SERVICES
================================ */
function renderServices() {
  servicesDiv.innerHTML = "";

  servicesData.forEach((service, index) => {
    const isAdded = cart.includes(service);

    servicesDiv.innerHTML += `
      <section class="flex justify-between items-center bg-gray-100 p-3 rounded">
        <section>
          <p class="font-medium">${service.name}</p>
          <p class="text-blue-600">₹${service.price}</p>
        </section>
        <button
          onclick="${isAdded ? `removeItem(${index})` : `addItem(${index})`}"
          class="px-3 py-1 text-sm rounded
          ${isAdded ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}">
          ${isAdded ? "Remove item ⊖ " : "Add item ⊕ "}
        </button>
      </section>
    `;
  });
}

/* ===============================
   CART FUNCTIONS
================================ */
function addItem(index) {
  cart.push(servicesData[index]);
  updateCart();
}

function removeItem(index) {
  const i = cart.findIndex(s => s === servicesData[index]);
  if (i > -1) cart.splice(i, 1);
  updateCart();
}

function updateCart() {
  cartBody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <tr>
        <td colspan="2" class="text-center text-gray-500 py-3">
          No items added
        </td>
      </tr>
    `;
    totalSpan.innerText = "0";
    renderServices();
    return;
  }

  cart.forEach(item => {
    total += item.price;
    cartBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td class="text-right">₹${item.price}</td>
      </tr>
    `;
  });

  totalSpan.innerText = total;
  renderServices();
}

/* ===============================
   📩 FINAL BOOKING FUNCTION
================================ */
async function bookNow() {
  if (cart.length === 0) {
    setBookingStatus("No items added", "warning");
    return;
  }

  const name = bookingNameInput.value.trim();
  const email = bookingEmailInput.value.trim();
  const phone = bookingPhoneInput.value.trim();

  if (!name || !email || !phone) {
    setBookingStatus("Please fill all details.", "warning");
    return;
  }

  const total = totalSpan.innerText;

  const servicesSelected = cart
    .map(item => `${item.name}`)
    .join(", ");

  try {
    bookNowButton.disabled = true;
    setBookingStatus("Sending booking...", "");

    /* EMAIL → ADMIN */
    await fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        services: servicesSelected,
        total: `₹${total}`,
        _subject: "New Laundry Booking",
        message: `
Items: ${servicesSelected}
Total: ₹${total}

Thank you for booking.
        `
      })
    });

    /* EMAIL → CUSTOMER */
    await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        services: servicesSelected,
        total: `₹${total}`,
        _subject: "Laundry Booking Confirmation",
        message: `
Items: ${servicesSelected}
Total Amount: ₹${total}

Thank you for booking with us.
        `
      })
    });

    // clear cart
    cart.length = 0;
    bookingNameInput.value = "";
    bookingEmailInput.value = "";
    bookingPhoneInput.value = "";
    updateCart();

    setBookingStatus("Booking successful! Email sent.", "success");

  } catch (error) {
    setBookingStatus("Booking failed. Try again.", "warning");
  } finally {
    bookNowButton.disabled = false;
  }
}

/* ===============================
   INIT
================================ */
updateCart();
bookingMessage.innerText = "ℹ️ Add services to cart and book now";
setBookingStatus("", "");

/* ===============================
   MOBILE MENU
================================ */
document.getElementById("menu-toggle").addEventListener("click", function() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobile-menu a").forEach(link => {
  link.addEventListener("click", function() {
    document.getElementById("mobile-menu").classList.add("hidden");
  });
});
