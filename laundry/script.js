const servicesData = [
    { name: "Dry Cleaning.", price: 200 },
    { name: "Wash & Fold", price: 100 },
    { name: "Ironing", price: 30 },
    { name: "Stain Removal", price: 500 },
    { name: "Leather & Suede Cleaning", price: 999 },
    { name: "Wedding Dress Cleaning", price: 2800 }
  ];
  

  const cart = [];
  const servicesDiv = document.getElementById("services-list");
  const cartBody = document.getElementById("cart");
  const totalSpan = document.getElementById("total");

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

  function bookNow() {
    if (cart.length === 0) {
      alert("Please add at least one service!");
      return;
    }
    alert("Booking Successful! Total: ₹" + totalSpan.innerText);
  }

  renderServices();

  document.getElementById("msg").innerText = "ℹ️ Add this item to cart and book now ";

  // Hamburger menu toggle
  document.getElementById("menu-toggle").addEventListener("click", function() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", function() {
      document.getElementById("mobile-menu").classList.add("hidden");
    });
  });
